export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 6 characters
  return password.length >= 6;
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validateAge = (age: number): boolean => {
  return age >= 13 && age <= 120;
};

export const validateWeight = (weight: number): boolean => {
  return weight >= 30 && weight <= 300;
};

export const validateHeight = (height: number): boolean => {
  return height >= 100 && height <= 250;
};
