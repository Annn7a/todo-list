import { CheckCircleIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import Note from "../components/Note";
import ListNoteForm, { NoteListData } from "./forms/ListNoteForm";
import NoteForm, { NoteData } from "./forms/NoteForm";
import NoteList from "./NoteList";

let nextId = 0;

interface TextNote {
  id: number;
  text: string;
  title: string;
}

export interface ListItem {
  id: number;
  text: string;
  checked: boolean;
}

interface TextNoteList {
  id: number;
  title: string;
  items: ListItem[];
}

type NotesType = Array<TextNote | TextNoteList>;

type Form = "note" | "list";

function Notes() {
  const [notes, setNotes] = useState<NotesType>([]);
  const [activeForm, setActiveForm] = useState<Form | null>(null);

  useEffect(() => {
    const payload = localStorage.getItem("notes");

    if (payload) {
      try {
        const data = JSON.parse(payload);

        setNotes(data);
      } catch (error) {
        console.error("Eroare. Nu am putut sa citesc datele", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addTextNote = (note: NoteData) => {
    const newNote = { ...note, id: nextId++ };

    setNotes([newNote, ...notes]);

    setActiveForm(null);
  };

  const addListNote = (list: NoteListData) => {
    const newNote = { ...list, id: nextId++ };

    setNotes([newNote, ...notes]);

    setActiveForm(null);
  };

  const removeNote = (id: number) => {
    const newNotes = notes.filter((item) => item.id !== id);

    setNotes(newNotes);
  };

  const editNote = (id: number, note: NoteData) => {
    const elIndex = notes.findIndex((el) => el.id === id);

    const newElement = { id, ...note };

    const newNotes = [...notes];
    newNotes[elIndex] = newElement;

    setNotes(newNotes);
  };

  const editNoteList = (id: number, list: NoteListData) => {
    const elIndex = notes.findIndex((el) => el.id === id);

    const newElement = { id, ...list };

    const newNotes = [...notes];
    newNotes[elIndex] = newElement;

    setNotes(newNotes);
  };

  return (
    <div>
      <div className="w-2/6 flex-wrap m-auto border mt-10 shadow-lg rounded-xl mb-4">
        <div className="text-gray-500 text-base font-semibold ml-5 mt-3 ">
          KEEP
        </div>
        <div className="text-2xl text-gray-600 font-bold ml-5">Notes</div>
        <div className="border border-t-0 mt-6 border-gray w-full" />

        {/* ===================================================================================== */}

        {!activeForm && (
          <div className="w-full">
            <div className="flex justify-evenly items-center mt-3 mb-2">
              <button
                className="w-4/5 py-2 rounded-3xl flex hover:bg-gray-100 items-center"
                onClick={() => setActiveForm("note")}
              >
                <PlusIcon className="w-6 h-6 mr-3 ml-3 text-yellow-400" />
                <div className="w-full rounded-3xl text-left font-medium text-gray-400 text-base">
                  Take a note...
                </div>
              </button>

              <button
                className="text-3xl hover:bg-gray-100  rounded-full p-2"
                onClick={() => setActiveForm("list")}
              >
                <CheckCircleIcon className="w-6 h-6 text-gray-500 hover:text-black" />
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================================== */}

        {activeForm === "note" && (
          <NoteForm onSave={addTextNote} onDelete={() => setActiveForm(null)} />
        )}

        {activeForm === "list" && (
          <ListNoteForm
            onSave={addListNote}
            onDelete={() => setActiveForm(null)}
          />
        )}

        {/* ===================================================================================== */}
        <div>
          {notes.map((note) => {
            if ("items" in note) {
              return (
                <NoteList
                  id={note.id}
                  key={note.id}
                  items={note.items}
                  title={note.title}
                  onDelete={removeNote}
                  onEdit={editNoteList}
                />
              );
            } else {
              return (
                <Note
                  id={note.id}
                  key={note.id}
                  text={note.text}
                  title={note.title}
                  onDelete={removeNote}
                  onEdit={editNote}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Notes;
