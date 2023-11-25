import { ship, getShips } from '../factories/ship';
import player from '../factories/player';
import { gameBoard, getRandomBoard } from '../factories/gameboard';

const dom = (() => {
  const human = player('human');
  let humanBoard;
  const computer = player('computer');
  let computerBoard;
  const startScreen = document.querySelector('#start');
  const gameScreen = document.querySelector('#game');
  const display = document.querySelector('#display');

  const shipNames = [
    'Destroyer',
    'Submarine',
    'Cruiser',
    'Battleship',
    'Carrier',
  ];
  let direction = 'horizontal';

  const reset = () => {
    document.querySelector('#end-screen').classList.remove('end-screen-active');
    document.querySelector('#human-board').textContent = '';
    document.querySelector('#computer-board').textContent = '';
    startScreen.textContent = '';
    startScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
    direction = 'horizontal';
    humanBoard = gameBoard();
    computerBoard = getRandomBoard();
  };

  const getStartScreen = () => {
    reset();
    renderStartBoard();
  };

  const startGame = () => {
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
      const endScreen = document.querySelector('#end-screen');
      const endScreenText = document.querySelector('#end-screen p');
      const playAgain = document.querySelector('#end-screen button');

      if (!humanBoard.isAllSunk() && !computerBoard.isAllSunk()) {
        human.attack(computerBoard, e.target.id.split(','));
        computer.attack(humanBoard);
        document.querySelector('#human-board').textContent = '';
        document.querySelector('#computer-board').textContent = '';
        renderHumanBoard();
        renderComputerBoard();

        if (humanBoard.isAllSunk() && computerBoard.isAllSunk()) {
          endScreen.classList.add('end-screen-active');
          endScreenText.textContent = 'Draw!';
        } else if (computerBoard.isAllSunk()) {
          endScreen.classList.add('end-screen-active');
          endScreenText.textContent = 'You won!';
          playAgain.addEventListener('click', getStartScreen);
        } else if (humanBoard.isAllSunk()) {
          endScreen.classList.add('end-screen-active');
          endScreenText.textContent = 'Computer won!';
        }
      }
    }
  };

  const renderBoard = (ships) => {
    const ship = ships[ships.length - 1];
    const shipLength = ship.getLength();

    display.textContent = `Place your ${shipNames[ships.length - 1]}!`;

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
    const startBoard = document.createElement('div');
    startBoard.classList.add('board');
    startBoard.setAttribute('id', 'start-board');
    startScreen.append(startBoard);
    const ships = getShips();
    renderBoard(ships);

    const randomButton = document.createElement('button');
    randomButton.setAttribute('id', 'random-ship-placements');
    randomButton.textContent = 'Random';
    const directionButton = document.createElement('button');
    directionButton.setAttribute('id', 'direction');
    directionButton.textContent = 'vertical';
    startScreen.append(randomButton, directionButton);

    const randomBoard = () => {
      humanBoard = getRandomBoard();
      renderHumanBoard();
      renderComputerBoard();
      document.querySelector('#start').classList.toggle('hidden');
      document.querySelector('#game').classList.toggle('hidden');
    };
    randomButton.addEventListener('click', randomBoard);

    const changeDirection = (e) => {
      const oldDirection = direction;
      const newDirection = e.target.textContent;
      direction = newDirection;
      e.target.textContent = oldDirection;
      renderBoard(ships);
    };

    directionButton.addEventListener('click', changeDirection);
  };
  return { getStartScreen };
})();

export default dom;
