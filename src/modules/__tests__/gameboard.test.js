import gameBoard from '../factories/gameboard';
import ship from '../factories/ship';

describe('gameboard', () => {
  let battleship1;
  let battleship2;
  let battleship3;
  let battleship4;
  let battleship5;
  let board;

  beforeEach(() => {
    battleship1 = ship(2, '1');
    battleship2 = ship(3, '2');
    battleship3 = ship(3, '3');
    battleship4 = ship(4, '4');
    battleship5 = ship(5, '5');
    board = gameBoard();
  });

  describe('board', () => {
    test('empty board', () => {
      expect(board.getBoard()).toEqual([
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ]);
    });
  });

  describe('ship placements', () => {
    test('place ships horizontal', () => {
      board.placeShipX(battleship1, [0, 0]);
      board.placeShipX(battleship2, [0, 2]);
      board.placeShipX(battleship3, [0, 4]);
      board.placeShipX(battleship4, [0, 6]);
      board.placeShipX(battleship5, [0, 8]);
      expect(board.getBoard()).toEqual([
        ['1-0', '1-1', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['2-0', '2-1', '2-2', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['3-0', '3-1', '3-2', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['4-0', '4-1', '4-2', '4-3', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['5-0', '5-1', '5-2', '5-3', '5-4', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ]);
    });

    test('place ships vertical', () => {
      board.placeShipY(battleship1, [0, 0]);
      board.placeShipY(battleship2, [2, 2]);
      board.placeShipY(battleship3, [4, 1]);
      board.placeShipY(battleship4, [6, 3]);
      board.placeShipY(battleship5, [8, 2]);
      expect(board.getBoard()).toEqual([
        ['1-0', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['1-1', 'x', 'x', 'x', '3-0', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', '2-0', 'x', '3-1', 'x', 'x', 'x', '5-0', 'x'],
        ['x', 'x', '2-1', 'x', '3-2', 'x', '4-0', 'x', '5-1', 'x'],
        ['x', 'x', '2-2', 'x', 'x', 'x', '4-1', 'x', '5-2', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', '4-2', 'x', '5-3', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', '4-3', 'x', '5-4', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ]);
    });
  });

  describe('receive attack', () => {
    test('battleship1 at [0,0] hit at [0,0]', () => {
      board.placeShipY(battleship1, [0, 0]);
      board.receiveAttack([0, 0]);
      expect(board.getBoard()).toEqual([
        ['h', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['1-1', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ]);
    });

    test('battleship1 at [0,0] hit at [0,0] & [0,1]', () => {
      board.placeShipY(battleship1, [0, 0]);

      board.receiveAttack([0, 0]);
      board.receiveAttack([0, 1]);
      expect(battleship1.getTiles()).toEqual(['hit', 'hit']);
    });

    test('battleship2 at [2,0] shot at [2,0] & [2,2]', () => {
      board.placeShipY(battleship2, [2, 0]);
      board.receiveAttack([2, 0]);
      board.receiveAttack([2, 2]);

      expect(battleship2.getTiles()).toEqual(['hit', null, 'hit']);
    });

    test('missed shot at [1,0] against battleship1 at [0,0]', () => {
      board.placeShipY(battleship1, [0, 0]);

      board.receiveAttack([1, 0]);
      expect(board.getBoard()).toEqual([
        ['1-0', 'm', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['1-1', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
      ]);
    });
  });

  describe('stored hit and missed shots', () => {
    test('two missed shots', () => {
      board.placeShipY(battleship1, [0, 0]);
      board.placeShipY(battleship2, [2, 0]);

      board.receiveAttack([3, 1]);
      board.receiveAttack([5, 3]);
      expect(board.getMissedShots()).toEqual([
        [3, 1],
        [5, 3],
      ]);
    });

    test('two hit shots', () => {
      board.placeShipY(battleship1, [0, 0]);
      board.placeShipY(battleship2, [2, 0]);

      board.receiveAttack([0, 1]);
      board.receiveAttack([2, 2]);
      expect(board.getHitShots()).toEqual([
        [0, 1],
        [2, 2],
      ]);
    });
  });

  describe('get ships', () => {
    test('gameboard contains battleship1 & battleship2', () => {
      board.placeShipY(battleship1, [0, 0]);
      board.placeShipY(battleship2, [2, 0]);

      expect(board.getShips()).toEqual([battleship1, battleship2]);
    });
  });

  describe('is all sunk', () => {
    test('all ships have been sunk', () => {
      board.placeShipY(battleship1, [0, 0]);
      board.placeShipY(battleship2, [2, 0]);

      board.receiveAttack([0, 0]);
      board.receiveAttack([0, 1]);
      board.receiveAttack([2, 0]);
      board.receiveAttack([2, 1]);
      board.receiveAttack([2, 2]);
      expect(board.isAllSunk()).toBeTruthy();
    });

    test('one ship has sunk', () => {
      board.placeShipY(battleship1, [0, 0]);
      board.placeShipY(battleship2, [2, 0]);

      board.receiveAttack([0, 0]);
      board.receiveAttack([0, 1]);
      board.receiveAttack([2, 0]);
      board.receiveAttack([2, 2]);
      expect(board.isAllSunk()).toEqual(false);
    });

    test('no ships have been sunk', () => {
      board.placeShipY(battleship1, [0, 0]);
      board.placeShipY(battleship2, [2, 0]);
      board.receiveAttack([0, 0]);
      board.receiveAttack([2, 0]);
      board.receiveAttack([2, 2]);
      expect(board.isAllSunk()).toEqual(false);
    });
  });
});
