import FrontCard from "./front-card";

const CellChessPieces = ({ rowIndex, columnIndex, data, style }) => {
  const { copiedData, handleSelect } = data;
  const fieldsData = copiedData[columnIndex + rowIndex * data.maxItemsPerRow];
  return fieldsData ? (
    <FrontCard
      style={style}
      title="Click to select"
      fieldsData={fieldsData ? fieldsData.fields_data : null}
      onCardClick={handleSelect}
    />
  ) : null;
};

export default CellChessPieces;
