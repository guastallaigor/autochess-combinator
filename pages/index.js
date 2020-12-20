import tw from "twin.macro";
import FrontCard from "../components/front-card";
// import axios from "axios";

const Home = ({ data }) => {
  return (
    <div tw="flex flex-row justify-center items-center">
      <div
        tw="grid max-w-6xl w-full h-full gap-7 justify-items-center"
        className="grid-cols"
      >
        {data.map((it) => (
          <FrontCard fieldsData={it.fields_data} key={it.resource_code} />
        ))}
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
