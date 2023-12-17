import wineJsonData from "../wine-data.json";
import { tableArrayType } from "../types/types";

//create new property gamma in wineJsonData
export const calculateGamma = () => {
  let data = wineJsonData.map((wine) => {
    const gamma =
      (Number(wine.Ash) * Number(wine.Hue)) / Number(wine.Magnesium);
    return { ...wine, Gamma: gamma };
  });
  return data;
};

export const calculateMean = (values: number[]): number => {
  const total = values.reduce((acc, val) => acc + val, 0);
  return parseFloat((total / values.length).toFixed(3));
};

export const calculateMedian = (values: number[]): number => {
  const mid = Math.floor(values.length / 2);
  const nums = [...values].sort((a, b) => a - b);
  return parseFloat(
    (values.length % 2 !== 0
      ? nums[mid]
      : (nums[mid - 1] + nums[mid]) / 2
    ).toFixed(3)
  );
};

export const calculateMode = (values: number[]): number => {
  let freq: Record<number, number> = {};
  let maxFreq = 0;
  let mode: number = 0;

  values.forEach((value) => {
    freq[value] = (freq[value] || 0) + 1;
    if (freq[value] > maxFreq) {
      maxFreq = freq[value];
      mode = value;
    }
  });

  let modeCount = 0;
  for (const key in freq) {
    if (freq[key] === maxFreq) {
      modeCount++;
    }
  }

  return modeCount === 1 ? parseFloat(mode.toFixed(3)) : parseFloat("0.000");
};
//call calculateGamma function for add Gamma property in wineJsonData
let wineData = calculateGamma();

// Utility function to calculate mean, median, and mode
export const calculateStats = (property: string, classKey: number) => {
  let filterData = wineData.filter((wine) => wine.Alcohol === Number(classKey));
  const values = filterData
    //@ts-ignore
    .map((entry) => Number(entry[property]));
  return {
    mean: calculateMean(values),
    median: calculateMedian(values),
    mode: calculateMode(values),
  };
};

export const classes = Array.from(
  new Set(wineData.map((entry) => entry.Alcohol))
);

//table Array for map the table
export const tableArray: tableArrayType[] = [
  { name: "Flavanoids", property: "Flavanoids" },
  { name: "Gamma", property: "Gamma" },
];
