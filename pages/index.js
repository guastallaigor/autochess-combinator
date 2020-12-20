import tw from "twin.macro";
import FrontCard from "../components/front-card";
import Github from "../components/github";
// import axios from "axios";

const Home = ({ data }) => {
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
      <main tw="max-w-6xl w-full my-16">
        <div tw="grid h-full gap-7 justify-items-center" className="grid-cols">
          {data.map((it) => (
            <FrontCard fieldsData={it.fields_data} key={it.resource_code} />
          ))}
        </div>
      </main>
      <footer tw="w-full py-8">
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
  const data = await import("../example.json");

  return {
    props: {
      data: data.data.list,
    },
    revalidate: 2629746,
  };
};

export default Home;
