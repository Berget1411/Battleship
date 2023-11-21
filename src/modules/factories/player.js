const player = (type) => {
  const randomShot = (board) => {
    let shot;
    while (!shot) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      if (board.getBoard()[y][x] === 'x') {
        shot = [x, y];
      }
    }
    return shot;
  };

  const attack = (board, [x, y] = randomShot(board)) => {
    board.receiveAttack([x, y]);
  };

  return { type, attack, randomShot };
};

export default player;
