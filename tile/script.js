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

class Player {
  /**
   * 
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  draw() {
    DRAW({
      x: this.x,
      y: this.y,
      w: WIDTH,
      h: HEIGHT,
      styles: {
        fillStyle: 'green'
      }
    });
  }
}

const player = new Player(0, 0);

function tick() {
  requestAnimationFrame(tick);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw();
}
tick();
