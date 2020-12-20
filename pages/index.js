import tw from "twin.macro";
import { useState } from "react";
import FrontCard from "../components/card/front-card";
import EmptyCard from "../components/card/empty-card";
import Github from "../components/layout/github";
import FooterWrapper from "../components/layout/footer-wrapper";
import HeaderWrapper from "../components/layout/header-wrapper";
import base from "../assets/static";
import { getSortedArrayByCategory } from "../utils/index";

const Home = ({ data }) => {
  const payload = Array.from(Array(10).keys()).map((it) => ({ ...base }));
  const [selected, setSelected] = useState(payload);

  const handleSelect = (fieldsData) => {
    let isItemAlreadySelected = selected.find(
      (it) => it.name === fieldsData.name
    );
    if (isItemAlreadySelected) return;

    const emptyItemIndexToRemove = selected.findIndex((it) => !it.name);

    if (emptyItemIndexToRemove) {
      selected.splice(emptyItemIndexToRemove, 1);
    } else {
      selected.shift();
    }

    setSelected(
      getSortedArrayByCategory([
        {
          ...fieldsData,
        },
        ...selected,
      ])
    );
  };

  const handleUnselect = (fieldsData) => {
    const foundIndex = selected.findIndex((it) => it.name === fieldsData.name);
    if (foundIndex < 0) return;
    selected.splice(foundIndex, 1);
    setSelected([...selected, { ...base }]);
  };

  return (
    <section tw="flex flex-col justify-center items-center">
      {false && <Github />}
      <HeaderWrapper />
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
                  onCardClick={handleSelect}
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
                return fieldsData.name ? (
                  <FrontCard
                    title="Click to unselect"
                    fieldsData={fieldsData}
                    onCardClick={handleUnselect}
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
      <FooterWrapper />
    </section>
  );
};

export const getStaticProps = async () => {
  const data = await import("../assets/base-request.json");
  // const data = await import("../assets/dev.json");

  return {
    props: {
      data: getSortedArrayByCategory(data.data.list, "fields_data"),
    },
  };
};

export default Home;
