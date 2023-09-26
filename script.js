// const input = document.getElementById("input");
const mainContainer = document.getElementById("countries-container");
const searchParams = new URLSearchParams(window.location.search);
const regionName = searchParams.get("name");
const loader = document.getElementById("loader");
const textBox = document.getElementById("search-input");
const searchForCountry = document.querySelector(".searched-country");
const toggleSwitch = document.getElementById("toggle-btn");

// elements for dark mode
const mainHeading = document.querySelector(".main-heading");
const searchInput = document.querySelector('input[type="text"]');
const searchBtn = document.getElementById("search-btn");
const filterContainer = document.getElementById("countries-filter");
// const countryContainer = document.querySelector(".country-container");
const countryDetails = document.querySelector(".country-details");
const toggleBtn = document.getElementById("toggle-btn");

searchForCountry.style.display = "none";

// toggle dark mode
function toggleDarkMode() {
  mainHeading.style.backgroundColor = "hsl(207, 26%, 17%)";
  searchInput.style.backgroundColor = "hsl(209, 23%, 22%)";
  searchInput.style.boxShadow = "none";
  searchBtn.style.backgroundColor = "hsl(209, 23%, 22%)";
  searchBtn.style.boxShadow = "none";
  filterContainer.style.backgroundColor = "hsl(209, 23%, 22%)";
  filterContainer.style.color = "hsl(0, 0%, 100%)";
  toggleBtn.style.color = "hsl(0, 0%, 100%)";

  changeCountryContainer();
  changeCountryDetails();
}

function changeCountryContainer() {
  let countryContainer = document.querySelectorAll(".country-container");
  let index = 0,
    length = countryContainer.length;
  for (; index < length; index++) {
    countryContainer[index].style.backgroundColor = "hsl(209, 23%, 22%)";
    countryContainer[index].style.boxShadow = "none";
  }
}
function changeCountryDetails() {
  let countryDetails = document.querySelectorAll(".countries_info");
  let index = 0,
    length = countryDetails.length;
  for (; index < length; index++) {
    countryDetails[index].style.color = "hsl(0, 0%, 100%)";
  }
}

// toggle light mode
function toggleLightMode() {
  mainHeading.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  searchInput.style.backgroundColor = "hsl(0, 0%, 100%)";
  searchInput.style.boxShadow = "5px -1px 30px 1px rgba(211, 206, 206, 0.5)";

  searchBtn.style.backgroundColor = "rgb(41, 105, 201)";
  searchBtn.style.boxShadow = "rgba(208, 200, 230, 0.9)";
  searchBtn.style.boxShadow = "none";
  filterContainer.style.backgroundColor = "hsl(0, 0%, 100%)";
  filterContainer.style.color = "hsl(200, 15%, 8%)";
  toggleBtn.style.color = "hsl(200, 15%, 8%)";

  changeCountryContainerLight();
  changeCountryDetailsDark();
}

function changeCountryContainerLight() {
  let countryContainer = document.querySelectorAll(".country-container");
  let index = 0,
    length = countryContainer.length;
  for (; index < length; index++) {
    countryContainer[index].style.backgroundColor = "hsl(0, 0%, 98%)";
    countryContainer[index].style.boxShadow = "none";
  }
}
function changeCountryDetailsDark() {
  let countryDetails = document.querySelectorAll(".countries_info");
  let index = 0,
    length = countryDetails.length;
  for (; index < length; index++) {
    countryDetails[index].style.color = "hsl(0, 0%, 100%)";
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

// show loader
function showLoader() {
  loader.hidden = false;
  mainContainer.hidden = true;
}

// hide loader
function hideLoader() {
  loader.hidden = true;
  mainContainer.hidden = false;
}

let countries = [];

async function getCountries() {
  showLoader();
  const api_Url = `https://restcountries.com/v2/all`;
  const response = await fetch(api_Url);
  const data = await response.json();
  //   console.log(data);

  countries = data;

  mainContainer.innerHTML = "";
  hideLoader();
  countries.forEach((country) => {
    mainContainer.innerHTML += `<div class='country-container'><div class="country"><div class="flag-container"><img class="flag" src=${country.flag}></div><div class="country-details"><h2 class="country-name">${country.name}</h2><span class='countries_info'><strong>Population: </strong>${country.population}</span><br><span class='countries_info'><strong>Region: </strong>${country.region}</span><br><span class='countries_info'><strong>Capital: </strong>${country.capital}</span></div></div></div>`;

    // console.log(mainContainer);
  });

  //   console.log(countries);

  const countriesContainers = document.querySelectorAll(".country-container");
  //   console.log(countriesContainers);

  countriesContainers.forEach((country) => {
    country.addEventListener("click", goToCountryPage);
  });
}

getCountries();

function goToCountryPage(event) {
  console.log(event);
  // Current target is the countrues card
  // Check the current target, then get the .country-name class inside the current target, and then get the innerHTML content from the country-name class
  const countryName = event.target.querySelector(".country-name").innerHTML;
  window.location.href = `/country.html?name=${countryName}`;
}

// search for a country

function searchCountry(event) {
  event.preventDefault();
  const inputValue = textBox.value;
  console.log(inputValue);

  const searchForCountry = document.querySelector(".searched-country");

  // if there is no value inside inputValue, then hide the searchForCountry element and show mainCintainer
  if (!inputValue) {
    searchForCountry.style.display = "none";
    mainContainer.style.display = "grid";
  } else {
    fetchCountry(inputValue);
    mainContainer.style.display = "none";
    searchForCountry.style.display = "block";
  }
}

async function fetchCountry(countryName) {
  const api_Url = `https://restcountries.com/v3.1/name/${countryName}`;
  const response = await fetch(api_Url);
  let data = await response.json();
  data = data[0];
  console.log(data);

  const searchForCountry = document.querySelector(".searched-country");

  searchForCountry.innerHTML = `<div id='one-country'><div class="country"><div class="flag-container"><img class="country-flag" src=${data.flags.svg}></div><div class="country-details"><h2 class="country-name">${data.name.common}</h2><span><strong>Population: </strong>${data.population}</span><br><span><strong>Region: </strong>${data.region}</span><br><span><strong>Capital: </strong>${data.capital}</span></div></div></div>`;
}

// filter by region
async function filterByRegion(regionName) {
  const url = `https://restcountries.com/v3.1/region/${regionName}`;

  const res = await fetch(url);

  const resData = await res.json();

  console.log({ resData });
  return resData;
}

const selectElement = document.getElementById("countries-filter");

selectElement.addEventListener("change", async (event) => {
  console.log("clicked", { event });
  const region = event.target.value;

  if (region === "All") {
    getCountries();
  } else {
    const countries = await filterByRegion(region);

    mainContainer.innerHTML = "";
    countries.forEach((country) => {
      mainContainer.innerHTML += `<div class='country-container'><div class="country"><div class="flag-container"><img class="flag" src=${country.flags.png}></div><div class="country-details"><h2 class="country-name">${country.name.common}</h2><span><strong>Population: </strong>${country.population}</span><br><span><strong>Region: </strong>${country.region}</span><br><span><strong>Capital: </strong>${country.capital}</span></div></div></div>`;
    });
  }
});
