import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export enum Categories {
  "rank" = "rank",
  "asc" = "asc",
  "desc" = "desc",
}

export const CategoryState = atom<Categories>({
  key: "category",
  default: Categories.rank,
});
