// ================= Dark Mode Toggle =================
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// ================= BMI Calculator =================
function calculateBMI() {
  let w = parseFloat(document.getElementById("weight").value);
  let h = parseFloat(document.getElementById("height").value)/100;

  if (!w || !h) {
    document.getElementById("bmiResult").innerText = "Please enter valid numbers!";
    document.getElementById("bmiResult").className = "";
    document.getElementById("advice").innerText = "";
    document.getElementById("targetWeightInfo").innerText = "";
    return;
  }

  let bmi = w / (h*h);
  bmi = bmi.toFixed(1);

  let category = "";
  let advice = "";
  let className = "";

  if (bmi < 18.5) {
    category = "Underweight";
    advice = "You may need to eat more nutritious food.";
    className = "underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    category = "Normal";
    advice = "Your weight is in a healthy range.";
    className = "normal";
  } else if (bmi >= 25 && bmi < 30) {
    category = "Overweight";
    advice = "Consider a balanced diet and regular exercise.";
    className = "overweight";
  } else {
    category = "Obese";
    advice = "Consult a doctor or dietitian for guidance.";
    className = "obese";
  }

  document.getElementById("bmiResult").innerText = `BMI: ${bmi} — ${category}`;
  document.getElementById("bmiResult").className = className;
  document.getElementById("advice").innerText = advice;

  // Target weight range
  let minWeight = (18.5 * h * h).toFixed(1);
  let maxWeight = (24.9 * h * h).toFixed(1);
  document.getElementById("targetWeightInfo").innerText =
    `Target weight range for healthy BMI: ${minWeight} kg – ${maxWeight} kg`;
}

// ================= Age Calculator =================
function calculateAge() {
  let dob = new Date(document.getElementById("dob").value);
  let today = new Date();

  if (!dob.getTime()) {
    document.getElementById("ageResult").innerText = "Please enter a valid date!";
    return;
  }

  let ageYears = today.getFullYear() - dob.getFullYear();
  let monthDiff = today.getMonth() - dob.getMonth();
  let ageMonths = monthDiff;
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    ageYears--;
    ageMonths = 12 + monthDiff;
  }

  document.getElementById("ageResult").innerText =
    `You are ${ageYears} years and ${ageMonths} months old.`;
}

// ================= Calorie Calculator =================
function calculateCalories() {
  let weight = parseFloat(document.getElementById("weight").value);
  let height = parseFloat(document.getElementById("height").value);
  let age = parseInt(document.getElementById("age").value);
  let gender = document.getElementById("gender").value;
  let activity = parseFloat(document.getElementById("activity").value);
  let eaten = parseFloat(document.getElementById("eaten").value);

  if (!weight || !height || !age || !gender || !activity) {
    document.getElementById("calorieResult").innerHTML = "Please fill all fields!";
    document.getElementById("recommendation").innerHTML = "";
    return;
  }

  // Mifflin-St Jeor Equation
  let bmr;
  if (gender === "male") {
    bmr = 10*weight + 6.25*height - 5*age + 5;
  } else {
    bmr = 10*weight + 6.25*height - 5*age - 161;
  }

  let calories = Math.round(bmr * activity);

  document.getElementById("calorieResult").innerHTML =
    `Your estimated daily calories: <strong>${calories} kcal</strong>`;

  if (!eaten) {
    document.getElementById("recommendation").innerHTML =
      "Enter how many calories you eat to get recommendations.";
  } else if (eaten < calories) {
    document.getElementById("recommendation").innerHTML =
      "You may need to eat more calories to meet your body's needs.";
  } else if (eaten > calories) {
    document.getElementById("recommendation").innerHTML =
      "You may be consuming more calories than your body needs.";
  } else {
    document.getElementById("recommendation").innerHTML =
      "Your intake matches your estimated daily needs. Good job!";
  }
}
