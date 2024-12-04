export class Preloader extends Phaser.Scene
{
    constructor () {
        super('Preloader');
    }

    //preload () {
        //this.load.image('background', '/client/assets/background.png');
    //}

    create () {
        //this.add.image(0, 0, 'background');
        this.scene.start('Menu');
        this.scene.start('Game');
        //this.scene.start(localStorage.getItem('Game'));
        //this.scene.start('Menu');
    }
}