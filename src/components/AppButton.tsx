import { FC } from "react";

interface Props {
  title?: string;
  type?: "read" | "change" | "remove";
  onClick?(): void;
}

const AppButton: FC<Props> = ({ title, type, onClick }) => {
  let colour = "";

  switch (type) {
    case "read":
      colour = "bg-red-500";
      break;
    case "change":
      colour = "bg-yellow-500";
      break;
    case "remove":
      colour = "bg-gray-500";
      break;
  }

  return (
    <button onClick={onClick} className={colour + " text-white p-2 rounded"}>
      {title}
    </button>
  );
};

export default AppButton;
