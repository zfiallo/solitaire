export class Menu extends Phaser.Scene {
    constructor () {
        super({
            key: 'Menu',
            active: true
        });
    }
    
    preload () {
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    }
    
    create () {
        let scene = this;
        let x = 0;
        let y = 0;

        let blankSpace = '                                                                                                                                   ';

        let menuConfig = {
            x: 0,
            y: 0,
            orientation: 0,
            pointerDownOutsideCollapsing: false,
            items: [
                {name: 'Game'},
                {name: 'Help'}, 
                {name: blankSpace},
                {name: 'Leaderboard'}
            ],
            background: scene.rexUI.add.roundRectangle(x, y, window.outerWidth * 2, 80, 0, 0xFFFFFF),
            createBackgroundCallback: function (items) {
                let scene = items.scene;
                return scene.rexUI.add.roundRectangle(x, y, window.outerWidth * 2, 80, 0, 0xFFFFFF);
            },
            createButtonCallback: function (item, i, items) {
                return scene.rexUI.add.label({
                    text: scene.add.text(x, y, item.name, {
                        fontSize: '20px',
                        color: '0x000000'
                    }),
                    space: {
                        left: 10,
                        right: 10,
                        top: 10,
                        bottom: 10,
                    }
                });
            }
        };

        let subMenuConfig = {
            x: x,
            y: y + 40,
            orientation: 1,
            items: [
                {name: 'Deal'}, 
                {name: 'Undo'}, 
                {name: 'Deck'}, 
                {name: 'Options'}, 
                {name: 'Sign Up'}, 
                {name: 'Log In'}
            ],
            background: scene.rexUI.add.roundRectangle(x, y, window.outerWidth * 2, 80, 0, 0xFFFFFF),
            createBackgroundCallback: function (items) {
                let scene = items.scene;
                return scene.rexUI.add.roundRectangle(x, y, window.outerWidth * 2, 80, 0, 0xFFFFFF);
            },
            createButtonCallback: function (item, i, items) {
                return scene.rexUI.add.label({
                    text: scene.add.text(x, y, item.name, {
                        fontSize: '20px',
                        color: '0x000000'
                    }),
                    space: {
                        left: 10,
                        right: 10,
                        top: 10,
                        bottom: 10,
                    }
                });
            },
        };

        let menu = scene.rexUI.add.menu(menuConfig).on('button.click', function(button, index, pointer, event) {
            if(button.text == 'Game') {
                let subMenu = scene.rexUI.add.menu(subMenuConfig).on('button.click', function(button, index, pointer, event) {
                    if (button.text == 'Deal') {
                        scene.scene.stop('Game');
                        scene.scene.start('Game');
                        //scene.scene.restart('Menu');
                    } else if (button.text == 'Undo') {
                        
                    }else if (button.text == 'Deck') {
                        
                    } else if (button.text == 'Options') {
                        
                    }else if (button.text == 'Sign Up') {
                        scene.scene.pause('Game');
                        scene.scene.start('Signup');
                        scene.scene.moveAbove('Signup', 'Menu');
                    } else if (button.text == 'Log In') {
                        //scene.scene.pause('Game');
                        //scene.scene.start('Login');
                        //scene.scene.moveAbove('Login', 'Menu');
                    }
                    scene.scene.restart('Menu');
                    subMenu.collapse();
                });
            }else if (button.text == blankSpace) {
                scene.scene.sleep('Leaderboard');
                scene.scene.sleep('Signup');
                scene.scene.wake('Game');
            } else if (button.text == 'Help') {

            } else if (button.text == 'Leaderboard') {
                scene.scene.sleep('Game');
                scene.scene.start('Leaderboard');
                scene.scene.restart('Menu');
            }
        });
    }

    update () {

    }
}
