import { PlusIcon, XIcon } from "@heroicons/react/outline";
import Actions from "../Actions";
import React, { useState } from "react";
import { ListItem } from "../Notes";
import classNames from "classnames";

export interface NoteListData {
  title: string;
  items: ListItem[];
}

interface Props {
  items?: ListItem[];
  title?: string;
  onSave: (list: NoteListData) => void;
  onDelete: () => void;
}

let nextId = 0;

function ListNoteForm(props: Props) {
  const { onSave, onDelete } = props;

  const [text, setText] = useState<string>("");

  const initialItems = props.items || [];
  const [items, setItems] = useState(initialItems);

  const initialTitle = props.title || "";
  const [title, setTitle] = useState(initialTitle);

  const handleChangeTitle = (event) => setTitle(event.target.value);

  const handleOnChange = () => {
    const newItems = [...items];

    if (text) {
      newItems.push({
        id: nextId++,
        checked: false,
        text: text,
      });
    }

    const data: NoteListData = { items: newItems, title };

    onSave(data);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && text !== "") {
      setItems((items) => {
        const newItems = [...items];

        newItems.push({
          id: nextId++,
          checked: false,
          text: text,
        });

        return newItems;
      });

      setText("");
    }
  };

  return (
    <div>
      <div className="w-11/12 rounded-lg border-gray-200 border m-auto mt-3 mb-3 shadow relative">
        <div className="px-6 py-2">
          <div className="flex justify-between">
            <input
              className="w-8/12 text-lg outline-none mt-3"
              value={title}
              placeholder="Title"
              onChange={handleChangeTitle}
            />

            <Actions onDelete={onDelete} />
          </div>
          <br />

          {items.map((item) => {
            const { id, text, checked } = item;

            const handleOnChange = (
              event: React.ChangeEvent<HTMLTextAreaElement>
            ) => {
              const inputValue = event.target.value;

              setItems((items) => {
                const newItems = [...items];

                const elIndex = newItems.findIndex((el) => el.id === id);

                if (inputValue) {
                  newItems[elIndex].text = inputValue;

                  return newItems;
                }

                return newItems.filter((el) => el.id !== id);
              });
            };

            const handleOnCheck = (
              event: React.ChangeEvent<HTMLInputElement>
            ) => {
              const checkedValue = event.target.checked;

              setItems((items) => {
                const newItems = [...items];

                const elIndex = newItems.findIndex((el) => el.id === id);

                newItems[elIndex].checked = checkedValue;

                return newItems;
              });
            };

            return (
              <div key={id} className="flex items-baseline">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleOnCheck}
                  className="mr-3 checked:bg-red-400 w-3 h-3 outline-none"
                />
                <textarea
                  value={text}
                  onChange={handleOnChange}
                  className={classNames(
                    "resize-none overflow-ellipsis w-9/12 border",
                    checked && "line-through text-gray-500 outline-none"
                  )}
                />
                <XIcon className="w-5 h-5 text-gray-500" />
              </div>
            );
          })}

          <div className="flex items-center">
            <PlusIcon className="w-4 h-4 text-gray-500" />

            <input
              className="w-8/12 outline-none ml-2"
              placeholder="List item"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div className="flex justify-end mr-5 mb-6 mt-4">
          <button
            className="px-7 py-2 font-medium hover:bg-gray-50 rounded-md"
            onClick={handleOnChange}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListNoteForm;
