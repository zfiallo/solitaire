import Phaser from 'phaser';
import { Game } from "../scenes/Game.js";

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'main',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Game
    ]
};

const game = new Phaser.Game(config);