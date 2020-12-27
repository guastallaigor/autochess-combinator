import tw from "twin.macro";
import PropTypes from "prop-types";

const EmptyCard = ({ style }) => {
  return (
    <div
      style={{
        ...style,
        top: style && style.top ? style.top - 5 : 0,
        width: style && style.width ? style.width - 25 : "auto",
        height: style && style.height ? style.height - 30 : "auto"
      }}
      tw="flex flex-col flex-nowrap
      relative w-48 overflow-hidden rounded-lg border border-gray-200"></div>
  );
};

EmptyCard.propTypes = {
  style: PropTypes.object.isRequired
};

export default EmptyCard;
