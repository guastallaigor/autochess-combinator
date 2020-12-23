const base = {
  icon: "",
  name: "",
  armor: "",
  noIcon: "",
  cardImg: "",
  cardType: [],
  category: [],
  chessSkin: [],
  lifeValue: "",
  skillName: "",
  cardExpend: "",
  chessTitle: "",
  attackPower: "",
  attackSpeed: "",
  cardQuality: [""],
  waitingTime: "",
  twoStarArmor: "",
  attackDistance: "",
  chessSkillIcon: "",
  threeStarArmor: "",
  twoStarCardImg: "",
  magicResistance: "",
  storyBackground: "",
  threeStarCardImg: "",
  twoStarLifeValue: "",
  onestarChessSkill: "",
  twostarChessSkill: "",
  threeStarLifeValue: "",
  twoStarAttackPower: "",
  twoStarAttackSpeed: "",
  threestarChessSkill: "",
  recommendedEquipment: 0,
  threeStarAttackPower: "",
  threeStarAttackSpeed: "",
  twoStarAttackDistance: "",
  twoStarMagicResistance: "",
  threeStarAttackDistance: "",
  threeStarMagicResistance: "",
};

const baseComplete = {
  resource_code: "",
  fields_data: {
    icon: "",
    name: "",
    armor: "",
    noIcon: "",
    cardImg: "",
    cardType: [],
    category: [],
    chessSkin: [],
    lifeValue: "",
    skillName: "",
    cardExpend: "",
    chessTitle: "",
    attackPower: "",
    attackSpeed: "",
    cardQuality: [""],
    waitingTime: "",
    twoStarArmor: "",
    attackDistance: "",
    chessSkillIcon: "",
    threeStarArmor: "",
    twoStarCardImg: "",
    magicResistance: "",
    storyBackground: "",
    threeStarCardImg: "",
    twoStarLifeValue: "",
    onestarChessSkill: "",
    twostarChessSkill: "",
    threeStarLifeValue: "",
    twoStarAttackPower: "",
    twoStarAttackSpeed: "",
    threestarChessSkill: "",
    recommendedEquipment: 0,
    threeStarAttackPower: "",
    threeStarAttackSpeed: "",
    twoStarAttackDistance: "",
    twoStarMagicResistance: "",
    threeStarAttackDistance: "",
    threeStarMagicResistance: "",
  },
  menu_name: "英雄库",
  menu: {
    menu_code: "e52b47a91c5",
    menu_mark: "chessInformation",
    menu_name: "英雄库",
  },
  parent_menu: {
    menu_code: "e52b47a9172",
    menu_mark: "gameInformation",
    menu_name: "游戏资料",
  },
  status: 10,
  sort: 3,
  language: "en",
  created_at: "2019-12-18",
  updated_at: "2020-08-12",
};

const categories = [
  {
    text: "Beast",
    active: true,
  },
  {
    text: "Insectoid",
    active: true,
  },
  {
    text: "Cave",
    active: true,
  },
  {
    text: "Demon",
    active: true,
  },
  {
    text: "Divinity",
    active: true,
  },
  {
    text: "Dragon",
    active: true,
  },
  {
    text: "Egersis",
    active: true,
  },
  {
    text: "Human",
    active: true,
  },
  {
    text: "Dwarf",
    active: true,
  },
  {
    text: "Feathered",
    active: true,
  },
  {
    text: "Glacier",
    active: true,
  },
  {
    text: "Goblin",
    active: true,
  },
  {
    text: "Kira",
    active: true,
  },
  {
    text: "Marine",
    active: true,
  },
  {
    text: "Spirits",
    active: true,
  },
];
const types = [
  {
    text: "Druid",
    active: true,
  },
  {
    text: "Warrior",
    active: true,
  },
  {
    text: "Assassin",
    active: true,
  },
  {
    text: "Shaman",
    active: true,
  },
  {
    text: "Hunter",
    active: true,
  },
  {
    text: "Wizard",
    active: true,
  },
  {
    text: "Knight",
    active: true,
  },
  {
    text: "Witcher",
    active: true,
  },
  {
    text: "Warlock",
    active: true,
  },
  {
    text: "Priest",
    active: true,
  },
  {
    text: "Mage",
    active: true,
  },
  {
    text: "Mech",
    active: true,
  },
  {
    text: "None",
    active: true,
  },
];

