interface calculateValues {
  val1: number;
  val2: number;
}

const checkArgs = (args: string[]): calculateValues => {
  if (args.length < 4 || args.length > 4) {
    throw new Error("Please enter your height and weight")
  }

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      val1: Number(args[2]),
      val2: Number(args[3]),
    }
  } else {
    throw new Error("Please enter height in cm and weight in kg")
  }
}

const calculateBmi = (height: number, weight: number): string => {  
  const BMI = weight / (height / 100) ** 2;

  if (BMI < 18.5) {
    return "Underweight (not healthy weight)";
  } else if (BMI >= 18.5 && BMI < 25.5) {
    return "Normal (healthy weight)";
  } else if (BMI >= 24.5 && BMI < 30) {
    return "Overweight (not healthy weight)";
  } else if (BMI >= 30) {
    return "Obese (not healthy weight)";
  } else {
    throw new Error(
      "Could not calculate the result. Please check entered data"
    );
  }
};

try {
  const { val1, val2 } = checkArgs(process.argv)
  calculateBmi(val1, val2)
  console.log(calculateBmi(val1, val2))
} catch (error: unknown) {
  let errMsg = "Something went wrong: ";

  if (error instanceof Error) {
    errMsg += error.message;
  }
  console.log(errMsg);
}
