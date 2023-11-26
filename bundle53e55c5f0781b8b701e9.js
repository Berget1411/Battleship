"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["bundle"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_UI_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/UI/dom */ "./src/modules/UI/dom.js");
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");


_modules_UI_dom__WEBPACK_IMPORTED_MODULE_0__["default"].getStartScreen();

/***/ }),

/***/ "./src/modules/UI/dom.js":
/*!*******************************!*\
  !*** ./src/modules/UI/dom.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _factories_ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/ship */ "./src/modules/factories/ship.js");
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../factories/player */ "./src/modules/factories/player.js");
/* harmony import */ var _factories_gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../factories/gameboard */ "./src/modules/factories/gameboard.js");



var dom = function () {
  var human = (0,_factories_player__WEBPACK_IMPORTED_MODULE_1__["default"])('human');
  var humanBoard;
  var computer = (0,_factories_player__WEBPACK_IMPORTED_MODULE_1__["default"])('computer');
  var computerBoard;
  var startScreen = document.querySelector('#start');
  var gameScreen = document.querySelector('#game');
  var whosTurn = 'player';
  var direction = 'horizontal';
  var reset = function reset() {
    document.querySelector('#end-screen').classList.remove('end-screen-active');
    document.querySelector('#human-board').textContent = '';
    document.querySelector('#computer-board').textContent = '';
    startScreen.textContent = '';
    startScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
    whosTurn = 'player';
    direction = 'horizontal';
    humanBoard = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_2__.gameBoard)();
    computerBoard = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_2__.getRandomBoard)();
  };
  var getStartScreen = function getStartScreen() {
    reset();
    renderStart();
  };
  var startGame = function startGame() {
    startScreen.classList.add('hidden');
    renderHuman();
    renderComputer();
    gameScreen.classList.remove('hidden');
  };
  var renderHuman = function renderHuman() {
    renderHumanBoard();
    displayHumanShip();
  };
  var renderHumanBoard = function renderHumanBoard() {
    var hBoard = document.querySelector('#human-board');
    document.querySelector('#enemy').classList.add('playing');
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        var square = document.createElement('div');
        if (humanBoard.getBoard()[i][j] === 'x') {
          square.classList.add('empty');
        } else if (humanBoard.getBoard()[i][j] === 'm') {
          square.classList.add('missed');
          square.innerHTML = '&#x2022;';
        } else if (humanBoard.getBoard()[i][j] === 'h') {
          square.classList.add('hit');
          square.innerHTML = '&#10005;';
        } else {
          square.classList.add('ship');
        }
        square.setAttribute('id', "".concat([j, i]));
        hBoard.append(square);
      }
    }
  };
  var displayHumanShip = function displayHumanShip() {
    document.querySelector('#friendly-ships ul').textContent = '';
    for (var i = 0; i < 5; i++) {
      var _ship = humanBoard.getShips()[i];
      var li = document.createElement('li');
      li.textContent = "".concat((0,_factories_ship__WEBPACK_IMPORTED_MODULE_0__.getShipNames)()[i], " (").concat(_ship.getLength(), ")");
      if (_ship.isSunk()) li.classList.add('sunk');
      document.querySelector('#friendly-ships ul').prepend(li);
    }
  };
  var renderComputer = function renderComputer() {
    renderComputerBoard();
    displayComputerShips();
  };
  var renderComputerBoard = function renderComputerBoard() {
    var cBoard = document.querySelector('#computer-board');
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        var square = document.createElement('div');
        if (computerBoard.getBoard()[i][j] === 'x') {
          square.classList.add('empty');
          square.addEventListener('click', attackSquare);
        } else if (computerBoard.getBoard()[i][j] === 'm') {
          square.classList.add('missed');
          square.innerHTML = '&#x2022;';
        } else if (computerBoard.getBoard()[i][j] === 'h') {
          square.classList.add('hit');
          square.innerHTML = '&#10005;';
        } else {
          square.addEventListener('click', attackSquare);
        }
        square.setAttribute('id', "".concat([j, i]));
        cBoard.append(square);
      }
    }
  };
  var attackSquare = function attackSquare(e) {
    if (whosTurn !== 'player') return;
    var endScreen = document.querySelector('#end-screen');
    var endScreenText = document.querySelector('#end-screen p');
    var playAgain = document.querySelector('#end-screen button');
    if (!humanBoard.isAllSunk() && !computerBoard.isAllSunk()) {
      document.querySelector('#friendly-status').classList.add('invisible');
      document.querySelector('#enemy-status').classList.remove('invisible');
      human.attack(computerBoard, e.target.id.split(','));
      computer.attack(humanBoard);
      whosTurn = 'computer';
      document.querySelector('#computer-board').textContent = '';
      renderComputer();
      document.querySelector('#friendly').classList.add('playing');
      document.querySelector('#enemy').classList.remove('playing');
      var togglePlaying = function togglePlaying() {
        document.querySelector('#friendly').classList.remove('playing');
        document.querySelector('#enemy').classList.add('playing');
      };
      setTimeout(function () {
        document.querySelector('#human-board').textContent = '';
        renderHuman();
        document.querySelector('#friendly-status').classList.remove('invisible');
        document.querySelector('#enemy-status').classList.add('invisible');
        whosTurn = 'player';
        if (endScreenText.textContent === '') togglePlaying();else {
          document.querySelector('#friendly').classList.remove('playing');
          document.querySelector('#enemy').classList.remove('playing');
          document.querySelector('#friendly-status').classList.add('invisible');
          document.querySelector('#enemy-status').classList.add('invisible');
        }
      }, 1500);
      playAgain.addEventListener('click', function () {
        endScreenText.textContent = '';
        getStartScreen();
      }, {
        once: true
      });
      if (humanBoard.isAllSunk() && computerBoard.isAllSunk()) {
        endScreen.classList.add('end-screen-active');
        endScreenText.textContent = 'Draw!';
      } else if (computerBoard.isAllSunk()) {
        endScreen.classList.add('end-screen-active');
        endScreenText.textContent = 'You won!';
      } else if (humanBoard.isAllSunk()) {
        endScreen.classList.add('end-screen-active');
        endScreenText.textContent = 'Computer won!';
      }
    }
  };
  var displayComputerShips = function displayComputerShips() {
    document.querySelector('#enemy-ships ul').textContent = '';
    for (var i = 0; i < 5; i++) {
      var _ship2 = computerBoard.getShips()[i];
      var li = document.createElement('li');
      li.textContent = "".concat((0,_factories_ship__WEBPACK_IMPORTED_MODULE_0__.getShipNames)()[i], " (").concat(_ship2.getLength(), ")");
      if (_ship2.isSunk()) li.classList.add('sunk');
      document.querySelector('#enemy-ships ul').prepend(li);
    }
  };
  var renderStartBoard = function renderStartBoard(ships) {
    var ship = ships[ships.length - 1];
    var shipLength = ship.getLength();
    document.querySelector('.place-instruction').textContent = "Place your ".concat((0,_factories_ship__WEBPACK_IMPORTED_MODULE_0__.getShipNames)()[ships.length - 1], "!");
    var startBoard = document.querySelector('#start-board');
    startBoard.textContent = '';
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        var square = document.createElement('div');
        if (humanBoard.getBoard()[i][j] === 'x') {
          square.classList.add('empty');
          if (direction === 'horizontal') {
            square.addEventListener('mouseover', function (e) {
              for (var _i = 0; _i < shipLength; _i++) {
                var coordinates = "".concat(Number(e.target.id[0]) + _i, ",").concat(e.target.id[2]);
                if (Number(e.target.id[0]) + _i < 10) document.getElementById("".concat(coordinates)).classList.add('active');
              }
            });
            square.addEventListener('mouseleave', function (e) {
              e.target.classList.remove('active');
              for (var _i2 = 0; _i2 < shipLength; _i2++) {
                var coordinates = "".concat(Number(e.target.id[0]) + _i2, ",").concat(e.target.id[2]);
                if (Number(e.target.id[0]) + _i2 < 10) document.getElementById("".concat(coordinates)).classList.remove('active');
              }
            });
            square.addEventListener('click', function (e) {
              if (Number(e.target.id[0]) + shipLength > 10) return;
              for (var _i3 = 0; _i3 < shipLength; _i3++) {
                var x = Number(e.target.id[0]) + _i3;
                var y = e.target.id[2];
                if (humanBoard.getBoard()[y][x] !== 'x') return;
              }
              humanBoard.placeShipX(ship, [Number(e.target.id[0]), Number(e.target.id[2])]);
              if (ships.length > 1) {
                ships.pop();
                renderStartBoard(ships, direction);
              } else {
                startGame();
              }
            });
          } else {
            square.addEventListener('mouseover', function (e) {
              for (var _i4 = 0; _i4 < shipLength; _i4++) {
                var coordinates = "".concat(e.target.id[0], ",").concat(Number(e.target.id[2]) + _i4);
                if (Number(e.target.id[2]) + _i4 < 10) document.getElementById("".concat(coordinates)).classList.add('active');
              }
            });
            square.addEventListener('mouseleave', function (e) {
              e.target.classList.remove('active');
              for (var _i5 = 0; _i5 < shipLength; _i5++) {
                var coordinates = "".concat(e.target.id[0], ",").concat(Number(e.target.id[2]) + _i5);
                if (Number(e.target.id[2]) + _i5 < 10) document.getElementById("".concat(coordinates)).classList.remove('active');
              }
            });
            square.addEventListener('click', function (e) {
              if (Number(e.target.id[2]) + shipLength > 10) return;
              humanBoard.placeShipY(ship, [Number(e.target.id[0]), Number(e.target.id[2])]);
              if (ships.length > 1) {
                ships.pop();
                renderStartBoard(ships, direction);
              } else {
                startGame();
              }
            });
          }
        } else {
          square.classList.add('ship');
        }
        square.setAttribute('id', "".concat([j, i]));
        startBoard.append(square);
      }
    }
  };
  var renderStart = function renderStart() {
    var startBoard = document.createElement('div');
    startBoard.classList.add('board');
    startBoard.setAttribute('id', 'start-board');
    var placeInstruction = document.createElement('div');
    placeInstruction.classList.add('place-instruction');
    var rotateInstruction = document.createElement('div');
    rotateInstruction.classList.add('rotate-instruction');
    rotateInstruction.textContent = '(Press R to rotate ship)';
    var randomButton = document.createElement('button');
    randomButton.setAttribute('id', 'random-ship-placements');
    randomButton.textContent = 'Random';
    startScreen.append(startBoard, placeInstruction, rotateInstruction, randomButton);
    var ships = (0,_factories_ship__WEBPACK_IMPORTED_MODULE_0__.getShips)();
    renderStartBoard(ships);
    randomButton.addEventListener('click', function () {
      humanBoard = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_2__.getRandomBoard)();
      startGame();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'r') {
        changeDirection();
        renderStartBoard(ships);
      }
    });
  };
  var changeDirection = function changeDirection() {
    return direction === 'horizontal' ? direction = 'vertical' : direction = 'horizontal';
  };
  return {
    getStartScreen: getStartScreen
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);

