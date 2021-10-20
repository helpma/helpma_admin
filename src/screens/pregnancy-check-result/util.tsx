export const calculateImt = (weight?: number, height?: number): number => {
  if (!weight || !height) {
    return 0;
  }
  const heightInMeter = height / 100;
  return weight / (heightInMeter * heightInMeter);
};

interface CategorizeImtAndGetRecommendedWeightResult {
  category: string;
  recommendedWeight: number[];
}

const RecommendedWeightChangeDict: number[][] = [
  [12.5, 18],
  [11.5, 16],
  [7, 11.6],
  [5, 9],
];

export const categorizeImtAndGetRecommendedWeight = (
  imt: number,
): CategorizeImtAndGetRecommendedWeightResult => {
  let category: string = '',
    recommendedWeight: number[] = [];
  if (imt < 18.5) {
    category = 'Berat Badan Kurang';
    recommendedWeight = RecommendedWeightChangeDict[0];
  } else if (imt >= 18.5 && imt < 25) {
    category = 'Berat Badan Normal';
    recommendedWeight = RecommendedWeightChangeDict[1];
  } else if (imt >= 25 && imt < 30) {
    category = 'Kelebihan Berat Badan';
    recommendedWeight = RecommendedWeightChangeDict[2];
  } else {
    category = 'Obesitas';
    recommendedWeight = RecommendedWeightChangeDict[3];
  }

  return {
    category,
    recommendedWeight,
  };
};
