const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#008000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

const deck = [];
const foundation = [];
const tableau = [];
const waste = [];

function preload () {
    this.load.spritesheet('cardSprites', "./assets/cardSprites.png", {frameHeight: 95, frameWidth : 70, endFrame: 51});
    this.load.image('background', 'client/assets/background.png');
    this.load.image('stock', 'client/assets/stock.png');
    this.load.image('foundation', 'client/assets/foundation.png');
    this.load.image('cardBack', 'client/assets/cardBack.png');
}

function create () {
    
    this.deck = Phaser.Utils.Array.NumberArray(0,51);
    Phaser.Math.RND.shuffle(this.deck);

    

    this.input.on('dragstart', function (pointer, gameObject) {
        gameObject.setTint(0xff0000); // Change color on drag start
    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });

    this.input.on('dragend', function (pointer, gameObject) {
        gameObject.clearTint(); // Clear color on drag end
    });

}

function update () {

}