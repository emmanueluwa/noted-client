import { FC } from "react";
import AppButton from "./AppButton";

interface Props {
  title?: string;
  description?: string;
  onEditClick?(): void;
  onDeleteClick?(): void;
  onViewClick?(): void;
}

const NoteItem: FC<Props> = ({
  title,
  description,
  onEditClick,
  onDeleteClick,
  onViewClick,
}) => {
  return (
    <div className="bg-white shadow-md rounded p-5">
      <p className="font-semibold mb-4 text-gray-700 text-lg">{title}</p>
      {description ? <p className="ml-2 py-2 text-lg">{description}</p> : null}
      <div className="space-x-4">
        <AppButton
          title={description ? "Hide" : "View"}
          type="read"
          onClick={onViewClick}
        />
        <AppButton title="Edit" type="change" onClick={onEditClick} />

        <AppButton title="Delete" type="remove" onClick={onDeleteClick} />
      </div>
    </div>
  );
};

export default NoteItem;
