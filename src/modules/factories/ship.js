const ship = (shipName, shipLength) => {
  const name = shipName;
  const length = shipLength;
  let timesHit = 0;

  const getName = () => name;
  const getLength = () => length;
  const getTimesHit = () => timesHit;

  const hit = () => timesHit++;
  const isSunk = () => length === timesHit;

  return { getName, getLength, getTimesHit, hit, isSunk };
};

export default ship;
