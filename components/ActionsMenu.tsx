import React from "react";

interface Props {
  deleteNote: () => void;
}

function ActionsMenu(props: Props) {
  const { deleteNote } = props;

  return (
    <div className="flex flex-col">
      <button className="hover:bg-gray-200 text-gray-700 mb-1 h-full text-left px-6">
        Archive
      </button>

      <button
        className="hover:bg-gray-200 text-gray-700 h-full text-left px-6"
        onClick={() => deleteNote()}
      >
        Delete
      </button>
    </div>
  );
}

export default ActionsMenu;
