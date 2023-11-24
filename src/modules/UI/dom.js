import { ship, getShips } from '../factories/ship';
import player from '../factories/player';
import { gameBoard, getRandomBoard } from '../factories/gameboard';

const dom = (() => {
  let gameStatus = true;
  let counter = 0;
  const human = player('human');
  let humanBoard;
  const computer = player('computer');
  let computerBoard;
  const startScreen = document.querySelector('#start');
  const gameScreen = document.querySelector('#game');
  let direction = 'horizontal';

  const getStartScreen = () => {
    humanBoard = gameBoard();
    renderStartBoard();

    const clickedfunc = () => {
      humanBoard = getRandomBoard();
      computerBoard = getRandomBoard();
      renderHumanBoard();
      renderComputerBoard();
      document.querySelector('#start').classList.toggle('hidden');
      document.querySelector('#game').classList.toggle('hidden');
    };
    document
      .querySelector('#random-ship-placements')
      .addEventListener('click', clickedfunc);
  };

  const startGame = () => {
    computerBoard = getRandomBoard();
    startScreen.classList.toggle('hidden');
    renderHumanBoard();
    renderComputerBoard();
    gameScreen.classList.toggle('hidden');
  };

  const renderHumanBoard = () => {
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

    function attackSquare(e) {
      if (!humanBoard.isAllSunk() && !computerBoard.isAllSunk()) {
        human.attack(computerBoard, e.target.id.split(','));
        computer.attack(humanBoard);
        document.querySelector('#human-board').textContent = '';
        document.querySelector('#computer-board').textContent = '';
        renderHumanBoard();
        renderComputerBoard();

        if (humanBoard.isAllSunk() && computerBoard.isAllSunk()) {
          console.log('Draw!');
        } else if (computerBoard.isAllSunk()) {
          console.log('Human won!');
        } else if (humanBoard.isAllSunk()) {
          console.log('Computer won!');
        }
      }
    }
  };

  const renderBoard = (ships) => {
    const ship = ships[ships.length - 1];
    const shipLength = ship.getLength();

    const startBoard = document.querySelector('#start-board');
    startBoard.textContent = '';
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const square = document.createElement('div');
        if (humanBoard.getBoard()[i][j] === 'x') {
          square.classList.add('empty');

          if (direction === 'horizontal') {
            square.addEventListener('mouseover', (e) => {
              for (let i = 0; i < shipLength; i++) {
                const coordinates = `${Number(e.target.id[0]) + i},${
                  e.target.id[2]
                }`;
                if (Number(e.target.id[0]) + i < 10)
                  document
                    .getElementById(`${coordinates}`)
                    .classList.add('active');
              }
            });
            square.addEventListener('mouseleave', (e) => {
              e.target.classList.remove('active');
              for (let i = 0; i < shipLength; i++) {
                const coordinates = `${Number(e.target.id[0]) + i},${
                  e.target.id[2]
                }`;
                if (Number(e.target.id[0]) + i < 10)
                  document
                    .getElementById(`${coordinates}`)
                    .classList.remove('active');
              }
            });

            square.addEventListener('click', (e) => {
              if (Number(e.target.id[0]) + shipLength > 10) return;

              for (let i = 0; i < shipLength; i++) {
                const x = Number(e.target.id[0]) + i;
                const y = e.target.id[2];

                if (humanBoard.getBoard()[y][x] !== 'x') return;
              }

              humanBoard.placeShipX(ship, [
                Number(e.target.id[0]),
                Number(e.target.id[2]),
              ]);
              if (ships.length > 1) {
                ships.pop();
                renderBoard(ships, direction);
              } else {
                startGame();
              }
            });
          } else {
            square.addEventListener('mouseover', (e) => {
              for (let i = 0; i < shipLength; i++) {
                const coordinates = `${e.target.id[0]},${
                  Number(e.target.id[2]) + i
                }`;
                if (Number(e.target.id[2]) + i < 10)
                  document
                    .getElementById(`${coordinates}`)
                    .classList.add('active');
              }
            });
            square.addEventListener('mouseleave', (e) => {
              e.target.classList.remove('active');
              for (let i = 0; i < shipLength; i++) {
                const coordinates = `${e.target.id[0]},${
                  Number(e.target.id[2]) + i
                }`;
                if (Number(e.target.id[2]) + i < 10)
                  document
                    .getElementById(`${coordinates}`)
                    .classList.remove('active');
              }
            });

            square.addEventListener('click', (e) => {
              if (Number(e.target.id[2]) + shipLength > 10) return;

              humanBoard.placeShipY(ship, [
                Number(e.target.id[0]),
                Number(e.target.id[2]),
              ]);
              if (ships.length > 1) {
                ships.pop();
                renderBoard(ships, direction);
              } else {
                startGame();
              }
            });
          }
        } else {
          square.classList.add('ship');
        }
        square.setAttribute('id', `${[j, i]}`);
        startBoard.append(square);
      }
    }
  };

  const renderStartBoard = () => {
    const ships = getShips();
    renderBoard(ships);

    document.querySelector('#direction').addEventListener('click', (e) => {
      const oldDirection = direction;
      const newDirection = e.target.textContent;
      direction = newDirection;
      e.target.textContent = oldDirection;
      renderBoard(ships);
    });
  };
  return { getStartScreen };
})();

export default dom;
