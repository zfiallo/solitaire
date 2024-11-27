import Game from "./scenes/Game.js";

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 485,    // was 768
    parent: 'game-container',
    backgroundColor: '#008000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Game
    ],
    plugins: {
        /*scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        },
        // ...
        ]*/
    }
};

const game = new Phaser.Game(config);