/***/ }),

/***/ "./src/modules/factories/gameboard.js":
/*!********************************************!*\
  !*** ./src/modules/factories/gameboard.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gameBoard: () => (/* binding */ gameBoard),
/* harmony export */   getRandomBoard: () => (/* binding */ getRandomBoard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/factories/ship.js");
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var createBoard = function createBoard() {
  var board = [];
  for (var i = 0; i < 10; i++) {
    var row = [];
    for (var j = 0; j < 10; j++) {
      row.push('x');
    }
    board.push(row);
  }
  return board;
};
var gameBoard = function gameBoard() {
  // x = water, s = ship, h = hit, m = miss,
  var board = createBoard();
  var ships = [];
  var missedShots = [];
  var hitShots = [];
  var getBoard = function getBoard() {
    return board;
  };
  var getShips = function getShips() {
    return ships;
  };
  var getMissedShots = function getMissedShots() {
    return missedShots;
  };
  var getHitShots = function getHitShots() {
    return hitShots;
  };
  var placeShipX = function placeShipX(ship, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      x = _ref2[0],
      y = _ref2[1];
    ships.push(ship);
    for (var i = x; i < x + ship.getLength(); i += 1) {
      board[y][i] = "".concat(ship.id, "-").concat(i - x);
    }
  };
  var placeShipY = function placeShipY(ship, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      x = _ref4[0],
      y = _ref4[1];
    ships.push(ship);
    for (var i = y; i < y + ship.getLength(); i += 1) {
      board[i][x] = "".concat(ship.id, "-").concat(i - y);
    }
  };
  var findShip = function findShip(id) {
    return ships.find(function (ship) {
      return ship.id === id;
    });
  };
  var receiveAttack = function receiveAttack(_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      x = _ref6[0],
      y = _ref6[1];
    if (board[y][x] === 'x') {
      missedShots.push([x, y]);
      board[y][x] = 'm';
    } else if (board[y][x] === 'm') {
      return false;
    } else {
      hitShots.push([x, y]);
      var tileId = board[y][x];
      var attackedShip = findShip(tileId[0]);
      attackedShip.hit(Number(tileId[2]));
      board[y][x] = 'h';
    }
  };
  var isAllSunk = function isAllSunk() {
    for (var _i = 0, _ships = ships; _i < _ships.length; _i++) {
      var ship = _ships[_i];
      if (!ship.isSunk()) return false;
    }
    return true;
  };
  return {
    getBoard: getBoard,
    getShips: getShips,
    getMissedShots: getMissedShots,
    getHitShots: getHitShots,
    placeShipX: placeShipX,
    placeShipY: placeShipY,
    receiveAttack: receiveAttack,
    isAllSunk: isAllSunk
  };
};
var getRandomBoard = function getRandomBoard() {
  var board = gameBoard();
  var ships = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.getShips)();
  var illegalSquares = [];
  ships.forEach(function (ship) {
    var radNum = Math.floor(Math.random() * 2); // 0 for x-placement and 1 for y
    var valid = true;
    while (valid) {
      var x = Math.floor(Math.random() * 10);
      var y = Math.floor(Math.random() * 10);
      if (ship.getLength() === 2) {
        if (radNum === 0) {
          if (x + ship.getLength() - 1 > 9) continue;
          board.placeShipX(ship, [x, y]);
          for (var i = y - 1; i <= y + 1; i++) {
            for (var j = x - 1; j <= x + ship.getLength(); j++) {
              if (!illegalSquares.includes("".concat(j, ",").concat(i))) illegalSquares.push("".concat(j, ",").concat(i));
            }
          }
        } else {
          if (y + ship.getLength() - 1 > 9) continue;
          board.placeShipY(ship, [x, y]);
          for (var _i2 = y - 1; _i2 <= y + ship.getLength(); _i2++) {
            for (var _j = x - 1; _j <= x + 1; _j++) {
              if (!illegalSquares.includes("".concat(_j, ",").concat(_i2))) illegalSquares.push("".concat(_j, ",").concat(_i2));
            }
          }
        }
        break;
      }
      if (illegalSquares.includes("".concat(x, ",").concat(y))) continue;
      if (radNum === 0) {
        if (illegalSquares.includes("".concat(x + ship.getLength() - 1, ",").concat(y)) || illegalSquares.includes("".concat(x + ship.getLength() - 2, ",").concat(y)) || illegalSquares.includes("".concat(x + ship.getLength() - 3, ",").concat(y)) || x + ship.getLength() - 1 > 9) continue;
        board.placeShipX(ship, [x, y]);
        for (var _i3 = y - 1; _i3 <= y + 1; _i3++) {
          for (var _j2 = x - 1; _j2 <= x + ship.getLength(); _j2++) {
            if (!illegalSquares.includes("".concat(_j2, ",").concat(_i3))) illegalSquares.push("".concat(_j2, ",").concat(_i3));
          }
        }
      } else {
        if (illegalSquares.includes("".concat(x, ",").concat(y + ship.getLength() - 1)) || illegalSquares.includes("".concat(x, ",").concat(y + ship.getLength() - 2)) || illegalSquares.includes("".concat(x, ",").concat(y + ship.getLength() - 3)) || y + ship.getLength() - 1 > 9) continue;
        board.placeShipY(ship, [x, y]);
        for (var _i4 = y - 1; _i4 <= y + ship.getLength(); _i4++) {
          for (var _j3 = x - 1; _j3 <= x + 1; _j3++) {
            if (!illegalSquares.includes("".concat(_j3, ",").concat(_i4))) illegalSquares.push("".concat(_j3, ",").concat(_i4));
          }
        }
      }
      break;
    }
  });
  return board;
};


