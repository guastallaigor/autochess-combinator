import FrontCard from "./front-card";

const CellChessPieces = ({ rowIndex, columnIndex, data, style }) => {
  const { copiedData, handleSelect } = data;
  const fieldsData =
    copiedData[columnIndex + rowIndex * data.maxItemsPerRow].fields_data;
  return (
    <FrontCard
      style={style}
      title="Click to select"
      fieldsData={fieldsData}
      onCardClick={handleSelect}
    />
  );
};

export default CellChessPieces;
