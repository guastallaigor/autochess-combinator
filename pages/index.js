import tw from "twin.macro";
import { useState } from "react";
import FrontCard from "../components/front-card";
import EmptyCard from "../components/empty-card";
import Github from "../components/github";

const Home = ({ data }) => {
  const payload = Array.from(Array(10).keys());
  const [selected, setSelected] = useState(payload);

  const handleSelect = (fieldsData) => {
    let foundIndex = selected.findIndex(
      (it) => typeof it === "object" && it.name === fieldsData.name
    );
    if (foundIndex < 0) {
      foundIndex = selected.findIndex(
        (it) => typeof it === "number" || !it.name
      );

      if (foundIndex) {
        selected.splice(foundIndex, 1);
      } else {
        selected.shift();
      }

      setSelected(
        [
          {
            ...fieldsData,
          },
          ...selected,
        ].sort((a, b) => {
          if (typeof a === "object" && a.category[0] < b.category[0]) {
            return -1;
          }
          if (typeof a === "object" && a.category[0] > b.category[0]) {
            return 1;
          }
          return 0;
        })
      );
    }
  };

  return (
    <section tw="flex flex-col justify-center items-center">
      {false && <Github />}
      <header>
        <h1 tw="mt-6 text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-600 animate-pulse">
          <span tw="block xl:inline">Auto Chess</span>
          <span tw="xl:inline hidden">&nbsp;</span>
          <span tw="block xl:inline">Combinator</span>
        </h1>
      </header>
      <main tw="w-full flex flex-col lg:flex-row lg:flex-wrap my-6">
        <div tw="lg:w-3/4 w-full lg:pl-6 lg:pr-16">
          <h2 tw="mb-6 text-center lg:text-left lg:pl-2 text-xl tracking-tight font-extrabold sm:text-2xl md:text-3xl text-white">
            Chess Peaces
          </h2>
          <div className="max-h-grid" tw="lg:overflow-y-auto">
            <div
              tw="grid h-full gap-7 justify-items-center"
              className="grid-cols"
            >
              {data.map((it) => (
                <FrontCard
                  title="Click to select"
                  fieldsData={it.fields_data}
                  onSelect={handleSelect}
                  key={it.resource_code}
                />
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
              {selected.map((fieldsData, idx) => {
                return typeof fieldsData === "object" ? (
                  <FrontCard
                    title="Click to unselect"
                    fieldsData={fieldsData}
                    onSelect={handleSelect}
                    key={idx}
                  />
                ) : (
                  <EmptyCard key={idx} />
                );
              })}
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
              I do not work or am I affiliated with Auto Chess, Drodo or
              Dragonest Co.Ltd
            </span>
            <span tw="ml-1">
              For more information about the game, visit
              <a
                href="https://ac.dragonest.com/"
                rel="noreferrer noopener"
                tw="hover:opacity-75 transition-all duration-300 ease-in-out hover:text-yellow-600 pl-1 underline"
                aria-label="Official Website Link"
                target="_blank"
              >
                Auto Chess Official Website
              </a>
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
};

export const getStaticProps = async () => {
  const data = await import("../base-request.json");

  return {
    props: {
      data: data.data.list.sort((a, b) => {
        if (a.fields_data.category[0] < b.fields_data.category[0]) {
          return -1;
        }
        if (a.fields_data.category[0] > b.fields_data.category[0]) {
          return 1;
        }
        return 0;
      }),
    },
  };
};

export default Home;
