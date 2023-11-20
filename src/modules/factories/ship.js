const ship = (shipLength) => {
  const length = shipLength;
  const tiles = Array(length).fill(null);

  const getLength = () => length;
  const getTiles = () => tiles;

  const hit = (i) => (tiles[i] = 'hit');
  const isSunk = () => tiles.every((tile) => tile === 'hit');

  return { getLength, getTiles, hit, isSunk };
};

export default ship;