/***/ }),

/***/ "./src/modules/factories/player.js":
/*!*****************************************!*\
  !*** ./src/modules/factories/player.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
var player = function player(type) {
  var randomShot = function randomShot(board) {
    var shot;
    while (!shot) {
      var x = Math.floor(Math.random() * 10);
      var y = Math.floor(Math.random() * 10);
      if (board.getBoard()[y][x] !== 'h' && board.getBoard()[y][x] !== 'm') {
        shot = [x, y];
      }
    }
    return shot;
  };
  var attack = function attack(board) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : randomShot(board),
      _ref2 = _slicedToArray(_ref, 2),
      x = _ref2[0],
      y = _ref2[1];
    board.receiveAttack([x, y]);
  };
  return {
    type: type,
    attack: attack,
    randomShot: randomShot
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);

/***/ }),

/***/ "./src/modules/factories/ship.js":
/*!***************************************!*\
  !*** ./src/modules/factories/ship.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getShipNames: () => (/* binding */ getShipNames),
/* harmony export */   getShips: () => (/* binding */ getShips),
/* harmony export */   ship: () => (/* binding */ ship)
/* harmony export */ });
var ship = function ship(shipLength, id) {
  var length = shipLength;
  var tiles = Array(length).fill(null);
  var getLength = function getLength() {
    return length;
  };
  var getTiles = function getTiles() {
    return tiles;
  };
  var hit = function hit(i) {
    tiles[i] = 'hit';
  };
  var isSunk = function isSunk() {
    return tiles.every(function (tile) {
      return tile === 'hit';
    });
  };
  return {
    id: id,
    getLength: getLength,
    getTiles: getTiles,
    hit: hit,
    isSunk: isSunk
  };
};
var getShips = function getShips() {
  return [ship(2, '1'), ship(3, '2'), ship(3, '3'), ship(4, '4'), ship(5, '5')];
};
var getShipNames = function getShipNames() {
  return ['Destroyer', 'Submarine', 'Cruiser', 'Battleship', 'Carrier'];
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Lato", sans-serif;
}

