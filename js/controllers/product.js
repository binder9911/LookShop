let categories = ["men", "woman", "kids", "electronics", "gadgets"];
let products = [];
let _tempProducts = [];
let pageIndex = 0;

checkIsNewProductAdded();

function showPreviewOne(event) {
  console.log(event);
  if (event.target.files.length > 0) {
    let src = URL.createObjectURL(event.target.files[0]);
    let preview = document.getElementById("addProductImg");
    preview.src = src;
    preview.style.display = "block";
  }
}

function myImgRemoveFunctionOne() {
  document.getElementById("addProductImg").src =
    "https://i.ibb.co/ZVFsg37/default.png";
}

function checkIsNewProductAdded() {
  let param = window.location.search.substr(1);
  if (param.length > 0 && !categories.some((c) => param.includes(c))) {
    window.history.replaceState(
      {},
      document.title,
      "http://localhost/lookshop/add-product.html"
    );
    alert(param.replace(/%20/g, " "));
  }
}

function onProductPageLoad() {
  let param = window.location.search.substr(1);
  getAllProducts(param);
}

function getAllProducts(category) {
  $.ajax({
    method: "GET",
    url: "server/products.php",
    data: { function: "getProducts", category: category },
  }).done(function (response) {
    products = getRes(response) || [];
    _tempProducts = JSON.parse(JSON.stringify(products));
    if (products && products.length > 0) {
      displayProducts(products);
    } else {
      setNoProducts();
    }
  });
}

function displayProducts(products, searchValue) {
  let productListDiv = document.getElementById("productListDiv");
  let productItemSlider = document.getElementById("productItemDiv");
  document.getElementById("noItemDiv").style.display = "none";

  let _productList = addHeader();
  let _productSliderList =
    '<div class="sidebar-widget widget-slider" id="productSlider">' +
    '<div class="sidebar-slider normal-slider">' +
    ' <h2 class="title">Featured Products</h2>';


  if (searchValue && searchValue.length > 0) {
    _tempProducts=products.filter(p=>p.name.toLowerCase().includes(searchValue.toLowerCase()) || 
                                p.brand.toLowerCase().includes(searchValue.toLowerCase()))
  }

  _tempProducts.forEach((p) => {
    _productList += addProductItem(p);
  });

  let p = products[products.length - 1];
  _productSliderList += addSliderItem(p);
  _productSliderList += "</div></div>";

  productListDiv.innerHTML = _productList;
  productItemSlider.innerHTML = _productSliderList;
}

function setNoProducts() {
  document.getElementById("noItemDiv").style.display = "block";
  document.getElementById("productListDiv").style.display = "none";
  document.getElementById("productSlider").style.display = "none";
}

function addHeader() {
  return (
    '<div class="col-md-12">' +
    '<div class="product-view-top">' +
    '<div class="row">' +
    '<div class="col-md-4">' +
    '<div class="product-price-range">' +
    '<div class="dropdown">' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>"
  );
}

function addSliderItem(product) {
  let param = window.location.search.substr(1);

  let img = '<img class="listImg" src="server/images/' + product.imagePath + '" alt="Product Image">'

if(param == "gadgets"){
   img = '<img class="listImg addPadding" src="server/images/' + product.imagePath + '" alt="Product Image">'
}
  return (
    '<div class="product-item">' +
    '<div class="product-title">' +
    ' <a href="#">' +
    product.name +
    "</a>" +
    '<div class="ratting">' +
    ' <i class="fa fa-star"></i>' +
    ' <i class="fa fa-star"></i>' +
    ' <i class="fa fa-star"></i>' +
    ' <i class="fa fa-star"></i>' +
    ' <i class="fa fa-star"></i>' +
    " </div>" +
    " </div>" +
    '<div class="product-image listImg">' +
    '<a href="product-detail.html">' +
    img+
    " </a>" +
    '<div class="product-action">' +
    "<a onclick='addToCart("+JSON.stringify(product)+")'><i class='fa fa-cart-plus'></i></a>" +
    "<a onclick='addToWislist("+JSON.stringify(product)+")'><i class='fa fa-heart'></i></a>" +
    "</div>" +
    "</div>" +
    '<div class="product-price">' +
    "<h4 class='rsLabel'><span style='font-size: 15px;'>Rs </span>" +
    product.price +
    "</h4>" +
    "<a class='btn' onclick='addToCart("+JSON.stringify(product)+")'><i class='fa fa-shopping-cart'></i>Add To Cart</a>" +
    " </div>" +
    "</div>"
  );
}

