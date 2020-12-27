import PropTypes from "prop-types";
import { memo } from "react";
import { areEqual } from "react-window";
import FrontCard from "./front-card";
import EmptyCard from "./empty-card";

const CellCombinator = ({ rowIndex, columnIndex, data, style }) => {
  const { selected, handleUnselect } = data;
  const fieldsData = selected[columnIndex + rowIndex * data.maxItemsPerRowCombinator];
  return fieldsData && fieldsData.name ? (
    <FrontCard style={style} title="Click to unselect" fieldsData={fieldsData} onCardClick={handleUnselect} />
  ) : (
    <EmptyCard style={style} />
  );
};

CellCombinator.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  columnIndex: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};

export default memo(CellCombinator, areEqual);
