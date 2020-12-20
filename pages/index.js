import tw, { styled } from "twin.macro";
// import axios from "axios";
import Image from "next/image";

const Home = ({ data }) => {
  const getFromArrayOrString = (payload) => {
    return Array.isArray(payload) && payload.length ? payload[0] : payload;
  };
  const getCardTypeIconImage = (cardType) => {
    const typeIcon = getFromArrayOrString(cardType);
    const image = {
      Beast: "/beast.png",
    }[typeIcon];
    return image || "/beast.png";
  };

  const getCardCategoryIconImage = (cardCategory) => {
    const categoryIcon = getFromArrayOrString(cardCategory);
    const image = {
      Druid: "/druid.png",
    }[categoryIcon];
    return image || "/druid.png";
  };

  const prefixMap = `flex flex-col flex-nowrap transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl relative top-0 hover:-top-2 hover:opacity-80 w-48 overflow-hidden rounded-lg bg-gradient-to-r`;
  const styleMap = {
    Common: tw`${prefixMap} from-gray-200 to-gray-400`,
    default: tw`${prefixMap} from-gray-200 to-gray-400`,
  };
  const getStyleName = ({ quality }) => styleMap[quality] || styleMap.default;
  const Container = styled.div(getStyleName);

  return (
    <div tw="flex justify-center items-center h-full w-full">
      <div tw="grid grid-cols-5 gap-7 rounded-sm">
        {data.map((it) => {
          return (
            <Container
              quality={getFromArrayOrString(it.fields_data.cardQuality)}
              key={it.resource_code}
            >
              <div tw="flex flex-row flex-nowrap items-center justify-between p-2 bg-white mb-3">
                <span tw="font-medium text-gray-700">
                  {it.fields_data.name}
                </span>
                <div tw="flex flex-row flex-nowrap items-center">
                  <Image
                    src="/coin.png"
                    alt="Card image"
                    layout="fixed"
                    width={18}
                    height={18}
                    quality={70}
                  />
                  <span tw="pl-1 text-yellow-400">
                    {it.fields_data.cardExpend}
                  </span>
                </div>
              </div>
              <Image
                src={it.fields_data.cardImg}
                alt="Icon image"
                layout="responsive"
                width={279.33}
                height={299.33}
                quality={70}
              />
              <div tw="flex flex-row flex-nowrap relative justify-center mt-3">
                <div tw="bg-gray-900 absolute h-9 w-10 top-1 left-0 rounded-full text-center">
                  <Image
                    src={getCardTypeIconImage(it.fields_data.cardType)}
                    alt="Chess Icon image"
                    layout="fixed"
                    tw="overflow-hidden"
                    width={32}
                    height={32}
                    quality={70}
                  />
                </div>
                <div tw="flex flex-col flex-1 text-center text-base">
                  <div tw="bg-gray-900 w-full text-gray-100">Beast</div>
                  <div tw="bg-yellow-600 w-full text-gray-100">Druid</div>
                </div>
                <div tw="bg-yellow-600 absolute right-0 bottom-1 rounded-full text-center">
                  <Image
                    src={getCardCategoryIconImage(it.fields_data.category)}
                    alt="Chess Icon image"
                    layout="fixed"
                    width={32}
                    height={32}
                    quality={70}
                  />
                </div>
              </div>
            </Container>
          );
        })}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  // const instance = axios.create({
  //   baseURL: "https://website-api.dragonest.com",
  //   // timeout: 1000,
  //   headers: {
  //     accept: "application/json, text/plain, */*",
  //     "accept-language": "en",
  //     appcode: "e52b47a8c88",
  //     "sec-fetch-dest": "empty",
  //     "sec-fetch-mode": "cors",
  //     "sec-fetch-site": "cross-site",
  //   },
  // });
  // const time = new Date().getTime();
  // const url = `/resources?menu_mark=chessInformation&per-page=999&page=1&appcode=e52b47a8c88&lang=en&_t=${time}`;
  // let autochess = null;
  // try {
  //   const { data } = await instance({
  //     referrer: "http://ac.dragonest.com/",
  //     referrerPolicy: "strict-origin-when-cross-origin",
  //     method: "GET",
  //     url,
  //     mode: "cors",
  //     credentials: "omit",
  //     body: null,
  //   });
  //   autochess = data && data.data && data.data.list;
  // } catch (error) {
  //   console.error(error);
  // }
  const data = await import("../example.json");

  return {
    props: {
      data: data.data.list,
    },
    revalidate: 2629746,
  };
};

export default Home;
