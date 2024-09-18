import { IPage } from "@/domain/interfaces/IPage";
import { duplicateNamePagesCategorizer } from "./utils";

// Define test cases
describe("duplicateNamePagesCategorizer", () => {
  test("should categorize duplicate names with letters", () => {
    const pages: IPage[] = [
      {
        title: "Page1",
        id: "1",
      },
      {
        title: "Page1",
        id: "2",
      },
      {
        title: "Page2",
        id: "3",
      },
      {
        title: "Page1",
        id: "4",
      },
    ];

    const expected = [
      { title: "Page1", id: "1" },
      { title: "Page1 (B)", id: "2" },
      { title: "Page2", id: "3" },
      { title: "Page1 (C)", id: "4" },
    ];

    expect(duplicateNamePagesCategorizer(pages, true)).toEqual(expected);
  });

  test("should categorize duplicate names with numbers", () => {
    const pages: IPage[] = [
      { title: "Page1", id: "1" },
      { title: "Page1", id: "2" },
      { title: "Page2", id: "3" },
      { title: "Page1", id: "4" },
    ];

    const expected = [
      { title: "Page1", id: "1" },
      { title: "Page1 (2)", id: "2" },
      { title: "Page2", id: "3" },
      { title: "Page1 (3)", id: "4" },
    ];

    const result = duplicateNamePagesCategorizer(pages, false);
    expect(result).toEqual(expected);
  });

  test("should handle empty input", () => {
    const pages: IPage[] = [];

    const expected: IPage[] = [];

    expect(duplicateNamePagesCategorizer(pages, true)).toEqual(expected);
  });

  test("should handle no duplicates", () => {
    const pages: IPage[] = [
      { title: "Page1", id: "1" },
      { title: "Page2", id: "2" },
      { title: "Page3", id: "3" },
    ];

    const expected: IPage[] = [
      { title: "Page1", id: "1" },
      { title: "Page2", id: "2" },
      { title: "Page3", id: "3" },
    ];

    expect(duplicateNamePagesCategorizer(pages, true)).toEqual(expected);
  });
});
