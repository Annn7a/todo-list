import React from "react";
import { useState } from "react";
import Actions from "../Actions";

export interface NoteData {
  text: string;
  title: string;
}

interface Props {
  text?: string;
  title?: string;
  onSave: (note: NoteData) => void;
  onDelete: () => void;
}

function NoteForm(props: Props) {
  const { onSave, onDelete } = props;

  const initialText = props.text || "";
  const [text, setText] = useState(initialText);

  const initialTitle = props.title || "";
  const [title, setTitle] = useState(initialTitle);

  const handleChangeTitle = (event) => setTitle(event.target.value);
  const handleChangeText = (event) => setText(event.target.value);

  const handleOnChange = () => {
    const data: NoteData = { text, title };

    onSave(data);
  };

  return (
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

        <div>
          <textarea
            className="resize-none overflow-ellipsis w-11/12 text-base outline-none mt-3"
            placeholder="Take a note..."
            value={text}
            onChange={handleChangeText}
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
  );
}

export default NoteForm;
