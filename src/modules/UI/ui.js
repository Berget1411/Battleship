import ship from '../factories/ship';
import player from '../factories/player';
import gameBoard from '../factories/gameboard';

let gameStatus = true;
let counter = 0;

const ship1 = ship(2, '1');
const ship2 = ship(3, '2');
const ship3 = ship(3, '3');
const ship4 = ship(4, '4');
const ship5 = ship(5, '5');

const human = player('human');
const humanBoard = gameBoard();
humanBoard.placeShipX(ship1, [0, 0]);
humanBoard.placeShipX(ship2, [0, 2]);
humanBoard.placeShipX(ship3, [0, 4]);
humanBoard.placeShipX(ship4, [0, 6]);
humanBoard.placeShipX(ship5, [0, 8]);

const computer = player('computer');
const computerBoard = gameBoard();
computerBoard.placeShipX(ship1, [0, 0]);
computerBoard.placeShipX(ship2, [0, 2]);
computerBoard.placeShipX(ship3, [0, 4]);
computerBoard.placeShipX(ship4, [0, 6]);
computerBoard.placeShipX(ship5, [0, 8]);

const renderhumanBoard = () => {
  const hBoard = document.querySelector('#human-board');
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const square = document.createElement('div');
      if (humanBoard.getBoard()[i][j] === 'x') {
        square.classList.add('empty');
      } else if (humanBoard.getBoard()[i][j] === 'm') {
        square.classList.add('missed');
      } else if (humanBoard.getBoard()[i][j] === 'h') {
        square.classList.add('hit');
      } else {
        square.classList.add('ship');
      }
      square.setAttribute('id', `[${[j, i]}]`);
      hBoard.append(square);
    }
  }
};

const renderComputerBoard = () => {
  const cBoard = document.querySelector('#computer-board');
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const square = document.createElement('div');
      if (computerBoard.getBoard()[i][j] === 'x') {
        square.classList.add('empty');
      } else if (computerBoard.getBoard()[i][j] === 'm') {
        square.classList.add('missed');
      } else if (computerBoard.getBoard()[i][j] === 'h') {
        square.classList.add('hit');
      } else {
        square.classList.add('hiddenShip');
      }
      square.setAttribute('id', `[${[j, i]}]`);
      cBoard.append(square);
    }
  }
};

const nextTurn = () => {
  if (counter % 2 === 0) {
    human.attack(computerBoard, [0, 0]);
  } else {
    computer.attack(humanBoard);
  }

  console.log(humanBoard.getBoard());
  console.log(computerBoard.getBoard());
  counter++;
};

nextTurn();
nextTurn();

renderComputerBoard();
renderhumanBoard();
