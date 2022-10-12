const bodyEle = document.querySelector("body");
const themeOptions = document.getElementById("theme-options");
const themeOptionItem = document.querySelectorAll(".theme-option");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const emailErrorText = document.getElementById("email-error");
const phoneNumberInput = document.getElementById("phone-number");
const phoneNumberErrorText = document.getElementById("phone-number-error");
const passwordInput = document.getElementById("password");
const passwordErrorText = document.getElementById("password-error");
const confirmPasswordInput = document.getElementById("confirm-password");
const confirmationErrorText = document.getElementById("confirmation-error");

bodyEle.addEventListener("click", handleBodyClick);
firstNameInput.addEventListener("blur", handleBlur);
lastNameInput.addEventListener("blur", handleBlur);
emailInput.addEventListener("blur", handleBlur);
emailInput.addEventListener("focus", handleFocus);
phoneNumberInput.addEventListener("blur", handleBlur);
phoneNumberInput.addEventListener("focus", handleFocus);
passwordInput.addEventListener("blur", handleBlur);
passwordInput.addEventListener("focus", handleFocus);
confirmPasswordInput.addEventListener("blur", handleBlur);
confirmPasswordInput.addEventListener("focus", handleFocus);

function handleBodyClick(e) {
  const appearanceIcon = document.getElementById("appearance-icon");
  const themeOptionsIsActive = [...themeOptions.classList].includes("visible");
  const clickedAppearanceBtn = e.target.closest("#appearance-btn");
  const clickedThemeOptionsModal = e.target.id === "theme-options";
  const clickedThemeOptionItem = e.target.closest(".theme-option");

  if (
    themeOptionsIsActive &&
    !clickedThemeOptionsModal &&
    !clickedThemeOptionItem
  ) {
    themeOptions.classList.remove("visible");
    themeOptions.classList.add("hidden");
    return;
  }

  if (clickedAppearanceBtn) {
    themeOptions.classList.toggle("hidden");
    themeOptions.classList.toggle("visible");
  }

  if (clickedThemeOptionItem) {
    const root = document.documentElement;
    themeOptionItem.forEach((i) => i.classList.remove("selected-theme"));
    clickedThemeOptionItem.classList.add("selected-theme");

    if (clickedThemeOptionItem.id === "light-theme") {
      appearanceIcon.innerText = "light_mode";
      root.classList.add("light");
      root.classList.remove("dark");
      root.classList.remove("device");
    }

    if (clickedThemeOptionItem.id === "dark-theme") {
      appearanceIcon.innerText = "dark_mode";
      root.classList.add("dark");
      root.classList.remove("light");
      root.classList.remove("device");
    }

    if (clickedThemeOptionItem.id === "device-theme") {
      appearanceIcon.innerText = "contrast";
      root.classList.add("device");
      root.classList.remove("light");
      root.classList.remove("dark");
    }
  }
}

function handleBlur(e) {
  const blurredInput = e.target.id;
  const valueEntered = e.target.value;
  const emailPattern = /^([\w\.-]+)@([\w-]+)\.([a-z]){2,8}(\.[a-z]{2,8})?$/;
  const telephonePattern = /^\+?[\d]{4,20}$/;
  const passwordPattern = /^[.\S]{8,}$/;

  e.target.classList.remove("success");
  e.target.classList.remove("error");

  if (
    valueEntered &&
    (blurredInput === "first-name" || blurredInput === "last-name")
  ) {
    e.target.classList.add("success");
  }

  if (blurredInput === "email") {
    if (emailPattern.test(valueEntered)) {
      e.target.classList.add("success");
      emailErrorText.style.visibility = "hidden";
    } else {
      e.target.classList.add("error");
      emailErrorText.style.visibility = "visible";
    }
  }

  if (blurredInput === "phone-number") {
    if (telephonePattern.test(valueEntered)) {
      e.target.classList.add("success");
      phoneNumberErrorText.style.visibility = "hidden";
    } else {
      e.target.classList.add("error");
      phoneNumberErrorText.style.visibility = "visible";
    }
  }

  if (blurredInput === "password") {
    if (passwordPattern.test(valueEntered)) {
      e.target.classList.add("success");
      passwordErrorText.style.visibility = "hidden";
    } else {
      e.target.classList.add("error");
      passwordErrorText.style.visibility = "visible";
    }
  }

  if (blurredInput === "confirm-password") {
    if (passwordInput.value && valueEntered === passwordInput.value) {
      e.target.classList.add("success");
      confirmationErrorText.style.visibility = "hidden";
    } else {
      e.target.classList.add("error");
      confirmationErrorText.style.visibility = "visible";
    }
  }
}

function handleFocus(e) {
  const focusedInput = e.target.id;
  switch (focusedInput) {
    case "email":
      emailErrorText.style.visibility = "hidden";
      break;
    case "phone-number":
      phoneNumberErrorText.style.visibility = "hidden";
      break;
    case "password":
      passwordErrorText.style.visibility = "hidden";
      break;
    case "confirm-password":
      confirmationErrorText.style.visibility = "hidden";
      break;
    default:
      console.error("Can't find a case for " + focusedInput);
  }
}
