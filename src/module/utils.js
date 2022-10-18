export function random(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function wait(time = 1000) {
  return new Promise((res) => setTimeout(res, time));
}
