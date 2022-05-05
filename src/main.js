//import * as App from "./components/App.js";
//import App from "./components/App.js";
//console.log(App);
import pokemon from "./data/pokemon/pokemon.js";
//import webdev from "./data/webdev/webdev.js";
import {
  gameBoard,
  timerOff,
  match,
  drawScore,
  noMatch,
} from "./components/App.js";

//Our global variables
let selectedCards = [];
let selectedCardsNames = [];

let firstClicked = false;
let time = "";
let lockGameBoard = false;

let data = pokemon.items;

//Calling gameBoard - Creating my gameBoard --Appending cards to HTML
const cardsArray = gameBoard(data);
for (let i = 0; i < cardsArray.length; i++) {
  document.getElementById("cards").appendChild(cardsArray[i]);
}

//FUNCIÓN HANDLING CLICK
const playGame = () => {
  for (let i = 0; i < cardsArray.length; i++) {
    let card = cardsArray[i];
    card.addEventListener("click", () => {
      if (lockGameBoard) return;
      if (card.classList) {
        card.classList.toggle("is-flipped");
      }

      if (!firstClicked) {
        timerOn();
      }
      firstClicked = true;
      if (selectedCardsNames.length < 2) {
        selectedCards.push(card);
        selectedCardsNames.push(card.dataset.name);
        console.log(selectedCardsNames.length, "length");
        if (selectedCardsNames.length === 2) {
          if (selectedCardsNames[0] === selectedCardsNames[1]) {
            match();
            const sum = drawScore();
            if (sum === 9) {
              winGame();
            }
          } else {
            lockGameBoard = true;
            noMatch(selectedCards[0], selectedCards[1]);
          }
          selectedCards = [];
          selectedCardsNames = [];
          setTimeout(() => {
            lockGameBoard = false;
          }, 1510);
        }
      }
    });
  }
};
playGame(cardsArray);

//FUNCIÓN MATCH
/*const match = () => {
  let matchSound = new Audio("sound/match.mp3");
  matchSound.play();
  selectedCards = [];
  selectedCardsNames = [];
  score++;
}; */

//FUNCIÓN WIN
const winGame = () => {
  setTimeout(() => {
    let win = new Audio("sound/winner.mp3");
    win.play();
    congratsPopup();
    timerOff(time);
  }, 1300);
};

//FUNCIÓN OPEN MODAL
const congratsPopup = () => {
  let winAlert = document.getElementById("openModal2");
  winAlert.classList.add("show-modalDialog");

  let congratsMessage = document.getElementById("congrats-message");
  congratsMessage.textContent = "Congrats, you have found all the matches!";

  let closeCongrats = document.getElementById("close");
  closeCongrats.addEventListener("click", () => {
    winAlert.classList.remove("show-modalDialog");
  });
};

//FUNCIÓN START TIMER
const timerOn = () => {
  let secs = 0;
  let mins = 0;
  let SS = "";
  let MM = "";
  let timerEl = document.getElementById("timer");

  time = setInterval(() => {
    secs++;
    if (secs == 60) {
      secs = 0;
      mins++;
    }

    secs < 10 ? (SS = `0${secs}`) : (SS = `${secs}`);
    mins < 10 ? (MM = `0${mins}`) : (SS = `${mins}`);

    timerEl.textContent = "Timer: " + `${MM}:${SS}`;
  }, 1000);
};

//FUNCIÓN RESTART
let restartGame = document.getElementById("restart");
restartGame.addEventListener("click", () => {
  document.location.reload();
});

/*---------------------------------------------------------------------------------------------------------------------*/

//FUNCIÓN POP UP RULES
//Declaramos en variable la clase del Modal
/*let popUp = document.getElementById("openModal");
//Para que al cargar se redireccione al ID OpenModal y salga el popup
window.startPopup = function startPopup() {
  popUp.classList.add("show-modalDialog");
};
//Al darle al la x en onclick se cambian las propiedades del CSS del popup al Hide
window.closePopup = function closePopup() {
  popUp.classList.remove("show-modalDialog");
}; */

//APPENDIG GAMEBOARD A HTML
//const cardsArray = App.start();
//console.log(cardsArray)

/*for (let index = 0; index < cardsArray.length; index++) {
  document.getElementById("cards").appendChild(cardsArray[index]);
} */
