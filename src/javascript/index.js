//IMPORTS
import './vendors/Tween.js';
import CanvasComponent from './components/CanvasComponent';
import CursorSprite from './components/CursorSprite';
import LeaderBoard from './components/LeaderBoard'

window.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === "/game.html") {
        let startWindow = document.querySelector('.start-window'),
            startButton = startWindow.querySelector('h4'),
            background = document.querySelector('.background');
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
    } else if (window.location.pathname === "/leaderboard.html") {

        new LeaderBoard()
    } else {
        throw new Error('Sorry page does not exist');
    }
})
