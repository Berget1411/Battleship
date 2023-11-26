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
  let whosTurn = 'player';

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
    document.querySelector('#enemy').classList.add('playing');

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const square = document.createElement('div');
        if (humanBoard.getBoard()[i][j] === 'x') {
          square.classList.add('empty');
        } else if (humanBoard.getBoard()[i][j] === 'm') {
          square.classList.add('missed');
          square.innerHTML = '&#x2022;';
        } else if (humanBoard.getBoard()[i][j] === 'h') {
          square.classList.add('hit');
          square.innerHTML = '&#10005;';
        } else {
          square.classList.add('ship');
        }
        square.setAttribute('id', `${[j, i]}`);
        hBoard.append(square);
      }
    }
    document.querySelector('#friendly-ships ul').textContent = '';

    for (let i = 0; i < 5; i++) {
      const ship = humanBoard.getShips()[i];

      const li = document.createElement('li');
      li.textContent = `${shipNames[i]} (${ship.getLength()})`;
      if (ship.isSunk()) li.classList.add('sunk');

      document.querySelector('#friendly-ships ul').prepend(li);
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
          square.innerHTML = '&#x2022;';
        } else if (computerBoard.getBoard()[i][j] === 'h') {
          square.classList.add('hit');
          square.innerHTML = '&#10005;';
        } else {
          square.classList.add('ship');
          square.addEventListener('click', attackSquare);
        }
        square.setAttribute('id', `${[j, i]}`);
        cBoard.append(square);
      }
    }

    function attackSquare(e) {
      if (whosTurn !== 'player') return;

      const endScreen = document.querySelector('#end-screen');
      const endScreenText = document.querySelector('#end-screen p');
      const playAgain = document.querySelector('#end-screen button');

      if (!humanBoard.isAllSunk() && !computerBoard.isAllSunk()) {
        document.querySelector('#friendly-status').classList.add('invisible');
        document.querySelector('#enemy-status').classList.remove('invisible');
        human.attack(computerBoard, e.target.id.split(','));
        computer.attack(humanBoard);

        whosTurn = 'computer';
        document.querySelector('#computer-board').textContent = '';
        renderComputerBoard();

        document.querySelector('#friendly').classList.add('playing');
        document.querySelector('#enemy').classList.remove('playing');

        setTimeout(() => {
          document.querySelector('#human-board').textContent = '';
          renderHumanBoard();
          document
            .querySelector('#friendly-status')
            .classList.remove('invisible');
          document.querySelector('#enemy-status').classList.add('invisible');
          whosTurn = 'player';

          if (endScreenText.textContent === '') {
            document.querySelector('#friendly').classList.remove('playing');
            document.querySelector('#enemy').classList.add('playing');
          } else {
            document.querySelector('#friendly').classList.remove('playing');
            document.querySelector('#enemy').classList.remove('playing');
            document
              .querySelector('#friendly-status')
              .classList.add('invisible');
            document.querySelector('#enemy-status').classList.add('invisible');
          }
        }, 1);

        if (humanBoard.isAllSunk() && computerBoard.isAllSunk()) {
          document.querySelector('#enemy').classList.remove('playing');
          document.querySelector('#friendly').classList.remove('playing');
          endScreen.classList.add('end-screen-active');
          endScreenText.textContent = 'Draw!';
          playAgain.addEventListener('click', () => {
            endScreenText.textContent = '';
            getStartScreen();
          });
        } else if (computerBoard.isAllSunk()) {
          document.querySelector('#friendly').classList.remove('playing');
          document.querySelector('#enemy').classList.remove('playing');
          endScreen.classList.add('end-screen-active');
          endScreenText.textContent = 'You won!';
          playAgain.addEventListener('click', () => {
            endScreenText.textContent = '';
            getStartScreen();
          });
        } else if (humanBoard.isAllSunk()) {
          document.querySelector('#enemy').classList.remove('playing');
          document.querySelector('#friendly').classList.remove('playing');
          endScreen.classList.add('end-screen-active');
          endScreenText.textContent = 'Computer won!';
          playAgain.addEventListener('click', () => {
            endScreenText.textContent = '';
            getStartScreen();
          });
        }
      }
    }
    document.querySelector('#enemy-ships ul').textContent = '';

    for (let i = 0; i < 5; i++) {
      const ship = computerBoard.getShips()[i];

      const li = document.createElement('li');
      li.textContent = `${shipNames[i]} (${ship.getLength()})`;
      if (ship.isSunk()) li.classList.add('sunk');

      document.querySelector('#enemy-ships ul').prepend(li);
    }
  };

  const renderBoard = (ships) => {
    const ship = ships[ships.length - 1];
    const shipLength = ship.getLength();

    document.querySelector('.place-instruction').textContent = `Place your ${
      shipNames[ships.length - 1]
    }!`;

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

    const placeInstruction = document.createElement('div');
    placeInstruction.classList.add('place-instruction');
    const rotateInstruction = document.createElement('div');
    rotateInstruction.classList.add('rotate-instruction');
    rotateInstruction.textContent = '(Press R to rotate ship)';

    const randomButton = document.createElement('button');
    randomButton.setAttribute('id', 'random-ship-placements');
    randomButton.textContent = 'Random';
    startScreen.append(
      startBoard,
      placeInstruction,
      rotateInstruction,
      randomButton,
    );
    const ships = getShips();
    renderBoard(ships);

    const randomBoard = () => {
      humanBoard = getRandomBoard();
      renderHumanBoard();
      renderComputerBoard();
      document.querySelector('#start').classList.toggle('hidden');
      document.querySelector('#game').classList.toggle('hidden');
    };
    randomButton.addEventListener('click', randomBoard);

    const changeDirection = () => {
      if (direction === 'horizontal') direction = 'vertical';
      else {
        direction = 'horizontal';
      }
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'r') {
        changeDirection();
        renderBoard(ships);
      }
    });
  };
  return { getStartScreen };
})();

export default dom;
