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
   * @param {object} tmp
   * @param {number} [tmp.x=0]
   * @param {number} [tmp.y=0]
   * @param {*} [tmp.color='black']
   * @param {number} [tmp.speed=5]
   */
  constructor({x=0, y=0, color='black', speed=5}) {
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
  
  W() { this.y -= this.speed; }
  A() { this.x -= this.speed; }
  S() { this.y += this.speed; }
  D() { this.x += this.speed; }

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

class Player extends BaseEntity {
  constructor({color='green'}) {
    super(...arguments);
  }
}

// main
const player = new Player(250, 250);

const pressed = {};
document.addEventListener('keydown', e => { pressed[e.code] = true });
document.addEventListener('keyup', e => { pressed[e.code] = false });

setInterval(function() {
  if (pressed.ArrowUp) player.W();
  if (pressed.ArrowLeft) player.A();
  if (pressed.ArrowDown) player.S();
  if (pressed.ArrowRight) player.D();
}, 10);

function tickFn() {
  requestAnimationFrame(tickFn);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw();
}
const tick = requestAnimationFrame(tickFn);
