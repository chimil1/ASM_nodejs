var db = require("../../models/database");

exports.index = async (req, res, next) => {
  let sql = "SELECT * FROM sanpham ORDER BY RAND() LIMIT 3 ";
  db.query(sql, function (err, data) {
    data.forEach((data) => {
      data.Gia = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(data.Gia);
    });
    if (err) throw err;
    res.render("client/index", { data: data });
  });
};

exports.shop = async (req, res, next) => {
  let sql = `SELECT * FROM sanpham`;
  db.query(sql, function (err, data) {
    data.forEach((data) => {
      data.Gia = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(data.Gia);
    });
    if (err) throw err;
    res.render("client/category/shop", { data: data });
  });
};

exports.about = async (req, res, next) => {
  res.render("client/category/about");
};

exports.services = async (req, res, next) => {
  let sql = "SELECT * FROM sanpham ORDER BY RAND() LIMIT 3";
  db.query(sql, function (err, data) {
    data.forEach((data) => {
      data.Gia = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(data.Gia);
    });
    if (err) throw err;
    res.render("client/category/services", { data: data });
  });
};

exports.blog = async (req, res, next) => {
  res.render("client/category/blog");
};

exports.contact = async (req, res, next) => {
  res.render("client/category/contact");
};

exports.cart = async (req, res, next) => {
  res.render("client/category/cart");
};

exports.single = async (req, res, next) => {
  id = req.params.id;
  let sql = `SELECT * FROM sanpham WHERE MaSanPham = ?`;
  db.query(sql, [id], function (err, data) {
    if (err) throw err;
    res.render("client/category/single", { category: data[0] });
  });
};
