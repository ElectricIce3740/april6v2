async function getData() {
    const url = "/data";
    try {
      const response = await fetch(url);
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
    const answer = await getData();
    console.log(answer);
    const tobeedited = document.getElementById('data');
    tobeedited.innerHTML = answer;
  }

displayData();