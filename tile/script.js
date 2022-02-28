/** 모든 셀의 가로 크기 */
const WIDTH = 10;
/** 모든 셀의 세로 크기 */
const HEIGHT = 10;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/**
 * 
 * @param {object} tmp
 * @param {number} tmp.x
 * @param {number} tmp.y
 * @param {number} tmp.w
 * @param {number} tmp.h
 * @param {object.<string, any>} tmp.styles - ctx[key] = value;
 */
function DRAW({x, y, w, h, styles}) {
  Object.entries(styles).map(([key, value]) => {
    ctx[key] = value;
  });

  ctx.fillRect(x, y, w, h);
}

class BaseEntity {
  /**
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @param {*} [color='black']
   */
  constructor(x=0, y=0, color='black') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.init();
  }

  /**
   * 이 객체를 캔버스에 그립니다.
   */
  draw() {
    this.init();
    DRAW({
      x: this.x,
      y: this.y,
      w: WIDTH,
      h: HEIGHT,
      styles: {
        fillStyle: this.color
      }
    });
  }
  
  init() {
    if (!(0 <= this.x && this.x < canvas.width)) {
      this.x %= canvas.width;
      if (this.x < 0) this.x += canvas.width;
    }
    if (!(0 <= this.y && this.y < canvas.height)) {
      this.y %= canvas.height;
      if (this.y < 0) this.y += canvas.height;
    }
  }
}

class MoveEntity extends BaseEntity {
  /**
   * @param {number} x 
   * @param {number} y 
   * @param {*} color 
   * @param {number} speed 
   */
  constructor(x, y, color, speed=5) {
    super(x, y, color);
    this.speed = speed;
  }

  W() { this.y -= this.speed; }
  A() { this.x -= this.speed; }
  S() { this.y += this.speed; }
  D() { this.x += this.speed; }
}

class Player extends MoveEntity {
  constructor(x, y, color='green', speed) {
    super(x, y, color, speed);
  }
}

class Tail extends BaseEntity {
  constructor(x, y, color='lime') {
    super(x, y, color);
  }
}

// main
const player = new Player(250, 250);

/** @type {Tail[]} */
const tails = [];

const pressed = {};
document.addEventListener('keydown', e => { pressed[e.code] = true });
document.addEventListener('keyup', e => { pressed[e.code] = false });

setInterval(function() {
  if (pressed.ArrowUp || pressed.ArrowLeft || pressed.ArrowDown && pressed.ArrowRight) {
    const lastx = player.x;
    const lasty = player.y;

    if (pressed.ArrowUp) player.W();
    if (pressed.ArrowLeft) player.A();
    if (pressed.ArrowDown) player.S();
    if (pressed.ArrowRight) player.D();

    tails.push(new Tail(lastx, lasty));
  }
}, 10);

function tickFn() {
  requestAnimationFrame(tickFn);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw();

  tails.forEach(e => e.draw());
}
const tick = requestAnimationFrame(tickFn);
