export interface IAnimated {
    preload(game: Phaser.Game): void;
    create(game: Phaser.Game): void;
    update(game: Phaser.Game, hitPlatform: boolean): void;
}