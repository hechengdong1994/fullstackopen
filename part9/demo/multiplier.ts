const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
}

// Number("lol")返回NaN。这实际上是number类型，所以TypeScript没有能力将我们从这种情况下拯救出来。
// const a: number = Number(process.argv[2])
// const b: number = Number(process.argv[3])
// multiplicator(a, b, `Multiplied numbers ${a} and ${b}, the result is:`);

interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`)
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}