import tw, { styled } from "twin.macro";
import Image from "next/image";
import { getImage, getFromArrayOrString } from "../../utils/index";
import { getContainerStyle } from "../../utils/css";

const Container = styled.div(getContainerStyle);

const SmallFrontCard = ({ fieldsData }) => {
  return (
    <Container quality={getFromArrayOrString(fieldsData.cardQuality)}>
      <div tw="flex flex-col flex-nowrap items-center justify-center py-2 bg-white relative z-10">
        <div tw="font-semibold truncate text-sm text-gray-700">
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
            priority={true}
          />
          <span tw="pl-1 text-yellow-400">{fieldsData.cardExpend}</span>
        </div>
      </div>
      <div tw="relative z-0 w-full overflow-hidden flex justify-center">
        <Image
          src={fieldsData.icon}
          alt="Icon image"
          layout="fixed"
          width={100}
          height={100}
          quality={70}
          priority={true}
        />
      </div>
      <div
        tw="flex flex-row flex-nowrap relative justify-center items-center bg-white"
        className="min-h-60"
      >
        {fieldsData.category.length > 1 ? (
          <div
            tw="flex flex-col items-center text-center"
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
                  priority={true}
                />
              );
            })}
          </div>
        ) : (
          <div>
            <Image
              src={getImage(fieldsData.category)}
              alt="Chess Icon Category Image"
              layout="fixed"
              width={32}
              height={32}
              quality={70}
              priority={true}
            />
          </div>
        )}
        <div tw="ml-2">
          <Image
            src={getImage(fieldsData.cardType)}
            alt="Chess Icon Class Image"
            layout="fixed"
            width={32}
            height={32}
            quality={70}
            priority={true}
          />
        </div>
      </div>
    </Container>
  );
};

export default SmallFrontCard;
