//Display the weather at the location of each nasa facility
//kagi = 72NzcIXBhcCknqDprFO9S97RIo02XLHcIaPnfWec
//loop through array
//get lat and long
//take lat and long and search for the weather at that location
//display weather at lat and long
//https://api.allorigins.win/raw?url=
//https://api.cors.lol/?url=https:

//----------------Used CHATGPT to get around rate limits, that didn't work, restarted, then used it to figure out why my data wasn't printing to the DOM-------------------------

//Get NASA facilities
//Get their lat/long
//take lat/long put into weather API
//print facility data + weather data

let tempLat = '37.911289';
let tempLon = '75.469622';

//let kagi = '72NzcIXBhcCknqDprFO9S97RIo02XLHcIaPnfWec';
let kagi = '573e39e3da904aa38cf155148250310';
let nasa_url = `https://api.cors.lol/?url=https://data.nasa.gov/docs/legacy/gvk9-iz74.json`;
output = document.querySelector('#output');

const delay = ms => new Promise(r => setTimeout(r,ms));

document.querySelector('button').addEventListener('click',getLocations);

//alot of duplicates, need to parse them out first to clean up the data
async function getLocations() {
  try {
    const response = await fetch(nasa_url);
    const nasaData = await response.json();
//get facilities, in this case the first 10
    //let firstTen = nasaData.slice(0,11);
    //let firstHundred = nasaData.slice(0,101);
    //let setOfTen = [...new Set(firstTen)];
    //let setOfLocations = [...new Set(nasaData)];
    //console.log(setOfLocations);
    //console.log(setOfLocations);
    //console.log(`Fetched first 10 NASA facilities: `, firstTen);
//--------learned about this from here: https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep------
    //Only keep unique center names
    const uniqueAddresses = Array.from(new Set(nasaData.map(a => a.center)))
    .map(center => {
      return nasaData.find(a => a.center === center)
    })
    //console.log(uniqueAddresses);

    //separate individual facilities from the array
    for (const facility of uniqueAddresses) {
      //---loc = location
      //---lat = latitude
      //---lon = longitude

      //const loc = facility.location;
      const zip = facility.zipcode;
      const centName = facility.center;

      //get the coordinates into usable variables
      //const lat = parseFloat(loc.latitude);
      //const lon = parseFloat(loc.longitude);
      //const zipLoc = parseFloat(zip.zipcode);

      //funnel that data into the weather api call
      //const weather = await getWeather(lat, lon);

      //const weather = await getWeather(lat, lon);
      //const weather = await getWeather(zipLoc)
      const weather = await getWeather(zip)
      //output.innerText = weather;

      const div = document.createElement('div');
      div.classList.add('facility');
      //div.textContent =`${facility.center}: ${weather.temp_f}°F`;
      div.textContent =`${facility.center}: ${weather.current.condition.text}, ${weather.current.temp_f}°F`;
      output.appendChild(div);

//------CHATGPT helped setup this delay, which is now unnecessary but I kinda like it ngl----------------
      await delay(2000);
      //output.innerText = (firstTen + lat + lon);
      //console.log(`${centName}, ${lat}, ${lon}`)
    }
  }
  catch (err) {
    console.error('error fetching nasa data', err);
  }
}


//async function getWeather(lat, lon) {
async function getWeather(zip) {
  try {
    //const url = `https://api.weatherapi.com/v1/current.json?key=${kagi}&q=${lat},${lon}`;
    //const url = `https://api.cors.lol/?url=https://api.weatherapi.com/v1/current.json?key=${kagi}&q=${lat},${lon}`;
    //const url = `https://api.allorigins.win/raw?url=https://api.weatherapi.com/v1/current.json?key=${kagi}&q=${lat},${lon}`;
    const url = `https://api.weatherapi.com/v1/current.json?key=${kagi}&q=${zip}`;
    //const url = `https://api.allorigins.win/raw?url=https://api.weatherapi.com/v1/current.json?key=${kagi}&q=${tempLat},${tempLon}`;

    const res = await fetch(url);
    const data = await res.json();
    //return data.current.condition.text;
    //console.log(data);
    //console.log(`${lat},${lon}`)
    console.log(zip);
    console.table(data);
    //return data.current.condition.text;
//---------CHATGPT helped here---------------
    return data;

  } catch (err) {
    console.error('Weather fetch error:', err);
    return null;
  }
}