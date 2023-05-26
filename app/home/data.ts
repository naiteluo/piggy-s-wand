import { IListItem } from "./IData";

const DBKey = "piggy-s-wand-list-v1";

const DefaultList: Array<IListItem> = [
  { title: "海底捞", id: "1685030456939", status: 0, type: 1 },
  { title: "湘菜", id: "1685030462113", status: 1, type: 1 },
  { title: "九重山", id: "1685030468880", status: 1, type: 1 },
  { title: "海记潮汕牛肉", id: "1685030483045", status: 1, type: 1 },
  { title: "韩式烤肉", id: "1685030510712", status: 0, type: 1 },
  { title: "日式烤肉", id: "1685030515809", status: 1, type: 1 },
  { title: "烤串", id: "1685030519602", status: 1, type: 1 },
  { title: "美蛙", id: "1685030919582", status: 1, type: 1 },
  { title: "麻辣烫", id: "1685030919583", status: 1, type: 2 },
  { title: "麻辣拌", id: "1685030919584", status: 1, type: 2 },
  { title: "拌面", id: "1685030919585", status: 1, type: 2 },
  { title: "小碗菜", id: "1685030919586", status: 1, type: 2 },
  { title: "炒白菜", id: "1685030919587", status: 1, type: 3 },
  { title: "炒杏鲍菇", id: "1685030919588", status: 1, type: 3 },
  { title: "面皮", id: "1685030919589", status: 1, type: 3 },
  { title: "广东包子", id: "1685030919590", status: 1, type: 3 },
  { title: "西安包子", id: "1685030919591", status: 1, type: 3 },
  { title: "蛋饼", id: "1685030919592", status: 1, type: 3 },
];
export function getListFromDB() {
  if (typeof window !== "undefined") {
    if (!window.localStorage.getItem(DBKey)) {
      window.localStorage.setItem(DBKey, JSON.stringify(DefaultList));
    }

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

export interface ICatelog {
  type: number;
  title: string;
}

export const catelogList: Array<ICatelog> = [
  {
    type: 0,
    title: "全部",
  },
  {
    type: 1,
    title: "正餐",
  },
  {
    type: 2,
    title: "食堂",
  },
  {
    type: 3,
    title: "早饭",
  },
];
