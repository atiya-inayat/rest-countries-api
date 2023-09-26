const searchParams = new URLSearchParams(window.location.search);
const countryName = searchParams.get("name");
const toggleSwitch = document.getElementById("toggle-btn");
const mainHeading = document.querySelector(".main-heading");
const backBtn = document.querySelector(".back-btn");
const header = document.querySelector(".header");
const toggleBtn = document.getElementById("toggle-btn");
const countryBorder = document.querySelector(".border-countries");
// borderCountries.forEach((country) => {
//   country.style.color = "hsl(0, 0%, 100%)";
// });

// toggle dark mode
function toggleDarkMode() {
  document.body.style.backgroundColor = "hsl(207, 26%, 17%)";
  mainHeading.style.backgroundColor = "hsl(207, 26%, 17%)";
  mainHeading.style.color = "hsl(0, 0%, 100%)";
  backBtn.style.backgroundColor = "hsl(209, 23%, 22%)";
  backBtn.style.color = "hsl(0, 0%, 100%)";
  header.style.backgroundColor = "hsl(207, 26%, 17%)";
  toggleBtn.style.color = "hsl(0, 0%, 100%)";
  changeBorderCountries();
}
// for border countries
function changeBorderCountries() {
  const borderCountries = document.querySelectorAll(".country_border");
  let i = 0;
  length = borderCountries.length;
  for (; i < length; i++) {
    borderCountries[i].style.color = "hsl(0, 0%, 100%)";
    borderCountries[i].style.backgroundColor = "hsl(207, 26%, 17%)";
  }
}
// toggle Light mode
function toggleLightMode() {
  document.body.style.backgroundColor = "hsl(0, 0%, 98%)";
  mainHeading.style.backgroundColor = "hsl(0, 0%, 100%)";
  mainHeading.style.color = "hsl(200, 15%, 8%)";
  backBtn.style.backgroundColor = "hsl(0, 0%, 100%)";
  backBtn.style.color = "hsl(200, 15%, 8%)";
  header.style.backgroundColor = "hsl(0, 0%, 100%)";
  toggleBtn.style.color = "hsl(200, 15%, 8%)";
  changeBorderCountriesLight();
}
// for border countries
function changeBorderCountriesLight() {
  const borderCountries = document.querySelectorAll(".country_border");
  let i = 0;
  length = borderCountries.length;
  for (; i < length; i++) {
    borderCountries[i].style.color = " hsl(200, 15%, 8%)";
    borderCountries[i].style.backgroundColor = "hsl(0, 0%, 100%)";
  }
}

//  switch theme dynamically
function switchTheme(event) {
  // console.log(event.target);
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    toggleLightMode("light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    toggleDarkMode();
  }
}

toggleSwitch.addEventListener("click", switchTheme);

// const borderCountry = document.querySelector(".country_border");
// console.log(borderCountry);
// get the name from the search params using searchParamsget("name")

// make api request to restCountries
// https://restcountries.com/v3.1/name/{name}

async function getCountry() {
  const get_Url = `https://restcountries.com/v3.1/name/${countryName}`;
  const response = await fetch(get_Url);
  let data = await response.json();

  data = data[0];

  // console.log({ data });

  // ge the response
  const name = document.getElementById("name");
  const nativeNameElement = document.getElementById("native-name");
  const populationElement = document.getElementById("population");
  const regionElement = document.getElementById("region");
  const subRegionElement = document.getElementById("sub-region");
  const capitalElement = document.getElementById("capital");
  const domainElement = document.getElementById("domain");
  const currencyElement = document.getElementById("currency");
  const languageElement = document.getElementById("language");
  const flagElement = document.getElementById("img");
  const borderCountriesElement = document.getElementById("border-countries");

  const [nativeName] = Object.values(data?.name?.nativeName);
  const [currency] = Object.values(data?.currencies);
  const [language] = Object.values(data?.languages);

  // console.log({ currency });

  name.innerText = data.name.common;
  nativeNameElement.innerText = nativeName
    ? nativeName.official
    : data.name.official;
  populationElement.innerText = data.population;
  regionElement.innerText = data.region;
  subRegionElement.innerText = data.subregion;
  capitalElement.innerText = data.capital;
  domainElement.innerText = data.demonyms.eng.f;
  currencyElement.innerText = currency.name;
  languageElement.innerText = language;

  flagElement.src = data.flags.svg;

  // make api request to https://restcountries.com/v3.1/alpha?codes={code},{code},{code}
  // and insert country codes in the url
  // country codes: data.borders=["ZAM", "NAM", "COD"]

  const url = `https://restcountries.com/v3.1/alpha?codes=${data.borders}`;

  const res = await fetch(url);

  const resData = await res.json();

  // console.log({ resData });

  resData.forEach((borderCountry) => {
    borderCountriesElement.innerHTML += `<span class="country_border">${borderCountry.name.common}</span>`;
  });
  // console.log(borderCountriesElement);
  const borderCountries = document.querySelectorAll(".country_border");

  borderCountries.forEach((country) => {
    country.addEventListener("click", goToBorderCountry);
  });
}

getCountry();

// go to border country page
async function goToBorderCountry(event) {
  // window.location.href = `/country.html?name=${countryName}`;
  console.log({ event });
  const countryName = event.target.innerHTML;
  window.location.href = `/country.html?name=${countryName}`;
}
