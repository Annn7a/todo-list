import React from "react";
import Actions from "./Actions";
import { useState } from "react";
import NoteForm, { NoteData } from "./forms/NoteForm";

interface Props {
  id: number;
  text: string;
  title: string;
  onDelete: (id: number) => void;
  onEdit: (id: number, note: NoteData) => void;
}

function Note(props: Props) {
  const { id, text, title, onDelete, onEdit } = props;

  const [showElement, setShowElement] = useState(false);

  const handleOnClick = () => setShowElement(true);

  const handleOnSave = (note: NoteData) => {
    onEdit(id, note);

    setShowElement(false);
  };

  const handleOnDelete = () => onDelete(id);

  if (showElement) {
    return (
      <NoteForm
        text={text}
        title={title}
        onSave={handleOnSave}
        onDelete={handleOnDelete}
      />
    );
  }

  return (
    <div
      className="w-11/12 rounded-lg border-gray-200 border m-auto mt-3 mb-3 shadow px-6 py-0.5 relative"
      onClick={handleOnClick}
    >
      <div className="flex justify-between mt-2">
        <p className="w-8/12 text-lg outline-none mt-3 font-bold">{title}</p>

        <Actions onDelete={handleOnDelete} />
      </div>

      <p className="w-9/12 mt-1 mb-6 overflow-ellipsis">{text}</p>
    </div>
  );
}

export default Note;
