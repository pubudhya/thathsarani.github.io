document.addEventListener("DOMContentLoaded", function () {
  const userDetailsForm = document.getElementById("userDetailsForm");
  const continueBtn = document.getElementById("continueBtn");
  const summaryFullName = document.getElementById("summaryFullName");
  const summaryMobileNumber = document.getElementById("summaryMobileNumber");
  const summaryEmail = document.getElementById("summaryEmail");
  const summaryConfirmEmail = document.getElementById("summaryConfirmEmail");
  const summaryGender = document.getElementById("summaryGender");

  // Retrieve ticket summary data from local storage
  const ticketSummaryData = JSON.parse(localStorage.getItem("ticketSummary"));

  if (ticketSummaryData) {
    summaryFullName.textContent = ticketSummaryData.fullName;
    summaryMobileNumber.textContent = ticketSummaryData.mobileNumber;
    summaryEmail.textContent = ticketSummaryData.email;
    summaryConfirmEmail.textContent = ticketSummaryData.confirmEmail;
    summaryGender.textContent = ticketSummaryData.gender;
  }

  userDetailsForm.addEventListener("input", function () {
    validateForm();
  });

  userDetailsForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const countryCode = document.getElementById("countryCode").value;
    const mobileNumber = document.getElementById("mobileNumber").value;
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirmEmail").value;
    const gender = document.getElementById("gender").value;

    // Validate data
    if (!validateFullName(fullName) || !validateMobileNumber(mobileNumber) || !validateEmail(email) || !validateConfirmEmail(email, confirmEmail)) {
      return;
    }

    // Store user details in local storage
    const userDetails = {
      fullName: fullName,
      mobileNumber: countryCode + mobileNumber,
      email: email,
      confirmEmail: confirmEmail,
      gender: gender,
    };

    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    // Navigate to payment page
    window.location.href = "payment.html";
  });

  function validateForm() {
    const fullName = document.getElementById("fullName").value;
    const mobileNumber = document.getElementById("mobileNumber").value;
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirmEmail").value;

    const isValidFullName = validateFullName(fullName);
    const isValidMobileNumber = validateMobileNumber(mobileNumber);
    const isValidEmail = validateEmail(email);
    const isValidConfirmEmail = validateConfirmEmail(email, confirmEmail);

    continueBtn.disabled = !(isValidFullName && isValidMobileNumber && isValidEmail && isValidConfirmEmail);
  }

  function validateFullName(name) {
    if (name.trim() === "") {
      showError("fullName", "Full name is required.");
      return false;
    }
    clearError("fullName");
    return true;
  }

  function validateMobileNumber(number) {
    if (!/^\d{9}$/.test(number)) {
      showError("mobileNumber", "Mobile number must be 9 digits.");
      return false;
    }
    clearError("mobileNumber");
    return true;
  }

  function validateEmail(email) {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showError("email", "Invalid email format.");
      return false;
    }
    clearError("email");
    return true;
  }

  function validateConfirmEmail(email, confirmEmail) {
    if (email !== confirmEmail) {
      showError("confirmEmail", "Emails do not match.");
      return false;
    }
    clearError("confirmEmail");
    return true;
  }

  function showError(fieldId, message) {
    const errorField = document.querySelector(`#${fieldId} ~ .error-message`);
    if (errorField) {
      errorField.textContent = message;
    } else {
      const field = document.getElementById(fieldId);
      const errorMessage = document.createElement("div");
      errorMessage.className = "error-message";
      errorMessage.textContent = message;
      field.parentNode.insertBefore(errorMessage, field.nextSibling);
    }
  }

  function clearError(fieldId) {
    const errorField = document.querySelector(`#${fieldId} ~ .error-message`);
    if (errorField) {
      errorField.parentNode.removeChild(errorField);
    }
  }
});

