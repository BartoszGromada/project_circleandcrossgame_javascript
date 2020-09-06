/* eslint-disable linebreak-style */
import {select, varibles} from './settings.js';

const squers = document.querySelectorAll(select.element.square);
const button = document.querySelector(select.element.button);
const options = document.querySelectorAll(select.element.radio);

squers.forEach(squer =>
  squer.addEventListener('click', event => {
    const clickedElement = event.target;
    const number = clickedElement.getAttribute(select.atribute.number);
    const state = clickedElement.getAttribute(select.atribute.state);

    if (state === 'free') {
      if (varibles.player == 1) {
        playerOne(clickedElement, number);
      }
      else if (varibles.player == 2) {
        playerTwo(clickedElement);
      }
      else {
        console.log('błąd: nieznany gracz');
      }     
    }
    else {
      console.log('komunikat: dla tego elemntu została już określona zawartość - brak działania');
    }
  })
);

const playerOne = (clickedElement, number) => {
  
  clickedElement.classList.add(select.class.circle);
  clickedElement.setAttribute(select.atribute.state, 'busy');
  select.array.playerOne.push(parseInt(number));
  resultWeryfication(select.array.playerOne, varibles.player);

  (varibles.winnerMessage === 1) ? console.log('end') : null ;

  varibles.player = 2;
  varibles.move++;

  console.log('playerOneArray1: ', select.array.playerOne);
  console.log('playerTwoArray1: ', select.array.playerTwo);
  

  if (options[0].checked == true) {
    playerTwo(clickedElement);
    varibles.player = 1;
  }

  return varibles.player;
};

const playerTwo = (clickedElement) => {

  if (options[0].checked == true) {
    select.array.fullElem.forEach(el => {

      const position = select.array.fullElem.indexOf(el);

      (select.array.playerOne.indexOf(el) > -1) ? select.array.fullElem.splice(position, 1) : null ;

      (select.array.playerTwo.indexOf(el) > -1) ? select.array.fullElem.splice(position, 1) : null ;
    });

    varibles.fullElemLength = select.array.fullElem.length;
    const randomPosition = Math.floor(Math.random() * varibles.fullElemLength);
    varibles.selectSquerNumber = select.array.fullElem[randomPosition];
    const selectSquers = document.querySelector(select.element.square + '[data-number="' + varibles.selectSquerNumber + '"]');
    selectSquers.classList.add(select.class.cross);
    selectSquers.setAttribute(select.atribute.state, 'busy');
  }
  else if (options[1].checked == true) {
    if (varibles.move === 2) {
      const middleSquer = document.querySelector(select.element.square + '[data-number="5"]');
      const stateMiddleSquer = middleSquer.getAttribute(select.atribute.state);

      (stateMiddleSquer === 'free') ? middleSquer.classList.add(select.class.cross) && middleSquer.setAttribute(select.atribute.state, 'busy') : console.log('pole zablokowane');
    }
    else if (varibles.move === 4) {

    }
    else if (varibles.move === 6) {

    }
    else if (varibles.move === 8) {

    }
    else {
      console.log('błąd: bład algorytmu zaawansowanego')
    }
  }
  else if (options[2].checked == true) {
    clickedElement.classList.add(select.class.cross);
    clickedElement.setAttribute(select.atribute.state, 'busy');
  }
  else {
    console.log('błąd: nieznana opcja trybu');
  }
  select.array.playerTwo.push(varibles.selectSquerNumber);
  resultWeryfication(select.array.playerTwo, varibles.player);
  varibles.player = 1;
  varibles.move++;
  console.log('playerOneArray2: ', select.array.playerOne);
  console.log('playerTwoArray2: ', select.array.playerTwo);
  return varibles.player;
};

const resultWeryfication = (array, player) => {
  const rund = varibles.move/2;

  select.array.winnerResults.forEach((winnerResult) => {

    const weryfication = winnerResult.every(
      (index) => array.indexOf(index) > -1
    );

    if (varibles.winnerMessage === 0 && weryfication === true) {

      const msg = 'Zwycieżył player ' + player + ' w ' + Math.ceil(rund)+ ' rundzie!';
      
      squers.forEach(squer => {
        const state = squer.getAttribute(select.atribute.state);
        if (state === 'free') {
          squer.setAttribute(select.atribute.state, 'busy');
          squer.classList.add(select.class.block);
        }
      });
      printResult(msg);
      varibles.winnerMessage = 1;
    }
  });

  if(varibles.winnerMessage === 0 && varibles.move === 9) {
    const msg = 'Nikt nie zwycieżył, mineło ' + varibles.move + ' ruchów, w ' + Math.ceil(rund)+ ' rundach.';
    printResult(msg);
  }
  return varibles.winnerMessage;
};

const printResult = msg => {
  const div = document.createElement('div');
  div.innerHTML = msg;
  document.getElementById(select.id.result).appendChild(div);
};

button.addEventListener('click', () => {
  document.getElementById(select.id.result).innerHTML = '';

  squers.forEach(squer => {
    squer.classList.remove(select.class.circle);
    squer.classList.remove(select.class.cross);
    squer.classList.remove(select.class.block);

    squer.setAttribute(select.atribute.state, 'free');

    const playerOneLength = select.array.playerOne.length;
    const playerTwoLength = select.array.playerTwo.length;
    let i = 0;
    varibles.fullElemLength = select.array.fullElem.length;

    select.array.playerOne.splice(0, playerOneLength);
    select.array.playerTwo.splice(0, playerTwoLength);
    select.array.fullElem.splice(0,varibles.fullElemLength);

    for (i=1;i<10;i++) {
      select.array.fullElem.push(i);
    }

    varibles.move = 1;
    varibles.player = 1;
    varibles.winnerMessage = 0;
  });
});
