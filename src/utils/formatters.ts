import {format, parseISO} from 'date-fns';

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
};

export const formatTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'hh:mm a');
};

export const formatCalories = (calories: number): string => {
  return `${Math.round(calories)} cal`;
};

export const formatMacro = (grams: number): string => {
  return `${Math.round(grams)}g`;
};

export const formatWeight = (weight: number): string => {
  return `${weight.toFixed(1)} kg`;
};

export const formatHeight = (height: number): string => {
  return `${height} cm`;
};

export const getMealTypeEmoji = (
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
): string => {
  const emojis = {
    breakfast: '🍳',
    lunch: '🍽️',
    dinner: '🍕',
    snack: '🍪',
  };
  return emojis[mealType] || '🍴';
};

export const getMealTypeLabel = (
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
): string => {
  return mealType.charAt(0).toUpperCase() + mealType.slice(1);
};
