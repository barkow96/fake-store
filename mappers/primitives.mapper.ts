import { EntryId } from "@/types";
import { logWarn } from "@/utils";

export const isBoolean = (val: unknown): val is boolean => {
  return typeof val === "boolean";
};

export const isNumber = (val: unknown): val is number => {
  return typeof val === "number";
};

export const isString = (val: unknown): val is string => {
  return typeof val === "string";
};

export const isObject = (val: unknown): val is object => {
  return typeof val === "object" && val !== null && !Array.isArray(val);
};

export const isArray = <T>(val: unknown): val is T[] => {
  return Array.isArray(val);
};

export const assureBoolean = (
  val: unknown,
  path = "",
  defaultValue = false,
): boolean => {
  if (isBoolean(val)) return val;

  const logMessage =
    path === ""
      ? `Value is not a BOOLEAN, returning default value: ${defaultValue}`
      : `Value is not a BOOLEAN at path: ${path}, returning default value: ${defaultValue}`;

  logWarn(logMessage, { val });

  return defaultValue;
};

export const assureNumber = (
  val: unknown,
  path = "",
  defaultValue = 0,
): number => {
  if (isNumber(val)) return val;

  const logMessage =
    path === ""
      ? `Value is not a NUMBER, returning default value: ${defaultValue}`
      : `Value is not a NUMBER at path: ${path}, returning default value: ${defaultValue}`;

  logWarn(logMessage, { val });

  return defaultValue;
};

export const assureString = (
  val: unknown,
  path = "",
  defaultValue = "",
): string => {
  if (isString(val)) return val;

  const logMessage =
    path === ""
      ? `Value is not a STRING, returning default value: ${defaultValue}`
      : `Value is not a STRING at path: ${path}, returning default value: ${defaultValue}`;

  logWarn(logMessage, { val });

  return defaultValue;
};

export const assureArray = <T>(
  val: unknown,
  path = "",
  defaultValue = [] as T[],
): T[] => {
  if (isArray<T>(val)) return val;

  const logMessage =
    path === ""
      ? `Value is not an ARRAY, returning default value: ${defaultValue}`
      : `Value is not an ARRAY at path: ${path}, returning default value: ${defaultValue}`;

  logWarn(logMessage, { val });

  return defaultValue;
};

export const assureEntryId = (
  val: unknown,
  path = "",
  defaultValue = 0 as EntryId,
): EntryId => {
  if (isNumber(val)) return val;

  const logMessage =
    path === ""
      ? `Value is not an ENTRY ID, returning default value: ${defaultValue}`
      : `Value is not an ENTRY ID at path: ${path}, returning default value: ${defaultValue}`;

  logWarn(logMessage, { val });

  return defaultValue;
};
