document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("fetch-times")
    .addEventListener("click", fetchPrayerTimes);
  fetchCOuntriesWithState();
});

function fetchPrayerTimes() {
  const city = document.getElementById("city").value;
  const country = document.getElementById("country").value;
  if (!city || !country) {
    alert("Please enter both city and country.");
    return;
  }

  const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`;
  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(":");
    return `${hours}h${minutes}min`;
  }

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const timings = data.data.timings;
      document.getElementById("fajr-time").textContent = formatTime(
        timings.Fajr
      );
      document.getElementById("dhuhr-time").textContent = formatTime(
        timings.Dhuhr
      );
      document.getElementById("asr-time").textContent = formatTime(timings.Asr);
      document.getElementById("iftar-time").textContent = formatTime(
        timings.Maghrib
      );
      document.getElementById("maghrib-time").textContent = formatTime(
        timings.Maghrib
      );
      document.getElementById("isha-time").textContent = formatTime(
        timings.Isha
      );
    })
    .catch((error) => console.error("Error fetching prayer times:", error));
}

const fetchCOuntriesWithState = () => {
  fetch("./datasets/countries.json")
    .then(async (response) => {
      const datalist = document.getElementById("countries-list");
      const countries = await response.json();
      countries.forEach((country) => {
        console.log("COUNTRY", country);
        const option = document.createElement("option");
        option.value = country;
        datalist.appendChild(option);
      });
    })
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

document.getElementById("fetch-times").addEventListener("click", function () {
  const loaderContainer = document.querySelector(".loader-container");
  const prayerTimes = document.getElementById("prayer-times");

  // Show loader and hide prayer times
  loaderContainer.style.display = "block";
  prayerTimes.style.display = "none";

  // Simulate fetching data
  setTimeout(() => {
    // Hide loader and show prayer times
    loaderContainer.style.display = "none";
    prayerTimes.style.display = "block";
  }, 2000); // Simulate a 2-second delay
});
