// Mifflin-St Jeor Formula for calculating daily calorie needs
export const calculateDailyCalories = (
  weight: number, // in kg
  height: number, // in cm
  age: number,
  gender: 'male' | 'female',
  activityLevel:
    | 'sedentary'
    | 'light'
    | 'moderate'
    | 'active'
    | 'very_active',
  goal: 'loss' | 'maintain' | 'gain',
): number => {
  // Calculate BMR (Basal Metabolic Rate)
  let bmr: number;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Activity multipliers
  const activityMultipliers = {
    sedentary: 1.2, // Little or no exercise
    light: 1.375, // Light exercise 1-3 days/week
    moderate: 1.55, // Moderate exercise 3-5 days/week
    active: 1.725, // Heavy exercise 6-7 days/week
    very_active: 1.9, // Very heavy exercise, physical job
  };

  // Calculate TDEE (Total Daily Energy Expenditure)
  const tdee = bmr * activityMultipliers[activityLevel];

  // Adjust for goal
  switch (goal) {
    case 'loss':
      return Math.round(tdee - 500); // 500 calorie deficit for weight loss
    case 'gain':
      return Math.round(tdee + 500); // 500 calorie surplus for weight gain
    case 'maintain':
    default:
      return Math.round(tdee);
  }
};

export const calculateMacros = (calories: number, goal: 'loss' | 'maintain' | 'gain') => {
  let proteinPercent = 0.3;
  let carbsPercent = 0.4;
  let fatPercent = 0.3;

  if (goal === 'loss') {
    proteinPercent = 0.35;
    carbsPercent = 0.35;
    fatPercent = 0.3;
  } else if (goal === 'gain') {
    proteinPercent = 0.25;
    carbsPercent = 0.5;
    fatPercent = 0.25;
  }

  return {
    protein: Math.round((calories * proteinPercent) / 4), // 4 cal per gram
    carbs: Math.round((calories * carbsPercent) / 4), // 4 cal per gram
    fat: Math.round((calories * fatPercent) / 9), // 9 cal per gram
  };
};

export const calculateBMI = (weight: number, height: number): number => {
  // weight in kg, height in cm
  const heightInMeters = height / 100;
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};
