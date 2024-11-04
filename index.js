const express = require("express");
const app = express();
const path = require("path");
const axois = require("axios");
const bodyParser = require("body-parser");
async function getData() {
  const res = await axois.get(
    "https://67283d19270bd0b97554c20a.mockapi.io/amazonproducts"
  );
  const products = res.data;
  return products;
}

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("components/home");
});

app.get("/products", async (req, res) => {
  const products = await getData();
  res.render("components/productListing", { products });
});

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const products = await getData();
  const product = products.find((p) => p.id == id);
  res.render("components/productDetails", { product });
});

app.post("/checkout", (req, res) => {
  res.render("components/checkout");
});

app.post("/payment", (req, res) => {
  // Mock payment processing
  const success = Math.random() < 0.5; // 50% chance of success
  res.render("components/paymentResult", { success });
});

app.listen(3000, () => {
  console.log("App is on Port: 3000");
});
