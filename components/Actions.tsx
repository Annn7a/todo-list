import React from "react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { BookmarkIcon } from "@heroicons/react/outline";
import ActionsMenu from "./ActionsMenu";
import { Popover } from "@headlessui/react";

interface Props {
  onDelete: () => void;
}

function Actions(props: Props) {
  const { onDelete } = props;

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className="flex mt-1 gap-1">
        <Popover>
          <Popover.Button className="text-3xl hover:bg-gray-100 rounded-full p-2">
            <DotsVerticalIcon className="w-5 h-5" />
          </Popover.Button>

          <Popover.Panel className="absolute right-2 bg-white -mt-10 z-10 border shadow-lg rounded-md py-2">
            <ActionsMenu deleteNote={onDelete} />
          </Popover.Panel>
        </Popover>

        <button className="text-3xl hover:bg-gray-100  rounded-full p-2">
          <BookmarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Actions;
