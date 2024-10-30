const path = require("path");

//Page listeners
var router = function(app) {
    app.get('/write-library', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/write-library.html"));
    })

    app.get('/browse-library', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/browse-library.html"));
    })

    app.get('/browse-records', function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/read-records.html"));
    })
};

module.exports = router;