var http = require("http");
var path = require("path");
var express = require("express");

var app = express();

app.set("views" , path.resolve(__dirname, "views"));
app.set("view engine" , "ejs");


app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", function(request, response) {
 response.render("index");
});

app.get("/index1", function(request, response) {
 response.render("index1");
});

app.get("/index2", function(request, response) {
 response.render("index2");
});

app.get("/index3", function(request, response) {
 response.render("index3");
});

app.get("/index4", function(request, response) {
 response.render("index4");
});

app.get("/index5", function(request, response) {
 response.render("index5");
});

app.get("/index6", function(request, response) {
    fs.readFile('shoesData.txt', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            // 處理錯誤，例如顯示錯誤消息或使用空數據
            data = '';
        }
        response.render("index6", {shoesData: data});
    });
});


app.use(express.static(path.resolve(__dirname, "images")));



app.use(express.urlencoded({ extended: true }));


const fs = require('fs');

app.post('/add-shoe', function(req, res) {
    var shoeName = req.body.shoeName;
    var shoeSize = req.body.shoeSize;

    console.log("Shoe Name:", shoeName, "Shoe Size:", shoeSize);

    var data = `Shoe Name: ${shoeName}, Shoe Size: ${shoeSize}\n`;
    fs.appendFile('shoesData.txt', data, function(err) {
        if (err) throw err;
        console.log('Saved!');
    });

    res.redirect('/index6'); // 或其他頁面

    // 其他處理...
});

app.post('/delete-shoe/:lineIndex', function(req, res) {
    const lineIndex = parseInt(req.params.lineIndex, 10);

    // 讀取文件，刪除指定行，然後寫回文件
    fs.readFile('shoesData.txt', 'utf8', function(err, data) {
        if (err) throw err;

        var lines = data.split('\n');
        if (lineIndex >= 0 && lineIndex < lines.length) {
            lines.splice(lineIndex, 1); // 刪除指定行
            var newData = lines.join('\n');

            fs.writeFile('shoesData.txt', newData, function(err) {
                if (err) throw err;
                console.log('Data deleted!');
            });
        }

        res.redirect('/index6');
    });
});



app.use(function(request, response) {
 response.status(404).render("404");
});

app.use(function(request, response) {
    response.status(404).send('404 Not Found');
});

http.createServer(app).listen(3000, function() {
 console.log("Guestbook app started on port 3000.");
});