interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (args: number[], target: number): Result => {
  const periodLength = args.length
  const trainingDays = args.filter(d => d > 0).length
  
  const hoursSum = args.reduce((acc, curr) => acc + curr, 0)
  const average = (hoursSum / periodLength)

  const success = average >= target ? true : false

  const successPercent = +(average / target).toFixed(2)

  let rating
  let ratingDescription

  if (successPercent < 0.5) {
    rating = 1
    ratingDescription = 'work harder'
  }
  else if (successPercent < 0.97) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  }
  else {
    rating = 3
    ratingDescription = 'very good!'
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


calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2)