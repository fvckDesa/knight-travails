// Dom selector as jquery
export function $(selector, getAll = false, parent = document) {
  return getAll
    ? parent.querySelectorAll(selector)
    : parent.querySelector(selector);
}

export function random(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function wait(time = 1000) {
  return new Promise((res) => setTimeout(res, time));
}
