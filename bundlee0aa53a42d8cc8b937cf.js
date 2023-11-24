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
  var gameStatus = true;
  var counter = 0;
  var human = (0,_factories_player__WEBPACK_IMPORTED_MODULE_1__["default"])('human');
  var humanBoard;
  var computer = (0,_factories_player__WEBPACK_IMPORTED_MODULE_1__["default"])('computer');
  var computerBoard;
  var startScreen = document.querySelector('#start');
  var gameScreen = document.querySelector('#game');
  var getStartScreen = function getStartScreen() {
    humanBoard = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_2__.gameBoard)();
    renderStartBoard();
    var clickedfunc = function clickedfunc() {
      humanBoard = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_2__.getRandomBoard)();
      computerBoard = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_2__.getRandomBoard)();
      renderHumanBoard();
      renderComputerBoard();
      document.querySelector('#start').classList.toggle('hidden');
      document.querySelector('#game').classList.toggle('hidden');
    };
    document.querySelector('#random-ship-placements').addEventListener('click', clickedfunc);
  };
  var startGame = function startGame() {
    startScreen.classList.toggle('hidden');
    renderHumanBoard();
    renderComputerBoard();
    gameScreen.classList.toggle('hidden');
  };
  var renderHumanBoard = function renderHumanBoard() {
    var hBoard = document.querySelector('#human-board');
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        var square = document.createElement('div');
        if (humanBoard.getBoard()[i][j] === 'x') {
          square.classList.add('empty');
        } else if (humanBoard.getBoard()[i][j] === 'm') {
          square.classList.add('missed');
        } else if (humanBoard.getBoard()[i][j] === 'h') {
          square.classList.add('hit');
        } else {
          square.classList.add('ship');
        }
        square.setAttribute('id', "".concat([j, i]));
        hBoard.append(square);
      }
    }
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
        } else if (computerBoard.getBoard()[i][j] === 'h') {
          square.classList.add('hit');
        } else {
          square.classList.add('ship');
          square.addEventListener('click', attackSquare);
        }
        square.setAttribute('id', "".concat([j, i]));
        cBoard.append(square);
      }
    }
    function attackSquare(e) {
      if (!humanBoard.isAllSunk() && !computerBoard.isAllSunk()) {
        human.attack(computerBoard, e.target.id.split(','));
        computer.attack(humanBoard);
        document.querySelector('#human-board').textContent = '';
        document.querySelector('#computer-board').textContent = '';
        renderHumanBoard();
        renderComputerBoard();
        if (humanBoard.isAllSunk() && computerBoard.isAllSunk()) {
          console.log('Draw!');
        } else if (computerBoard.isAllSunk()) {
          console.log('Human won!');
        } else if (humanBoard.isAllSunk()) {
          console.log('Computer won!');
        }
      }
    }
  };
  var renderStartBoard = function renderStartBoard() {
    var startBoard = document.querySelector('#start-board');
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        var square = document.createElement('div');
        if (humanBoard.getBoard()[i][j] === 'x') {
          square.classList.add('empty');
        } else if (humanBoard.getBoard()[i][j] === 'm') {
          square.classList.add('missed');
        } else if (humanBoard.getBoard()[i][j] === 'h') {
          square.classList.add('hit');
        } else {
          square.classList.add('ship');
        }
        square.setAttribute('id', "".concat([j, i]));
        startBoard.append(square);
      }
    }
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
  for (var i in ships) {
    var ship = ships[i];
    var radNum = Math.floor(Math.random() * 2); // 0 for x-placement and 1 for y
    var valid = true;
    while (valid) {
      var x = Math.floor(Math.random() * 10);
      var y = Math.floor(Math.random() * 10);
      if (ship.getLength() === 2) {
        if (radNum === 0) {
          if (x + ship.getLength() - 1 > 9) continue;
          board.placeShipX(ship, [x, y]);
          for (var _i2 = y - 1; _i2 <= y + 1; _i2++) {
            for (var j = x - 1; j <= x + ship.getLength(); j++) {
              if (!illegalSquares.includes("".concat(j, ",").concat(_i2))) illegalSquares.push("".concat(j, ",").concat(_i2));
            }
          }
        } else {
          if (y + ship.getLength() - 1 > 9) continue;
          board.placeShipY(ship, [x, y]);
          for (var _i3 = y - 1; _i3 <= y + ship.getLength(); _i3++) {
            for (var _j = x - 1; _j <= x + 1; _j++) {
              if (!illegalSquares.includes("".concat(_j, ",").concat(_i3))) illegalSquares.push("".concat(_j, ",").concat(_i3));
            }
          }
        }
        break;
      }
      if (illegalSquares.includes("".concat(x, ",").concat(y))) continue;
      if (radNum === 0) {
        if (illegalSquares.includes("".concat(x + ship.getLength() - 1, ",").concat(y)) || illegalSquares.includes("".concat(x + ship.getLength() - 2, ",").concat(y)) || illegalSquares.includes("".concat(x + ship.getLength() - 3, ",").concat(y)) || x + ship.getLength() - 1 > 9) continue;
        board.placeShipX(ship, [x, y]);
        for (var _i4 = y - 1; _i4 <= y + 1; _i4++) {
          for (var _j2 = x - 1; _j2 <= x + ship.getLength(); _j2++) {
            if (!illegalSquares.includes("".concat(_j2, ",").concat(_i4))) illegalSquares.push("".concat(_j2, ",").concat(_i4));
          }
        }
      } else {
        if (illegalSquares.includes("".concat(x, ",").concat(y + ship.getLength() - 1)) || illegalSquares.includes("".concat(x, ",").concat(y + ship.getLength() - 2)) || illegalSquares.includes("".concat(x, ",").concat(y + ship.getLength() - 3)) || y + ship.getLength() - 1 > 9) continue;
        board.placeShipY(ship, [x, y]);
        for (var _i5 = y - 1; _i5 <= y + ship.getLength(); _i5++) {
          for (var _j3 = x - 1; _j3 <= x + 1; _j3++) {
            if (!illegalSquares.includes("".concat(_j3, ",").concat(_i5))) illegalSquares.push("".concat(_j3, ",").concat(_i5));
          }
        }
      }
      break;
    }
  }
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
  return {
    destroyer: ship(2, '1'),
    submarine: ship(3, '2'),
    cruiser: ship(3, '3'),
    battleship: ship(4, '4'),
    carrier: ship(5, '5')
  };
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
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#game {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.board {
  width: 300px;
  height: 300px;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
}
.board div {
  width: 28px;
  height: 28px;
  border: 1px solid black;
}
.board .ship {
  background-color: black;
}
.board .hit {
  background-color: red;
}
.board .missed {
  background-color: green;
}
.board .empty {
  background-color: white;
}

