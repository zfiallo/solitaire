export default class Menu {
    constructor(scene) {

        this.render = (x, y) => {
            // white = 0xFFFFFF;
            // black = 0x000000;
            /*
            let items = [
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
            {name: 'Leaderboard'}];
                */
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
            //menu.setOrientation(y);
            //subMenu.setOrientation(y); 
            
            /*let sub = scene.rexUI.add.menu({
                x: x,
                y: y,
                //anchor: top,
                orientation: y,
                //subMenuSide: 2,
                items: [
                    {name: 'Deal'}, 
                    {name: 'Undo'}, 
                    {name: 'Deck'}, 
                    {name: 'Options'}, 
                    {name: 'Sign Up'}, 
                    {name: 'Log In'}
                ],

                createBackgroundCallback: function (items) {
                    let scene = items.scene;
                    return scene.rexUI.add.roundRectangle(x, y, 2050, 50, 0, 0xFFFFFF);
                },
                createButtonCallback: function (item, i, items) {
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
                    })
                },
                
            }).setVisible(false);*/
            
            /*
            //let game = scene.add.text(x + 5, y + 1, 'Game');
            //let help = scene.add.text(x + 55, y + 1, 'Help');
            //let leaderboard = scene.add.text(x + 105, y + 1, 'Leaderboard');

            let deal = this.add.text(textX, textY, 'Deal');
            let undo = this.add.text(textX, textY, 'Undo');
            let deck = this.add.text(textX, textY, 'Deck');
            let options = this.add.text(textX, textY, 'Options');
            let signup = this.add.text(textX, textY, 'Signup');
            let login = this.add.text(textX, textY, 'Login');


            let dropDown = this.rexUI.add.dropDownList({
                options: [deal, undo, deck, options, signup, login],
                orientation: 1,
                background: this.rexUI.add.roundRectangle(x, y, 1024, 30, 0, '#FFFFFF'),
            });
            */

            //scene.children.bringToTop(this.Menu);
        }

    }
}