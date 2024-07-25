var db = require("../../models/database");
const multer = require("multer");
const path = require("path");
// Cấu hình Multer để lưu tệp tin
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // Đường dẫn lưu tệp tin
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Đổi tên tệp tin
  },
});
const upload = multer({ storage: storage });

exports.index = async (req, res, next) => {
  res.render("client/home");
};

exports.home = async (req, res, next) => {
  res.render("admin/home");
};

exports.qlPersonnel = async (req, res, next) => {
  let sql = `SELECT * FROM nhanvien`;
  db.query(sql, function (err, data) {
    if (err) throw err;
    res.render("admin/category/qlPersonnel", { data: data });
  });
};

exports.qlProduct = async (req, res, next) => {
  let sql = `SELECT * FROM sanpham`;
  db.query(sql, function (err, data) {
    data.forEach((data) => {
      data.Gia = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(data.Gia);
    });
    if (err) throw err;
    res.render("admin/category/qlProduct", { data: data });
  });
};

exports.addProduct = async (req, res, next) => {
  res.render("admin/category/addProduct");
};

exports.addPersonnel = async (req, res, next) => {
  res.render("admin/category/addPersonnel");
};

exports.delete = async (req, res, next) => {
  const MaSanPham = req.params.MaSanPham;
  const sql = `DELETE FROM sanpham WHERE MaSanPham = ?`;
  db.query(sql, [MaSanPham], (err, result) => {
    if (err) throw err;
    res.redirect("/admin/category/qlProduct");
  });
};

exports.deletePersonnel = async (req, res, next) => {
  const MaNhanVien = req.params.MaNhanVien;
  const sql = `DELETE FROM nhanvien WHERE MaNhanVien = ?`;
  db.query(sql, [MaNhanVien], (err, result) => {
    if (err) throw err;
    res.redirect("/admin/category/qlPersonnel");
  });
};

exports.post = [
  upload.single("HinhAnh"),
  async (req, res, next) => {
    const {
      TenSanPham,
      Gia,
      GiaKhuyenMai,
      SoLuong,
      MaDanhMuc,
      MoTa,
      TrangThai,
    } = req.body;
    const HinhAnh = req.file ? req.file.filename : ""; // Lấy tên tệp tin đã lưu
    const sql =
      "INSERT INTO sanpham (TenSanPham, Gia, GiaKhuyenMai,SoLuong,MaDanhMuc,MoTa,TrangThai,HinhAnh) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        TenSanPham,
        Gia,
        GiaKhuyenMai,
        SoLuong,
        MaDanhMuc,
        MoTa,
        TrangThai,
        HinhAnh,
      ],
      (err, result) => {
        if (err) throw err;
        res.redirect("/admin/category/qlproduct"); // Điều hướng sau khi thêm thành công
      }
    );
  },
];

exports.postPersonnel = [
  upload.single("Anh"),
  async (req, res, next) => {
    const { HoTen, Email, MatKhau, SDT, ChucVu, LyLich, Admin } = req.body;
    const Anh = req.file ? req.file.filename : ""; // Lấy tên tệp tin đã lưu
    const sql =
      "INSERT INTO nhanvien (HoTen, Email,MatKhau, SDT,ChucVu,LyLich,Admin,Anh) VALUES (?, ?, ?, ?, ?, ?, ?,?)";
    db.query(
      sql,
      [HoTen, Email, MatKhau, SDT, ChucVu, LyLich, Admin, Anh],
      (err, result) => {
        if (err) throw err;
        res.redirect("/admin/category/qlPersonnel"); // Điều hướng sau khi thêm thành công
      }
    );
  },
];

exports.editProduct = async (req, res, next) => {
  const MaSanPham = req.params.MaSanPham;
  const sql = "SELECT * FROM sanpham WHERE MaSanPham = ?";
  db.query(sql, [MaSanPham], (err, data) => {
    if (err) throw err;
    res.render("admin/category/editProduct", { product: data[0] });
  });
};

// Xử lý dữ liệu chỉnh sửa sản phẩm
exports.updateProduct = [
  upload.single("HinhAnh"),
  async (req, res, next) => {
    const MaSanPham = req.params.MaSanPham;
    const {
      TenSanPham,
      Gia,
      GiaKhuyenMai,
      SoLuong,
      MaDanhMuc,
      MoTa,
      TrangThai,
    } = req.body;
    const HinhAnh = req.file ? req.file.filename : req.body.existingImage; // Lấy tên tệp tin mới hoặc giữ nguyên tệp tin cũ
    const sql =
      "UPDATE sanpham SET TenSanPham = ?, Gia = ?, GiaKhuyenMai = ?,SoLuong=?, MaDanhMuc=?, MoTa=?, TrangThai=? ,HinhAnh = ? WHERE MaSanPham = ?";
    db.query(
      sql,
      [
        TenSanPham,
        Gia,
        GiaKhuyenMai,
        SoLuong,
        MaDanhMuc,
        MoTa,
        TrangThai,
        HinhAnh,
        MaSanPham,
      ],
      (err, result) => {
        if (err) throw err;
        res.redirect("/admin/category/qlproduct"); // Điều hướng sau khi cập nhật thành công
      }
    );
  },
];
