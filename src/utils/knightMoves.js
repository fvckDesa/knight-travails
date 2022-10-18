const nextMoveQuantities = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];

function isSameCoords(coords1, coords2) {
  return coords1[0] === coords2[0] && coords1[1] === coords2[1];
}

function getNextMoves([x, y]) {
  return nextMoveQuantities
    .map(([xQ, yQ]) => [x + xQ, y + yQ])
    .filter((coords) => !coords.some((coord) => coord < 0 || coord > 7));
}

export default function knightMoves(start, end) {
  const queue = [start];
  const graph = [];
  let data;
  data = queue.shift();
  while (!isSameCoords(data, end)) {
    const nextMoves = getNextMoves(data);
    graph.push({ from: data, to: nextMoves });
    queue.push(...nextMoves);
    data = queue.shift();
  }

  const res = [end];

  while (!isSameCoords(res[0], start)) {
    for (const { from, to } of graph) {
      if (to.some((coord) => isSameCoords(res[0], coord))) {
        res.unshift(from);
        break;
      }
    }
  }

  return res;
}
