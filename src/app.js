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
  
  return json;
  

};

// end - lastFM data pull

// start - sleep function so some loading mechanics can be seen
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// end - sleep function so some loading mechanics can be seen

// start - code runs on page load
async function onLoadHandler() {

  // start - promise to handle detecting user's location
  async function json(url) {
    return fetch(url).then(res => res.json());
  }
  
  async function detectVisitorCountry() {
  const detectIP = json(`https://api.ipdata.co?api-key=${ipDataApiKey}`).then(data => {
  const visitorCountry = data.country_name;
  console.log("user country->", visitorCountry)
  console.log("what you can do with user data", data)
  // end - promise to handle detecting user's location
  return visitorCountry
  });
  return detectIP
  } 

  const visitorCountry = await detectVisitorCountry();

  //call lastFM API with the data
  const lastFMdata = await callLastFmApi(visitorCountry);

  addSongDataToPage(lastFMdata, visitorCountry);
  buttonListener();
};
// end - code runs on page load



async function buttonListener() {
// button functionality
      //button click listener + action begin
      const btn = document.getElementById('user-input-button');
      btn.addEventListener('click', async function(event) {
        event.preventDefault();
        // console.log('click');
    //grabs user input - begin
        const inputElement = document.getElementById('user-input')
    //grabs user input - end
    //button click listener + action end
    document.getElementById("user-input-button").classList.add("is-loading");

    const x = await callLastFmApi(inputElement.value);
    
    document.getElementById("add-data-points").innerHTML = ""; //clear all the things
    
    sleep(100000000000000);
    
    addSongDataToPage(x, inputElement.value);
    
    document.getElementById("user-input-button").classList.remove("is-loading");
    //clear input begin
      inputElement.value = '';
    //clear input end
      });
    // end button functionality


};


// // chart styling

function addSongDataToPage(lastFMdata, visitorCountry) {

const theadElement = document.createElement("thead"); // Create a <thead> node
document.getElementById("add-data-points").appendChild(theadElement); // Append to table

const trElementWithClass = document.createElement("tr"); // Create a <tr> node
trElementWithClass.setAttribute("class", "is-selected"); // set class
theadElement.appendChild(trElementWithClass);  // Append to thead

const NumberThElement = document.createElement("th"); // Create a <thead> node
const NumberThText = document.createTextNode("#"); // Create a tr text node
NumberThElement.appendChild(NumberThText);  // Append the text
trElementWithClass.appendChild(NumberThElement);  // Append to thead

const ArtistThElement = document.createElement("th"); // Create a <thead> node
const ArtistThText = document.createTextNode("Artist"); // Create a tr text node
ArtistThElement.appendChild(ArtistThText);  // Append the text
trElementWithClass.appendChild(ArtistThElement);  // Append to thead

const SongThElement = document.createElement("th"); // Create a <thead> node
const SongThText = document.createTextNode("Song"); // Create a tr text node
SongThElement.appendChild(SongThText);  // Append the text
trElementWithClass.appendChild(SongThElement);  // Append to thead

const ListenThElement = document.createElement("th"); // Create a <thead> node
const ListenThText = document.createTextNode("Listen"); // Create a tr text node
ListenThElement.appendChild(ListenThText);  // Append the text
trElementWithClass.appendChild(ListenThElement);  // Append to thead

const tbodyElement = document.createElement("tbody"); // Create a <tbody> node
document.getElementById("add-data-points").appendChild(tbodyElement); // Append to table

let number = 0

for (const [key, value] of Object.entries(lastFMdata.tracks.track)) {

const changeH2Text = document.getElementById("country-headline");
changeH2Text.innerHTML = visitorCountry;

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