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
  const replyans = await getData("/data");
  const obj = JSON.parse(replyans);
  const answer = obj.message2
  console.log(answer);
  const tobeedited = document.getElementById('data');
  tobeedited.innerHTML = answer;
};

async function postAnswer() {
  const response = await fetch("/example", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    // Automatically converted to "username=example&password=password"
    body: "hello",
    // ...
  });
}

displayData();
postAnswer();