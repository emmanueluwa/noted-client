import { FC } from "react";
import AppButton from "./AppButton";

interface Props {
  title?: string;
  onEditClick?(): void;
}

const NoteItem: FC<Props> = ({ title, onEditClick }) => {
  return (
    <div className="bg-white shadow-md rounded p-5">
      <p className="font-semibold mb-4 text-gray-700 text-lg">{title}</p>
      <div className="space-x-4">
        <AppButton
          title="View"
          type="read"
          onClick={() => {
            console.log("viewing");
          }}
        />
        <AppButton title="Edit" type="change" onClick={onEditClick} />

        <AppButton title="Delete" type="remove" />
      </div>
    </div>
  );
};

export default NoteItem;
