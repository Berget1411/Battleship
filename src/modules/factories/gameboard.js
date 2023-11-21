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

  const getBoard = () => board;
  const getShips = () => ships;

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

  const findShip = (id) => {
    return ships.find((ship) => ship.id === id);
  };

  const receiveAttack = ([x, y]) => {
    if (board[y][x] === 'x' || board[y][x] === 'm') {
      board[y][x] = 'm';
    } else {
      const tileId = board[y][x];
      const attackedShip = findShip(tileId[0]);
      attackedShip.hit(parseInt(tileId[2]));
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
    placeShipX,
    placeShipY,
    receiveAttack,
    isAllSunk,
  };
};

export default gameBoard;
