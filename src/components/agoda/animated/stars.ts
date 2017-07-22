import { IAnimated } from '../../engine/ianimated';
import { IGroup } from '../../engine/igroup';

export class Stars implements IAnimated, IGroup {
    public static readonly KEY: string = 'star';

    private _stars: Phaser.Group;
    private _count: number;

    constructor(count: number) {
        this._count = count;
    }

    preload(game: Phaser.Game): void {
        game.load.image(Stars.KEY, 'assets/star.png');
    }

    create(game: Phaser.Game): void {
        this._stars = game.add.group();

        this._stars.enableBody = true;
        let space = game.world.width / this._count;
        for (let i = 0; i < this._count; i++) {
            let star = this._stars.create(i * space + (space / 2), 0, Stars.KEY);
            star.body.gravity.y = 50;
            star.body.bounce.y = 0.5 + Math.random() * 0.2;
        }
    }

    update(game: Phaser.Game, hitPlatform: boolean): void {
    }

    public get Group(): Phaser.Group {
        return this._stars;
    }
}