export class Login extends Phaser.Scene {
    constructor () {
        super('Login');
    }
    
    init (data) {
        this.exists = false;
        this.userID = '';
    }

    preload () {
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.plugin('rexmodalplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmodalplugin.min.js', true);
    }

    create () {
        let scene = this;

        let config = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            space: {
                left: 20, 
                right: 20, 
                top: 20, 
                bottom: 20,
                item: 20,
                firstName: 20, 
                firstNameTitle: 10, 
                lastNameTitle: 10,
            },
            background: { 
                color: 0x008000, 
                strokeColor: 0xFFFFFF, 
                strokeWidth: 1, 
                radius: 0, 
            },
            title: {
                text: { 
                    fontSize: 24 
                }
            },
            layoutMode: 1,
            nameTitle: {
                width: 150,
                text: { 
                    fontSize: 24 
                }
            },
            nameInput: {
                width: 200,
                background: { 
                    color: 0xFFFFFF 
                },
                style: {
                    backgroundBottomY: 4,
                    backgroundHeight: 18,
                    fontSize: '24px',
                    color: 0x000000,
                    'cursor.color': 'black',
                    'cursor.backgroundColor': 'black',
                },
                text: { 
                    fontSize: 20, 
                    color: 0x000000 
                }
            },
            button: {
                space: { 
                    left: 5, 
                    right: 5, 
                    top: 5, 
                    bottom: 5 
                },
                background: {
                    color:  0xffffff,
                    radius: 0,
                    'hover.strokeColor': 0xffffff,
                },
                text: { 
                    fontSize: 20, 
                    color: '0x000000' 
                },
            },
            modal: {
                touchOutsideClose: true,
                //duration: {
                //    in: 0,
                //    out: 0
                //}
            }
        }

        this.rexUI.add.nameInputDialog(config).resetDisplayContent({
            title: 'Log In',
            firstNameTitle: 'Username: ',
            lastNameTitle: 'Password: ',
            button: 'Enter'
        }).layout().modalPromise().then(function (data) {
            $.ajax({
                url: libraryURL + "/users",
                type: "get",
                success: function(response){
                    let responseData = JSON.parse(response);
                    let usersTable = responseData.game;
                    
                    // get login info from db
                    for(let i of usersTable) {
                        if (data.firstName == i.username && data.lastName == i.password) {
                            this.userID = i._id;
                            this.exists = true;
                        }
                    }

                    if (this.exists) {
                        alert('Log in successful');
                        document.getElementById('userID').textContent = this.userID;
                    } else {
                        alert('Log in failed');
                    }
                },
                error: function(err){
                    alert(err);
                }
            });

            scene.scene.wake('Game');
        });
    }
}
