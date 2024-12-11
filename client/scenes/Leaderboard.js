export class Leaderboard extends Phaser.Scene {
    constructor () {
        super('Leaderboard');
    }

    preload () {
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.plugin('rexgridtableplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgridtableplugin.min.js', true);
        this.load.plugin('rexsliderplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js', true);
    }

    create () {
        let tableData = [];

        // get leaderboard data from db
        $.ajax({
            url: libraryURL + "/leaderboard",
            type:"get",
            success: function(response){
                let data = JSON.parse(response);
                let dbTable = data.game;
                
                dbTable.sort((a, b) => a.time - b.time);

                for (let i of dbTable) {
                    tableData.push(i.username);
                    tableData.push(i.score);
                    tableData.push(i.time);
                }
             },
            error: function(err){
                alert(err);
            }
        });

        this.renderTable = () => {
            
            //creates new cell
            let newCellObject = function (scene, cell) {
                let bg = scene.add.graphics().lineStyle(3, 0x000000).strokeRect(2, 2, 270, 100);
                let txt = scene.add.text(5, 10, tableData[cell.index], {fontSize: 30});
             let container = scene.add.container(0, 0, [bg, txt]);
             return container;
            }

            // renders each cell
            let onCellVisible = function (cell) {
                cell.setContainer(newCellObject(this, cell));
            };
            
            // renders table
            let table = this.add.rexGridTable((window.innerWidth / 2), (window.innerHeight / 2), 800, 600, {
                scrollMode: 0,
                cellsCount: tableData.length,
                columns: 3,
                cellWidth: 270,
                cellHeight: 50,
                cellVisibleCallback: onCellVisible.bind(this),
                clampTableOXY: true,
                enableLayer: true
            });

            this.add.graphics().lineStyle(3, 0x000000).strokeRectShape(table.getBounds());
            this.add.graphics().lineStyle(3, 0x000000).strokeRect(table.getTopRight().x, table.getTopRight().y, 20, 600);

            // renders scroll bar
            let topRight = table.getTopRight();
            let bottomRight = table.getBottomRight();
            let thumb = this.add.rectangle(0, 0, 20, 20, 0x000000);
            thumb.slider = this.plugins.get('rexsliderplugin').add(thumb, {
                endPoints: [{
                        x: topRight.x + 10,
                        y: topRight.y + 10
                    },
                    {
                        x: bottomRight.x + 10,
                        y: bottomRight.y - 10
                    }
                ]
            }).on('valuechange', function (newValue) {
                table.setTableOYByPercentage(newValue).updateTable();
                table.scroller.setValue(table.tableOY);
            });
       
            return table;
        }

        // makes sure ajax request finishes before rendering table 
        this.table = setTimeout(()=> this.renderTable(), 1);
    }
}