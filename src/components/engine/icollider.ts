export interface ICollider {
    collide(sprite1: Phaser.Sprite, sprite2: Phaser.Sprite): void;
    reset(): void;
}