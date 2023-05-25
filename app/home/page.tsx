"use client";

import { useState } from "react";
import { IList, IListItem } from "./IData";
import ListItem from "./list-item";
import AddItemDialog from "./add-item-dialog";
import Image from "next/image";
import ToggleVisibilityBtn from "./toggle-visibility-btn";
import { getListFromDB, updateListToDB } from "./data";

export default function HomePage() {
  const [currentItem, setCurrentItem] = useState<IListItem | null>(null);
  const [list, setList] = useState<IList>(getListFromDB());

  function setListAndUpdateDB (list:IList) {
    setList(list);
    updateListToDB(list);
  }

  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);

  function handleAddItemDialogSubmit(item: IListItem) {
    item.id = +new Date();
    setListAndUpdateDB([...list, item]);
    setIsAddItemDialogOpen(false);
  }

  function handleAddItemDialogCancel() {
    setIsAddItemDialogOpen(false);
  }

  function handleItemUpdate(item: IListItem) {
    const index = list.findIndex((v) => item.id === v.id);
    setListAndUpdateDB([...list.slice(0, index), item, ...list.slice(index + 1)]);
  }

  function handleRemoveItem(item: IListItem) {
    const index = list.findIndex((v) => item.id === v.id);
    setListAndUpdateDB([...list.slice(0, index), ...list.slice(index + 1)]);
  }

  function handleToggleAllStatus(status: boolean) {
    setListAndUpdateDB(
      list.map((v) => {
        return {
          ...v,
          status: status ? 0 : 1,
        };
      })
    );
  }

  function handleUpdateCurrentItem(item: IListItem) {
    if (!currentItem || item.id !== currentItem.id) {
      setCurrentItem(item);
    } else {
      setCurrentItem(null);
    }
  }

  function handleRandomPick() {
    const filteredList = list.filter((item) => item.status === 1);
    const index = Math.floor(Math.random() * filteredList.length);

    setCurrentItem(filteredList[index]);
  }

  function handleRemovePick() {
    setCurrentItem(null);
  }

  const sectionClassName =
    "shadow-md border py-3 px-3.5 mb-4 rounded-sm text-sm select-none w-full flex flex-col";

  return (
    <main className="flex min-h-screen flex-col items-center bg-white p-4">
      <nav className="fixed top-0 flex w-full flex-wrap items-center justify-between bg-pink-600 p-4 shadow-md">
        <h1>Piggy&apos;s Wand</h1>
        <button></button>
      </nav>
      <section
        className={
          sectionClassName +
          " mt-16 h-20 items-center justify-center overflow-hidden"
        }
      >
        {
          /* <h2 className=" mb-1.5 ml-1.5 font-semibold text-slate-600">
              今天吃啥？
            </h2> */
          (() => {
            if (!currentItem) {
              return (
                <Image
                  src="/what.png"
                  alt="what"
                  width={128 / 2}
                  height={128 / 2}
                ></Image>
              );
            } else {
              return (
                <div className="flex text-pink-600 ">
                  <span className="pr-2 text-5xl">“ </span>
                  <p className="text-4xl">{currentItem.title}</p>
                  <span className="pl-2 text-5xl"> ”</span>
                </div>
              );
            }
          })()
        }
      </section>
      {(() => {
        if (list.length > 0) {
          return (
            <section className={sectionClassName}>
              <h2 className="mb-1.5 ml-1.5 mr-6 flex font-semibold text-slate-600">
                <span className="mr-auto">菜单</span>
                <ToggleVisibilityBtn
                  status={list.findIndex((v) => v.status === 0) !== -1}
                  onToggle={handleToggleAllStatus}
                ></ToggleVisibilityBtn>
              </h2>
              <ul className="flex flex-wrap divide-y divide-gray-300 ">
                {list.map((item) => (
                  <ListItem
                    key={item.id}
                    item={item}
                    isActivated={!!(currentItem && item.id === currentItem.id)}
                    onItemClick={handleUpdateCurrentItem}
                    onItemUpdate={handleItemUpdate}
                    onItemRemove={handleRemoveItem}
                  ></ListItem>
                ))}
              </ul>
            </section>
          );
        }
      })()}

      <section className="w-18 h-18 fixed bottom-0 right-0 flex flex-col">
        {(() => {
          if (list.length > 0) {
            if (currentItem === null) {
              return (
                <button
                  className="m-4 mb-0 mt-auto flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 shadow-lg"
                  onClick={() => handleRandomPick()}
                >
                  <svg
                    className="h-5 w-5 fill-current text-white"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1670"
                  >
                    <path
                      d="M518.4 149.290667c112.597333-80.789333 267.882667-69.397333 368.128 32 53.866667 54.528 84.138667 128.853333 84.138667 206.378666 0 77.525333-30.293333 151.850667-84.096 206.336l-294.421334 299.52a110.976 110.976 0 0 1-80.213333 34.474667 110.72 110.72 0 0 1-79.914667-34.176L137.322667 593.770667C83.562667 539.242667 53.333333 464.981333 53.333333 387.541333s30.229333-151.722667 84.010667-206.272c100.224-101.376 255.530667-112.768 368.128-31.978666l6.442667 4.778666 6.485333-4.778666z m322.602667 76.970666c-84.629333-85.589333-219.157333-88.64-307.328-6.954666l-21.76 20.138666-21.717334-20.138666c-88.192-81.685333-222.72-78.634667-307.306666 6.933333-41.92 42.496-65.557333 100.608-65.557334 161.28 0 60.693333 23.637333 118.805333 65.6 161.344l295.04 300.416c9.045333 9.450667 21.269333 14.72 33.962667 14.72 12.693333 0 24.917333-5.269333 34.261333-15.04L840.96 549.077333c42.005333-42.496 65.685333-100.650667 65.685333-161.408 0-60.736-23.68-118.912-65.664-161.408z"
                      p-id="1671"
                    ></path>
                  </svg>
                </button>
              );
            } else {
              return (
                <button
                  className="m-4 mb-0 mt-auto flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 shadow-lg"
                  onClick={() => handleRemovePick()}
                >
                  <svg
                    className="h-5 w-5 fill-current text-white"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3402"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M934.4 206.933333c-17.066667-4.266667-34.133333 6.4-38.4 23.466667l-23.466667 87.466667C797.866667 183.466667 654.933333 96 497.066667 96 264.533333 96 74.666667 281.6 74.666667 512s189.866667 416 422.4 416c179.2 0 339.2-110.933333 398.933333-275.2 6.4-17.066667-2.133333-34.133333-19.2-40.533333-17.066667-6.4-34.133333 2.133333-40.533333 19.2-51.2 138.666667-187.733333 232.533333-339.2 232.533333C298.666667 864 138.666667 706.133333 138.666667 512S300.8 160 497.066667 160c145.066667 0 277.333333 87.466667 330.666666 217.6l-128-36.266667c-17.066667-4.266667-34.133333 6.4-38.4 23.466667-4.266667 17.066667 6.4 34.133333 23.466667 38.4l185.6 49.066667c2.133333 0 6.4 2.133333 8.533333 2.133333 6.4 0 10.666667-2.133333 17.066667-4.266667 6.4-4.266667 12.8-10.666667 14.933333-19.2l49.066667-185.6c0-17.066667-8.533333-34.133333-25.6-38.4z"
                      p-id="3403"
                    ></path>
                  </svg>
                </button>
              );
            }
          }
        })()}

        <button
          className="m-4 flex h-10 w-10 items-center justify-center rounded-full bg-pink-300 shadow-lg"
          onClick={() => setIsAddItemDialogOpen(!isAddItemDialogOpen)}
        >
          <svg
            className="h-5 w-5 fill-current text-white"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1815"
            width="200"
            height="200"
          >
            <path
              d="M571.52 136.832a32 32 0 0 1 44.8 0.64l174.4 175.904a32 32 0 0 1-1.632 46.624L368.864 728.064a32 32 0 0 1-21.76 7.936l-155.776-3.328a32 32 0 0 1-31.328-32v-158.208a32 32 0 0 1 9.92-23.168z m42.464 514.496l239.84 4.672a32 32 0 1 1-1.248 64l-239.84-4.672a32 32 0 1 1 1.28-64zM592.96 204.8L224 556.16v113.184l112 2.4 385.312-337.472L592.96 204.8z m259.296 606.528a32 32 0 0 1 0.48 64l-628.48 4.672a32 32 0 0 1-0.48-64l628.48-4.672z"
              p-id="1816"
            ></path>
          </svg>
        </button>
        <AddItemDialog
          isOpen={isAddItemDialogOpen}
          onSubmit={handleAddItemDialogSubmit}
          onCancel={handleAddItemDialogCancel}
        ></AddItemDialog>
      </section>
    </main>
  );
}
