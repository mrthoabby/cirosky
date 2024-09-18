import { v4 as UUID } from "uuid";

export class IdGenerator {
  private static readonly MAX_RANDOM_NUMBER = 1000000;

  static generateId(): string {
    const now = new Date();
    const dateString = now
      .toISOString()
      .replace(/[-:.TZ]/g, "")
      .slice(0, 14);

    const uuid: string = UUID();

    return `${dateString}-${IdGenerator.generateSessionId()}-${uuid}`;
  }

  static generateFirmedId(key: string): string {
    const randomNumber = Math.floor(Math.random() * IdGenerator.MAX_RANDOM_NUMBER) + 1;

    const uuid: string = UUID();

    const parts = [randomNumber.toString(), uuid, key];
    const randomIndex = Math.floor(Math.random() * parts.length);

    parts.splice(randomIndex, 0, key);

    return parts.join("-");
  }

  static generateSessionId(): string {
    return IdGenerator.generateFirmedId("session");
  }
}
