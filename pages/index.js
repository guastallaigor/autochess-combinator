import tw from "twin.macro";
import { useState } from "react";
import FrontCard from "../components/front-card";
import EmptyCard from "../components/empty-card";
import Github from "../components/github";
// import axios from "axios";

const Home = ({ data }) => {
  const [selected, setSelected] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  return (
    <section tw="flex flex-col justify-center items-center">
      <Github />
      <header>
        <h1 tw="mt-6 text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-600 animate-pulse">
          <span tw="block xl:inline">Auto Chess</span>
          <span tw="xl:inline hidden">&nbsp;</span>
          <span tw="block xl:inline">Combinator</span>
        </h1>
      </header>
      <main tw="w-full flex flex-col lg:flex-row lg:flex-wrap my-6">
        <div tw="lg:w-3/4 w-full lg:pl-6">
          <h2 tw="mb-6 text-center lg:text-left lg:pl-2 text-xl tracking-tight font-extrabold sm:text-2xl md:text-3xl text-white">
            Chess Peaces
          </h2>
          <div className="max-h-grid" tw="lg:overflow-y-auto">
            <div
              tw="grid h-full gap-7 justify-items-center"
              className="grid-cols"
            >
              {data.map((it) => (
                <FrontCard fieldsData={it.fields_data} key={it.resource_code} />
              ))}
            </div>
          </div>
        </div>
        <div tw="lg:w-1/4 w-full mt-6 lg:mt-0">
          <h2 tw="mb-6 text-center lg:text-left lg:pl-2 text-xl tracking-tight font-extrabold sm:text-2xl md:text-3xl text-white">
            Combinator
            <span tw="text-base"></span>
          </h2>
          <div className="max-h-grid" tw="lg:overflow-y-auto">
            <div
              tw="grid h-full gap-7 lg:gap-x-0 lg:gap-y-7 justify-items-center"
              className="grid-cols"
            >
              {selected.map((it, idx) => (
                <EmptyCard key={idx} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer tw="w-full py-6 px-6 lg:px-0">
        <div tw="text-center text-gray-200 font-bold">
          <a
            href="https://github.com/guastallaigor"
            rel="noreferrer noopener"
            tw="hover:opacity-75 transition-all duration-300 ease-in-out hover:text-yellow-600"
            name="github"
            aria-label="Github Link"
            target="_blank"
          >
            &copy; {new Date().getFullYear()} guastallaigor
          </a>
          <div tw="text-xs flex flex-col flex-wrap items-center justify-center mt-6 leading-normal">
            <span>This is an unofficial project</span>
            <span>
              I do not work or am I affiliated with Auto Chess or Drodo and
              Dragonest Co.Ltd
            </span>
            <span tw="ml-1">
              For more information about the game, visit their official website
              by clicking
              <a
                href="https://ac.dragonest.com/"
                rel="noreferrer noopener"
                tw="hover:opacity-75 transition-all duration-300 ease-in-out hover:text-yellow-600 pl-1 underline"
                aria-label="Official Website Link"
                target="_blank"
              >
                here
              </a>
            </span>
          </div>
        </div>
      </footer>
    </section>
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
  const data = await import("../bkp.json");
  // const data = await import("../example.json");

  return {
    props: {
      data: data.data.list,
    },
    revalidate: 2629746,
  };
};

export default Home;
