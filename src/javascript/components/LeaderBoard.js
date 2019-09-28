import _ from 'underscore';
class LeaderBoard {
    constructor() {
        this._init();
    }
    _init() {

        fetch("https://bd-fireicecream.herokuapp.com/score")
            .then((resp) => resp.json())
            .then(function (data) {
                let leaderboardContainer = document.querySelector('.leaderboard'),
                    name = leaderboardContainer.querySelector('.leaderboard_name'),
                    score = leaderboardContainer.querySelector('.leaderboard_time')
                data.forEach(element => {
                    let playerName = document.createElement('span'),
                        playerTime = document.createElement('span');
                    playerName.textContent = element.name;
                    playerName.classList.add('leaderboard_name--player')

                    playerTime.textContent = element.score
                    playerTime.classList.add('leaderboard_time--player')

                    name.appendChild(playerName);
                    score.appendChild(playerTime)

                })
            })
    }
}

export default LeaderBoard;