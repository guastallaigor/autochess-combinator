import tw from "twin.macro";
import Image from "next/image";
import { useState, useEffect } from "react";
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
  const [copiedData, setCopiedData] = useState([
    ...data.map((it) => ({ ...it })),
  ]);
  const [categoriesFilter, setCategoriesFilter] = useState(categories);
  const [typesFilter, setTypesFilter] = useState(types);
  const [buffs, setBuffs] = useState([]);

  const getCategoriesSelectedBuffs = (localTypes) => {
    const counterElements = {
      Beast: 0,
      Insectoid: 0,
      Cave: 0,
      Demon: 0,
      Divinity: 0,
      Dragon: 0,
      Egersis: 0,
      Human: 0,
      Dwarf: 0,
      Feathered: 0,
      Glacier: 0,
      Goblin: 0,
      Kira: 0,
      Marine: 0,
      Spirits: 0,
    };

    Object.keys(counterElements).forEach((element) => {
      counterElements[element] = selected.filter((it) =>
        it.category.includes(element)
      ).length;
    });

    let localBuffs = [];
    Object.keys(counterElements).forEach((element) => {
      const value = counterElements[element];
      const hasAtLeastOne = value >= 1;
      const hasAtLeastTwo = value >= 2;
      const hasAtLeastThree = value >= 3;
      const getTwoValue =
        value === 3 ? 2 : value === 5 || value > 6 ? 4 : value;
      const getAnotherTwoValue = value === 3 ? 2 : value > 4 ? 4 : value;
      const getThreeValue =
        value === 4 || value === 5 ? 3 : value > 6 ? 6 : value;
      const witcher = localTypes.find((it) => it.text === "Witcher");
      const objectToPush = {
        Beast: hasAtLeastTwo
          ? {
              text: "Beast",
              value: getTwoValue,
            }
          : null,
        Insectoid: hasAtLeastTwo
          ? { text: "Insectoid", value: value === 3 ? 2 : value }
          : null,
        Cave: hasAtLeastTwo ? { text: "Cave", value: getTwoValue } : null,
        Demon: hasAtLeastOne
          ? {
              text: "Demon",
              value,
              penalty: value > 1 ? !witcher || witcher.demonPenalty : false,
            }
          : null,
        Divinity: hasAtLeastOne
          ? { text: "Divinity", value: value === 3 ? 2 : value > 4 ? 4 : value }
          : null,
        Dragon: hasAtLeastThree
          ? { text: "Dragon", value: value === 4 ? 3 : value > 5 ? 5 : value }
          : null,
        Egersis: hasAtLeastTwo
          ? {
              text: "Egersis",
              value: getTwoValue,
            }
          : null,
        Human: hasAtLeastThree
          ? {
              text: "Human",
              value: getThreeValue,
            }
          : null,
        Dwarf: hasAtLeastOne
          ? { text: "Dwarf", value: value > 2 ? 2 : value }
          : null,
        Feathered: hasAtLeastThree
          ? {
              text: "Feathered",
              value:
                value === 4 || value === 5
                  ? 3
                  : value === 7 || value === 8 || value > 9
                  ? 6
                  : value,
            }
          : null,
        Glacier: hasAtLeastTwo ? { text: "Glacier", value: getTwoValue } : null,
        Goblin: hasAtLeastThree
          ? { text: "Goblin", value: getThreeValue }
          : null,
        Kira: hasAtLeastTwo
          ? { text: "Kira", value: value > 2 ? 2 : value }
          : null,
        Marine: hasAtLeastTwo
          ? { text: "Marine", value: getAnotherTwoValue }
          : null,
        Spirits: hasAtLeastTwo
          ? { text: "Spirits", value: getAnotherTwoValue }
          : null,
      }[element];

      if (objectToPush) {
        localBuffs.push(objectToPush);
      }
    });

    return localBuffs;
  };

  const getTypesSelectedBufs = () => {
    const counterElements = {
      Druid: 0,
      Warrior: 0,
      Assassin: 0,
      Shaman: 0,
      Hunter: 0,
      Wizard: 0,
      Knight: 0,
      Witcher: 0,
      Warlock: 0,
      Priest: 0,
      Mage: 0,
      Mech: 0,
    };

    Object.keys(counterElements).forEach((element) => {
      counterElements[element] = selected.filter((it) =>
        it.cardType.includes(element)
      ).length;
    });

    let localBuffs = [];
    Object.keys(counterElements).forEach((element) => {
      const value = counterElements[element];
      const hasAtLeastOne = value >= 1;
      const hasAtLeastTwo = value >= 2;
      const hasAtLeastThree = value >= 3;
      const getTwoValue =
        value === 3 ? 2 : value === 5 || value > 6 ? 4 : value;
      const getAnotherTwoValue = value === 3 ? 2 : value > 4 ? 4 : value;
      const getThreeValue =
        value === 4 || value === 5 ? 3 : value > 6 ? 6 : value;
      const getNineValue =
        value === 4 || value === 5
          ? 3
          : value === 7 || value === 8 || value > 9
          ? 6
          : value;
      const objectToPush = {
        Druid: hasAtLeastTwo
          ? {
              text: "Druid",
              value: getTwoValue,
            }
          : null,
        Warrior: hasAtLeastThree
          ? {
              text: "Warrior",
              value: getNineValue,
            }
          : null,
        Assassin: hasAtLeastThree
          ? { text: "Assassin", value: getNineValue }
          : null,
        Shaman: hasAtLeastTwo
          ? { text: "Shaman", value: getAnotherTwoValue }
          : null,
        Hunter: hasAtLeastThree
          ? { text: "Hunter", value: getThreeValue }
          : null,
        Wizard: hasAtLeastTwo
          ? { text: "Wizard", value: getAnotherTwoValue }
          : null,
        Knight: hasAtLeastTwo
          ? {
              text: "Knight",
              value: getTwoValue,
            }
          : null,
        Witcher: hasAtLeastOne
          ? {
              text: "Witcher",
              value: value > 2 ? 2 : value,
              demonPenalty: value !== 2,
            }
          : null,
        Warlock: hasAtLeastTwo
          ? {
              text: "Warlock",
              value: getTwoValue,
            }
          : null,
        Priest: hasAtLeastOne
          ? { text: "Priest", value: value > 2 ? 2 : value }
          : null,
        Mage: hasAtLeastThree ? { text: "Mage", value: getThreeValue } : null,
        Mech: hasAtLeastThree ? { text: "Mech", value: getThreeValue } : null,
      }[element];

      if (objectToPush) {
        localBuffs.push(objectToPush);
      }
    });
    return localBuffs;
  };

  const handleBuffs = () => {
    const localTypes = getTypesSelectedBufs();
    const localCategories = getCategoriesSelectedBuffs(localTypes);
    setBuffs([...localCategories, ...localTypes]);
  };

  useEffect(() => {
    handleBuffs();
  }, [selected]);

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

  const toggleCategoriesFilter = (category, idx) => {
    categoriesFilter[idx].active = !categoriesFilter[idx].active;
    const active = categoriesFilter[idx].active;
    setCategoriesFilter([...categoriesFilter]);
    // ! WIP
    const filteredData = copiedData.filter((data) =>
      data.fields_data.category.some((it) => {
        const category = categoriesFilter.find(
          (ij) => ij.text.toLowerCase() === it.toLowerCase()
        );
        return category ? category.active === active : false;
      })
    );
    setCopiedData(filteredData);
  };
  const toggleTypesFilter = (type, idx) => {
    typesFilter[idx].active = !typesFilter[idx].active;
    setTypesFilter([...typesFilter]);
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
                    onClick={() => toggleCategoriesFilter(category, idx)}
                  >
                    <Image
                      src={getImage(category.text)}
                      alt="Chess Icon Category Image"
                      layout="fixed"
                      tw="transition-opacity duration-200 ease-in-out"
                      className={
                        category.active ? "active-filter" : "inactive-filter"
                      }
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
                    onClick={() => toggleTypesFilter(type, idx)}
                  >
                    <Image
                      src={getImage(type.text)}
                      alt="Chess Icon Type Image"
                      layout="fixed"
                      tw="transition-opacity duration-200 ease-in-out"
                      className={
                        type.active ? "active-filter" : "inactive-filter"
                      }
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
              {copiedData.map((it) => (
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
          <div tw="w-full my-6 flex-col flex-nowrap flex">
            <div tw="flex flex-wrap items-center flex-row gap-5 justify-center lg:justify-start">
              <span tw="text-base text-white lg:pl-6">Buffs:</span>
              {buffs.map((buff, idx) => {
                return (
                  <div key={`${buff.text}${idx}`} tw="h-8 relative">
                    <div
                      tw="absolute text-white z-10 font-bold -top-2 -right-1 text-sm"
                      style={{ color: buff.penalty && "red" }}
                    >
                      {buff.value}
                    </div>
                    <Image
                      src={getImage(buff.text)}
                      alt="Chess Icon Image"
                      layout="fixed"
                      width={32}
                      height={32}
                      quality={70}
                    />
                  </div>
                );
              })}
            </div>
          </div>
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
  return {
    props: {
      data: getSortedArrayByCategory(data.data.list, "fields_data"),
    },
  };
};

export default Home;
