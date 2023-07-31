const calculateBmi = (height: number, weight: number): string => {
  const BMI = weight / ((height / 100) ** 2);

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
  console.log(calculateBmi(180, 74));
} catch (error: unknown) {
  let errMsg = "Something went wrong: "

  if (error instanceof Error) {
    errMsg += error.message;
  }
  console.log(errMsg);
}