body {
  background-color: #334155;
  color: white;
  position: relative;
  min-height: 100vh;
  padding-bottom: 80px;
}

.board {
  width: 400px;
  margin: 20px 0px;
  border: 1px solid white;
  display: flex;
  flex-wrap: wrap;
  box-sizing: content-box;
}
.board .active {
  background-color: #075985 !important;
}
.board div {
  width: 38px;
  height: 38px;
  border: 1px solid white;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.6em;
  transition: background-color 0.2s;
}
.board .ship {
  background-color: #075985;
}
.board .hit {
  background-color: #9f1239;
}
.board .missed {
  background-color: #065f46;
}
.board .empty {
  background-color: transparent;
}

header {
  text-align: center;
  padding: 20px;
  margin-bottom: 20px;
}
header h1 {
  font-size: 3.4em;
}

#display {
  font-size: 1.8em;
}

#start {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
#start .place-instruction {
  font-size: 1.6em;
  font-weight: bold;
}
#start .rotate-instruction {
  font-size: 1.3em;
  color: #e2e8f0;
  margin-bottom: 20px;
}
#start button {
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: transparent;
  border: 2px solid white;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
#start button:hover {
  border-color: #075985;
  color: #075985;
}

#game {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 60px;
  position: relative;
}
#game h2 {
  text-align: center;
}

