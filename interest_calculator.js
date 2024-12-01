const principalInput = document.querySelector("#principal");
const rateInput = document.querySelector("#rate");
const frequencyInput = document.querySelector("#frequency");
const timeInput = document.querySelector("#time");
const answerOutput = document.querySelector("#answer");
const percentageOutput = document.querySelector("#ratePercentage");

principalInput.addEventListener("input", updateCompoundInterest);
rateInput.addEventListener("input", updateCompoundInterest);
frequencyInput.addEventListener("input", updateCompoundInterest);
timeInput.addEventListener("input", updateCompoundInterest);

const compoundFormula = (p, r, n, t) => p * (1 + r / n) ** (n * t);
const continuousFormula = (p, r, n, t) => p * n ** (r * t);

function updateCompoundInterest() {
  let frequency;
  let totalInterest;
  // Checks the input for frequency.
  switch (frequencyInput.value) {
    case "Yearly":
      frequency = 1;
      break;
    case "Quarterly":
      frequency = 4;
      break;
    case "Monthly":
      frequency = 12;
      break;
    case "Daily":
      frequency = 365;
      break;
    case "Continuously":
      frequency = Math.E;
      break;
    // If input is not selected yet.
    default:
      frequency = NaN;
      break;
  }

  // Recalibrates Annual Interest Rate to be in range of 0-10%.
  const percentageRate = Number(rateInput.value) / 10;
  const trueRate = percentageRate / 100;
  percentageOutput.textContent = percentageRate + "%";

  // Calculates the total interest depending on the formula.
  totalInterest = (
    frequencyInput.value !== "Continuously"
      ? compoundFormula
      : continuousFormula
  )(Number(principalInput.value), trueRate, frequency, Number(timeInput.value));

  // Outputs ? if the frequency selection is still ---.
  if (frequencyInput.value === "Unknown") {
    answerOutput.textContent = "?";
  } else {
    answerOutput.textContent = totalInterest.toFixed(2);
  }
}
