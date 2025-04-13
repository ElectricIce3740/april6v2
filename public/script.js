async function getData(url) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const datajson = await response.json();
      console.log(datajson);
      if (typeof datajson === 'object') {
        return JSON.stringify(datajson);
      }
      else {
        return datajson;
      }
    } catch (error) {
      console.error(error.message);
    }
  }

async function displayData() {
    const replyans = await getData("https://api.open-meteo.com/v1/forecast?latitude=36.5484&longitude=-82.5618&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1&temperature_unit=fahrenheit");
    const obj = JSON.parse(replyans);
    const tempMax = await obj.daily.temperature_2m_max[0];
    const tempMin = await obj.daily.temperature_2m_min[0];
    const answer = `High: ${tempMax}°F Low: ${tempMin}°F`;
    console.log(answer);
    const tobeedited = document.getElementById('data');
    tobeedited.innerHTML = answer;
  }

displayData();