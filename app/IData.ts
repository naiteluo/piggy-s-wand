export interface IListItem {
  title: string;
  id: string;
  status: number;
  type: number;
}

export type IList = Array<IListItem>;
