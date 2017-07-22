import Game from './game';
import { ISprite } from '../engine/isprite';
import { IGroup } from '../engine/igroup';
import { ISplash } from '../engine/isplash';
import { ICollider } from '../engine/icollider';
import { IScoreKeeper } from '../engine/iscorekeeper';

export default class Engine {

    private _game: Phaser.Game;
    private _sprites: Array<ISprite>;
    private _platforms: IGroup;
    private _characters: IGroup;
    private _collider: ICollider;
    private _gameOver: ISplash;
    private _scoreKeeper: IScoreKeeper;
    private _running: boolean;
    private _scoreText: Phaser.Text;

    createEngine = (game: Phaser.Game,
        sprites: Array<ISprite>,
        platforms: IGroup,
        characters: IGroup,
        scoreKeeper: IScoreKeeper,
        collider: ICollider,
        gameOver: ISplash): void => {
        this._game = game;
        this._sprites = sprites;
        this._platforms = platforms;
        this._characters = characters;
        this._scoreKeeper = scoreKeeper;
        this._collider = collider;
        this._gameOver = gameOver;
        this._gameOver.setGame(this._game);
    }

    preload = (): void => {
        this._platforms.preload(this._game);
        this._sprites.forEach(sprite => {
            sprite.preload(this._game);
        });
        this._characters.preload(this._game);
    }

    create = (): void => {
        this._game.physics.startSystem(Phaser.Physics.ARCADE);
        this._platforms.create(this._game);
        this._sprites.forEach(sprite => {
            sprite.create(this._game);
        });
        this._characters.create(this._game);
        let style: Phaser.PhaserTextStyle = { fontSize: 32, fill: '#000' };
        this._scoreText = this._game.add.text(16, 16, 'Score: 0', style);
        this._collider.reset();
        this._running = true;
    }

    update = (): void => {
        if (this._gameOver.Display) {
            this._game.state.start(Game.GAMEOVER);
        }

        this._sprites.forEach(sprite => {
            let hitPlatform = this._game.physics.arcade.collide(sprite.Sprite, this._platforms.Group);
            sprite.update(this._game, hitPlatform);
            this._game.physics.arcade.overlap(sprite.Sprite, this._characters.Group, this._collider.collide, null, this);
        });

        this._game.physics.arcade.collide(this._characters.Group, this._platforms.Group);
        this._characters.update(this._game, false);
        this._scoreText.text = 'Score: ' + this._scoreKeeper.Score;
    }
}