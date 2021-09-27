interface BodyValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BodyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (a: number, b: number): string => {
  const m = a/100;
  const bmi = b/(m*m);
  console.log(bmi);

    if(bmi < 17){
      return "Low (Underweight)";
    }
    else if(bmi > 17 && bmi < 25){
      return "Normal (healthy weight)";
    }
    else if(bmi > 25){
      return "High (Overweight)"
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

// console.log(calculateBmi(180, 34))
// npm run calculateBmi 180 91