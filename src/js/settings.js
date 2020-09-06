/* eslint-disable linebreak-style */
export const select = {
  element: {
    square: '.square',
    button: '.restart',
    radio: 'input[type="radio"]'
  },
  atribute: {
    number: 'data-number',
    state: 'data-state'
  },
  class: {
    cross: 'cross',
    circle: 'circle',
    block: 'block'
  },
  id: {
    result: 'result'
  },
  array: {
    fullElem: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    playerOne: [],
    playerTwo: [],
    winnerResults: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [7, 5, 3],
    ]
  }
};

export let varibles = {
    player: 1,
    move: 1,
    selectSquerNumber: 0,
    fullElemLength: 0,
    winnerMessage: 0 // 0 - not display(default), 1 - display
};
