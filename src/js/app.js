/* eslint-disable linebreak-style */
const select = {
  element: {
    square: '.square',
    button: '.restart'
  },
  atribute: {
    number: 'data-number',
    state: 'data-state'
  },
  class: {
    cross: 'cross',
    circle: 'circle',
    block: 'block'
  }
};

const squers = document.querySelectorAll(select.element.square);
const button = document.querySelector(select.element.button);

let player = 1;
let move = 1;

const playerOneArray = [];
const playerTwoArray = [];
const winnerResults = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [7, 5, 3],
];

squers.forEach(squer =>
  squer.addEventListener('click', event => {
    event.preventDefault();
    const clickedElement = event.target;
    const number = clickedElement.getAttribute(select.atribute.number);
    const state = clickedElement.getAttribute(select.atribute.state);

    if (state === 'free') {
      if (player == 1) {
        clickedElement.classList.add(select.class.circle);
        clickedElement.setAttribute(select.atribute.state, 'busy');
        playerOneArray.push(parseInt(number));
        resultWeryfication(playerOneArray, player);
        player = 2;
        move++;
        return player;
      }
      if (player == 2) {
        clickedElement.classList.add(select.class.cross);
        clickedElement.setAttribute(select.atribute.state, 'busy');
        playerTwoArray.push(parseInt(number));
        resultWeryfication(playerTwoArray, player);
        player = 1;
        move++;
        return player;
      } else {
        console.log('błąd: nieznany gracz');
      }
    } else {
      console.log(
        'komunikat: dla tego elemntu już klasa określająca zawartość - brak działania'
      );
    }
  })
);

const resultWeryfication = (Array, player) => {
  winnerResults.forEach((winnerResult) => {
    const weryfication = winnerResult.every(
      (index) => Array.indexOf(index) > -1
    );

    if (weryfication === true) {
      const rund = move/2;
      const msg = 'Zwycieżył player ' + player + ' w ' + Math.ceil(rund)+ ' rundzie!';
      squers.forEach(squer => {
        const state = squer.getAttribute(select.atribute.state);
        if (state === 'free') {
          squer.setAttribute(select.atribute.state, 'busy');
          squer.classList.add(select.class.block);
        }
      });
      printResult(msg);
    }
  });
};

const printResult = msg => {
  const div = document.createElement('div');
  div.innerHTML = msg;
  document.getElementById('result').appendChild(div);
};

button.addEventListener('click', () => {
  document.getElementById('result').innerHTML = '';

  squers.forEach(squer => {
    squer.classList.remove('circle');
    squer.classList.remove('cross');
    squer.classList.remove('block');

    squer.setAttribute('data-state', 'free');

    const playerOneLength = playerOneArray.length;
    const playerTwoLength = playerTwoArray.length;
    playerOneArray.splice(0, playerOneLength);
    playerTwoArray.splice(0, playerTwoLength);

    move = 1;
  });
});
