const ship = (shipLength, id) => {
  const length = shipLength;
  const tiles = Array(length).fill(null);

  const getLength = () => length;
  const getTiles = () => tiles;

  const hit = (i) => {
    tiles[i] = 'hit';
  };
  const isSunk = () => tiles.every((tile) => tile === 'hit');

  return { id, getLength, getTiles, hit, isSunk };
};

const getShips = () => {
  return {
    destroyer: ship(2, '1'),
    submarine: ship(3, '2'),
    cruiser: ship(3, '3'),
    battleship: ship(4, '4'),
    carrier: ship(5, '5'),
  };
};

export { ship, getShips };
