import { IListItem } from "./IData";

const DBKey = "piggy-s-wand-list";

export function getListFromDB() {
  if (typeof window !== "undefined") {
    // Client-side-only code
    return JSON.parse(
      window.localStorage.getItem(DBKey) || "[]"
    ) as Array<IListItem>;
  }
  return [];
}

export function updateListToDB(list: Array<IListItem>) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(DBKey, JSON.stringify(list));
  }
}
