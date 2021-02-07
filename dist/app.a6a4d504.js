// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lastFmApi = exports.ipDataApiKey = void 0;
var ipDataApiKey = '2090cf5a3ded3065453a13bd9d5b0f76596478c4dbf6d65778066237';
exports.ipDataApiKey = ipDataApiKey;
var lastFmApi = "f8e8a6e68bea1975052794d9397bd69d";
exports.lastFmApi = lastFmApi;
},{}],"src/app.js":[function(require,module,exports) {
"use strict";

var _keys = require("./keys.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// start - lastFM data pull
function callLastFmApi(_x) {
  return _callLastFmApi.apply(this, arguments);
}

function _callLastFmApi() {
  _callLastFmApi = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(country) {
    var lastFMUrl, lastFMParams, rawResponse, json;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            lastFMUrl = new URL('http://ws.audioscrobbler.com/2.0/');
            lastFMParams = {
              'method': 'geo.gettoptracks',
              'country': country,
              'api_key': _keys.lastFmApi,
              'format': 'json'
            }; // add query string to URL

            lastFMUrl.search = new URLSearchParams(lastFMParams).toString(); // fetch resource

            _context.next = 5;
            return fetch(lastFMUrl);

          case 5:
            rawResponse = _context.sent;
            _context.next = 8;
            return rawResponse.json();

          case 8:
            json = _context.sent;

            if (rawResponse.ok) {
              _context.next = 12;
              break;
            }

            alert('failed to load API', lastFMUrl); // we want to stop execution if there is an error

            return _context.abrupt("return");

          case 12:
            if (rawResponse.ok) {
              console.log('Success for ', lastFMUrl);
            }

            console.log("data here->", json);
            return _context.abrupt("return", json);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _callLastFmApi.apply(this, arguments);
}

; // end - lastFM data pull
// title case user input

function titleCase(str) {
  str = str.toLowerCase().split(' ');

  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }

  return str.join(' ');
} // end - title case user input
// start - code runs on page load


function onLoadHandler() {
  return _onLoadHandler.apply(this, arguments);
}

function _onLoadHandler() {
  _onLoadHandler = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var json, _json, detectVisitorCountry, _detectVisitorCountry, visitorCountry, lastFMdata;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _detectVisitorCountry = function _detectVisitorCountry3() {
              _detectVisitorCountry = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var detectIP;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        detectIP = json("https://api.ipdata.co?api-key=".concat(_keys.ipDataApiKey)).then(function (data) {
                          var visitorCountry = data.country_name;
                          console.log("user country->", visitorCountry);
                          console.log("what you can do with user data", data); // end - promise to handle detecting user's location

                          return visitorCountry;
                        });
                        return _context3.abrupt("return", detectIP);

                      case 2:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));
              return _detectVisitorCountry.apply(this, arguments);
            };

            detectVisitorCountry = function _detectVisitorCountry2() {
              return _detectVisitorCountry.apply(this, arguments);
            };

            _json = function _json3() {
              _json = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", fetch(url).then(function (res) {
                          return res.json();
                        }));

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));
              return _json.apply(this, arguments);
            };

            json = function _json2(_x2) {
              return _json.apply(this, arguments);
            };

            _context4.next = 6;
            return detectVisitorCountry();

          case 6:
            visitorCountry = _context4.sent;
            _context4.next = 9;
            return callLastFmApi(visitorCountry);

          case 9:
            lastFMdata = _context4.sent;
            document.getElementById("onLoad").classList.remove("is-hidden");
            setTimeout(function () {
              addSongDataToPage(lastFMdata, visitorCountry);
            }, 2001);
            setTimeout(function () {
              document.getElementById("onLoad").classList.add("is-hidden");
            }, 2000);
            setTimeout(function () {
              document.getElementById("chart-content").classList.remove("is-hidden");
            }, 2000);
            buttonListener();

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _onLoadHandler.apply(this, arguments);
}

; // end - code runs on page load
// button listener for user input

function buttonListener() {
  return _buttonListener.apply(this, arguments);
}

