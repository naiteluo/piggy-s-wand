import { IListItem } from "./IData";

const DBKey = "piggy-s-wand-list";

export function getListFromDB() {
  return JSON.parse(localStorage.getItem(DBKey) || "[]") as Array<IListItem>;
}

export function updateListToDB(list: Array<IListItem>) {
  localStorage.setItem(DBKey, JSON.stringify(list));
}
