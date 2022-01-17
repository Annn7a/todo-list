import React from "react";
import { useState } from "react";
import Actions from "./Actions";
import ListNoteForm, { NoteListData } from "./forms/ListNoteForm";
import { ListItem } from "./Notes";
import classNames from "classnames";

interface Props {
  id: number;
  items: ListItem[];
  title: string;

  onDelete: (id: number) => void;
  onEdit: (id: number, list: NoteListData) => void;
}

function NoteList(props: Props) {
  const { id, items, title, onDelete, onEdit } = props;

  const [showElement, setShowElement] = useState(false);

  const handleOnClick = () => setShowElement(true);

  const handleOnSave = (list: NoteListData) => {
    onEdit(id, list);

    setShowElement(false);
  };

  const handleOnDelete = () => onDelete(id);

  if (showElement) {
    return (
      <ListNoteForm
        items={items}
        title={title}
        onSave={handleOnSave}
        onDelete={handleOnDelete}
      />
    );
  }

  return (
    <div
      className="w-11/12 rounded-lg border-gray-200 border m-auto mt-3 shadow px-6 py-0.5 relative mb-3"
      onClick={handleOnClick}
    >
      <div className="flex justify-between mt-2">
        <p className="w-8/12 outline-none mt-3 font-bold mb-2">{title}</p>

        <Actions onDelete={handleOnDelete} />
      </div>

      <div className="mb-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-baseline">
            <input
              type="checkbox"
              defaultChecked={item.checked}
              className={
                "checked:bg-gray-800 checked:border-transparent w-3 h-3 mr-3"
              }
            />

            <textarea
              defaultValue={item.text}
              className={classNames(
                "outline-none w-19/12 resize-none overflow-ellipsis",
                item.checked && "line-through text-gray-500 outline-none"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteList;
