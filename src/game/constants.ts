// https://stackoverflow.com/questions/66993264/what-does-the-as-const-mean-in-typescript-and-what-is-its-use-case
export const RESOURCES_TYPES = {
  GOLD: 1,
  FOOD: 2,
  STONE: 3,
  DIAMOND: 4,
  SPECIAL_RESOURCE: 5,
  UNKNOWN: 99999,
} as const; // "as const" = const assertion (used to ensure that TS infer the most specific type as it can, without it, TS will infer a more general type)

export const PLAYER_COLORS = ["#4ade80", "red", "purple", "blue"];
