const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;
const multer = require('multer');
const mysql = require('mysql');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads')
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
  storage: storage
})


app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.set("view engine", "ejs");
app.set("views", "./views");
  

const clientRouter = require("./router/client");
app.use('/',clientRouter);

const adminRouter = require("./router/admin");
app.use('/admin',adminRouter);


app.listen(port, () => {
  console.log(`Ung dung dang chay voi port: ${port}`);
});
