import { ipDataApiKey } from './keys.js';
import { lastFmApi } from './keys.js';

// start - lastFM data pull

async function callLastFmApi(country) {

const lastFMUrl = new URL('http://ws.audioscrobbler.com/2.0/');
const lastFMParams = {
    'method': 'geo.gettoptracks',
    'country': country,
    'api_key': lastFmApi,
    'format': 'json'
  };

  // add query string to URL
  lastFMUrl.search = new URLSearchParams(lastFMParams).toString();
  // fetch resource
  const rawResponse = await fetch(lastFMUrl);
  const json = await rawResponse.json();

  if (!rawResponse.ok) {
    alert('failed to load API', lastFMUrl);
    // we want to stop execution if there is an error
    return;
  }
  if (rawResponse.ok) {
    console.log('Success for ', lastFMUrl);
  }

  console.log("results ", json.tracks.track);
  
  
  return json;
  

};

// end - lastFM data pull

// button functionality
  //button click listener + action begin
    const btn = document.getElementById('user-input-button');
    btn.addEventListener('click', function(event) {
      event.preventDefault();
      // console.log('click');
  //grabs user input - begin
      const inputElement = document.getElementById('user-input')
  //grabs user input - end
    callLastFmApi(inputElement.value);
  //button click listener + action end
  //clear input begin
    inputElement.value = '';
  //clear input end
    });
// end button functionality

async function onLoadHandler() {

  // start - promise to handle detecting user's location
  async function json(url) {
    return fetch(url).then(res => res.json());
  }
  
  async function detectVisitorCountry() {

    const detectIP = json(`https://api.ipdata.co?api-key=${ipDataApiKey}`).then(data => {
  console.log(data)
  console.log(data.country_name);
  const visitorCountry = data.country_name;
  console.log("user country->", visitorCountry)
  // end - promise to handle detecting user's location
  return visitorCountry
  });
  return detectIP
  } 

  const visitorCountry = await detectVisitorCountry();

  //call lastFM API with the data
  const lastFMdata = await callLastFmApi(visitorCountry);
  console.log("look here->", Object.keys(lastFMdata.tracks.track)[0])
  console.log("type->", typeof(Object.keys(lastFMdata.tracks.track)))

  addSongDataToPage(lastFMdata, visitorCountry);

};

// // chart styling


function addSongDataToPage(lastFMdata, visitorCountry) {

let number = 0

for (const [key, value] of Object.entries(lastFMdata.tracks.track)) {

const changeH2Text = document.getElementById("country-headline");
changeH2Text.innerHTML = visitorCountry;

const tbodyElement = document.createElement("tbody"); // Create a <tbody> node
document.getElementById("add-data-points").appendChild(tbodyElement); // Append to table
const trElement = document.createElement("tr"); // Create a <tr> node
tbodyElement.appendChild(trElement);  // Append to tbody

const thElement = document.createElement("th"); // Create a <th> node
const displayNumber = Number(Object.keys(lastFMdata.tracks.track)[key]) + 1;
const thText = document.createTextNode(displayNumber); // Create a th text node
thElement.appendChild(thText);  // Append the text 
trElement.appendChild(thElement);  // Append to tr

const tdElement = document.createElement("td"); // Create a <td> node
const artistTdText = document.createTextNode(lastFMdata.tracks.track[key].artist.name); // Create a td text node
tdElement.appendChild(artistTdText);  // Append the text 
trElement.appendChild(tdElement);  // Append to tr

const tdElement2 = document.createElement("td"); // Create a <td> 2 node
const songNameTdText = document.createTextNode(lastFMdata.tracks.track[key].name); // Create a td text node
tdElement2.appendChild(songNameTdText);  // Append the text 
trElement.appendChild(tdElement2);  // Append to tr

const tdElement3 = document.createElement("td"); // Create a <td> 2 node
const playLinkTag = document.createElement("a"); // Create a <a> node
tdElement3.appendChild(playLinkTag);  // Append the text
playLinkTag.setAttribute("href", lastFMdata.tracks.track[key].url); // URL path
playLinkTag.setAttribute("target", "_blank"); // URL path
const playSongText = document.createElement("img"); // Create a img
playSongText.setAttribute("src", "./img/play-circle.png"); // img URL path
playLinkTag.appendChild(playSongText);
trElement.appendChild(tdElement3);  // Append to tr

document.getElementById("chart-content").classList.remove('is-hidden');

}
};
// // end chart styling




if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onLoadHandler);
} else {
  onLoadHandler();
}