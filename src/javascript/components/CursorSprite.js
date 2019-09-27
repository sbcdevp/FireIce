import _ from 'underscore';
import Lerp from '../utils/Lerp'
class CursorSprite {
    constructor() {
        this._init();
    }
    _init() {
        this.container = document.querySelector('.game_infos')
        this.sprite = this.container.querySelector('.sprite')
        window.addEventListener('mousemove', this._moveCursor.bind(this))
    }
    _moveCursor(e) {
        let mouseX = e.clientX * 0.2
        this.sprite.style.transform = `translate3D(${mouseX}px,0px,0px)`
    }
}

export default CursorSprite;