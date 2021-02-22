// import API keys
import { ipDataApiKey } from './keys.js';
import { lastFmApi } from './keys.js';

//import image assets
import playButton from '/img/play-circle.png'

//firebase
import firebase from "firebase/app";
import 'firebase/firestore';

import { firebaseKeys } from './keys';

firebase.initializeApp(firebaseKeys);

const db = firebase.firestore();

const city_data = {
  updateVisits: (id, amount) => {

    return db.collection("city_data").doc(id).update({
      visitor_count: firebase.firestore.FieldValue.increment(amount)
    });
  },
  delete: (id) => {
    return db.collection("city_data").doc(id).delete();
  },
  create: (city_data) => {
    return db.collection("city_data").add({
      city,
      country_name,
      region,
      visitor_count: 1
    });
  },
  getAll: () => {
    return db.collection('city_data').get().then((snapshot) => {
      return snapshot.docs.map(doc => {
        return {
          id: doc.value,
          ...doc.data()
        };
      });
    });
  }
};

const readAll = async () => {
  const data = await db.collection('city_data').get();

  const formattedData = data.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });

  return formattedData;
};

async function displayCityData() {
    return db.collection("city_data").orderBy("visitor_count", "desc").get().then((snapshot) => {
    return snapshot.docs.map(doc => {
      return {
        id: doc.value,
        ...doc.data()
      };
      });
    });
};

async function makeCityDataPretty() {
  
  const addTheDataToPage = await displayCityData();
  
  for (const key of Object.keys(addTheDataToPage)) {

  const LiThElement = document.createElement("li"); // Create a <li> node
  const LiThText = document.createTextNode(`${addTheDataToPage[key].city}, ${addTheDataToPage[key].region} - ${addTheDataToPage[key].visitor_count} visits`); // Create a li text node
  LiThElement.appendChild(LiThText);  // Append the text
  document.getElementById("top-cities").appendChild(LiThElement)  // Append to thead
  }

};


//end firebase


// start - lastFM data pull

async function callLastFmApi(country) {

const lastFMUrl = new URL('https://ws.audioscrobbler.com/2.0/');
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

// start - promise to handle detecting user's location
async function json(url) {
  return fetch(url).then(res => res.json());
}
async function detectVisitorInformation() {
  const detectIP = json(`https://api.ipdata.co?api-key=${ipDataApiKey}`).then(data => {
  const visitorInformation = data;
  // end - promise to handle detecting user's location   
  return visitorInformation
  });
  return detectIP
  } 


// title case user input
function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}
// end - title case user input

// sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// sleep

//success funciton

async function successMusicChart(data, country) {
  document.getElementById("onLoad").classList.remove("is-hidden");
        await sleep(3000);
        addSongDataToPage(data, country);
        document.getElementById("chart-content").classList.remove
        document.getElementById("onLoad").classList.add("is-hidden");
        
}

// end success function

//start failed search
async function failedSearchLoading() {
  document.getElementById("chart-content").classList.add("is-hidden");
  document.getElementById("user-input-button").classList.add("is-danger");
  document.getElementById("add-data-points").innerHTML = ""; 
  document.getElementById("user-input").classList.add("is-danger");     
  await sleep(2000);
  document.getElementById("user-input-button").classList.remove("is-danger"); 
  document.getElementById("user-input-button").classList.remove("is-loading");
}
//end failed search

// start - code runs on page load
async function onLoadHandler() {
  makeCityDataPretty();
  const visitorCountry = await detectVisitorInformation();
  //call lastFM API with the data
  const lastFMdata = await callLastFmApi(visitorCountry.country_name);

  //start - capture location and store in firebase
  
  
    // create new

    const friendlyCityName = `${visitorCountry.city}, ${visitorCountry.region}`
  
    const firebaseData = await readAll();

    //1 is this visitor in the data


    const doesVisitorCityExist = firebaseData.find((firebaseItem) => { return firebaseItem.id === friendlyCityName })

      if (doesVisitorCityExist) {
        console.log("your city is in the data");
        //update visits number
        const updateVisits = (id, number) => {
          return db.collection("city_data").doc(id).update({
            visitor_count: firebase.firestore.FieldValue.increment(number)
          });
        };
        updateVisits(friendlyCityName, 1);
        await successMusicChart(lastFMdata,visitorCountry.country_name);        
        buttonListener();
        makeCityDataPretty();
        return
  
      }

      if (friendlyCityName === "null, null") {
        console.log("you don't have a city defined");
        await successMusicChart(lastFMdata,visitorCountry.country_name);
          makeCityDataPretty();
          buttonListener();
        return  
      }
      
      else {
        console.log("your city is NOT in the data");
        const visitorData = {
          city: visitorCountry.city,
          region: visitorCountry.region,
          country_name: visitorCountry.country_name,
          visitor_count: 1
        };
          //add new city to database
          db.collection('city_data').doc(friendlyCityName).set(visitorData);
          document.getElementById("onLoad").classList.remove("is-hidden");
          await successMusicChart(lastFMdata,visitorCountry.country_name);
          makeCityDataPretty();
          buttonListener();
          return

      }
//end - capture location and store in firebase
//load the page with music data
  
};



