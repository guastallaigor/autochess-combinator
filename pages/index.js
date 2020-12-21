import tw from "twin.macro";
import Image from "next/image";
import { useState } from "react";
import FrontCard from "../components/card/front-card";
import EmptyCard from "../components/card/empty-card";
import Github from "../components/layout/github";
import FooterWrapper from "../components/layout/footer-wrapper";
import HeaderWrapper from "../components/layout/header-wrapper";
import { base, categories, types } from "../assets/static";
import { getSortedArrayByCategory } from "../utils/index";
import { getImage } from "../utils/index";

const Home = ({ data }) => {
  const payload = Array.from(Array(10).keys()).map((it) => ({ ...base }));
  const [selected, setSelected] = useState(payload);
  const filteredData = [...data.map((it) => ({ ...it }))];
  const [categoriesFilter, setCategoriesFilter] = useState(categories);
  const [typesFilter, setTypesFilter] = useState(types);

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
          <h2 tw="text-center lg:text-left lg:pl-2 text-xl tracking-tight font-extrabold sm:text-2xl md:text-3xl text-white">
            Chess Pieces
          </h2>
          <div tw="w-full my-6 flex-col flex-nowrap flex">
            <div tw="flex flex-wrap items-center flex-row gap-5 justify-center lg:justify-start">
              <span tw="text-base text-white lg:pl-6">Categories:</span>
              {categoriesFilter.map((category, idx) => {
                return (
                  <button
                    type="button"
                    tw="overflow-hidden h-8"
                    key={`${category.text}${idx}`}
                  >
                    <Image
                      src={getImage(category.text)}
                      alt="Chess Icon Category Image"
                      layout="fixed"
                      tw="hover:opacity-75 transition-opacity duration-300 ease-in-out"
                      className={{
                        "active-filter": category.active,
                      }}
                      width={32}
                      height={32}
                      quality={70}
                    />
                  </button>
                );
              })}
            </div>
            <div tw="flex flex-wrap items-center flex-row gap-5 mt-6 justify-center lg:justify-start">
              <span tw="text-base text-white lg:pl-6">Types:</span>
              {typesFilter.map((type, idx) => {
                return (
                  <button
                    type="button"
                    tw="overflow-hidden h-8"
                    key={`${type.text}${idx}`}
                  >
                    <Image
                      src={getImage(type.text)}
                      alt="Chess Icon Type Image"
                      layout="fixed"
                      tw="hover:opacity-75 transition-opacity duration-300 ease-in-out"
                      className={{
                        "active-filter": type.active,
                      }}
                      width={32}
                      height={32}
                      quality={70}
                    />
                  </button>
                );
              })}
            </div>
          </div>
          <div className="max-h-grid" tw="lg:overflow-y-auto">
            <div
              tw="grid h-full gap-7 justify-items-center"
              className="grid-cols"
            >
              {filteredData.map((it) => (
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
                    key={fieldsData.icon}
                  />
                ) : (
                  <EmptyCard key={idx + parseInt(Math.random() * 9999, 10)} />
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
