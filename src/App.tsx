import React, { useState, ChangeEventHandler, useEffect } from "react";
import NoteItem from "./components/NoteItem";
import axios from "axios";

type noteType = {
  id: string;
  title: string;
  description?: string;
};

// let title = "";
const App = () => {
  const [count, setCount] = useState(0);

  const [viewNote, setViewNote] = useState<noteType>();

  const [notes, setNotes] = useState<noteType[]>([]);

  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const [selectedNoteId, setSelectedNoteId] = useState("");

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await axios("http://localhost:8000/note");
      setNotes(data.notes);
    };
    fetchNotes();
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (selectedNoteId) {
            // update
            const { data } = await axios.patch(
              "http://localhost:8000/note/" + selectedNoteId,
              {
                title: values.title,
                description: values.description,
              }
            );

            const updatedNotes = notes.map((note) => {
              if (note.id === selectedNoteId) {
                note.title = data.note.title;
                note.description = data.note.description;
              }
              return note;
            });

            setNotes([...updatedNotes]);
            setValues({ title: "", description: "" });
            return;
          }

          const { data } = await axios.post(
            "http://localhost:8000/note/create",
            {
              title: values.title,
              description: values.description,
            }
          );
          setNotes([data.note, ...notes]);
          setValues({ title: "", description: "" });
        }}
        className="space-y-6 bg-white shadow-md rounded p-5 "
      >
        <div>
          <span>{count} </span>
          <button type="button" onClick={() => setCount(count + 1)}>
            Run it up
          </button>
        </div>
        <h1 className="font-semibold text-2xl text-center">Noted</h1>
        <div>
          <input
            className="w-full border-b-2 border-gray-700 outline-none"
            type="text"
            placeholder="Title"
            onChange={handleChange}
            value={values.title}
            name="title"
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            className="w-full border-b-2 border-gray-700 outline-none resize-none h-36"
            value={values.description}
            onChange={handleChange}
            name="description"
          ></textarea>
        </div>
        <div className="text-center">
          <button className="bg-red-500 text-white px-5 py-2 rounded">
            Add
          </button>
        </div>
      </form>

      {/* note items */}
      {notes.map((note) => {
        return (
          <NoteItem
            key={note.id}
            title={note.title}
            onViewClick={() => {
              setViewNote(note);
            }}
            description={viewNote?.id === note.id ? viewNote?.description : ""}
            onEditClick={() => {
              setSelectedNoteId(note.id);
              setValues({
                title: note.title,
                description: note.description || "",
              });
            }}
            onDeleteClick={async () => {
              const result = confirm("Are you sure?");
              if (result) {
                //delete that
                await axios.delete("http://localhost:8000/note/" + note.id);

                const updatedNotes = notes.filter(({ id }) => {
                  if (id !== note.id) return note;
                });

                setNotes([...updatedNotes]);
              }
            }}
          />
        );
      })}
    </div>
  );
};

export default App;
