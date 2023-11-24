import { getShips } from './ship';

const createBoard = () => {
  const board = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push('x');
    }
    board.push(row);
  }
  return board;
};

const gameBoard = () => {
  // x = water, s = ship, h = hit, m = miss,
  const board = createBoard();
  const ships = [];
  const missedShots = [];
  const hitShots = [];

  const getBoard = () => board;
  const getShips = () => ships;
  const getMissedShots = () => missedShots;
  const getHitShots = () => hitShots;

  const placeShipX = (ship, [x, y]) => {
    ships.push(ship);
    for (let i = x; i < x + ship.getLength(); i += 1) {
      board[y][i] = `${ship.id}-${i - x}`;
    }
  };

  const placeShipY = (ship, [x, y]) => {
    ships.push(ship);
    for (let i = y; i < y + ship.getLength(); i += 1) {
      board[i][x] = `${ship.id}-${i - y}`;
    }
  };

  const findShip = (id) => ships.find((ship) => ship.id === id);

  const receiveAttack = ([x, y]) => {
    if (board[y][x] === 'x') {
      missedShots.push([x, y]);
      board[y][x] = 'm';
    } else if (board[y][x] === 'm') {
      return false;
    } else {
      hitShots.push([x, y]);
      const tileId = board[y][x];
      const attackedShip = findShip(tileId[0]);
      attackedShip.hit(Number(tileId[2]));
      board[y][x] = 'h';
    }
  };

  const isAllSunk = () => {
    for (const ship of ships) {
      if (!ship.isSunk()) return false;
    }
    return true;
  };
  return {
    getBoard,
    getShips,
    getMissedShots,
    getHitShots,
    placeShipX,
    placeShipY,
    receiveAttack,
    isAllSunk,
  };
};

const getRandomBoard = () => {
  const board = gameBoard();
  const ships = getShips();
  const illegalSquares = [];

  ships.forEach((ship) => {
    const radNum = Math.floor(Math.random() * 2); // 0 for x-placement and 1 for y
    let valid = true;
    while (valid) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      if (ship.getLength() === 2) {
        if (radNum === 0) {
          if (x + ship.getLength() - 1 > 9) continue;
          board.placeShipX(ship, [x, y]);
          for (let i = y - 1; i <= y + 1; i++) {
            for (let j = x - 1; j <= x + ship.getLength(); j++) {
              if (!illegalSquares.includes(`${j},${i}`))
                illegalSquares.push(`${j},${i}`);
            }
          }
        } else {
          if (y + ship.getLength() - 1 > 9) continue;
          board.placeShipY(ship, [x, y]);
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
        board.placeShipX(ship, [x, y]);
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
        board.placeShipY(ship, [x, y]);
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
  return board;
};

export { gameBoard, getRandomBoard };