#enemy,
#friendly {
  transition: background-color 0.2s;
  padding: 15px;
  border-radius: 20px;
}

#computer-board .empty:hover,
#computer-board .ship:hover {
  cursor: pointer;
  background-color: #475569;
}

#friendly-status,
#enemy-status {
  padding: 10px;
  margin-bottom: 20px;
  font-size: 1.7em;
  font-weight: bold;
  text-align: center;
}

#enemy-ships h3,
#friendly-ships h3 {
  font-size: 1.4em;
  margin-bottom: 5px;
}
#enemy-ships ul,
#friendly-ships ul {
  list-style: none;
}
#enemy-ships ul li,
#friendly-ships ul li {
  margin-bottom: 2px;
  font-size: 1.1em;
}

#end-screen {
  text-align: center;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  z-index: 10;
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
}
#end-screen p {
  font-size: 2.2em;
  margin-bottom: 10px;
}
#end-screen button {
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: transparent;
  border: 2px solid white;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
#end-screen button:hover {
  border-color: #075985;
  color: #075985;
}

.hidden {
  display: none !important;
}

.end-screen-active {
  transform: translate(-50%, -50%) scale(1) !important;
}

.invisible {
  opacity: 0;
}

.sunk {
  color: #9f1239;
  text-decoration: line-through;
}

