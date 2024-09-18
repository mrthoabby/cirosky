import { IPage } from "@/domain/interfaces/IPage";

export function duplicateNamePagesCategorizer(pages: IPage[], useLetters: boolean = false): IPage[] {
  const pagesGrouped = new Map<string, number>();
  const result: IPage[] = [];

  pages.forEach((page) => {
    const { title } = page;
    const countName = pagesGrouped.get(title) ?? 0;
    pagesGrouped.set(title, countName + 1);

    if (countName > 0) {
      const suffix = useLetters ? ` (${String.fromCharCode(65 + countName)})` : ` (${countName + 1})`;
      result.push({
        ...page,
        title: `${title}${suffix}`,
      });
    } else {
      result.push(page);
    }
  });

  return result;
}
