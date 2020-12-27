import tw from "twin.macro";

const prefixMap = `flex flex-col flex-nowrap transition-all duration-300 ease-in-out cursor-pointer relative w-40 overflow-hidden rounded-lg bg-gradient-to-r`;
const styleMap = {
  Common: tw`${prefixMap} from-gray-200 to-gray-400`,
  Rare: tw`${prefixMap} from-blue-200 to-blue-400`,
  Uncommon: tw`${prefixMap} from-green-200 to-green-400`,
  Epic: tw`${prefixMap} from-pink-200 to-pink-400`,
  Legendary: tw`${prefixMap} from-yellow-200 to-yellow-400`,
  default: tw`${prefixMap} from-gray-200 to-gray-400`
};
const getContainerStyle = ({ quality }) => styleMap[quality] || styleMap.default;

export { getContainerStyle };
