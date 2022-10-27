
function getProductsInWishlist(){

  console.log("getProductsInWishlist")
  let user = JSON.parse(localStorage.getItem("user"))
  if(!user || !user.id) return

  $.ajax({
    method: "GET",
    url: "server/wishlist.php",
    data: { function: "getProductsInWishlist",  userId:user.id },
  }).done(function (response) {
    setWishlistItemCount(getRes(response) || [])
    setWishlistList(getRes(response) || [])
  });
}

function setWishlistItemCount(wishListItems){
document.getElementById("wishlistSpan").innerHTML=wishListItems.length
}

function isWishlistPage() {
  let url = window.location.href;
  let page = url.slice(url.lastIndexOf("/") + 1);
  if (page == "wishlist.html") return true;
  else return false;
}

function setWishlistList(wishListItems){
  if(!isWishlistPage()) return

  if (!wishListItems || wishListItems.length == 0) {
    document.getElementById("wishListTable").style.display = "none";
    document.getElementById("noItemDivWishList").style.display = "block";
    return;
  }

  document.getElementById("noItemDivWishList").style.display = "none";

  let wishListTableBody=document.getElementById("wishListTableBody")
  let html =""
  wishListItems.forEach(i => {
    let __product = JSON.parse(i.product.replace(/'/g,'"'))
    html+="<tr>"+
    "<td>"+
    "<div class='img'>"+
    "<a><img src='server/images/"+__product.imagePath + "' alt='Image'></a>"+
    "<p>"+__product.name+"</p>"+
    "</div>"+
    "</td>"+
    "<td>Rs "+__product.price+"</td>"+
    "<td><button class='btn-cart' onclick='addToCart("+JSON.stringify(__product) +","+ JSON.stringify(i.userId)+")'>Add to Cart</button></td>"+
    "<td><button  onclick='removeFromWishlist("+JSON.stringify(i.id)+")'><i class='fa fa-trash'></i></button></td>"+
    "</tr>"
  });
  wishListTableBody.innerHTML=html
  }
  

function getRes(response) {
  let res = null;
  try {
    res = JSON.parse(response.trim());
    return res;
  } catch (error) {
    return response;
  }
}

function addToCart(product, userId){
console.log(product, userId)

  $.ajax({
    method: "POST",
    url: "server/cart.php",
    data: { function: "addProductToCart", product: JSON.stringify(product).replace(/"/g,"'"), userId:userId },
  }).done(function (response) {
    // console.log("response", response)
    let res = getRes(response)
    if(res && res.includes("Hurray")) getProductsInCart()
    alert(res) 
  });

}


function removeFromWishlist(id){
  console.log(id)
  
    $.ajax({
      method: "POST",
      url: "server/wishlist.php",
      data: { function: "removeFromWishlist",  id:id },
    }).done(function (response) {
      // console.log("response", response)
      let res = getRes(response)
      if(res && res.includes("removed")) getProductsInWishlist()
      // alert(res) 
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