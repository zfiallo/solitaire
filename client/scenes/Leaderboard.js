export class Leaderboard extends Phaser.Scene {
    constructor () {
        super('Leaderboard');
    }
    
    preload () {
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.plugin('rexgridtableplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgridtableplugin.min.js', true);
    }

    create () {
        var newCellObject = function (scene, cell) {
            var bg = scene.add.graphics().fillStyle(0x555555).fillRect(2, 2, 240 - 2, 100 - 2);
            var txt = scene.add.text(5, 5, cell.index);
            var container = scene.add.container(0, 0, [bg, txt]);
            return container;
        }

        var onCellVisible = function (cell) {
            cell.setContainer(newCellObject(this, cell));
            //console.log('Cell ' + cell.index + ' visible');
        };
        var table = this.add.rexGridTable(400, 300, 250, 400, {
            cellWidth: 240,
            cellHeight: 100,
            cellsCount: 100,
            columns: 1,
            cellVisibleCallback: onCellVisible.bind(this),
            clamplTableOXY: false
        });

        // draw bound
        this.add.graphics().lineStyle(3, 0xff0000).strokeRectShape(table.getBounds());

        // drag table content
        /*table.scroller = this.plugins.get('rexscrollerplugin').add(table, {
                bounds: [
                    table.bottomTableOY,
                    table.topTableOY
                ],
                value: table.topTableOY,
                slidingDeceleration: slidingDeceleration,
                backDeceleration: backDeceleration
        });*/


        // drag table content
        var topRight = table.getTopRight();
        var bottomRight = table.getBottomRight();
        var thumb = this.add.image(0, 0, 'dot').setScale(4, 4);
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
        });

        this.add.graphics().lineStyle(3, 0x55ff55, 1).strokePoints(thumb.slider.endPoints);

        // 'valuechange' event
        /*table.scroller.on('valuechange', function (newValue) {
            table.setTableOY(newValue).updateTable();
            // reflect to slider
            thumb.slider.setValue(table.getTableOYPercentage());
        });*/
        thumb.slider.on('valuechange', function (newValue) {
            table.setTableOYByPercentage(newValue).updateTable();
            // reflect to scroller
            table.scroller.setValue(table.tableOY);
        });
      
        this.table = table;
        this.scrollerState = this.add.text(0, 0, '');
    }

    update () {

    }
}