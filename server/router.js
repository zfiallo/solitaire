const path = require("path");

//Page listeners
let router = function(app) {
    app.get('/index', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/index.html"));
    })
};

module.exports = router;