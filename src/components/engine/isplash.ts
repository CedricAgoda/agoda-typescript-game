import { IAnimated } from './ianimated';

export interface ISplash extends IAnimated {
    setGame(game: Phaser.Game): void;
    Display: boolean;
}