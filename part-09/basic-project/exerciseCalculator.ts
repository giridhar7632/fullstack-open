interface result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number 
}

interface exerciseValues {
  exercises: Array<number>;
  target: number;
}

const parseArguments = (args: Array<string>): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const [, , target, ...exercises] = args

  return {
    exercises: exercises.map(i => Number(i)),
    target: Number(target)
  }
}

const exerciseCalculator = (exercises: Array<number>, target: number): result => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter(i => i>0).length;
  const average = ((exercises.reduce((a, b) => a + b, 0)) / periodLength);

  let rating;
  let ratingDescription;
  if(average === target){
    rating = 3;
    ratingDescription = 'Well done!';
  }
  else if(average - target < 0 && average - target >= -0.5){
    rating = 2;
    ratingDescription = "not too bad but could be better"
  } else {
    rating = 1;
    ratingDescription = "Well tried!"
  }

  return {
    periodLength, trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  }

}

try {
  const { exercises, target } = parseArguments(process.argv);
  console.log(exerciseCalculator(exercises, target));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

// console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))
// npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4