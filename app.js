document.querySelector("#loan-form").addEventListener("submit", function (e) {
  e.preventDefault();

  document.getElementById("results").style.display = "none";
  document.getElementById("loader").style.display = "block";

  setTimeout(calculatePremiumAmount, 2000);
});

function calculatePremiumAmount() {
  //   alert("hello");
  //   e.preventDefault();

  const amount = document.querySelector("#loan-amount");
  const interest = document.querySelector("#interets");
  const years = document.querySelector("#years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principalAmount = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPremium = parseFloat(years.value) * 12;

  //compute monthly
  const x = Math.pow(1 + calculatedInterest, calculatedPremium);
  const monthly = (principalAmount * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPremium).toFixed(2);
    totalInterest.value = (
      monthly * calculatedPremium -
      principalAmount
    ).toFixed(2);

    document.getElementById("results").style.display = "block";
    document.getElementById("loader").style.display = "none";
  } else {
    // alert("Please provide proper value");
    showError("Please provide valid values for calcualation");
  }
}

function showError(errorMsg) {
  //create div element
  const errorDiv = document.createElement("div");

  //get elements

  const card = document.querySelector(".card");
  const heading = document.querySelector("#heading");

  //add class
  errorDiv.className = "alert alert-danger";

  errorDiv.appendChild(document.createTextNode(errorMsg));

  card.insertBefore(errorDiv, heading);

  document.getElementById("results").style.display = "none";
  document.getElementById("loader").style.display = "none";
  //remove header
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
