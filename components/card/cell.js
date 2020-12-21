import FrontCard from "./front-card";
import { MAX_ITEMS_PER_ROW } from "../../utils/constants";

const Cell = ({ rowIndex, columnIndex, data, style }) => {
  const { copiedData, handleSelect } = data;
  return (
    <FrontCard
      style={style}
      title="Click to select"
      fieldsData={
        copiedData[columnIndex + rowIndex * MAX_ITEMS_PER_ROW].fields_data
      }
      onCardClick={handleSelect}
    />
  );
};

export default Cell;
