import Engine from './engine';
import { ISprite } from '../engine/isprite';
import { IGroup } from '../engine/igroup';
import { ISplash } from '../engine/isplash';
import { ICollider } from '../engine/icollider';
import { IScoreKeeper } from '../engine/iscorekeeper';

export default class Game {
    public static readonly GAMEOVER: string = 'GAMEOVER';
    public static readonly NEWGAME: string = 'NEWGAME';
    public static readonly SPLASH: string = 'SPLASH';

    private _game: Phaser.Game;

    constructor(element: string,
        sprites: Array<ISprite>,
        platforms: IGroup,
        characters: IGroup,
        scoreKeeper: IScoreKeeper,
        collider: ICollider,
        splash: ISplash,
        gameOver: ISplash,
        width: number,
        height: number) {

        let engine = new Engine();
        this._game = new Phaser.Game(width,
            height,
            Phaser.AUTO,
            element,
            {
                preload: splash.preload,
                create: splash.create,
                update: splash.update
            });
        splash.setGame(this._game);

        engine.createEngine(this._game, sprites, platforms, characters, scoreKeeper, collider, gameOver);
        this._game.state.add(Game.GAMEOVER, gameOver);
        this._game.state.add(Game.SPLASH, gameOver);
        this._game.state.add(Game.NEWGAME, engine);
    }

}