function _buttonListener() {
  _buttonListener = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var countries, btn;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            // set of countries following ISO 3166-1-alpha-2 standard
            countries = ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia And Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic Of The", "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-bissau", "Guyana", "Haiti", "Heard Island And Mcdonald Islands", "Holy See (vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic Of", "Iraq", "Ireland", "Isle Of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic Of", "Korea, Republic Of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States Of", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Kitts And Nevis", "Saint Lucia", "Saint Pierre And Miquelon", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia And The South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard And Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic Of", "Thailand", "Timor-leste", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.s.", "Wallis And Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"]; // button functionality
            //button click listener + action begin

            btn = document.getElementById('user-input-button');
            btn.addEventListener('click', /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(event) {
                var inputElement, userInputCountry, userInputApiCall;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        event.preventDefault(); // console.log('click');
                        //grabs user input - begin

                        inputElement = document.getElementById('user-input'); //grabs user input - end
                        //button click listener + action end

                        document.getElementById("user-input-button").classList.add("is-loading");
                        userInputCountry = titleCase(inputElement.value);
                        console.log("typeof->", _typeof(inputElement.value));

                        if (!countries.includes(userInputCountry)) {
                          _context5.next = 16;
                          break;
                        }

                        _context5.next = 8;
                        return callLastFmApi(userInputCountry);

                      case 8:
                        userInputApiCall = _context5.sent;
                        document.getElementById("user-input-button").classList.remove("is-warning");
                        document.getElementById("chart-content").classList.add("is-hidden");
                        document.getElementById("add-data-points").innerHTML = ""; //clear all the things 

                        document.getElementById("user-input-button").classList.remove("is-danger");
                        document.getElementById("user-input").classList.remove("is-danger");
                        setTimeout(function () {
                          addSongDataToPage(userInputApiCall, userInputCountry);
                        }, 2001); //clear input begin

                        inputElement.value = ''; //clear input end

                      case 16:
                        if (userInputCountry == "" || userInputCountry == " ") {
                          setTimeout(function () {
                            document.getElementById("chart-content").classList.add("is-hidden");
                          }, 1000);
                          setTimeout(function () {
                            document.getElementById("add-data-points").innerHTML = "";
                          }, 1020);
                          setTimeout(function () {
                            document.getElementById("user-input-button").classList.remove("is-loading");
                          }, 1020);
                          setTimeout(function () {
                            document.getElementById("user-input-button").classList.remove("is-danger");
                          }, 1001);
                          setTimeout(function () {
                            document.getElementById("user-input-button").classList.add("is-danger");
                          }, 1001);
                          setTimeout(function () {
                            document.getElementById("user-input").classList.add("is-danger");
                          }, 1001);
                          setTimeout(function () {
                            inputElement.value = "Oops! You forgot to put in a country. Try again.";
                          }, 1000);
                        }

                        if (!countries.includes(userInputCountry)) {
                          setTimeout(function () {
                            document.getElementById("chart-content").classList.add("is-hidden");
                          }, 1000);
                          setTimeout(function () {
                            document.getElementById("add-data-points").innerHTML = "";
                          }, 1020);
                          setTimeout(function () {
                            document.getElementById("user-input-button").classList.remove("is-loading");
                          }, 1020);
                          setTimeout(function () {
                            document.getElementById("user-input-button").classList.remove("is-danger");
                          }, 1001);
                          setTimeout(function () {
                            document.getElementById("user-input-button").classList.add("is-danger");
                          }, 1001);
                          setTimeout(function () {
                            document.getElementById("user-input").classList.add("is-danger");
                          }, 1001);
                          setTimeout(function () {
                            inputElement.value = "".concat(userInputCountry, " is not a valid country. Try again.");
                          }, 1000);
                        }

                      case 18:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x3) {
                return _ref.apply(this, arguments);
              };
            }()); // end button listen functionality

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _buttonListener.apply(this, arguments);
}

; // end - button listener function
// start - chart styling

