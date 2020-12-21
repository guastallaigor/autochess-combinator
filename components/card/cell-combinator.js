import FrontCard from "./front-card";
import EmptyCard from "./empty-card";

const CellCombinator = ({ rowIndex, columnIndex, data, style }) => {
  const { selected, handleUnselect } = data;
  const fieldsData =
    selected[columnIndex + rowIndex * data.maxItemsPerRowCombinator];
  return fieldsData.name ? (
    <FrontCard
      style={style}
      title="Click to unselect"
      fieldsData={fieldsData}
      onCardClick={handleUnselect}
    />
  ) : (
    <EmptyCard style={style} />
  );
};

export default CellCombinator;
