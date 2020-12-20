import tw, { styled } from "twin.macro";
import Image from "next/image";

const getFromArrayOrString = (payload) => {
  return Array.isArray(payload) && payload.length ? payload[0] : payload;
};

const getCardCategoryIconImage = (cardCategory) => {
  const categoryIcon = getFromArrayOrString(cardCategory);
  return categoryIcon
    ? `/chess-icons/${categoryIcon.toLowerCase()}.png`
    : "/chess-icons/none.png";
};

const getCardTypeIconImage = (cardType) => {
  const typeIcon = getFromArrayOrString(cardType);
  return typeIcon
    ? `/chess-icons/${typeIcon.toLowerCase()}.png`
    : "/chess-icons/none.png";
};

const prefixMap = `flex flex-col flex-nowrap transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl relative top-0 hover:-top-2 hover:opacity-80 w-48 overflow-hidden rounded-lg bg-gradient-to-r`;
const styleMap = {
  Common: tw`${prefixMap} from-gray-200 to-gray-400`,
  default: tw`${prefixMap} from-gray-200 to-gray-400`,
};
const getStyleName = ({ quality }) => styleMap[quality] || styleMap.default;
const Container = styled.div(getStyleName);

const FrontCard = ({ fieldsData }) => {
  return (
    <Container quality={getFromArrayOrString(fieldsData.cardQuality)}>
      <div tw="flex flex-row flex-nowrap items-center justify-between p-2 bg-white mb-3">
        <div tw="font-medium text-gray-700 truncate text-sm">
          {fieldsData.name}
        </div>
        <div tw="flex flex-row flex-nowrap items-center">
          <Image
            src="/chess-icons/coin.png"
            alt="Card image"
            layout="fixed"
            width={18}
            height={18}
            quality={70}
          />
          <span tw="pl-1 text-yellow-400">{fieldsData.cardExpend}</span>
        </div>
      </div>
      <Image
        src={fieldsData.cardImg}
        alt="Icon image"
        layout="responsive"
        width={300.33}
        height={300.33}
        quality={70}
      />
      <div tw="flex flex-row flex-nowrap relative justify-center mt-3">
        {fieldsData.category.length > 1 ? (
          <div tw="bg-gray-900 absolute w-10 top-1 left-0 rounded-3xl flex flex-col items-center text-center gap-1 h-12">
            {fieldsData.category.map((category, idx) => {
              return (
                <Image
                  key={category + idx}
                  src={getCardCategoryIconImage(category)}
                  alt="Chess Icon Category Image"
                  layout="fixed"
                  tw="overflow-hidden"
                  width={20}
                  height={20}
                  quality={70}
                />
              );
            })}
          </div>
        ) : (
          <div tw="bg-gray-900 absolute h-9 w-10 top-1 left-0 rounded-full text-center">
            <Image
              src={getCardCategoryIconImage(fieldsData.category)}
              alt="Chess Icon Category Image"
              layout="fixed"
              width={32}
              height={32}
              quality={70}
            />
          </div>
        )}
        <div tw="flex flex-col flex-1 text-center text-sm items-center">
          <div tw="bg-gray-900 w-full text-gray-100 py-1">
            {fieldsData.category.length
              ? fieldsData.category.join(", ")
              : "None"}
          </div>
          <div tw="bg-yellow-600 w-full text-gray-100 py-1">
            {fieldsData.cardType.length
              ? fieldsData.cardType.join(", ")
              : "None"}
          </div>
        </div>
        <div tw="bg-yellow-600 absolute right-0 bottom-1 rounded-full text-center">
          <Image
            src={getCardTypeIconImage(fieldsData.cardType)}
            alt="Chess Icon Type Image"
            layout="fixed"
            width={32}
            height={32}
            quality={70}
          />
        </div>
      </div>
    </Container>
  );
};

export default FrontCard;
