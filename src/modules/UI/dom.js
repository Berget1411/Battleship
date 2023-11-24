import ship from '../factories/ship';
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

  const renderStartBoard = () => {
    const startBoard = document.querySelector('#start-board');

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
        startBoard.append(square);
      }
    }
  };
  return { getStartScreen };
})();

export default dom;