.playing {
  background-color: #64748b;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 30px;
  font-weight: bold;
}
footer p {
  color: rgb(211, 211, 211);
  text-align: center;
}
footer a {
  text-decoration: none;
  color: white;
  transition: color 0.2s;
}
footer a:hover {
  color: gray;
}`, "",{"version":3,"sources":["webpack://./src/styles/index.scss","webpack://./src/styles/main.scss","webpack://./src/styles/start.scss","webpack://./src/styles/game.scss","webpack://./src/styles/footer.scss"],"names":[],"mappings":"AAEA;EACE,sBAAA;EACA,SAAA;EACA,UAAA;EACA,+BAAA;ACAF;;ADGA;EACE,yBAAA;EACA,YAAA;EACA,kBAAA;EACA,iBAAA;EACA,oBAAA;ACAF;;ADGA;EACE,YAAA;EACA,gBAAA;EAEA,uBAAA;EACA,aAAA;EACA,eAAA;EACA,uBAAA;ACDF;ADGE;EACE,oCAAA;ACDJ;ADIE;EACE,WAAA;EACA,YAAA;EACA,uBAAA;EACA,uBAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EAEA,iBAAA;EACA,gBAAA;EACA,iCAAA;ACHJ;ADME;EACE,yBAAA;ACJJ;ADOE;EACE,yBAAA;ACLJ;ADQE;EACE,yBAAA;ACNJ;ADSE;EACE,6BAAA;ACPJ;;AClDA;EACE,kBAAA;EACA,aAAA;EACA,mBAAA;ADqDF;ACnDE;EACE,gBAAA;ADqDJ;;ACjDA;EACE,gBAAA;ADoDF;;ACjDA;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,QAAA;ADoDF;AClDE;EACE,gBAAA;EACA,iBAAA;ADoDJ;ACjDE;EACE,gBAAA;EACA,cAAA;EACA,mBAAA;ADmDJ;AChDE;EACE,kBAAA;EACA,gBAAA;EACA,6BAAA;EACA,uBAAA;EACA,mBAAA;EACA,YAAA;EACA,eAAA;EACA,yCACE;ADiDN;AC9CI;EACE,qBAAA;EACA,cAAA;ADgDN;;AE7FA;EACE,aAAA;EACA,uBAAA;EACA,eAAA;EACA,SAAA;EACA,kBAAA;AFgGF;AE9FE;EACE,kBAAA;AFgGJ;;AE5FA;;EAEE,iCAAA;EACA,aAAA;EACA,mBAAA;AF+FF;;AEzFI;;EACE,eAAA;EACA,yBAAA;AF6FN;;AExFA;;EAEE,aAAA;EACA,mBAAA;EACA,gBAAA;EACA,iBAAA;EACA,kBAAA;AF2FF;;AEtFE;;EACE,gBAAA;EACA,kBAAA;AF0FJ;AExFE;;EACE,gBAAA;AF2FJ;AEzFI;;EACE,kBAAA;EACA,gBAAA;AF4FN;;AEvFA;EACE,kBAAA;EACA,eAAA;EACA,QAAA;EACA,SAAA;EACA,yCAAA;EACA,WAAA;EAEA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,oCAAA;AFyFF;AEvFE;EACE,gBAAA;EACA,mBAAA;AFyFJ;AEtFE;EACE,kBAAA;EACA,gBAAA;EACA,6BAAA;EACA,uBAAA;EACA,mBAAA;EACA,YAAA;EACA,eAAA;EACA,yCACE;AFuFN;AEpFI;EACE,qBAAA;EACA,cAAA;AFsFN;;AEjFA;EACE,wBAAA;AFoFF;;AEjFA;EACE,oDAAA;AFoFF;;AEjFA;EACE,UAAA;AFoFF;;AEjFA;EACE,cAAA;EACA,6BAAA;AFoFF;;AEjFA;EACE,yBAAA;AFoFF;;AGjMA;EACE,kBAAA;EACA,SAAA;EACA,WAAA;EAEA,aAAA;EAEA,iBAAA;AHkMF;AGjME;EACE,yBAAA;EACA,kBAAA;AHmMJ;AGjME;EACE,qBAAA;EACA,YAAA;EACA,sBAAA;AHmMJ;AGjMI;EACE,WAAA;AHmMN","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;700&display=swap');\r\n\r\n* {\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 0;\r\n  font-family: 'Lato', sans-serif;\r\n}\r\n\r\nbody {\r\n  background-color: #334155;\r\n  color: white;\r\n  position: relative;\r\n  min-height: 100vh;\r\n  padding-bottom: 80px;\r\n}\r\n\r\n.board {\r\n  width: 400px;\r\n  margin: 20px 0px;\r\n\r\n  border: 1px solid white;\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  box-sizing: content-box;\r\n\r\n  .active {\r\n    background-color: #075985 !important;\r\n  }\r\n\r\n  div {\r\n    width: 38px;\r\n    height: 38px;\r\n    border: 1px solid white;\r\n    box-sizing: content-box;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n\r\n    font-weight: bold;\r\n    font-size: 1.6em;\r\n    transition: background-color 0.2s;\r\n  }\r\n\r\n  .ship {\r\n    background-color: #075985;\r\n  }\r\n\r\n  .hit {\r\n    background-color: #9f1239;\r\n  }\r\n\r\n  .missed {\r\n    background-color: #065f46;\r\n  }\r\n\r\n  .empty {\r\n    background-color: transparent;\r\n  }\r\n}\r\n","@import url(\"https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;700&display=swap\");\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  font-family: \"Lato\", sans-serif;\n}\n\nbody {\n  background-color: #334155;\n  color: white;\n  position: relative;\n  min-height: 100vh;\n  padding-bottom: 80px;\n}\n\n.board {\n  width: 400px;\n  margin: 20px 0px;\n  border: 1px solid white;\n  display: flex;\n  flex-wrap: wrap;\n  box-sizing: content-box;\n}\n.board .active {\n  background-color: #075985 !important;\n}\n.board div {\n  width: 38px;\n  height: 38px;\n  border: 1px solid white;\n  box-sizing: content-box;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: bold;\n  font-size: 1.6em;\n  transition: background-color 0.2s;\n}\n.board .ship {\n  background-color: #075985;\n}\n.board .hit {\n  background-color: #9f1239;\n}\n.board .missed {\n  background-color: #065f46;\n}\n.board .empty {\n  background-color: transparent;\n}\n\nheader {\n  text-align: center;\n  padding: 20px;\n  margin-bottom: 20px;\n}\nheader h1 {\n  font-size: 3.4em;\n}\n\n#display {\n  font-size: 1.8em;\n}\n\n#start {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 5px;\n}\n#start .place-instruction {\n  font-size: 1.6em;\n  font-weight: bold;\n}\n#start .rotate-instruction {\n  font-size: 1.3em;\n  color: #e2e8f0;\n  margin-bottom: 20px;\n}\n#start button {\n  padding: 10px 20px;\n  font-size: 1.2em;\n  background-color: transparent;\n  border: 2px solid white;\n  border-radius: 20px;\n  color: white;\n  cursor: pointer;\n  transition: border-color 0.2s, color 0.2s;\n}\n#start button:hover {\n  border-color: #075985;\n  color: #075985;\n}\n\n#game {\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 60px;\n  position: relative;\n}\n#game h2 {\n  text-align: center;\n}\n\n#enemy,\n#friendly {\n  transition: background-color 0.2s;\n  padding: 15px;\n  border-radius: 20px;\n}\n\n#computer-board .empty:hover,\n#computer-board .ship:hover {\n  cursor: pointer;\n  background-color: #475569;\n}\n\n#friendly-status,\n#enemy-status {\n  padding: 10px;\n  margin-bottom: 20px;\n  font-size: 1.7em;\n  font-weight: bold;\n  text-align: center;\n}\n\n#enemy-ships h3,\n#friendly-ships h3 {\n  font-size: 1.4em;\n  margin-bottom: 5px;\n}\n#enemy-ships ul,\n#friendly-ships ul {\n  list-style: none;\n}\n#enemy-ships ul li,\n#friendly-ships ul li {\n  margin-bottom: 2px;\n  font-size: 1.1em;\n}\n\n#end-screen {\n  text-align: center;\n  position: fixed;\n  top: 40%;\n  left: 50%;\n  transform: translate(-50%, -50%) scale(0);\n  z-index: 10;\n  width: 400px;\n  padding: 20px;\n  border-radius: 10px;\n  background-color: rgba(0, 0, 0, 0.4);\n}\n#end-screen p {\n  font-size: 2.2em;\n  margin-bottom: 10px;\n}\n#end-screen button {\n  padding: 10px 20px;\n  font-size: 1.2em;\n  background-color: transparent;\n  border: 2px solid white;\n  border-radius: 20px;\n  color: white;\n  cursor: pointer;\n  transition: border-color 0.2s, color 0.2s;\n}\n#end-screen button:hover {\n  border-color: #075985;\n  color: #075985;\n}\n\n.hidden {\n  display: none !important;\n}\n\n.end-screen-active {\n  transform: translate(-50%, -50%) scale(1) !important;\n}\n\n.invisible {\n  opacity: 0;\n}\n\n.sunk {\n  color: #9f1239;\n  text-decoration: line-through;\n}\n\n.playing {\n  background-color: #64748b;\n}\n\nfooter {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  padding: 30px;\n  font-weight: bold;\n}\nfooter p {\n  color: rgb(211, 211, 211);\n  text-align: center;\n}\nfooter a {\n  text-decoration: none;\n  color: white;\n  transition: color 0.2s;\n}\nfooter a:hover {\n  color: gray;\n}","header {\r\n  text-align: center;\r\n  padding: 20px;\r\n  margin-bottom: 20px;\r\n\r\n  h1 {\r\n    font-size: 3.4em;\r\n  }\r\n}\r\n\r\n#display {\r\n  font-size: 1.8em;\r\n}\r\n\r\n#start {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  gap: 5px;\r\n\r\n  .place-instruction {\r\n    font-size: 1.6em;\r\n    font-weight: bold;\r\n  }\r\n\r\n  .rotate-instruction {\r\n    font-size: 1.3em;\r\n    color: #e2e8f0;\r\n    margin-bottom: 20px;\r\n  }\r\n\r\n  button {\r\n    padding: 10px 20px;\r\n    font-size: 1.2em;\r\n    background-color: transparent;\r\n    border: 2px solid white;\r\n    border-radius: 20px;\r\n    color: white;\r\n    cursor: pointer;\r\n    transition:\r\n      border-color 0.2s,\r\n      color 0.2s;\r\n\r\n    &:hover {\r\n      border-color: #075985;\r\n      color: #075985;\r\n    }\r\n  }\r\n}\r\n","#game {\r\n  display: flex;\r\n  justify-content: center;\r\n  flex-wrap: wrap;\r\n  gap: 60px;\r\n  position: relative;\r\n\r\n  h2 {\r\n    text-align: center;\r\n  }\r\n}\r\n\r\n#enemy,\r\n#friendly {\r\n  transition: background-color 0.2s;\r\n  padding: 15px;\r\n  border-radius: 20px;\r\n}\r\n\r\n#computer-board {\r\n  .empty,\r\n  .ship {\r\n    &:hover {\r\n      cursor: pointer;\r\n      background-color: #475569;\r\n    }\r\n  }\r\n}\r\n\r\n#friendly-status,\r\n#enemy-status {\r\n  padding: 10px;\r\n  margin-bottom: 20px;\r\n  font-size: 1.7em;\r\n  font-weight: bold;\r\n  text-align: center;\r\n}\r\n\r\n#enemy-ships,\r\n#friendly-ships {\r\n  h3 {\r\n    font-size: 1.4em;\r\n    margin-bottom: 5px;\r\n  }\r\n  ul {\r\n    list-style: none;\r\n\r\n    li {\r\n      margin-bottom: 2px;\r\n      font-size: 1.1em;\r\n    }\r\n  }\r\n}\r\n\r\n#end-screen {\r\n  text-align: center;\r\n  position: fixed;\r\n  top: 40%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%) scale(0);\r\n  z-index: 10;\r\n\r\n  width: 400px;\r\n  padding: 20px;\r\n  border-radius: 10px;\r\n  background-color: rgba(0, 0, 0, 0.4);\r\n\r\n  p {\r\n    font-size: 2.2em;\r\n    margin-bottom: 10px;\r\n  }\r\n\r\n  button {\r\n    padding: 10px 20px;\r\n    font-size: 1.2em;\r\n    background-color: transparent;\r\n    border: 2px solid white;\r\n    border-radius: 20px;\r\n    color: white;\r\n    cursor: pointer;\r\n    transition:\r\n      border-color 0.2s,\r\n      color 0.2s;\r\n\r\n    &:hover {\r\n      border-color: #075985;\r\n      color: #075985;\r\n    }\r\n  }\r\n}\r\n\r\n.hidden {\r\n  display: none !important;\r\n}\r\n\r\n.end-screen-active {\r\n  transform: translate(-50%, -50%) scale(1) !important;\r\n}\r\n\r\n.invisible {\r\n  opacity: 0;\r\n}\r\n\r\n.sunk {\r\n  color: #9f1239;\r\n  text-decoration: line-through;\r\n}\r\n\r\n.playing {\r\n  background-color: #64748b;\r\n}\r\n","footer {\r\n  position: absolute;\r\n  bottom: 0;\r\n  width: 100%;\r\n\r\n  padding: 30px;\r\n\r\n  font-weight: bold;\r\n  p {\r\n    color: rgb(211, 211, 211);\r\n    text-align: center;\r\n  }\r\n  a {\r\n    text-decoration: none;\r\n    color: white;\r\n    transition: color 0.2s;\r\n\r\n    &:hover {\r\n      color: gray;\r\n    }\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=bundle53e55c5f0781b8b701e9.js.map