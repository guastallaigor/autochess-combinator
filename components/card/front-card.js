import tw, { styled } from "twin.macro";
import Image from "next/image";
import { getImage, getFromArrayOrString } from "../../utils/index";
import { getContainerStyle } from "../../utils/css";

const Container = styled.div(getContainerStyle);
const prefixName = `font-semibold truncate text-sm`;
const getNameStyle = ({ banned }) =>
  banned ? tw`${prefixName} text-red-500` : tw`${prefixName} text-gray-700`;
const Name = styled.div(getNameStyle);

const FrontCard = ({
  fieldsData,
  title,
  onCardClick,
  style,
  hasActiveState,
}) => {
  return (
    <Container
      quality={getFromArrayOrString(fieldsData.cardQuality)}
      title={fieldsData.banned ? "This card is banned" : title}
      style={{
        ...style,
        top: style && style.top ? style.top - 5 : 0,
        width: style && style.width ? style.width - 25 : "auto",
        left: style.left,
        height: style && style.height ? style.height - 30 : "auto",
        opacity:
          (fieldsData.banned || (fieldsData.active && hasActiveState)) && 0.5,
        cursor: fieldsData.banned && "not-allowed",
      }}
      onClick={() => (!fieldsData.banned ? onCardClick(fieldsData) : null)}
    >
      <div tw="flex flex-row flex-nowrap items-center justify-between p-2 bg-white relative z-10">
        <Name banned={fieldsData.banned}>{fieldsData.name}</Name>
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
      {fieldsData.manual ? (
        <div tw="relative z-0 w-full overflow-hidden flex justify-center">
          <Image
            src={fieldsData.cardImg}
            alt="Icon image"
            layout="fixed"
            tw="object-contain"
            width={200}
            height={300}
            quality={70}
          />
        </div>
      ) : (
        <div tw="my-1 overflow-hidden">
          <Image
            src={fieldsData.cardImg}
            alt="Icon image"
            layout="responsive"
            width={300.33}
            height={300.33}
            quality={70}
          />
        </div>
      )}
      <div tw="flex flex-row flex-nowrap relative justify-center">
        {fieldsData.category.length > 1 ? (
          <div
            tw="bg-gray-900 absolute w-10 top-1 left-0 rounded-3xl flex flex-col items-center text-center h-12"
            className="add-gap-inside"
          >
            {fieldsData.category.map((category, idx) => {
              return (
                <Image
                  className="add-gap-inside"
                  key={category + idx}
                  src={getImage(category)}
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
              src={getImage(fieldsData.category)}
              alt="Chess Icon Category Image"
              layout="fixed"
              width={32}
              height={32}
              quality={70}
            />
          </div>
        )}
        <div tw="flex flex-col flex-1 text-center text-sm items-center font-medium">
          {fieldsData.category.length > 1 ? (
            <div tw="bg-gray-900 w-full text-xs text-gray-100 py-2">
              {fieldsData.category.join(", ")}
            </div>
          ) : (
            <div tw="bg-gray-900 w-full text-gray-100 py-1">
              {fieldsData.category.length ? fieldsData.category : "None"}
            </div>
          )}
          <div tw="bg-yellow-700 w-full text-white py-1">
            {fieldsData.cardType.length
              ? fieldsData.cardType.join(", ")
              : "None"}
          </div>
        </div>
        <div tw="bg-yellow-700 absolute right-0 bottom-1 rounded-full text-center">
          <Image
            src={getImage(fieldsData.cardType)}
            alt="Chess Icon Class Image"
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
