import ship from '../factories/ship';

test('cruiser hit once', () => {
  const battleship = ship('cruiser', 3);
  battleship.hit();

  expect(battleship.getTimesHit()).toBe(1);
});

test('cruiser hit twice', () => {
  const battleship = ship('cruiser', 3);
  battleship.hit();
  battleship.hit();

  expect(battleship.getTimesHit()).toBe(2);
});

test('cruiser sunken', () => {
  const battleship = ship('cruiser', 3);
  battleship.hit();
  battleship.hit();
  battleship.hit();

  expect(battleship.isSunk()).toBe(true);
});

test('cruiser has name cruiser', () => {
  const battleship = ship('cruiser', 3);

  expect(battleship.getName()).toBe('cruiser');
});

test('cruiser has length 3', () => {
  const battleship = ship('cruiser', 3);

  expect(battleship.getLength()).toBe(3);
});
