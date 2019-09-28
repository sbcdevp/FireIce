import _ from 'underscore';
import AudioComponent from './AudioComponent';
import Timer from './Timer.js';
class CanvasComponent {
  constructor() {
    _.bindAll(this, '_resizeHandler', '_drawCanvas', '_spriteControls');
    this._functionCall();
  }
  _setupListeners() {
    window.addEventListener('resize', this._resizeHandler);
    document.addEventListener('keydown', this._spriteControls);
    document.addEventListener('keyup', this._spriteControls);
  }
  _functionCall() {
    this.audio = new AudioComponent();
    this.timer = new Timer();
    this._initSprite();
    this._initEnnemies();
    this._setupListeners();
    this._initCanvas();
    this._resizeHandler();
    this._backgroundCanvas();
    this._spriteEnnemyCounterFrame();
    this._drawCanvas();
    this.playing = false;
  }
  _initCanvas() {
    this.canvas = document.querySelector('.canvas');
    this.canvasContext = this.canvas.getContext('2d');
    this._drawSprite();
    this._drawEnnemies();
  }
  _backgroundCanvas() {
    let background = new Image();
    background.src = "./images/fond_game.png";
    background.onload = () => {
      this.background = background;
    }
  }
  // USER SPRITE
  _initSprite() {
    let soundLevel = '',
      spriteItem = {};
    this.spriteSpeed = 0;
    this.spriteDirection = 0;
    this.easedJumpedValue = 0;
    this.spriteImgTab = [];

    for (let index = 0; index < 3; ++index) {
      const img = new Image();
      img.src = `./images/sprite_0${index + 1}.png`;
      switch (index) {
        case 0:
          soundLevel = 'low';
          break;
        case 1:
          soundLevel = 'middle';
          break;
        case 2:
          soundLevel = 'loud';
        default:
          soundLevel = 'low';
      }
      spriteItem = {
        img: img,
        soundLevel: soundLevel,
        positionX: 0,
        positionY: window.innerHeight - 102.4
      };
      this.spriteImgTab.push(spriteItem);
    }
  }
  _drawSprite() {
    this.canvasContext.drawImage(
      this.spriteImgTab[0].img,
      this.spriteImgTab[0].positionX,
      this.spriteImgTab[0].positionY,
      51.76,
      101.52
    );
  }
  _spriteControls(event) {
    if (event.type === 'keydown') {
      if (event.keyCode === 37) {
        this.spriteDirection = -1;
      } else if (event.keyCode === 39) {
        this.spriteDirection = 1;
      }
    } else {
      this.spriteDirection = 0;
    }
  }
  _updateSpritePosition() {
    this.spriteImgTab[0].positionX += 7 * this.spriteDirection;
  }
  // ENNEMIES
  _initEnnemies() {
    let ennemyItem = {};
    this.ennemyImgTab = [];
    this.spriteEnnemyCounter = 1;
    this.n = 0;
    for (let imgIndex = 0; imgIndex < 5; imgIndex++) {
      const img = new Image();
      img.src = `./images/ennemySprite_${imgIndex + 1}.gif`;
      ennemyItem = {
        img: img,
        positionY: Math.random() * window.innerHeight - 100,
        positionX: Math.random() * window.innerWidth + window.innerWidth / 2,
        speed: Math.random() * 0.04,
      };
      this.ennemyImgTab.push(ennemyItem);
    }
  }
  _drawEnnemies() {
    if (this.spriteEnnemyCounter > 5) {
      this.spriteEnnemyCounter = 1;
    }
    for (var i = 0; i < this.ennemyImgTab.length; i++) {
      this.canvasContext.drawImage(this.ennemyImgTab[this.spriteEnnemyCounter - 1].img, this.ennemyImgTab[i].positionX, this.ennemyImgTab[i].positionY, 51.2, 51.2);
      this._ennemyPosition(i)
      this._detectCollision(i)
      this._resetEnnemiesPosition(i);
    }
  }
  _ennemyPosition(i) {
    this.ennemyImgTab[i].positionX -= this.ennemyImgTab[i].speed + 3.4;
  }
  _resetEnnemiesPosition(i) {
    if (this.ennemyImgTab[i].positionX + 50 < 0) {
      this.ennemyImgTab[i].positionX = window.innerWidth * 1.5
      this.ennemyImgTab[i].positionY = Math.random() * window.innerHeight
    }
  }
  _spriteEnnemyCounterFrame() {
    setInterval(() => {
      this.spriteEnnemyCounter++;
    }, 50);
  }
  _detectCollision(i) {
    if (this.ennemyImgTab[i].positionX < this.spriteImgTab[0].positionX + 51.2 && this.ennemyImgTab[i].positionX > this.spriteImgTab[0].positionX - 51.2 && this.ennemyImgTab[i].positionY < this.spriteImgTab[0].positionY + 102.4 && this.ennemyImgTab[i].positionY > this.spriteImgTab[0].positionY - 51.2)
      this._endGame();
  }
  _drawCanvas() {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.rafId = window.requestAnimationFrame(this._drawCanvas);
    this._drawBackground();
    this.jumpValue = this.audio.getValue();
    if (!this.jumpValue) return;
    this.spriteImgTab[0].positionY += (window.innerHeight - 102.4 - this.jumpValue - this.spriteImgTab[0].positionY) * 0.1;

    this._initCanvas();
    this._updateSpritePosition();

  }
  _drawBackground() {
    if (!this.background) return;
    this.canvasContext.drawImage(this.background, 0, 0, 8000 / 6, 4500 / 7);

  }
  _endGame() {
    this.timer._stopTimer()
    window.cancelAnimationFrame(this.rafId)
    this.finishWindow = document.querySelector('.finish-window')
    this.finishWindow.classList.remove('hidden')
    this.finishScore = this.finishWindow.querySelector('h3 span')
    this.finishScore.innerHTML = this.timer._timer()
    this._sendScore();
  }

  _sendScore() {
    fetch("https://bd-fireicecream.herokuapp.com/score",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ name: window.localStorage.getItem('name'), score: this.timer._timer() })
      })
  }
  _resizeHandler() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}
export default CanvasComponent;
