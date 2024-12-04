export class Login extends Phaser.Scene {
    constructor () {
        super('Login');
    }
    
    init (data) {
        this.exists = false;
    }

    preload () {
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.plugin('rexmodalplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmodalplugin.min.js', true);
    }

    create () {
        var style = {
            x: (window.innerWidth / 2),
            y: (window.innerHeight / 2),
            space: {
                left: 20, right: 20, top: 20, bottom: 20,
                item: 20,
                firstName: 20, firstNameTitle: 10, lastNameTitle: 10,
            },
            background: { 
                color: 0x008000, 
                strokeColor: 0xFFFFFF, 
                strokeWidth: 1, 
                radius: 0, 
            },
            title: {
                text: { fontSize: 24 }
            },
            layoutMode: 1,
            nameTitle: {
                width: 150,
                text: { fontSize: 24 }
            },
            nameInput: {
                width: 200,
                background: { color: 0xFFFFFF },
                style: {
                    backgroundBottomY: 4,
                    backgroundHeight: 18,
                    fontSize: '24px',
                    color: 0x000000,
                    'cursor.color': 'black',
                    'cursor.backgroundColor': 'black',
                },
                text: { fontSize: 20, color: 0x000000 }
            },
            button: {
                space: { left: 5, right: 5, top: 5, bottom: 5 },
                background: {
                    color:  0xffffff,
                    radius: 0,
                    'hover.strokeColor': 0xffffff,
                },
                text: { fontSize: 20, color:  '0x000000' },
            },
            modal: {
                touchOutsideClose: true,
                //manualClose: true,
                duration: {
                    in: 0,
                    out: 0
                }
            }
        }

        var popup = this.rexUI.add.nameInputDialog(style).resetDisplayContent({
            title: 'Log In',
            firstNameTitle: 'username: ',
            lastNameTitle: 'password: ',
            button: 'Enter'
        }).layout().modalPromise().then(function (data) {
            var username = data.firstName;
            var password = data.lastName;

            $.ajax({
                url: libraryURL + "/data",
                type: "get",
                success: function(response){
                    var responseData = JSON.parse(response);
                    var usersTable = responseData.game;

                    for(let i = 0; i < usersTable.length; i++) {
                        if (usersTable[i].username == data.firstName && usersTable[i].password == data.lastName) {
                            this.exists = true;
                        }
                    }

                    if (this.exists) {
                        alert('Log in successful');
                        //modal.requestClose();
                    } else {
                        alert('Log in failed');
                        //scene.scene.restart('Login');
                    }
                },
                error: function(err){
                    alert(err);
                }
            });
        });

    }

    update () {

    }
}