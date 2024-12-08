export class Leaderboard extends Phaser.Scene {
    constructor () {
        super('Leaderboard');
    }
/*
    init(data) {
        function getData() {
            let array = [];
        $.ajax({
            url: libraryURL + "/leaderboard",
            type:"get",
            success: function(response){
                let data = JSON.parse(response);
                let dbTable = data.game;

                for (let i of dbTable) {
                    array.push(i.username);
                    array.push(i.time);
                    array.push(i.score);
                }
             },
            error: function(err){
                alert(err);
            }
        });
        return array;   
    }
        this.tableData = getData();
    }
    */
    preload () {
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.plugin('rexgridtableplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgridtableplugin.min.js', true);
        this.load.plugin('rexsliderplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js', true);
    }

    create () {
        //let tableData = this.tableData;

        let tableData = [];

        $.ajax({
            url: libraryURL + "/leaderboard",
            type:"get",
            success: function(response){
                let data = JSON.parse(response);
                let dbTable = data.game;

                for (let i of dbTable) {
                    tableData.push(i.username);
                    tableData.push(i.time);
                    tableData.push(i.score);
                }
             },
            error: function(err){
                alert(err);
            }
        });

        //setTimeout(getData(), 5000);

        console.log(tableData.length);

        let newCellObject = function (scene, cell) {
            let bg = scene.add.graphics().lineStyle(3, 0x000000).strokeRect(2, 2, 240, 100);
            let txt = scene.add.text(5, 5, tableData[cell.index]);
            let container = scene.add.container(0, 0, [bg, txt]);
            return container;
        }

        let onCellVisible = function (cell) {
            cell.setContainer(newCellObject(this, cell));
            //console.log('Cell ' + cell.index + ' visible');
        };

        //console.log(tableData.length);

        let table = this.add.rexGridTable((window.innerWidth / 2), (window.innerHeight / 2), 800, 400, {
            scrollMode: 0,
            cellsCount: tableData.length,
            columns: 3,
            cellWidth: 240,
            cellHeight: 50,
            cellVisibleCallback: onCellVisible.bind(this),
            clampTableOXY: true
        });

        // draw bound
        this.add.graphics().lineStyle(3, 0x000000).strokeRectShape(table.getBounds());
        this.add.graphics().lineStyle(3, 0x000000).strokeRect(table.getTopRight().x, table.getTopRight().y, 20, 400);

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
        });

        //this.add.graphics().lineStyle(3, 0x000000, 1).strokePoints(thumb.slider.endPoints);
        //this.add.graphics().lineStyle(3, 0x000000).strokeRectShape(table.tableWidth + 20, table.tableHeight, 20, 20);
        
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
        //this.scrollerState = this.add.text(0, 0, '');
    }

    update () {
        //this.scrollerState.setText(this.table.scroller.state + "\n" + this.table.tableOY);
        this.table.updateTable(true);
        //console.log(this.tableData.length);

    }
}