function addSongDataToPage(lastFMdata, visitorCountry) {
  console.log("what is happening with data here->", lastFMdata);

  if (lastFMdata.error) {
    document.getElementById("user-input-button").classList.add("is-loading");
    document.getElementById("user-input-button").classList.add("is-warning");
    setTimeout(function () {
      document.getElementById("user-input-button").classList.remove("is-loading");
    }, 1020);
    setTimeout(function () {
      document.getElementById("user-input-button").classList.remove("is-danger");
    }, 1001);
    setTimeout(function () {
      document.getElementById("user-input-button").classList.add("is-danger");
    }, 1001);
    setTimeout(function () {
      document.getElementById("user-input").classList.add("is-danger");
    }, 1000);
    setTimeout(function () {
      document.getElementById("add-data-points").innerHTML = "";
    }, 1000);
    setTimeout(function () {
      document.getElementById("user-input").value = "".concat(visitorCountry, " is not a valid country. Try again.");
    }, 1000);
    setTimeout(function () {
      document.getElementById("chart-content").classList.add("is-hidden");
    }, 999);
    return;
  } else {
    document.getElementById("user-input-button").classList.remove("is-loading");
    document.getElementById("user-input-button").classList.remove("is-loading");
    document.getElementById("user-input-button").classList.remove("is-warning");
    var theadElement = document.createElement("thead"); // Create a <thead> node

    document.getElementById("add-data-points").appendChild(theadElement); // Append to table

    var trElementWithClass = document.createElement("tr"); // Create a <tr> node

    trElementWithClass.setAttribute("class", "is-selected"); // set class

    theadElement.appendChild(trElementWithClass); // Append to thead

    var NumberThElement = document.createElement("th"); // Create a <thead> node

    var NumberThText = document.createTextNode("#"); // Create a tr text node

    NumberThElement.appendChild(NumberThText); // Append the text

    trElementWithClass.appendChild(NumberThElement); // Append to thead

    var ArtistThElement = document.createElement("th"); // Create a <thead> node

    var ArtistThText = document.createTextNode("Artist"); // Create a tr text node

    ArtistThElement.appendChild(ArtistThText); // Append the text

    trElementWithClass.appendChild(ArtistThElement); // Append to thead

    var SongThElement = document.createElement("th"); // Create a <thead> node

    var SongThText = document.createTextNode("Song"); // Create a tr text node

    SongThElement.appendChild(SongThText); // Append the text

    trElementWithClass.appendChild(SongThElement); // Append to thead

    var ListenThElement = document.createElement("th"); // Create a <thead> node

    var ListenThText = document.createTextNode("Listen"); // Create a tr text node

    ListenThElement.appendChild(ListenThText); // Append the text

    trElementWithClass.appendChild(ListenThElement); // Append to thead

    var tbodyElement = document.createElement("tbody"); // Create a <tbody> node

    document.getElementById("add-data-points").appendChild(tbodyElement); // Append to table

    var number = 0;

    for (var _i = 0, _Object$entries = Object.entries(lastFMdata.tracks.track); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      var changeH2Text = document.getElementById("country-headline");
      changeH2Text.innerHTML = "Top Tracks from ".concat(visitorCountry);
      var trElement = document.createElement("tr"); // Create a <tr> node

      tbodyElement.appendChild(trElement); // Append to tbody

      var thElement = document.createElement("th"); // Create a <th> node

      var displayNumber = Number(Object.keys(lastFMdata.tracks.track)[key]) + 1;
      var thText = document.createTextNode(displayNumber); // Create a th text node

      thElement.appendChild(thText); // Append the text 

      trElement.appendChild(thElement); // Append to tr

      var tdElement = document.createElement("td"); // Create a <td> node

      var artistTdText = document.createTextNode(lastFMdata.tracks.track[key].artist.name); // Create a td text node

      tdElement.appendChild(artistTdText); // Append the text 

      trElement.appendChild(tdElement); // Append to tr

      var tdElement2 = document.createElement("td"); // Create a <td> 2 node

      var songNameTdText = document.createTextNode(lastFMdata.tracks.track[key].name); // Create a td text node

      tdElement2.appendChild(songNameTdText); // Append the text 

      trElement.appendChild(tdElement2); // Append to tr

      var tdElement3 = document.createElement("td"); // Create a <td> 2 node

      var playLinkTag = document.createElement("a"); // Create a <a> node

      tdElement3.appendChild(playLinkTag); // Append the text

      playLinkTag.setAttribute("href", lastFMdata.tracks.track[key].url); // URL path

      playLinkTag.setAttribute("target", "_blank"); // URL path

      var playSongText = document.createElement("img"); // Create a img

      playSongText.setAttribute("src", "./img/play-circle.png"); // img URL path

      playLinkTag.appendChild(playSongText);
      trElement.appendChild(tdElement3); // Append to tr

      document.getElementById("chart-content").classList.remove('is-hidden');
    } //end - styling data loop

  } //end - keys > 1 loops

}

; // // end chart styling

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onLoadHandler);
} else {
  onLoadHandler();
}
},{"./keys.js":"src/keys.js"}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55374" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app.js"], null)
//# sourceMappingURL=/app.a6a4d504.js.map