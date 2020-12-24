import { racesBuffs, classesBuffs } from "../assets/static";

const getRacesSelectedBuffs = (selected, localClasses) => {
  Object.keys(racesBuffs).forEach((element) => {
    racesBuffs[element].count = selected.filter((it) =>
      it.category.includes(element)
    ).length;
  });

  let localBuffs = [];
  const isWizardTwoActive = localClasses.find(
    (it) => it.text === "Wizard" && it.value >= 2
  );
  const witcher = localClasses.find((it) => it.text === "Witcher");
  Object.keys(racesBuffs).forEach((element) => {
    const value = racesBuffs[element].count;
    const buff = racesBuffs[element].buff;
    const hasAtLeastOne = value >= 1;
    const hasAtLeastTwo = value >= 2;
    const hasAtLeastThree = value >= 3;
    const getTwoValue =
      value === 3
        ? isWizardTwoActive
          ? 4
          : 2
        : value === 5
        ? isWizardTwoActive
          ? 6
          : 4
        : value > 6
        ? 4
        : value;
    const getAnotherTwoValue =
      value === 3 ? (isWizardTwoActive ? 4 : 2) : value > 4 ? 4 : value;
    const getThreeValue =
      value === 4 || value === 5 ? 3 : value > 6 ? 6 : value;
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
      Divinity: hasAtLeastTwo
        ? { text: "Divinity", value: getAnotherTwoValue, buff }
        : null,
      Dragon: hasAtLeastThree
        ? {
            text: "Dragon",
            value:
              value === 4
                ? isWizardTwoActive
                  ? 5
                  : 3
                : value >= 5
                ? 5
                : value,
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
              value === 4
                ? 3
                : value === 5
                ? isWizardTwoActive
                  ? 6
                  : 3
                : value === 7
                ? 6
                : value === 8
                ? isWizardTwoActive
                  ? 9
                  : 6
                : value >= 9
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
        ? { text: "Kira", value: value >= 2 ? 2 : value, buff }
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

const getClassesSelectedBufs = (selected) => {
  Object.keys(classesBuffs).forEach((element) => {
    classesBuffs[element].count = selected.filter((it) =>
      it.cardType.includes(element)
    ).length;
  });

  let localBuffs = [];
  let isWizardTwoActive = false;
  Object.keys(classesBuffs).forEach((element) => {
    isWizardTwoActive = localBuffs.find(
      (it) => it.text === "Wizard" && it.value >= 2
    );
    const value = classesBuffs[element].count;
    const buff = classesBuffs[element].buff;
    const hasAtLeastOne = value >= 1;
    const hasAtLeastTwo = value >= 2;
    const hasAtLeastThree = value >= 3;
    const getTwoValue =
      value === 3
        ? isWizardTwoActive
          ? 4
          : 2
        : value === 5
        ? isWizardTwoActive
          ? 6
          : 4
        : value > 6
        ? 6
        : value;
    const getAnotherTwoValue =
      value === 3 ? (isWizardTwoActive ? 4 : 2) : value >= 4 ? 4 : value;
    const getThreeValue =
      value === 4
        ? 3
        : value === 5
        ? isWizardTwoActive
          ? 6
          : 3
        : value >= 6
        ? 6
        : value;
    const getNineValue =
      value === 4
        ? 3
        : value === 5
        ? isWizardTwoActive
          ? 6
          : 3
        : value === 7
        ? 6
        : value === 8
        ? isWizardTwoActive
          ? 9
          : 6
        : value >= 9
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
        ? {
            text: "Wizard",
            value: value === 3 ? 4 : value >= 4 ? 4 : value,
            buff,
          }
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

const setFourWizardsBuff = (buffs) => {
  const otherActiveBuff = buffs.find((it) => it.text !== "Wizard");
  const otherBuffValue = otherActiveBuff.value;
  const getFourValue = otherBuffValue >= 3 ? 4 : otherBuffValue;
  const getNineValue = otherBuffValue >= 5 ? 9 : otherBuffValue;
  const getSixValue = otherBuffValue >= 5 ? 6 : otherBuffValue;
  const getAnotherSixValue = otherBuffValue >= 3 ? 6 : otherBuffValue;
  otherActiveBuff.value = {
    Druid: getFourValue,
    Warrior: getNineValue,
    Assassin: getNineValue,
    Shaman: getFourValue,
    Hunter: getSixValue,
    Knight: getAnotherSixValue,
    Witcher: otherBuffValue,
    Warlock: getAnotherSixValue,
    Priest: otherBuffValue,
    Mage: getNineValue,
    Mech: getSixValue,
    Beast: getAnotherSixValue,
    Insectoid: getFourValue,
    Cave: getAnotherSixValue,
    Demon: otherBuffValue,
    Divinity: getFourValue,
    Dragon: otherBuffValue >= 4 ? 5 : otherBuffValue,
    Egersis: getAnotherSixValue,
    Human: getSixValue,
    Dwarf: otherBuffValue,
    Feathered: getNineValue,
    Glacier: getAnotherSixValue,
    Goblin: getSixValue,
    Kira: otherBuffValue,
    Marine: getFourValue,
    Spirits: getFourValue,
  }[otherActiveBuff.text];

  return buffs;
};

export { getClassesSelectedBufs, getRacesSelectedBuffs, setFourWizardsBuff };
