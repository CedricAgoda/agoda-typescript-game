import 'p2';
import 'pixi';
import 'phaser';

import Game from './components/engine/game';
import AgodaGame from './components/agoda/agoda-game';

window.onload = () => {
    let startGame = new StartGame();
    startGame.start();
};

class StartGame {
    start = (): void => {
        let agodaGame = new AgodaGame();
        let div = document.getElementById('content').getElementsByTagName('canvas');
        if (div.item(0)) {
            div.item(0).remove();
        }
        let game = new Game('content',
            agodaGame.Sprites,
            agodaGame.Platforms,
            agodaGame.Characters,
            agodaGame,
            agodaGame,
            agodaGame.Splash,
            agodaGame.GameOver,
            800, 600);
    }
}