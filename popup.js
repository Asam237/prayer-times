document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("fetch-times")
    .addEventListener("click", fetchPrayerTimes);
});

function fetchPrayerTimes() {
  const city = document.getElementById("city").value;
  const country = document.getElementById("country").value;
  if (!city || !country) {
    alert("Please enter both city and country.");
    return;
  }

  const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const timings = data.data.timings;
      document.getElementById("fajr-time").textContent = timings.Fajr;
      document.getElementById("dhuhr-time").textContent = timings.Dhuhr;
      document.getElementById("asr-time").textContent = timings.Asr;
      document.getElementById("maghrib-time").textContent = timings.Maghrib;
      document.getElementById("isha-time").textContent = timings.Isha;
    })
    .catch((error) => console.error("Error fetching prayer times:", error));
}
