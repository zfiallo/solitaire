export class Preloader extends Phaser.Scene {
    constructor () {
        super('Preloader');
    }
    
    create () {
        this.scene.start('Menu');
        this.scene.start('Game');
    }
}