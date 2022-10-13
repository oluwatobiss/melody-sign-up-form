const bodyEle = document.querySelector("body");
const themeOptions = document.getElementById("theme-options");
const themeOptionItem = document.querySelectorAll(".theme-option");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const confirmationErrorText = document.getElementById("confirmation-error");

bodyEle.addEventListener("click", handleBodyClick);
confirmPasswordInput.addEventListener("input", handleInput);

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

    switch (clickedThemeOptionItem.id) {
      case "light-theme":
        appearanceIcon.innerText = "light_mode";
        root.classList.add("light");
        root.classList.remove("dark");
        root.classList.remove("device");
        break;
      case "dark-theme":
        appearanceIcon.innerText = "dark_mode";
        root.classList.remove("light");
        root.classList.add("dark");
        root.classList.remove("device");
        break;
      case "device-theme":
        appearanceIcon.innerText = "contrast";
        root.classList.remove("light");
        root.classList.remove("dark");
        root.classList.add("device");
        break;
      default:
        console.error("Error with selected theme");
    }
  }
}

function handleInput(e) {
  const valueEntered = e.target.value;

  if (passwordInput.checkValidity() && valueEntered === passwordInput.value) {
    e.target.classList.add("success");
    e.target.classList.remove("error");
    confirmationErrorText.classList.add("hidden");
  } else {
    e.target.classList.remove("success");
    e.target.classList.add("error");
  }
}
