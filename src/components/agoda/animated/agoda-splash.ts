import { ISplash } from '../../engine/isplash';
import Game from '../../engine/game';

export class AgodaSplash implements ISplash {
    private static readonly KEY: string = 'logo';
    private _game: Phaser.Game;
    private _display: boolean;
    private _spaceBar: Phaser.Key;
    private _text: string;

    constructor(text: string) {
        this._text = text;
        this._display = false;
    }

    // #1 Create Display setter/getter

    setGame = (game: Phaser.Game): void => {
        this._game = game;
    }

    preload = (): void => {
        this._game.load.image(AgodaSplash.KEY, 'assets/splash.png');
        this._game.load.image('sky', 'assets/sky.png');
    }

    create = (): void => {
        this._game.add.sprite(0, 0, 'sky');
        let logo = this._game.add.sprite(this._game.world.centerX, this._game.world.centerY, AgodaSplash.KEY);
        logo.anchor.setTo(0.5, 0.5);
        logo.scale.setTo(0.2, 0.2);
        this._game.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
        this._spaceBar = this._game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        let label = this._game.add.text(
            this._game.width / 2,
            this._game.height - 100,
            this._text,
            { font: '22px Lucida Console', fill: '#000', align: 'center', backgroundColor: '#FFF' });
        label.anchor.setTo(0.5, 0.5);
    }

    update = (): void => {
        if (this._spaceBar.isDown) {
            this._display = false;
            this._game.state.start(Game.NEWGAME);
        }
    }
}