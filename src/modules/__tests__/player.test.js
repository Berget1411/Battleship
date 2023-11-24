import player from '../factories/player';
import { gameBoard } from '../factories/gameboard';
import { ship } from '../factories/ship';

let p1;
let p2;
let p1Board;
let p2Board;

beforeEach(() => {
  p1 = player('human');
  p2 = player('computer');
  p1Board = gameBoard();
  p2Board = gameBoard();
});

describe('Player type', () => {
  test('p1 should be human', () => {
    expect(p1.type).toBe('human');
  });

  test('p2 should be computer', () => {
    expect(p2.type).toBe('computer');
  });
});

describe('human attack', () => {
  test('p1 hit p2 at [0,0]', () => {
    const battleship = ship(3, '2');
    p2Board.placeShipY(battleship, [0, 0]);

    p1.attack(p2Board, [0, 0]);
    expect(p2Board.getHitShots()).toEqual([[0, 0]]);
  });

  test('p1 miss p2 at [3,0]', () => {
    const battleship = ship(3, '2');
    p2Board.placeShipY(battleship, [0, 0]);

    p1.attack(p2Board, [3, 0]);
    expect(p2Board.getMissedShots()).toEqual([[3, 0]]);
  });
});

describe('computer attack', () => {
  test('randomShot gets passed as coord in attack method', () => {
    const battleship = ship(3, '2');
    p1Board.placeShipY(battleship, [0, 0]);

    const random = p2.randomShot(p1Board);
    p2.attack(p1Board, random);
    expect([...p1Board.getMissedShots(), ...p1Board.getHitShots()]).toEqual([
      random,
    ]);
  });
  test('p2 hit p1 at random pos', () => {
    const battleship = ship(3, '2');
    p1Board.placeShipY(battleship, [0, 0]);

    p2.attack(p1Board);
    expect([...p1Board.getMissedShots(), ...p1Board.getHitShots()].length).toBe(
      1,
    );
  });
});
