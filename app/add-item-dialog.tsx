import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IListItem } from "./IData";
import { catelogList } from "./data";
import CatelogSelect from "./catelog-select";

export interface IAddItemDialogOpenProps {
  isOpen: boolean;
  onSubmit: (item: IListItem) => void;
  onCancel: () => void;
}

const DraftItemTemplate = {
  title: "",
  id: "",
  status: 1,
  type: 1,
};

export default function AddItemDialog(props: IAddItemDialogOpenProps) {
  const { isOpen, onSubmit, onCancel } = props;

  const [draftItem, setDraftItem] = useState<IListItem>({
    ...DraftItemTemplate,
  });

  const [selectedCatelog, setSelectedCatelog] = useState(catelogList[1]);

  function handleSubmit(item: IListItem | null) {
    if (item && item.title.length > 0) {
      item.type = selectedCatelog.type;
      onSubmit(item);
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-md font-medium leading-6 text-gray-900"
                >
                  新增备选
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                    id="item-title"
                    type="text"
                    placeholder="店名 / 菜品名"
                    onChange={(event) => {
                      setDraftItem({
                        ...draftItem,
                        title: event.target.value,
                      });
                    }}
                  />
                  <CatelogSelect
                    selected={selectedCatelog}
                    onChange={setSelectedCatelog}
                  ></CatelogSelect>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-pink-300 px-4 py-2 text-sm font-medium text-pink-900 hover:bg-pink-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                    onClick={() => handleSubmit(draftItem)}
                  >
                    提交
                  </button>
                  <button
                    type="button"
                    className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-pink-100 px-4 py-2 text-sm font-medium text-pink-900 hover:bg-pink-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                    onClick={onCancel}
                  >
                    取消
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
