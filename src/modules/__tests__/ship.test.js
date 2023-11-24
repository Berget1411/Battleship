import { ship } from '../factories/ship';

test('hit first tile', () => {
  const battleship = ship(3);
  battleship.hit(0);

  expect(battleship.getTiles()).toEqual(['hit', null, null]);
});

test('hit first & third tile', () => {
  const battleship = ship(3);
  battleship.hit(0);
  battleship.hit(2);

  expect(battleship.getTiles()).toEqual(['hit', null, 'hit']);
});

test('hit first, second & third tile', () => {
  const battleship = ship(3);
  battleship.hit(0);
  battleship.hit(1);
  battleship.hit(2);

  expect(battleship.getTiles()).toEqual(['hit', 'hit', 'hit']);
});

test('ship is sunk', () => {
  const battleship = ship(3);
  battleship.hit(0);
  battleship.hit(1);
  battleship.hit(2);

  expect(battleship.isSunk()).toBeTruthy();
});

test('hit same tile twice', () => {
  const battleship = ship(3);
  battleship.hit(0);
  battleship.hit(0);

  expect(battleship.getTiles()).toEqual(['hit', null, null]);
});
