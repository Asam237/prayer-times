document.addEventListener("DOMContentLoaded", function () {
  const prayerTimesContainer = document.createElement("div");
  prayerTimesContainer.id = "prayer-times";
  document.body.appendChild(prayerTimesContainer);

  chrome.runtime.sendMessage({ action: "getPrayerTimes" }, function (response) {
    if (response && response.prayerTimes) {
      displayPrayerTimes(response.prayerTimes);
    } else {
      prayerTimesContainer.innerText = "Unable to fetch prayer times.";
    }
  });

  function displayPrayerTimes(prayerTimes) {
    prayerTimesContainer.innerHTML = "<h2>Prayer Times</h2>";
    for (const [prayer, time] of Object.entries(prayerTimes)) {
      const timeElement = document.createElement("p");
      timeElement.innerText = `${prayer}: ${time}`;
      prayerTimesContainer.appendChild(timeElement);
    }
  }
});
