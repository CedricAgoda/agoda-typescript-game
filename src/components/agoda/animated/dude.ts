import { ISprite } from '../../engine/isprite';

enum Characters {
    Dude = 'dude',
    Dudette = 'dudette'
}

export class Dude implements ISprite {
    public static readonly KEY: string = 'dude';
    private _player: Phaser.Sprite;
    private _cursors: Phaser.CursorKeys;
    private _character: string;


    constructor(character: string) {
        this._character = character;
    }

    set Character(character: string) {
        if (character === Characters.Dudette) {
            this._character = Characters.Dudette;
        } else {
            this._character = Characters.Dude;
        }
    }

    public get Sprite(): Phaser.Sprite {
        return this._player;
    }

    preload = (game: Phaser.Game): void => {
        game.load.spritesheet(Dude.KEY, 'assets/' + this._character + '.png', 32, 48);
    }

    create = (game: Phaser.Game): void => {
        this._player = game.add.sprite(32, game.world.height - 150, Dude.KEY);
        game.physics.arcade.enable(this._player);
        this._player.body.bounce.y = 0.2;
        this._player.body.gravity.y = 300;
        this._player.body.collideWorldBounds = true;
        this._player.animations.add('left', [0, 1, 2, 3], 10, true);
        this._player.animations.add('right', [5, 6, 7, 8], 10, true);
        this._cursors = game.input.keyboard.createCursorKeys();
    }

    update = (game: Phaser.Game, hitPlatform: boolean): void => {
        this._player.body.velocity.x = 0;

        if (this._cursors.left.isDown) {
            this._player.body.velocity.x = -150;
            this._player.animations.play('left');
        }
        else if (this._cursors.right.isDown) {
            this._player.body.velocity.x = 150;
            this._player.animations.play('right');
        }
        else {
            this._player.animations.stop();
            this._player.frame = 4;
        }

        if (this._cursors.up.isDown && this._player.body.touching.down && hitPlatform) {
            this._player.body.velocity.y = -300;
        }
    }
}