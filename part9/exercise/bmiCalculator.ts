export const calculateBmi = (h: number, w: number): string => {
  const bmi = w / (h / 100) ^ 2
  if (bmi > 0) {
    return 'Normal (healthy weight)'
  } else {
    return 'Normal (healthy weight)'
  }
}

// console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])))
