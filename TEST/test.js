let products = [
    { id: "P01", name: "Laptop MacBook Pro M3", price: 2000, category: "Laptop", inStock: true },
    { id: "P02", name: "Chuột không dây Logitech", price: 45, category: "Phụ kiện", inStock: true },
    { id: "P03", name: "Bàn phím cơ Keychron", price: 95, category: "Phụ kiện", inStock: false },
    { id: "P04", name: "Màn hình Dell UltraSharp", price: 450, category: "Màn hình", inStock: true },
    { id: "P05", name: "Tai nghe Sony WH-1000XM5", price: 350, category: "Phụ kiện", inStock: true }
];

let findProductById = (id) => {
  let product = products.find(p => p.id === id);
  if (product) {
    console.log(product);
  } else {
    console.log("Không tìm thấy sản phẩm");
  }
};

let checkPriceValid = () => {
  let isValid = products.every(p => p.price > 0);
  if (isValid) {
    console.log("Dữ liệu bảng giá hợp lệ");
  } else {
    console.log("Phát hiện sản phẩm chưa cập nhật giá");
  }
};

findProductById("P03");
checkPriceValid();