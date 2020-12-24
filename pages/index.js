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
import { base, baseComplete, races, classes } from "../assets/static";
import { getSortedArrayByRace } from "../utils/index";
import { getImage, makeId } from "../utils/index";
import {
  getClassesSelectedBufs,
  getRacesSelectedBuffs,
  setFourWizardsBuff,
} from "../utils/buffs";

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

  const getFilteredData = () => {
    let firstSome;
    let firstItem;
    let secondSome;
    let secondItem;
    let filteredData = data.filter((subData) => {
      firstSome = subData.fields_data.category.some((item) => {
        firstItem = racesFilter.find(
          (raceItem) =>
            raceItem.text.toLowerCase().trim() === item.toLowerCase().trim()
        );
        return firstItem ? firstItem.active : false;
      });
      secondSome = subData.fields_data.cardType.some((item) => {
        secondItem = classesFilter.find(
          (classItem) =>
            classItem.text.toLowerCase().trim() === item.toLowerCase().trim()
        );
        return secondItem ? secondItem.active : false;
      });
      return firstSome || secondSome;
    });
    if (!filteredData.length) {
      filteredData = [...data.map((it) => ({ ...it }))];
    }
    const copiedDataLength = copiedData.length;
    const currentBase = { ...baseComplete, resource_code: makeId() };

    if (copiedDataLength > filteredData.length) {
      const filteredDataLength = filteredData.length;
      for (let index = filteredDataLength; index < copiedDataLength; index++) {
        // * Add blank cards because of a bug
        // * with react-window or react-virtualized-auto-sizer I think
        filteredData.push({ ...currentBase });
      }
    } else {
      // * Remove them when the they're not needed
      let quantityItemsToRemove = filteredData.length - copiedDataLength;
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
    const localClasses = getClassesSelectedBufs(selected);
    const localRaces = getRacesSelectedBuffs(selected, localClasses);
    let buffs = [...localRaces, ...localClasses];
    const isWizardFourActive = buffs.find(
      (it) => it.text === "Wizard" && it.value === 4
    );
    const buffsWithoutDemonsPenalized = buffs.filter((it) => !it.penalty);

    if (isWizardFourActive && buffsWithoutDemonsPenalized.length === 2) {
      buffs = setFourWizardsBuff(buffsWithoutDemonsPenalized);
    }

    setBuffs(buffs);
  }, [selected]);

  useEffect(() => {
    if (firstUpdateRaces.current) {
      firstUpdateRaces.current = false;
      return;
    }
    const filteredData = getFilteredData();
    setCopiedData(getSortedArrayByRace(filteredData, "fields_data"));
  }, [racesFilter]);

  useEffect(() => {
    if (firstUpdateClasses.current) {
      firstUpdateClasses.current = false;
      return;
    }

    const filteredData = getFilteredData();
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
              {racesFilter.map((raceItem, idx) => {
                return (
                  <button
                    type="button"
                    tw="overflow-hidden h-8"
                    className="add-gap-items"
                    title="Toggle to filter"
                    key={`${raceItem.text}${idx}`}
                    onClick={() => toggleRacesFilter(raceItem, idx)}
                  >
                    <Image
                      src={getImage(raceItem.text)}
                      alt="Chess Icon Race Image"
                      layout="fixed"
                      tw="transition-opacity duration-200 ease-in-out"
                      className={
                        raceItem.active ? "active-filter" : "inactive-filter"
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
              {classesFilter.map((classItem, idx) => {
                return (
                  <button
                    type="button"
                    tw="overflow-hidden h-8"
                    className="add-gap-items"
                    title="Toggle to filter"
                    key={`${classItem.text}${idx}`}
                    onClick={() => toggleClassesFilter(classItem, idx)}
                  >
                    <Image
                      src={getImage(classItem.text)}
                      alt="Chess Icon Class Image"
                      layout="fixed"
                      tw="transition-opacity duration-200 ease-in-out"
                      className={
                        classItem.active ? "active-filter" : "inactive-filter"
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
