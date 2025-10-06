//Display the weather at the location of each nasa facility
//kagi = 72NzcIXBhcCknqDprFO9S97RIo02XLHcIaPnfWec
//loop through array
//get lat and long
//take lat and long and search for the weather at that location
//display weather at lat and long
//https://api.allorigins.win/raw?url=
//https://api.cors.lol/?url=https:

//----------------Used CHATGPT to get around rate limits-------------------------



document.querySelector('button').addEventListener('click',getLocations);

// async function getCoordinates() {
//   const wildCardUrl = `https://api.cors.lol/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`

//   try {
//     const response = await fetch(wildCardUrl);
//     if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//     const data = await response.json();

//     const nasaLatitude = "";
//     const nasaLongitude = "";

//     const locCountry = data.location.country;
//     const locName = data.location.name;

//     document.querySelector('#temp_f').innerText = data.current.temp_f;
//     document.querySelector('#weatherConditions').innerText = data.current.condition.text;


//   } catch (error) {
//     console.error('Fetch error:', error);
//   }
// }

let nasa_URL = 'https://api.cors.lol/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json';
let kagi = '72NzcIXBhcCknqDprFO9S97RIo02XLHcIaPnfWec';
//let weatherURL = 'https://api.weatherapi.com/v1/current.json';

const PROXY = 'https://api.cors.lol/?url=';
const weatherURL = `${PROXY}https://api.weatherapi.com/v1/current.json`;

//---------------------CHAT GPT Helped with trying to get around rate limit--------------------------------
async function getLocations() {
  try {
    const res = await fetch(nasa_URL);
    if (!res.ok) throw new Error(`HTTP error! ${res.status}`);

    const nasaData = await res.json();

    // Slice to first 10 NASA sites
    const firstTen = nasaData.slice(0, 10);
    console.log('Fetched first 10 NASA facilities:', firstTen);

    const output = document.querySelector('#output');
    output.innerHTML = ''; // Clear old results

    for (const facility of firstTen) {
      const loc = facility.location;
      if (!loc || !loc.latitude || !loc.longitude) continue;

      const lat = parseFloat(loc.latitude);
      const lon = parseFloat(loc.longitude);
      if (isNaN(lat) || isNaN(lon)) continue;

      const weather = await getWeather(lat, lon);
      if (!weather) continue;

      const div = document.createElement('div');
      div.classList.add('facility');
      div.textContent = `${facility.center} (${lat.toFixed(2)}, ${lon.toFixed(2)}) → ${weather.temp_f}°F, ${weather.condition.text}`;
      output.appendChild(div);

      console.log(`${facility.center}: ${weather.temp_f}°F, ${weather.condition.text}`);

      // Wait a few seconds between each request (avoid rate-limit)
      await delay(1500);
    }

  } catch (err) {
    console.error('Error fetching NASA data:', err);
  }
}

async function getWeather(lat, lon) {
  try {
    //const url = `https://api.weatherapi.com/v1/current.json?key=${kagi}&q=${lat},${lon}`;
    //const url = `https://api.cors.lol/?url=https://api.weatherapi.com/v1/current.json?key=${kagi}&q=${lat},${lon}`;
    const url = `https://api.allorigins.win/raw?url=https://api.weatherapi.com/v1/current.json?key=${kagi}&q=${lat},${lon}`;
    const res = await fetch(url);
    
    const data = await res.json();
    return data.current;
  } catch (err) {
    console.error('Weather fetch error:', err);
    return null;
  }
}


// function getWeather() {
//     //const countryInput = document.querySelector('#countryInput').value;
//     //const zipInput = document.querySelector('#chooseZip').value;
//     //const cityInput = document.querySelector('#chooseCity').value;
    
//     //const wildCardInput = document.querySelector('#wildCard').value;
//     const wildCardInput = "";

//     let kagi = '573e39e3da904aa38cf155148250310';
//     let temp = 'temp_f';
//     //let zipUrl = `http://api.weatherapi.com/v1/current.json?key=${kagi}&q=${zipInput}&${temp}&`;
//     //let cityUrl = `http://api.weatherapi.com/v1/current.json?key=${kagi}&q=${cityInput}&${temp}`;
//     //let countryUrl = `http://api.weatherapi.com/v1/current.json?key=${kagi}&q=${countryInput}&${temp}`;
//     let wildCardUrl = `http://api.weatherapi.com/v1/current.json?key=${kagi}&q=${wildCardInput}&${temp}`;

//     //if()
//     fetch(wildCardUrl) //fetch at this url
//         .then(response => response.json()) //then get the response data
//         .then(data => {
//             console.table(data)
//             document.querySelector('#output').innerText = data.current.temp_f;
//         }) //then start using the data
//         .catch(error => console.error(error)); //catch errors instead of crashing or something
// }