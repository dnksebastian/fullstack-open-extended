interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export interface ValidateInput {
  target: number,
  daily_exercises: number[]
}


const validateArguments = (args: string[]): ValidateInput => {
  if (args.length < 4) throw new Error('Not enough arguments');


  const input = args.slice(2);
  const validatedInput :number[] = [];

  input.forEach((el) => {
    if(!isNaN(Number(el))) {
      validatedInput.push(+el);
    } else {
      throw new Error('Provided values were not numbers!');
    }
  });

  const target = validatedInput[0];
  const daily_exercises = validatedInput.slice(1);

  return {
    target,
    daily_exercises
  };
};



export const calculateExercises = (...args: number[]): Result => {

  const inputArgs = [...args].slice(1);
  const target = [...args][0];

  const periodLength = inputArgs.length;
  const trainingDays = inputArgs.filter(d => d > 0).length;
  
  const hoursSum = inputArgs.reduce((acc, curr) => acc + curr, 0);
  const average = (hoursSum / periodLength);

  const success = average >= target ? true : false;

  const successPercent = +(average / target).toFixed(2);

  let rating;
  let ratingDescription;

  if (successPercent < 0.5) {
    rating = 1;
    ratingDescription = 'work harder';
  }
  else if (successPercent < 0.97) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }
  else {
    rating = 3;
    ratingDescription = 'very good!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try{
  const { target, daily_exercises } = validateArguments(process.argv);
  const result = calculateExercises(target, ...daily_exercises);
  console.log(result);
}
catch(err: unknown) {
  let errMsg = 'Something went wrong, try again.';
  if(err instanceof Error) {
    errMsg += 'Error: ' + err.message;
  }
  console.log(errMsg);
}