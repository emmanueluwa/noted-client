import React, { useState, ChangeEventHandler } from "react";
import NoteItem from "./components/NoteItem";

// let title = "";
const App = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-6 bg-white shadow-md rounded p-5 ">
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
          <button
            onClick={() => {
              console.log(values);
            }}
            className="bg-red-500 text-white px-5 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
      {/* note items */}
      <NoteItem title="first compo" />
      <NoteItem title="second compo" />
      <NoteItem title="third compo" />
    </div>
  );
};

export default App;