.hidden {
  display: none !important;
}`, "",{"version":3,"sources":["webpack://./src/styles/main.scss"],"names":[],"mappings":"AAAA;EACE,aAAA;EACA,uBAAA;EACA,SAAA;AACF;;AAEA;EACE,YAAA;EACA,aAAA;EACA,uBAAA;EACA,aAAA;EACA,eAAA;AACF;AACE;EACE,WAAA;EACA,YAAA;EACA,uBAAA;AACJ;AAEE;EACE,uBAAA;AAAJ;AAGE;EACE,qBAAA;AADJ;AAIE;EACE,uBAAA;AAFJ;AAKE;EACE,uBAAA;AAHJ;;AAOA;EACE,wBAAA;AAJF","sourcesContent":["#game {\r\n  display: flex;\r\n  justify-content: center;\r\n  gap: 40px;\r\n}\r\n\r\n.board {\r\n  width: 300px;\r\n  height: 300px;\r\n  border: 1px solid black;\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n\r\n  div {\r\n    width: 28px;\r\n    height: 28px;\r\n    border: 1px solid black;\r\n  }\r\n\r\n  .ship {\r\n    background-color: black;\r\n  }\r\n\r\n  .hit {\r\n    background-color: red;\r\n  }\r\n\r\n  .missed {\r\n    background-color: green;\r\n  }\r\n\r\n  .empty {\r\n    background-color: white;\r\n  }\r\n}\r\n\r\n.hidden {\r\n  display: none !important;\r\n}\r\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=bundlee0aa53a42d8cc8b937cf.js.map