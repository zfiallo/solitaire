import { Preloader } from './scenes/Preloader.js';
import { Menu } from './scenes/Menu.js';
import { Game } from './scenes/Game.js';
import { Leaderboard } from './scenes/Leaderboard.js'
import { Signup } from './scenes/Signup.js'

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth, //1024,
    height: window.innerHeight - 20, //485,    // was 768
    parent: 'game-container',
    max: {
        width: window.innerWidth,
        height: window.innerHeight - 20,
    },
    backgroundColor: '#008000',
    scale: {
        mode: Phaser.Scale.RESIZE,  // Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Preloader,
        Menu,
        Game,
        Leaderboard,
        Signup
    ]
};

const game = new Phaser.Game(config);
