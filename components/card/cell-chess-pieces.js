import FrontCard from "./front-card";
import EmptyCard from "./empty-card";

const CellChessPieces = ({ rowIndex, columnIndex, data, style }) => {
  const { copiedData, handleSelect } = data;
  const fieldsData = copiedData[columnIndex + rowIndex * data.maxItemsPerRow];
  return fieldsData && fieldsData.fields_data && fieldsData.fields_data.name ? (
    <FrontCard
      style={style}
      title="Click to select"
      fieldsData={fieldsData ? fieldsData.fields_data : null}
      onCardClick={handleSelect}
    />
  ) : (
    <EmptyCard style={style} />
  );
};

export default CellChessPieces;
