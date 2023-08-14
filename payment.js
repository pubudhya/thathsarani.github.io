document.addEventListener("DOMContentLoaded", function () {
  const cardNumberInput = document.getElementById("cardNumber");
  const expiryDateInput = document.getElementById("expiryDate");
  const cvcInput = document.getElementById("cvc");
  const nameOnCardInput = document.getElementById("nameOnCard");
  const payButton = document.getElementById("payButton");
  const cardError = document.getElementById("cardError");
  const expiryError = document.getElementById("expiryError");
  const cvcError = document.getElementById("cvcError");

  cardNumberInput.addEventListener("input", validateForm);
  expiryDateInput.addEventListener("input", validateForm);
  cvcInput.addEventListener("input", validateForm);
  nameOnCardInput.addEventListener("input", validateForm);

  function validateForm() {
    const cardNumber = cardNumberInput.value.trim();
    const expiryDate = expiryDateInput.value.trim();
    const cvc = cvcInput.value.trim();

  
    if (!isCardValid(cardNumber)) {
      cardError.textContent = "Invalid card number";
    } else {
      cardError.textContent = "";
    }

   
    if (!isExpiryValid(expiryDate)) {
      expiryError.textContent = "Invalid expiry date (MM/YY)";
    } else {
      expiryError.textContent = "";
    }

    
    if (cvc.length !== 3) {
      cvcError.textContent = "CVC/CVV should be exactly 3 characters";
    } else {
      cvcError.textContent = "";
    }

    if (
      isCardValid(cardNumber) &&
      isExpiryValid(expiryDate) &&
      cvc.length === 3 &&
      nameOnCardInput.value.trim().length > 0
    ) {
      payButton.disabled = false;
    } else {
      payButton.disabled = true;
    }
  }

  function isCardValid(cardNumber) {
    
    return /^\d{16}$/.test(cardNumber); 
  }

  function isExpiryValid(expiryDate) {
  
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      return false;
    }

    const [month, year] = expiryDate.split('/');
    const currentYear = new Date().getFullYear() % 100; 
    const currentMonth = new Date().getMonth() + 1; 

    return (year > currentYear) || (year == currentYear && month >= currentMonth);
  }

  payButton.addEventListener("click", function () {
   
    const amount = 100; 

    localStorage.setItem("cardNumber", cardNumberInput.value);
    localStorage.setItem("expiryDate", expiryDateInput.value);
    localStorage.setItem("nameOnCard", nameOnCardInput.value);
    localStorage.setItem("amount", amount);


    window.location.href = "confirmation.html";
  });
});