// end - code runs on page load

// button listener for user input

async function buttonListener() {


// set of countries following ISO 3166-1-alpha-2 standard
const countries = ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia And Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic Of The", "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-bissau", "Guyana", "Haiti", "Heard Island And Mcdonald Islands", "Holy See (vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic Of", "Iraq", "Ireland", "Isle Of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic Of", "Korea, Republic Of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States Of", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau",  "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Kitts And Nevis", "Saint Lucia", "Saint Pierre And Miquelon", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia And The South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard And Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic Of", "Thailand", "Timor-leste", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.s.", "Wallis And Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];


  // button functionality
        //button click listener + action begin
        const btn = document.getElementById('user-input-button');
        btn.addEventListener('click', async function(event) {
          event.preventDefault();
      //grabs user input - begin
          const inputElement = document.getElementById('user-input')
      //grabs user input - end
      //button click listener + action end
      document.getElementById("user-input-button").classList.add("is-loading");
      await sleep(1000);
  
      const userInputCountry = titleCase(inputElement.value)

      if (userInputCountry === "" || userInputCountry === " " ) {
        
        await failedSearchLoading();  
        inputElement.value = `Oops! You forgot to put in a country. Try again.`; 

        return
      }
      
      if (countries.includes(userInputCountry)) {
        
        const userInputApiCall = await callLastFmApi(userInputCountry);

        document.getElementById("user-input-button").classList.remove("is-warning");
        document.getElementById("chart-content").classList.add("is-hidden")
        document.getElementById("add-data-points").innerHTML = ""; //clear all the things 
        
        document.getElementById("user-input-button").classList.remove("is-danger");
        document.getElementById("user-input").classList.remove("is-danger")
        await sleep(2000);
        addSongDataToPage(userInputApiCall, userInputCountry); 
  
        //clear input begin
          inputElement.value = '';
          
        //clear input end

        return

      }
      
      if (!countries.includes(userInputCountry)) {

        await failedSearchLoading(); 
        inputElement.value = `Your request is not a valid country for this data set. Try again.`;
        
        
      }
 
     });
      // end button listen functionality
  
  
  };
// end - button listener function


// start - chart styling

async function addSongDataToPage(lastFMdata, visitorCountry) {

  if (lastFMdata.error) {
      await failedSearchLoading();  
      document.getElementById("user-input").value = `${visitorCountry} is not a valid country for this data set. Try again.`;
      document.getElementById("chart-content").classList.add("is-hidden");
    return
    
    }

  else {

      document.getElementById("user-input-button").classList.remove("is-loading");
      document.getElementById("user-input-button").classList.remove("is-loading");
      document.getElementById("user-input-button").classList.remove("is-warning");
    
      const theadElement = document.createElement("thead"); // Create a <thead> node
      document.getElementById("add-data-points").appendChild(theadElement); // Append to table

      const trElementWithClass = document.createElement("tr"); // Create a <tr> node
      trElementWithClass.setAttribute("class", "is-selected"); // set class
      theadElement.appendChild(trElementWithClass);  // Append to thead

      const numberThElement = document.createElement("th"); // Create a <thead> node
      const numberThText = document.createTextNode("#"); // Create a tr text node
      numberThElement.appendChild(numberThText);  // Append the text
      trElementWithClass.appendChild(numberThElement);  // Append to thead

      const artistThElement = document.createElement("th"); // Create a <thead> node
      const artistThText = document.createTextNode("Artist"); // Create a tr text node
      artistThElement.appendChild(artistThText);  // Append the text
      trElementWithClass.appendChild(artistThElement);  // Append to thead

      const songThElement = document.createElement("th"); // Create a <thead> node
      const songThText = document.createTextNode("Song"); // Create a tr text node
      songThElement.appendChild(songThText);  // Append the text
      trElementWithClass.appendChild(songThElement);  // Append to thead

      const listenThElement = document.createElement("th"); // Create a <thead> node
      const listenThText = document.createTextNode("Listen"); // Create a tr text node
      listenThElement.appendChild(listenThText);  // Append the text
      trElementWithClass.appendChild(listenThElement);  // Append to thead

      const tbodyElement = document.createElement("tbody"); // Create a <tbody> node
      document.getElementById("add-data-points").appendChild(tbodyElement); // Append to table

      for (const [key, value] of Object.entries(lastFMdata.tracks.track)) {

      const changeH2Text = document.getElementById("country-headline");
      changeH2Text.innerHTML = `Top Tracks from ${visitorCountry}`;

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
      playSongText.setAttribute("src", playButton); // img URL path
      playLinkTag.appendChild(playSongText);
      trElement.appendChild(tdElement3);  // Append to tr

      document.getElementById("chart-content").classList.remove('is-hidden');

  }
//end - styling data loop
  }
//end - keys > 1 loops
};
// // end chart styling


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onLoadHandler);
} else {
  onLoadHandler();  
}