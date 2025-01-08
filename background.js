const API_URL = "https://api.aladhan.com/v1/timings";

chrome.runtime.onStartup.addListener(() => {
  fetchPrayerTimes();
});

function fetchPrayerTimes() {
  const date = new Date();
  const params = new URLSearchParams({
    latitude: "YOUR_LATITUDE",
    longitude: "YOUR_LONGITUDE",
    method: "2", // Adjust the method as needed
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  });

  fetch(`${API_URL}?${params}`)
    .then((response) => response.json())
    .then((data) => {
      const prayerTimes = data.data.timings;
      chrome.storage.local.set({ prayerTimes });
      console.log("Prayer times fetched:", prayerTimes);
    })
    .catch((error) => {
      console.error("Error fetching prayer times:", error);
    });
}

// Set an alarm to fetch prayer times daily
chrome.alarms.create("fetchPrayerTimes", { periodInMinutes: 1440 });