const categoriesBuffs = {
  Beast: {
    buff:
      "<strong>2:</strong> All Allies +15% ATK, including the summoned. <br><strong>4:</strong> All Allies +30% ATK, including the summoned. <br><strong>6:</strong> All Allies +30% ATK, including the summoned. The enemy will take 20 extra Physical Damage when attacked by an ally who benefits from the Beast Synergy, can be stacked.",
    count: 0,
  },
  Insectoid: {
    buff:
      "<strong>2:</strong> When there are duplicate allied pieces on the chessboard and one of them dies, summons a random insectoid piece based on the highest cost among the living duplicates. <br><strong>4:</strong> When there are duplicate non-Insectoid allied pieces on the chessboard and one of them dies, summons a random insectoid piece based on the highest cost or +1 among the living duplicates.",
    count: 0,
  },
  Cave: {
    buff:
      "<strong>2:</strong> All allies gain +150 HP. <br><strong>4:</strong> All allies gain +400 HP. <br><strong>6:</strong> All allies gain +450 HP. Ally HP is boosted equal to 900x the percentage of the chess player's missing HP.",
    count: 0,
  },
  Demon: {
    buff:
      "<strong>1:</strong> Attack deals 50% extra pure damage to the target. Activates when only one kind of ally demon is on the chessboard.",
    count: 0,
  },
  Divinity: {
    buff:
      "<strong>2:</strong> Reduces Ability CD by 45% for all Divinities and other allies whose Race's synergies are not triggered. <br><strong>4:</strong> Reduces Ability CD by 70% for all Divinities and other allies whose Race's synergies are not triggered.",
    count: 0,
  },
  Dragon: {
    buff:
      "<strong>3:</strong> At the start of the battle, 3 allied Dragons have 100 mana. (When there are more than 3 allied Dragons on the Chessboard, those deployed on the relative left will get the effects in priority. <br><strong>5:</strong> At the start of the battle, 6 allies have 100 mana. (When there are more than 6 allies on the Chessboard, those deployed on the relative left will get the effects in priority).",
    count: 0,
  },
  Egersis: {
    buff:
      "<strong>2:</strong> All Enemies lose 4 Armor. <br><strong>4:</strong> All Enemies lose 8 Armor. <br><strong>6:</strong> All enemies lose 10 Armor. If an ally is killed by these enemies, it will continue to survive for 3.5 seconds. (It won't receive normal attacks, nor can it casts abilities).",
    count: 0,
  },
  Human: {
    buff:
      "<strong>3:</strong> After winning a battle against another player, if at least one ally Human survives, gets EXP Book x1. <br><strong>6:</strong> After winning a battle against another player, if at least one ally Human survives, gets EXP Book x4.",
    count: 0,
  },
  Dwarf: {
    buff:
      "<strong>1:</strong> Increases attack range by 2 grids, within the range, targets enemy with the lowest HP first. <br><strong>2:</strong> Increases all ranged allies attack range by 2 grids. Within the range, target enemy with the lowest HP first.",
    count: 0,
  },
  Feathered: {
    buff:
      "<strong>3:</strong> All allied Feathered have a 20% chance to evade attacks. <br><strong>6:</strong> All allied Feathered have a 40% chance to evade attacks, and other Allies have a 25% chance to evade attacks. <br><strong>9:</strong> All allied Feathered have a 65% chance to evade attacks, and other Allies have a 42% chance to evade attacks.",
    count: 0,
  },
  Glacier: {
    buff:
      "<strong>2:</strong> All allied Glaciers +35% Attack Speed. <br><strong>4:</strong> All allied Glaciers +75% Attack Speed, and other Allies gain +40% Attack Speed. <br><strong>6:</strong> All Allies +75% Attack Speed.",
    count: 0,
  },
  Goblin: {
    buff:
      "<strong>3:</strong> Grants a random Ally +15 Armor and +20 HP regeneration. <br><strong>6:</strong> Grants All Allies +15 Armor and +20 HP regeneration.",
    count: 0,
  },
  Kira: {
    buff:
      "<strong>2:</strong> If any melee ally dies, increases max HP by 20%, ATK by 20% for all allied Kiras, can be stacked 7 times.",
    count: 0,
  },
  Marine: {
    buff:
      "<strong>2:</strong> All Allies gain +30% Magic Resistance. <br><strong>4:</strong> All Allies gain +60% Magic Resistance.",
    count: 0,
  },
  Spirits: {
    buff:
      "<strong>2:</strong> All allied Spirits gain a 35% chance to petrify the attacker for 3.5 seconds when under melee attacks. Pierces ability immunity. Petrify: unable to attack, move or cast abilities. <br><strong>4:</strong> All allies gain a 35% chance to petrify the attacker for 3.5 seconds when under melee attacks. Pierces ability immunity. Petrify: unable to attack, move or cast abilities.",
    count: 0,
  },
};

