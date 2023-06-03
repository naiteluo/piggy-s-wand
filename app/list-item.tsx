import { IListItem } from "./IData";
import ToggleVisibilityBtn from "./toggle-visibility-btn";

export interface IListItemWidgetProps {
  item: IListItem;
  isActivated: boolean;
  onItemClick: (item: IListItem) => void;
  onItemUpdate: (item: IListItem) => void;
  onItemRemove: (item: IListItem) => void;
}

export default function ListItem(props: IListItemWidgetProps) {
  const { item, isActivated, onItemClick, onItemUpdate, onItemRemove } = props;

  function handleToggleStatus() {
    onItemUpdate({
      ...item,
      status: item.status === 0 ? 1 : 0,
    });
  }

  return (
    <li
      className={
        "flex w-full px-6 py-3 text-slate-700 hover:bg-pink-50 " +
        (isActivated ? "text-shadow bg-pink-100 text-white " : " ") +
        (item.status === 0 ? "text-slate-300" : " ")
      }
    >
      {item.title}
      <button
        className="ml-auto mr-2 text-slate-700"
        onClick={() => onItemRemove(item)}
      >
        <svg
          className="h-5 w-5 fill-current"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3828"
          width="200"
          height="200"
        >
          <path
            d="M874.666667 241.066667h-202.666667V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667h-170.666666c-40.533333 0-74.666667 34.133333-74.666667 74.666667v70.4H149.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h53.333334V853.333333c0 40.533333 34.133333 74.666667 74.666666 74.666667h469.333334c40.533333 0 74.666667-34.133333 74.666666-74.666667V305.066667H874.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM416 170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h170.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v70.4h-192V170.666667z m341.333333 682.666666c0 6.4-4.266667 10.666667-10.666666 10.666667H277.333333c-6.4 0-10.666667-4.266667-10.666666-10.666667V309.333333h490.666666V853.333333z"
            p-id="3829"
          ></path>
          <path
            d="M426.666667 736c17.066667 0 32-14.933333 32-32V490.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v213.333333c0 17.066667 14.933333 32 32 32zM597.333333 736c17.066667 0 32-14.933333 32-32V490.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v213.333333c0 17.066667 14.933333 32 32 32z"
            p-id="3830"
          ></path>
        </svg>
      </button>
      <ToggleVisibilityBtn
        status={item.status === 0}
        onToggle={handleToggleStatus}
      ></ToggleVisibilityBtn>
    </li>
  );
}
