import { ISprite } from '../engine/isprite';
import { Dude } from './animated/dude';
import { AgodaSplash } from './animated/agoda-splash';
import { Stars } from './animated/stars';
import { IGroup } from '../engine/igroup';
import { ISplash } from '../engine/isplash';
import { AgodaPlatforms } from './agoda-platforms';
import { ICollider } from '../engine/icollider';
import { IScoreKeeper } from '../engine/iscorekeeper';
import * as $ from 'jquery';

export default class AgodaGame implements ICollider, IScoreKeeper {
    private static readonly NUMBER_OF_STARS: number = 10;
    private _sprites: Array<ISprite>;
    private _platforms: IGroup;
    private _characters: IGroup;
    private _splash: ISplash;
    private _gameOver: ISplash;
    private _starRemaining: number;
    private _score: number;

    constructor() {
        this._platforms = new AgodaPlatforms();
        this._characters = new Stars(AgodaGame.NUMBER_OF_STARS);
        this._sprites = new Array<ISprite>();
        this._sprites.push(new Dude(this.getCharacterValue()));
        this._gameOver = new AgodaSplash('\nGAME OVER\n  Press SPACE to restart  \n');
        this._splash = new AgodaSplash('\n  Press SPACE to start  \n');
    }

    public get Sprites(): Array<ISprite> {
        return this._sprites;
    }

    public get Platforms(): IGroup {
        return this._platforms;
    }

    public get GameOver(): ISplash {
        return this._gameOver;
    }

    public get Splash(): ISplash {
        return this._splash;
    }

    public get Characters(): IGroup {
        return this._characters;
    }

    public reset = (): void => {
        // #2 Implement reset logic:
        // - Score
        // - Number of stars
    }

    public collide = (sprite1: Phaser.Sprite, sprite2: Phaser.Sprite): void => {
        if (sprite1.key === Dude.KEY
            && sprite2.key === Stars.KEY) {
            sprite2.kill();
            this._starRemaining--;
            this._score += 10;

            if (this._starRemaining === 0) {
                sprite1.kill();
                this._gameOver.Display = true;
            }
        }
    }

    get Score(): number {
        return this._score;
    }

    getCharacterValue = (): string => {
        // #3 Implement to get user from the form
        return 'dude';
    }
}