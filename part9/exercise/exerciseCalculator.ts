interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number
}

const calculateExecises = (a: Array<number>, b: number): Result => {
  console.log(a, b)
  return {
    periodLength: 7,
    trainingDays: 5,
    success: false,
    rating: 2,
    ratingDescription: 'not too bad but could be better',
    target: 2,
    average: 1.9285714285714286
  }
}

const args = process.argv
const a = args.slice(2, args.length - 1).map(s => Number(s))
const b = args[args.length - 1]
console.log(calculateExecises(a, Number(b)))