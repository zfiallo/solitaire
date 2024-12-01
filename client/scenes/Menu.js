export default class Menu extends Phaser.Scene {
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
        
        let menu = scene.rexUI.add.menu({
            x: x,
            y: y,
            //anchor: top,
            orientation: x,
            //subMenuSide: 2,
            items: [
                {name: 'Game',
                    children: [
                        {name: 'Deal'}, 
                        {name: 'Undo'}, 
                        {name: 'Deck'}, 
                        {name: 'Options'}, 
                        {name: 'Sign Up'}, 
                        {name: 'Log In'}
                    ]
                },
                {name: 'Help'},
                {name: 'Leaderboard'}
            ],
            //background: scene.rexUI.add.roundRectangle(x, y, 2050, 50, 0, white),
            createBackgroundCallback: function (items) {
                let scene = items.scene;
                return scene.rexUI.add.roundRectangle(x, y, 2050, 50, 0, 0xFFFFFF);
            },
            createButtonCallback: function (item, i, items) {
                //if(item.name == 'Game') {
                //    this.setOrientation(y);
                //}

                if(item.name == 'Leaderboard') {
                    x = 1824;
                }

                return scene.rexUI.add.label({
                    text: scene.add.text(x, y, item.name, {
                        fontSize: '15px',
                        color: '0x000000'
                    }),
                    space: {
                        left: 5,
                        right: 5,
                        top: 5,
                        bottom: 5,
                    }
                });
            },
        }).on('button.click', function(button, index, pointer, event) {
            if(index == 0) {
                
                //if(childrenKey == 1) {
                    //sub.setVisible(true);
                    console.log('a');
               // }
            } else if ((index == 1)) {
                menu.collapseSubMenu();
                //sub.setVisible(true);
            } else if ((index == 2)) {
                menu.collapseSubMenu();
                //sub.setVisible(true);
            }
        });
        //scene.children.bringToTop(menu);
    }

    update () {

    }
}