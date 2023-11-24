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
  return [ship(2, '1'), ship(3, '2'), ship(3, '3'), ship(4, '4'), ship(5, '5')];
};

export { ship, getShips };
