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
const computerShips = [
  ship(2, '1'),
  ship(3, '2'),
  ship(3, '3'),
  ship(4, '4'),
  ship(5, '5'),
];

const getComputerBoard = () => {
  // make placeShip only one method that can accept x and y.
  // Place first ship at random coord and make coordinates around it occupied "X"
  const computerBoard = gameBoard();
  const illegalSquares = [];

  computerShips.forEach((ship) => {
    const radNum = Math.floor(Math.random() * 2); // 0 for x-placement and 1 for y
    let valid = true;
    while (valid) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      if (ship.getLength() === 2) {
        if (radNum === 0) {
          if (x + ship.getLength() - 1 > 9) continue;
          computerBoard.placeShipX(ship, [x, y]);
          for (let i = y - 1; i <= y + 1; i++) {
            for (let j = x - 1; j <= x + ship.getLength(); j++) {
              if (!illegalSquares.includes(`${j},${i}`))
                illegalSquares.push(`${j},${i}`);
            }
          }
        } else {
          if (y + ship.getLength() - 1 > 9) continue;
          computerBoard.placeShipY(ship, [x, y]);
          for (let i = y - 1; i <= y + ship.getLength(); i++) {
            for (let j = x - 1; j <= x + 1; j++) {
              if (!illegalSquares.includes(`${j},${i}`))
                illegalSquares.push(`${j},${i}`);
            }
          }
        }
        break;
      }
      if (illegalSquares.includes(`${x},${y}`)) continue;
      if (radNum === 0) {
        if (
          illegalSquares.includes(`${x + ship.getLength() - 1},${y}`) ||
          illegalSquares.includes(`${x + ship.getLength() - 2},${y}`) ||
          illegalSquares.includes(`${x + ship.getLength() - 3},${y}`) ||
          x + ship.getLength() - 1 > 9
        )
          continue;
        computerBoard.placeShipX(ship, [x, y]);
        for (let i = y - 1; i <= y + 1; i++) {
          for (let j = x - 1; j <= x + ship.getLength(); j++) {
            if (!illegalSquares.includes(`${j},${i}`))
              illegalSquares.push(`${j},${i}`);
          }
        }
      } else {
        if (
          illegalSquares.includes(`${x},${y + ship.getLength() - 1}`) ||
          illegalSquares.includes(`${x},${y + ship.getLength() - 2}`) ||
          illegalSquares.includes(`${x},${y + ship.getLength() - 3}`) ||
          y + ship.getLength() - 1 > 9
        )
          continue;
        computerBoard.placeShipY(ship, [x, y]);
        for (let i = y - 1; i <= y + ship.getLength(); i++) {
          for (let j = x - 1; j <= x + 1; j++) {
            if (!illegalSquares.includes(`${j},${i}`))
              illegalSquares.push(`${j},${i}`);
          }
        }
      }
      break;
    }
  });
  return computerBoard;
};

const computerBoard = getComputerBoard();

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
        square.classList.add('ship');
        square.addEventListener('click', attackSquare);
      }
      square.setAttribute('id', `${[j, i]}`);
      cBoard.append(square);
    }
  }
};

renderhumanBoard();
renderComputerBoard();
