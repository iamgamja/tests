/** 모든 셀의 가로 크기 */
const WIDTH = 25;
/** 모든 셀의 세로 크기 */
const HEIGHT = 25;

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

class BaseNPC {
  /**
   * 
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
  
  W() { this.y -= HEIGHT; }
  A() { this.x -= WIDTH; }
  S() { this.y += HEIGHT; }
  D() { this.x += WIDTH; }

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

class Player extends BaseNPC {
  /**
   * 
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @param {*} [color='green']
   */
  constructor(x=0, y=0, color='green') {
    super();
  }
}

const player = new Player();

document.addEventListener('keydown', function(e) {
  switch (e.code) {
    case 'ArrowUp': {
      player.W();
      break;
    } case 'ArrowLeft': {
      player.A();
      break;
    } case 'ArrowDown': {
      player.S();
      break;
    } case 'ArrowRight': {
      player.D();
      break;
    }
  }
  player.init();
});

function tickFn() {
  requestAnimationFrame(tickFn);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw();
}
const tick = requestAnimationFrame(tickFn);
