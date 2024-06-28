import { FC } from "react";
import AppButton from "./AppButton";

interface Props {
  title?: string;
}

const NoteItem: FC<{ title: string }> = (props) => {
  return (
    <div className="bg-white shadow-md rounded p-5">
      <p className="font-semibold mb-4 text-gray-700 text-lg">{props.title}</p>
      <div className="space-x-4">
        <AppButton
          title="View"
          type="read"
          onClick={() => {
            console.log("viewing");
          }}
        />
        <AppButton title="Edit" type="change" />

        <AppButton title="Delete" type="remove" />
      </div>
    </div>
  );
};

export default NoteItem;
