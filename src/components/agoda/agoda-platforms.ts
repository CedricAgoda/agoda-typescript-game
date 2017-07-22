import { IGroup } from '../engine/igroup';

export class AgodaPlatforms implements IGroup {
    private _platforms: Phaser.Group;

    public get Group(): Phaser.Group {
        return this._platforms;
    }

    preload(game: Phaser.Game): void {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('platform', 'assets/platform.png');
    }

    create(game: Phaser.Game): void {
        game.add.sprite(0, 0, 'sky');
        this._platforms = game.add.group();
        this._platforms.enableBody = true;
        let ground = this._platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 1);
        ground.body.immovable = true;
        let ledge = this._platforms.create(400, 400, 'platform');
        ledge.body.immovable = true;
        ledge = this._platforms.create(-150, 250, 'platform');
        ledge.body.immovable = true;
    }

    update(game: Phaser.Game): void {
    }

    addPlatform = (x: number, y: number) => {
        // #4 Refactor to add platforms from constructor
    }
}