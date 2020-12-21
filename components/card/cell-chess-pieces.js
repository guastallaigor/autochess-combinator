import FrontCard from "./front-card";

const CellChessPieces = ({ rowIndex, columnIndex, data, style }) => {
  const { copiedData, handleSelect } = data;
  return (
    <FrontCard
      style={style}
      title="Click to select"
      fieldsData={
        copiedData[columnIndex + rowIndex * data.maxItemsPerRow].fields_data
      }
      onCardClick={handleSelect}
    />
  );
};

export default CellChessPieces;