function addProductItem(product) {
  let param = window.location.search.substr(1);

  let img = '<img class="listImg" src="server/images/' + product.imagePath + '" alt="Product Image">'

if(param == "gadgets"){
   img = '<img class="listImg addPadding" src="server/images/' + product.imagePath + '" alt="Product Image">'
}
  return (
    '<div class="col-md-4">' +
    '<div class="product-item">' +
    '<div class="product-title">' +
    ' <a href="#">' +
    product.name +
    "</a>" +
    '<div class="ratting">' +
    ' <i class="fa fa-star"></i>' +
    ' <i class="fa fa-star"></i>' +
    ' <i class="fa fa-star"></i>' +
    ' <i class="fa fa-star"></i>' +
    ' <i class="fa fa-star"></i>' +
    " </div>" +
    " </div>" +
    '<div class="product-image listImg">' +
    '  <a href="product-detail.html">' +
    img+
    " </a>" +
    '<div class="product-action">' +
    "<a onclick='addToCart("+JSON.stringify(product)+")'><i class='fa fa-cart-plus'></i></a>" +
    "<a onclick='addToWislist("+JSON.stringify(product)+")'><i class='fa fa-heart'></i></a>" +
    "</div>" +
    "</div>" +
    '<div class="product-price">' +
    "<h4 class='rsLabel'><span style='font-size: 15px;'>Rs </span>" +
    product.price +
    "</h4>" +
    "<a class='btn' onclick='addToCart("+JSON.stringify(product)+")'><i class='fa fa-shopping-cart'></i>Add To Cart</a>" +
    " </div>" +
    "</div>" +
    "</div>"
  );
}

function getRes(response) {
  console.log("response", response);
  let res = null;
  try {
    res = JSON.parse(response.trim());
    return res;
  } catch (error) {
    return response;
  }
}

function onSearchBtnClick() {
  let searchValue = document.getElementById("searchInput").value;
  displayProducts(products,searchValue )
}

function filterByPrice(value) {
  let searchValue = document.getElementById("searchInput").value;
  displayProducts(products,searchValue, )
  
}


function addToCart(product){
  console.log("addToCartaddToCart", product)
  let user = JSON.parse(localStorage.getItem("user"))
  if(!user || !user.id) return

  $.ajax({
    method: "POST",
    url: "server/cart.php",
    data: { function: "addProductToCart", product: JSON.stringify(product).replace(/"/g,"'"), userId:user.id },
  }).done(function (response) {
    // console.log("response", response)
    let res = getRes(response)
    if(res && res.includes("Hurray")) getProductsInCart()
    alert(res) 
  });

}

function getProductsInCart(){

  console.log("getProductsInCart")
  let user = JSON.parse(localStorage.getItem("user"))
  if(!user || !user.id) return

  $.ajax({
    method: "GET",
    url: "server/cart.php",
    data: { function: "getProductsInCart",  userId:user.id },
  }).done(function (response) {
    console.log("response", response)
    setCartItemCount(getRes(response) || [])
  });
}

function setCartItemCount(cartItems){
document.getElementById("cartSpan").innerHTML=cartItems.length
}


function addToWislist(product){
  console.log("addToWislist", product)
  let user = JSON.parse(localStorage.getItem("user"))
  if(!user || !user.id) return

  $.ajax({
    method: "POST",
    url: "server/wishlist.php",
    data: { function: "addProductToWishlist", product: JSON.stringify(product).replace(/"/g,"'"), userId:user.id },
  }).done(function (response) {
    // console.log("response", response)
    let res = getRes(response)
    if(res && res.includes("Hurray")) getProductsInWishlist()
    alert(res) 
  });

}

function getProductsInWishlist(){

  console.log("getProductsInWishlist")
  let user = JSON.parse(localStorage.getItem("user"))
  if(!user || !user.id) return

  $.ajax({
    method: "GET",
    url: "server/wishlist.php",
    data: { function: "getProductsInWishlist",  userId:user.id },
  }).done(function (response) {
    console.log("response", response)
    setWishlistItemCount(getRes(response) || [])
  });
}

function setWishlistItemCount(wishListItems){
document.getElementById("wishlistSpan").innerHTML=wishListItems.length
}


