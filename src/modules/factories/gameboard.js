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

export default gameBoard;
