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
humanBoard.placeShipX(ship(2, '1'), [0, 0]);
humanBoard.placeShipX(ship(3, '2'), [0, 2]);
humanBoard.placeShipX(ship(3, '3'), [0, 4]);
humanBoard.placeShipX(ship(4, '4'), [0, 6]);
humanBoard.placeShipX(ship(5, '5'), [0, 8]);

const computer = player('computer');
const computerBoard = gameBoard();
computerBoard.placeShipX(ship(2, '1'), [0, 0]);
computerBoard.placeShipX(ship(3, '2'), [0, 2]);
computerBoard.placeShipX(ship(3, '3'), [0, 4]);
computerBoard.placeShipX(ship(4, '4'), [0, 6]);
computerBoard.placeShipX(ship(5, '5'), [0, 8]);

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
      square.setAttribute('id', `${[j, i]}`);
      hBoard.append(square);
    }
  }
};

const renderComputerBoard = () => {
  const attackSquare = (e) => {
    if (!humanBoard.isAllSunk() && !computerBoard.isAllSunk()) {
      human.attack(computerBoard, e.target.id.split(','));
      computer.attack(humanBoard);
      document.querySelector('#human-board').textContent = '';
      document.querySelector('#computer-board').textContent = '';
      renderhumanBoard();
      renderComputerBoard();

      if (humanBoard.isAllSunk() && computerBoard.isAllSunk()) {
        console.log('Draw!');
      } else if (computerBoard.isAllSunk()) {
        console.log('Human won!');
      } else if (humanBoard.isAllSunk()) {
        console.log('Computer won!');
      }
    }
  };

  const cBoard = document.querySelector('#computer-board');
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const square = document.createElement('div');
      if (computerBoard.getBoard()[i][j] === 'x') {
        square.classList.add('empty');
        square.addEventListener('click', attackSquare);
      } else if (computerBoard.getBoard()[i][j] === 'm') {
        square.classList.add('missed');
      } else if (computerBoard.getBoard()[i][j] === 'h') {
        square.classList.add('hit');
      } else {
        square.classList.add('hiddenShip');
        square.addEventListener('click', attackSquare);
      }
      square.setAttribute('id', `${[j, i]}`);
      cBoard.append(square);
    }
  }
};

renderhumanBoard();
renderComputerBoard();
