export default interface IPaginated<T> {
  GroupBy: number;
  CurrentPage: number;
  TotalPages: number;
  Elements: T[];
}
