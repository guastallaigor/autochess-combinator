import tw from "twin.macro";

const EmptyCard = ({ fieldsData }) => {
  return (
    <div
      tw="flex flex-col flex-nowrap
      relative w-48 overflow-hidden rounded-lg border border-gray-200"
    ></div>
  );
};

export default EmptyCard;