const typesBuffs = {
  Druid: {
    buff:
      "<strong>2:</strong> Require 1 less pieces when upgrading from 1-Star Druid to 2-Star. <br><strong>4:</strong> Require 1 less pieces when upgrading Druid.",
    count: 0,
  },
  Warrior: {
    buff:
      "<strong>3:</strong> All allied Warriors gain +6 Armor. <br><strong>6:</strong> All allied Warriors gain +12 Armor. <br><strong>9:</strong> Increases 16 Armor for all allied Warriors. When receiving physical or magical damage, reflects pure damage equals to the value of the recipient's Armor.",
    count: 0,
  },
  Assassin: {
    buff:
      "<strong>3:</strong> All allied Assassins get a 15% chance to deal 300% damage, and 50% chance to deal 300% damage with their first Base Attack in each round. <br><strong>6:</strong> All allied Assassins get a 20% chance to deal 350% damage, and 100% chance to deal 350% damage with their first Base Attack in each round. <br><strong>9:</strong> All allies get a 30% chance to deal 450% damage, and 100% chance to deal 450% damage with their first Base Attack in each round.",
    count: 0,
  },
  Shaman: {
    buff:
      "<strong>2:</strong> At the start of a battle, hexes a random enemy into penguin for 6 seconds. <br><strong>4:</strong> At the start of a battle, hexes a random enemy into penguin for 6 seconds. And all Shamans get a buff: when killed by an enemy piece, hexes the enemy into a random chess piece of the same cost and the same star level.",
    count: 0,
  },
  Hunter: {
    buff:
      "<strong>3:</strong> All allied Hunters gain +25 ATK and have a 50% chance to not miss on attacks. <br><strong>6:</strong> All allied Hunters gain +85 ATK and have a 65% chance to not miss on attacks.",
    count: 0,
  },
  Wizard: {
    buff:
      "<strong>(WIP Combination)</strong><strong>2:</strong> 1 less chess piece(s) are required for activating synergy with at least 4 unique chess pieces. <br><strong>4:</strong> 1 less chess piece(s) are required for activating synergy with at least 4 unique chess pieces; if your deployed chess pieces activate only one synergy of a race/class other than Wizard synergy, then the highest tier of this synergy will be activated immediately.",
    count: 0,
  },
  Knight: {
    buff:
      "<strong>2:</strong> All allied Knights gain a 25% chance in every 2 seconds to obtain a damage-reducing shield which grants 75% of Magic Resistance, 25 of Armor and 10 HP Regeneration per second. The chance is 100% at the beginning of each round. <br><strong>4:</strong> All allied Knights gain a 45% chance in every 2 seconds to obtain a damage-reducing shield which grants 75% of Magic Resistance, 25 of Armor and 20 HP Regeneration per second. The chance is 100% at the beginning of each round.. <br><strong>6:</strong> All allied Knights gain a 65% chance in every 2 seconds to obtain a damage-reducing shield which grants 75% of Magic Resistance, 25 of Armor and 30 HP Regeneration per second. The chance is 100% at the beginning of each round.",
    count: 0,
  },
  Witcher: {
    buff:
      "<strong>1:</strong> If there's any Demon pieces on the enemy Chessboard, the enemy Demon types will be increased by 1. <br><strong>2:</strong> If there's any Demon pieces on the enemy Chessboard, the enemy Demon types will be increased by 1. Views all ally Demons as one type.",
    count: 0,
  },
  Warlock: {
    buff:
      "<strong>2:</strong> Grants a 10% Lifesteal to attacks and abilities of all Allies. <br><strong>4:</strong> Grants a 30% Lifesteal to attacks and abilities of all Allies. <br><strong>6:</strong> Grants a 40% Lifesteal to attacks and abilities of all Allies, when an enemy is killed, the nearest ally will be granted with this enemy's Max HP and mana.",
    count: 0,
  },
  Priest: {
    buff:
      "<strong>1:</strong> When the chess player receives more than 2 damage, blocks 20% of damage for the chess player. <br><strong>2:</strong> When the chess player receives more than 2 damage, blocks 20% of damage for the chess player, and if the chess player receives more than 8 damage, gets Green Essence x1.",
    count: 0,
  },
  Mage: {
    buff:
      "<strong>3:</strong> All Enemy lose 40% Magic Resistance. <br><strong>6:</strong> All Enemy lose 90% Magic Resistance. <br><strong>9:</strong> All Enemy lose 135% Magic Resistance.",
    count: 0,
  },
  Mech: {
    buff:
      "<strong>3:</strong> After winning a battle against another player, if at least one ally Mech survives, gets Heart of Mech x1. <br><strong>6:</strong> After winning a battle against another player, if at least one ally Mech survives, gets Golden Heart of Mech x1.",
    count: 0,
  },
};

export { base, baseComplete, types, categories, categoriesBuffs, typesBuffs };
