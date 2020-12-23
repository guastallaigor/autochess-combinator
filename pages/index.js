import tw from "twin.macro";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import CellChessPieces from "../components/card/cell-chess-pieces";
import CellCombinator from "../components/card/cell-combinator";
import FooterWrapper from "../components/layout/footer-wrapper";
import HeaderWrapper from "../components/layout/header-wrapper";
import Tooltip from "../components/generic/tooltip";
import {
  base,
  baseComplete,
  races,
  classes,
  racesBuffs,
  classesBuffs,
} from "../assets/static";
import { getSortedArrayByRace } from "../utils/index";
import { getImage, makeId } from "../utils/index";

const Home = ({ data }) => {
  const payload = Array.from(Array(10).keys()).map((it) => ({ ...base }));
  const [selected, setSelected] = useState(payload);
  const [copiedData, setCopiedData] = useState([
    ...data.map((it) => ({ ...it })),
  ]);
  const [racesFilter, setRacesFilter] = useState(races);
  const [classesFilter, setClassesFilter] = useState(classes);
  const [buffs, setBuffs] = useState([]);
  const [maxItemsPerRow, setMaxItemsPerRow] = useState(5);
  const [maxItemsPerRowCombinator, setMaxItemsPerRowCombinator] = useState(2);
  const firstUpdateRaces = useRef(true);
  const firstUpdateClasses = useRef(true);

  const getRacesSelectedBuffs = (localClasses) => {
    Object.keys(racesBuffs).forEach((element) => {
      racesBuffs[element].count = selected.filter((it) =>
        it.category.includes(element)
      ).length;
    });

    let localBuffs = [];
    Object.keys(racesBuffs).forEach((element) => {
      const value = racesBuffs[element].count;
      const buff = racesBuffs[element].buff;
      const hasAtLeastOne = value >= 1;
      const hasAtLeastTwo = value >= 2;
      const hasAtLeastThree = value >= 3;
      const getTwoValue =
        value === 3 ? 2 : value === 5 || value > 6 ? 4 : value;
      const getAnotherTwoValue = value === 3 ? 2 : value > 4 ? 4 : value;
      const getThreeValue =
        value === 4 || value === 5 ? 3 : value > 6 ? 6 : value;
      const witcher = localClasses.find((it) => it.text === "Witcher");
      const objectToPush = {
        Beast: hasAtLeastTwo
          ? {
              text: "Beast",
              value: getTwoValue,
              buff,
            }
          : null,
        Insectoid: hasAtLeastTwo
          ? { text: "Insectoid", value: getAnotherTwoValue, buff }
          : null,
        Cave: hasAtLeastTwo ? { text: "Cave", value: getTwoValue, buff } : null,
        Demon: hasAtLeastOne
          ? {
              text: "Demon",
              value,
              penalty: value > 1 ? !witcher || witcher.demonPenalty : false,
              buff,
            }
          : null,
        Divinity: hasAtLeastOne
          ? { text: "Divinity", value: getAnotherTwoValue, buff }
          : null,
        Dragon: hasAtLeastThree
          ? {
              text: "Dragon",
              value: value === 4 ? 3 : value > 5 ? 5 : value,
              buff,
            }
          : null,
        Egersis: hasAtLeastTwo
          ? {
              text: "Egersis",
              value: getTwoValue,
              buff,
            }
          : null,
        Human: hasAtLeastThree
          ? {
              text: "Human",
              value: getThreeValue,
              buff,
            }
          : null,
        Dwarf: hasAtLeastOne
          ? { text: "Dwarf", value: value > 2 ? 2 : value, buff }
          : null,
        Feathered: hasAtLeastThree
          ? {
              text: "Feathered",
              value:
                value === 4 || value === 5
                  ? 3
                  : value === 7 || value === 8
                  ? 6
                  : value > 9
                  ? 9
                  : value,
              buff,
            }
          : null,
        Glacier: hasAtLeastTwo
          ? { text: "Glacier", value: getTwoValue, buff }
          : null,
        Goblin: hasAtLeastThree
          ? { text: "Goblin", value: getThreeValue, buff }
          : null,
        Kira: hasAtLeastTwo
          ? { text: "Kira", value: value > 2 ? 2 : value, buff }
          : null,
        Marine: hasAtLeastTwo
          ? { text: "Marine", value: getAnotherTwoValue, buff }
          : null,
        Spirits: hasAtLeastTwo
          ? { text: "Spirits", value: getAnotherTwoValue, buff }
          : null,
      }[element];

      if (objectToPush) {
        localBuffs.push(objectToPush);
      }
    });

    return localBuffs;
  };

  const getClassesSelectedBufs = () => {
    Object.keys(classesBuffs).forEach((element) => {
      classesBuffs[element].count = selected.filter((it) =>
        it.cardType.includes(element)
      ).length;
    });

    let localBuffs = [];
    Object.keys(classesBuffs).forEach((element) => {
      const value = classesBuffs[element].count;
      const buff = classesBuffs[element].buff;
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
          : value === 7 || value === 8
          ? 6
          : value > 9
          ? 9
          : value;
      const objectToPush = {
        Druid: hasAtLeastTwo
          ? {
              text: "Druid",
              value: getAnotherTwoValue,
              buff,
            }
          : null,
        Warrior: hasAtLeastThree
          ? {
              text: "Warrior",
              value: getNineValue,
              buff,
            }
          : null,
        Assassin: hasAtLeastThree
          ? { text: "Assassin", value: getNineValue, buff }
          : null,
        Shaman: hasAtLeastTwo
          ? { text: "Shaman", value: getAnotherTwoValue, buff }
          : null,
        Hunter: hasAtLeastThree
          ? { text: "Hunter", value: getThreeValue, buff }
          : null,
        Wizard: hasAtLeastTwo
          ? { text: "Wizard", value: getAnotherTwoValue, buff }
          : null,
        Knight: hasAtLeastTwo
          ? {
              text: "Knight",
              value: getTwoValue,
              buff,
            }
          : null,
        Witcher: hasAtLeastOne
          ? {
              text: "Witcher",
              value: value > 2 ? 2 : value,
              demonPenalty: value !== 2,
              buff,
            }
          : null,
        Warlock: hasAtLeastTwo
          ? {
              text: "Warlock",
              value: getTwoValue,
              buff,
            }
          : null,
        Priest: hasAtLeastOne
          ? { text: "Priest", value: value > 2 ? 2 : value, buff }
          : null,
        Mage: hasAtLeastThree
          ? { text: "Mage", value: getNineValue, buff }
          : null,
        Mech: hasAtLeastThree
          ? { text: "Mech", value: getThreeValue, buff }
          : null,
      }[element];

      if (objectToPush) {
        localBuffs.push(objectToPush);
      }
    });
    return localBuffs;
  };

  const getItemKey = ({ columnIndex, data, rowIndex }) => {
    const item = data.copiedData[columnIndex + rowIndex * data.maxItemsPerRow];
    if (!item || !item.fields_data || !item.fields_data.icon)
      return `pieces-${columnIndex}-${makeId()}`;
    return `${item.fields_data.icon}-${columnIndex}-${rowIndex}`;
  };

  const getItemKeyCombinator = ({ columnIndex, data, rowIndex }) => {
    const item =
      data.selected[columnIndex + rowIndex * data.maxItemsPerRowCombinator];
    if (!item || !item.icon)
      return `combinator-${columnIndex}-${rowIndex}-${makeId()}`;
    return `${item.icon}-${columnIndex}-${rowIndex}`;
  };

  const hasUpdatedCopiedDataStyle = (fieldsData, active = true) => {
    const foundIndex = copiedData.findIndex(
      (it) => it.fields_data.name === fieldsData.name
    );
    if (foundIndex > -1) {
      copiedData[foundIndex].fields_data.active = active;
      return true;
    }

    return false;
  };

  const handleSelect = (fieldsData) => {
    const isItemAlreadySelected = selected.find(
      (it) => it.name === fieldsData.name
    );
    if (isItemAlreadySelected) return;
    let hasUpdated = [];
    hasUpdated.push(hasUpdatedCopiedDataStyle(fieldsData));
    const emptyItemIndexToRemove = selected.findIndex((it) => !it.name);

    if (emptyItemIndexToRemove > -1) {
      selected.splice(emptyItemIndexToRemove, 1);
    } else {
      const itemRemoved = selected.pop();
      const SET_INACTIVE_STYLE_TO_CARD = false;
      hasUpdated.push(
        hasUpdatedCopiedDataStyle(itemRemoved, SET_INACTIVE_STYLE_TO_CARD)
      );
    }

    const COPIED_DATA_IS_UPDATED = true;

    if (hasUpdated.includes(COPIED_DATA_IS_UPDATED)) {
      setCopiedData([...copiedData]);
    }

    setSelected([
      {
        ...fieldsData,
      },
      ...selected,
    ]);
  };

  const handleUnselect = (fieldsData) => {
    const foundIndex = selected.findIndex((it) => it.name === fieldsData.name);
    if (foundIndex < 0) return;
    const SET_INACTIVE_STYLE_TO_CARD = false;
    const hasUpdated = hasUpdatedCopiedDataStyle(
      fieldsData,
      SET_INACTIVE_STYLE_TO_CARD
    );

    if (hasUpdated) {
      setCopiedData([...copiedData]);
    }

    selected.splice(foundIndex, 1);
    setSelected([...selected, { ...base }]);
  };

  const toggleRacesFilter = (_, idx) => {
    racesFilter[idx].active = !racesFilter[idx].active;
    setRacesFilter([...racesFilter]);
  };

  const toggleClassesFilter = (_, idx) => {
    classesFilter[idx].active = !classesFilter[idx].active;
    setClassesFilter([...classesFilter]);
  };

  const clearAllCards = () => {
    const newSelectedArray = selected.filter((it) => !it.name);
    const quantity = newSelectedArray.length || 0;
    for (let index = quantity; index < 10; index++) {
      newSelectedArray.push({ ...base });
    }
    const newDataStyle = copiedData.map((it) => {
      it.fields_data.active = false;
      return it;
    });

    setSelected([...newSelectedArray]);
    setCopiedData([...newDataStyle]);
  };

  const getFilteredData = (array, fieldName = "category") => {
    let filteredData = data.filter((data) =>
      data.fields_data[fieldName].some((it) => {
        const item = array.find(
          (ij) => ij.text.toLowerCase().trim() === it.toLowerCase().trim()
        );
        return item ? item.active : false;
      })
    );
    const filteredDataLength = filteredData.length;
    if (!filteredDataLength) {
      filteredData = [...data.map((it) => ({ ...it }))];
    }
    const copiedDataLength = copiedData.length;
    const currentBase = { ...baseComplete, resource_code: makeId() };

    if (copiedDataLength > filteredDataLength) {
      for (let index = filteredDataLength; index < copiedDataLength; index++) {
        // * Add blank cards because of a bug
        // * with react-window or react-virtualized-auto-sizer I think
        filteredData.push({ ...currentBase });
      }
    } else {
      // * Remove them when the they're not needed
      let quantityItemsToRemove = filteredDataLength - copiedDataLength;
      filteredData.forEach((item, index, object) => {
        if (quantityItemsToRemove === 0) return false;
        if (!item.fields_data.name) {
          object.splice(index, 1);
          quantityItemsToRemove--;
        }
      });
    }

    return filteredData;
  };

  useEffect(() => {
    const localClasses = getClassesSelectedBufs();
    const localRaces = getRacesSelectedBuffs(localClasses);
    setBuffs([...localRaces, ...localClasses]);
  }, [selected]);

  useEffect(() => {
    if (firstUpdateRaces.current) {
      firstUpdateRaces.current = false;
      return;
    }
    const filteredData = getFilteredData(racesFilter);
    setCopiedData(getSortedArrayByRace(filteredData, "fields_data"));
  }, [racesFilter]);

  useEffect(() => {
    if (firstUpdateClasses.current) {
      firstUpdateClasses.current = false;
      return;
    }

    const filteredData = getFilteredData(classesFilter, "cardType");
    setCopiedData(getSortedArrayByRace(filteredData, "fields_data"));
  }, [classesFilter]);

  useEffect(() => {
    const { innerWidth } = window;
    const isXl = innerWidth >= 1280 && innerWidth < 1536;
    const isLgAndBelow = innerWidth < 1280;
    setMaxItemsPerRow(isXl ? 4 : 5);
    setMaxItemsPerRowCombinator(isXl ? 1 : isLgAndBelow ? 5 : 2);
  }, []);

  return (
    <section tw="flex flex-col justify-center items-center">
      <HeaderWrapper />
      <main tw="w-full flex flex-col lg:flex-row lg:flex-wrap xl:my-6 my-3 relative h-full items-center justify-center">
        <div
          tw="xl:w-9/12 2xl:w-7/12 3xl:w-3/4 xl:max-w-5xl 2xl:max-w-8xl w-full"
          className="height-cards"
        >
          <h2 tw="text-center xl:text-left xl:pl-2 text-xl tracking-tight font-extrabold sm:text-2xl md:text-3xl text-white">
            Chess Pieces
          </h2>
          <div tw="w-full xl:my-6 my-3 flex-col flex-nowrap flex">
            <div tw="flex flex-wrap items-center flex-row justify-center xl:justify-start">
              <span tw="text-base text-white xl:pl-6 mt-3 md:mt-0 ml-1 md:ml-0">
                Races:
              </span>
              {racesFilter.map((race, idx) => {
                return (
                  <button
                    type="button"
                    tw="overflow-hidden h-8"
                    className="add-gap-items"
                    title="Toggle to filter"
                    key={`${race.text}${idx}`}
                    onClick={() => toggleRacesFilter(race, idx)}
                  >
                    <Image
                      src={getImage(race.text)}
                      alt="Chess Icon Race Image"
                      layout="fixed"
                      tw="transition-opacity duration-200 ease-in-out"
                      className={
                        race.active ? "active-filter" : "inactive-filter"
                      }
                      width={32}
                      height={32}
                      quality={70}
                    />
                  </button>
                );
              })}
            </div>
            <div tw="flex flex-wrap items-center flex-row mt-6 justify-center xl:justify-start">
              <span tw="text-base text-white xl:pl-6 mt-3 md:mt-0 ml-1 md:ml-0">
                Classes:
              </span>
              {classesFilter.map((it, idx) => {
                return (
                  <button
                    type="button"
                    tw="overflow-hidden h-8"
                    className="add-gap-items"
                    title="Toggle to filter"
                    key={`${it.text}${idx}`}
                    onClick={() => toggleClassesFilter(it, idx)}
                  >
                    <Image
                      src={getImage(it.text)}
                      alt="Chess Icon Class Image"
                      layout="fixed"
                      tw="transition-opacity duration-200 ease-in-out"
                      className={
                        it.active ? "active-filter" : "inactive-filter"
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
          <div tw="mt-6 xl:mt-0 mx-12 xl:ml-1 xl:-mr-3 2xl:mx-7 h-82 xl:h-full">
            <AutoSizer>
              {({ height, width }) => (
                <Grid
                  columnCount={maxItemsPerRow}
                  columnWidth={250}
                  width={width}
                  height={height}
                  rowCount={Math.max(copiedData.length / maxItemsPerRow)}
                  rowHeight={350}
                  itemData={{ copiedData, handleSelect, maxItemsPerRow }}
                  itemKey={getItemKey}
                >
                  {CellChessPieces}
                </Grid>
              )}
            </AutoSizer>
          </div>
        </div>
        <div
          tw="w-full xl:w-3/12 2xl:w-6/12 xl:max-w-xd 2xl:max-w-lg mt-6 xl:mt-0"
          className="height-cards"
        >
          <div tw="flex justify-center xl:justify-start flex-row flex-nowrap items-center">
            <h2 tw="xl:mb-3 text-center xl:text-left xl:pl-2 text-xl tracking-tight font-extrabold sm:text-2xl md:text-3xl text-white">
              Combinator
            </h2>
            <button
              tw="xl:mb-3 ml-6 h-10 px-2 flex items-center justify-center transition-opacity duration-300 ease-in-out rounded-md bg-yellow-700 text-white hover:opacity-75"
              type="button"
              onClick={clearAllCards}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                tw="mr-2"
              >
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
              </svg>
              <span tw="text-base">Clear</span>
            </button>
          </div>
          <div tw="w-full mb-3 xl:mb-6 flex-col flex-nowrap flex">
            <div tw="flex flex-nowrap items-center flex-row justify-center xl:justify-start ml-1 md:ml-0 xl:pl-6 min-h-32 mb-3 xl:mt-0 mt-3">
              <span tw="text-white mr-4">Quantity:</span>
              <span tw="text-white font-bold bg-yellow-700 shadow-md rounded-md px-2 py-1">
                {selected.filter((it) => it.name).length} / 10
              </span>
            </div>
            <div tw="flex flex-wrap items-center flex-row justify-center xl:justify-start min-h-32">
              <span tw="text-base text-white xl:pl-6 ml-1 md:ml-0">Buffs:</span>
              {buffs.map((buff, idx) => {
                return (
                  <div
                    key={`${buff.text}${idx}`}
                    tw="h-8 relative"
                    className="add-gap-items"
                  >
                    <div
                      tw="absolute text-white z-10 font-bold -top-2 -right-1 text-sm"
                      style={{ color: buff.penalty && "red" }}
                    >
                      {buff.value}
                    </div>
                    <Tooltip content={buff.buff} direction="bottom">
                      <Image
                        src={getImage(buff.text)}
                        alt="Chess Icon Image"
                        layout="fixed"
                        width={32}
                        height={32}
                        quality={70}
                      />
                    </Tooltip>
                  </div>
                );
              })}
            </div>
          </div>
          <div tw="h-80 mx-12 mt-6 xl:mx-7 2xl:mx-0 xl:mt-0 xl:h-full">
            <AutoSizer>
              {({ height, width }) => (
                <Grid
                  columnCount={maxItemsPerRowCombinator}
                  columnWidth={250}
                  width={width}
                  height={height}
                  rowCount={Math.max(
                    selected.length / maxItemsPerRowCombinator
                  )}
                  rowHeight={350}
                  itemData={{
                    selected,
                    handleUnselect,
                    maxItemsPerRowCombinator,
                  }}
                  itemKey={getItemKeyCombinator}
                >
                  {CellCombinator}
                </Grid>
              )}
            </AutoSizer>
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
      data: getSortedArrayByRace(data.data.list, "fields_data"),
    },
  };
};

export default Home;
