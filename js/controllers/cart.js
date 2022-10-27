var isCouponApplied = false
let globalCartItems=[]
function setIsCouponApplied(value){
  isCouponApplied=value
  getProductsInCart()
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
    
    setCartItemCount(getRes(response) || [])
    setCartList(getRes(response) || [])
    checkoutBtnDiv(getRes(response) || [])
  });
}

function setCartItemCount(cartItems){
document.getElementById("cartSpan").innerHTML=cartItems.length
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


function isCartPage() {
  let url = window.location.href;
  let page = url.slice(url.lastIndexOf("/") + 1);
  if (page == "cart.html") return true;
  else return false;
}

function setCartList(cartListItems){
  globalCartItems=JSON.parse(JSON.stringify(cartListItems))
  if(!isCartPage()) return
  calculateTotal(cartListItems)

  if (!cartListItems || cartListItems.length == 0) {
    document.getElementById("cartListTable").style.display = "none";
    document.getElementById("noItemDivCart").style.display = "block";
    return;
  }

  document.getElementById("noItemDivCart").style.display = "none";

  let wishListTableBody=document.getElementById("cartTableBody")
  let html =""
  cartListItems.forEach(i => {
    let __product = JSON.parse(i.product.replace(/'/g,'"'))
    html+="<tr>"+
    "<td>"+
    "<div class='img'>"+
    "<a><img src='server/images/"+__product.imagePath + "' alt='Image'></a>"+
    "<p>"+__product.name+"</p>"+
    "</div>"+
    "</td>"+
    "<td>Rs "+__product.price+"</td>"+
    "<td><button  onclick='removeFromcart("+JSON.stringify(i.id)+")'><i class='fa fa-trash'></i></button></td>"+
    "</tr>"
  });
  wishListTableBody.innerHTML=html
  }

  
function removeFromcart(id){
  console.log(id)
  
    $.ajax({
      method: "POST",
      url: "server/cart.php",
      data: { function: "removeFromCart",  id:id },
    }).done(function (response) {
      // console.log("response", response)
      let res = getRes(response)
      if(res && res.includes("removed")) getProductsInCart()
      // alert(res) 
    });
  
  }

  function calculateTotal(cartListItems){
    let subTotalSpan= document.getElementById("subTotalSpan")
    let grandTotalSpan= document.getElementById("grandTotalSpan")
    let deliverySpan= document.getElementById("deliverySpan")

    let total = 0
    cartListItems.forEach(item=>{
      let product = JSON.parse(item.product.replace(/'/g,'"'))
      total+=Number(product.price)
    })

    subTotalSpan.innerHTML= "Rs "+total
    deliverySpan.innerHTML= (cartListItems.length>0 && !isCouponApplied)?"Rs 50":"Rs 0"
    grandTotalSpan.innerHTML="Rs "+(total+ (!isCouponApplied?0:50))

  }

  function checkoutBtnDiv(cartListItems){
    if(!isCartPage()) return
    if(cartListItems.length>0){
      document.getElementById("checkoutBtnDiv").style.display="block"
    }else{
      document.getElementById("checkoutBtnDiv").style.display="none"

    }
  }


