import { IPageContent } from "../page/IPageContent";

/**
 * This class is responsible for managing the IndexedDB database for a section's index.
 * It uses a singleton pattern to ensure that only one instance of the database is created for each section.
 * The database is opened when the first instance is requested and closed when the last instance is closed.
 * The database name is the section ID.
 * The object store name is "pages".
 * The key path is "id".
 * If the array length is greater than the maximum number of open databases, the oldest database is closed.
 *
 */
export class SectionIndexDatabaseManager {
  private static instances: { [key: string]: Promise<SectionIndexDatabaseManager> } = {};
  private static openDatabases: string[] = [];
  private static MAX_OPEN_DBS = 3;
  private db: IDBDatabase | null = null;
  private sectionId: string;

  private constructor(sectionId: string) {
    this.sectionId = sectionId;
  }

  private init(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined" || typeof indexedDB === "undefined") {
        reject(new Error("IndexedDB is not supported in this environment."));
        return;
      }

      const request = indexedDB.open(this.sectionId, 1);

      request.onupgradeneeded = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        this.db.createObjectStore("pages", { keyPath: "id" });
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        this.trackDatabase();
        resolve();
      };

      request.onerror = (event) => {
        reject(new Error(`Error opening database: ${(event.target as IDBOpenDBRequest).error}`));
      };
    });
  }

  /**
   * Tracks the currently open database by adding its section ID to the list of open databases.
   * If the number of open databases exceeds the maximum allowed, it closes the oldest database.
   *
   * @private
   */
  private trackDatabase() {
    SectionIndexDatabaseManager.openDatabases.push(this.sectionId);

    if (SectionIndexDatabaseManager.openDatabases.length > SectionIndexDatabaseManager.MAX_OPEN_DBS) {
      const oldestDbId = SectionIndexDatabaseManager.openDatabases.shift();
      if (oldestDbId) {
        SectionIndexDatabaseManager.closeDatabase(oldestDbId);
      }
    }
  }

  private static closeDatabase(sectionId: string) {
    const request = indexedDB.deleteDatabase(sectionId);

    request.onsuccess = () => {
      console.log(`IndexDb '${sectionId}' closes.`);
      delete this.instances[sectionId];
    };

    request.onerror = (event) => {
      console.error("Error closing IndexDB:", (event.target as IDBOpenDBRequest).error);
    };
  }

  public static async getInstance(sectionId: string): Promise<SectionIndexDatabaseManager> {
    const existInstance = await this.instances[sectionId];
    if (!existInstance) {
      const instance = new SectionIndexDatabaseManager(sectionId);
      this.instances[sectionId] = instance.init().then(() => instance);
    }
    return this.instances[sectionId];
  }

  /**
   * Waits for the database to be initialized and ready.
   * This method returns a promise that resolves once the database is available.
   * It repeatedly checks the database status at intervals of 100 milliseconds.
   *
   * @returns {Promise<void>} A promise that resolves when the database is ready.
   */
  private waitForDatabase(): Promise<void> {
    return new Promise((resolve) => {
      let timeoutId: NodeJS.Timeout;
      const checkDb = () => {
        if (this.db) {
          clearTimeout(timeoutId);
          resolve();
        } else {
          timeoutId = setTimeout(checkDb, 100);
        }
      };
      checkDb();
    });
  }

  public async savePage(page: IPageContent): Promise<void> {
    await this.waitForDatabase();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["pages"], "readwrite");
      const objectStore = transaction.objectStore("pages");
      const request = objectStore.put(page);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(new Error((event.target as IDBRequest).error?.toString()));
    });
  }

  public async getPage(id: string): Promise<IPageContent | undefined> {
    await this.waitForDatabase();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["pages"], "readonly");
      const objectStore = transaction.objectStore("pages");
      const request = objectStore.get(id);

      request.onsuccess = (event) => resolve((event.target as IDBRequest).result);
      request.onerror = (event) => reject(new Error((event.target as IDBRequest).error?.toString()));
    });
  }

  public async deletePage(id: string): Promise<void> {
    await this.waitForDatabase();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["pages"], "readwrite");
      const objectStore = transaction.objectStore("pages");
      const request = objectStore.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(new Error((event.target as IDBRequest).error?.toString()));
    });
  }

  public static async deleteDatabase(sectionId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(sectionId);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(new Error((event.target as IDBRequest).error?.toString()));
    });
  }
}
