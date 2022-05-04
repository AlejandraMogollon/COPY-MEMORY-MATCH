//
// Para incluir los diferentes sets de cartas podemos _importar_ el archivo
// JavasSript que contenga el `export` correspondiente...
//
// import pokemon from '../data/pokemon/pokemon.js';
// console.log(pokemon);
//
// O alternativamente podríamos cargar el JSON de forma asíncrona usando
// `fetch` en el momento que consideremos necesario.
//
// fetch('./data/pokemon/pokemon.json')
//   .then(resp => resp.json())
//   .then(console.log)
//   .catch(console.error);
//

import pokemon from "../data/pokemon/pokemon.js";
//console.log(pokemon)

/*const start = () => {
  let shuffling = shuffle(pokemon.items);

  let cardDeck = gameBoard(shuffling);

  return cardDeck;
}; */

//FUNCIÓN SHUFFLING CARTAS
const shuffle = (pokemon) => {
  //let originalCards = pokemon;
  let copyCards = pokemon.concat(pokemon);
  //console.log(copyCards);
  let shuffledCards = copyCards.sort(() => Math.random() - 0.5); 
  
  return shuffledCards; //retornará array de cartas aleatoriamente
};


//FUNCIÓN CREANDO ELEMENTOS DEL DOM
const gameBoard = (pokemon) => {
  let shuffledCards = shuffle(pokemon)
  let cardsArray = [];

  for (let index = 0; index < shuffledCards.length; index++) {
    const card = document.createElement("div");
    const front = document.createElement("img");
    const back = document.createElement("img");

    //Asignar clase a los elementos creados
    card.classList = "card";
    front.classList = "front";
    back.classList = "back";

    //Asignado atributos a los elementos creados
    front.setAttribute("src", shuffledCards[index].image);
    back.setAttribute("src", "img/backcard.png");
    card.dataset.name = shuffledCards[index].id;

    //Incorporando los elementos (appending) al HTML
    card.appendChild(front);
    card.appendChild(back);

    cardsArray.push(card);

    //Llamando a la función playGame
    //card.onclick = () => playGame(card);
    //playGame(card);
  }
  return cardsArray; //retornará el listado de cartas
}; 


//FUNCIÓN MATCH
const match = (selectedCards, selectedCardsNames, score) => {
  let matchSound = new Audio("sound/match.mp3");
  matchSound.play();
  selectedCards = [];
  selectedCardsNames = [];
  score++;
}; 


//FUNCIÓN STOP TIMER
const timerOff = (time) => {
  clearInterval(time);
};







export {gameBoard, timerOff, match};