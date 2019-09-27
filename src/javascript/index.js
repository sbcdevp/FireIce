//IMPORTS
import './vendors/Tween.js';
import CanvasComponent from './components/CanvasComponent';
import CursorSprite from './components/CursorSprite';

window.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === "/game.html") {
        let startWindow = document.querySelector('.start-window'),
            startButton = startWindow.querySelector('h4');
        startButton.addEventListener('click', () => {
            startWindow.classList.add('hidden')
            new CanvasComponent()
        })
    } else if (window.location.pathname === "/") {
        const buttonPlay = document.querySelector('.btn-play'),
            inputName = document.querySelector('.input_name');
        buttonPlay.addEventListener('click', () => {
            window.localStorage.setItem('name', inputName.value)
            window.location.href = "/game.html"
        })
        new CursorSprite()
    } else {
        throw new Error('Sorry page does not exist');
    }
})
