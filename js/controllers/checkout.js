let cartItemsToOrder =[]

function addBillingDetails(){
let user = JSON.parse(localStorage.getItem("user"))

if(user && user.id){
  document.getElementById("cName").value=user.name
  document.getElementById("cEmail").value=user.email
  document.getElementById("cContact").value=user.contact
  document.getElementById("cAddress").value=user.address
  document.getElementById("cCity").value=user.city
  document.getElementById("cPincode").value=user.pincode
}
}

function getProductsInCartForCheckout(){
  let user = JSON.parse(localStorage.getItem("user"))
  if(!user || !user.id) return

  $.ajax({
    method: "GET",
    url: "server/cart.php",
    data: { function: "getProductsInCart",  userId:user.id },
  }).done(function (response) {
    calculateTotal(getRes(response) || [])
  });
}

function calculateTotal(cartListItems){
  cartItemsToOrder=cartListItems
  let subTotalSpan= document.getElementById("subTotalSpanCheckout")
  let grandTotalSpan= document.getElementById("grandTotalSpanCheckout")
  let deliverySpan= document.getElementById("deliverySpanCheckout")

  let total = 0
  cartListItems.forEach(item=>{
    let product = JSON.parse(item.product.replace(/'/g,'"'))
    total+=Number(product.price)
  })

  subTotalSpan.innerHTML= "Rs "+total
  deliverySpan.innerHTML= (cartListItems.length>0 && !isCouponApplied)?"Rs 50":"Rs 0"
  grandTotalSpan.innerHTML="Rs "+(total+ (!isCouponApplied?0:50))

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

function getPaymentMedium(){

  if(document.getElementById("payment-1").checked){
      return "Paypal"
  }else  if(document.getElementById("payment-2").checked){
    return "UPI"
  }else  if(document.getElementById("payment-3").checked){
    return "Credit/Debit cards"
  }else  if(document.getElementById("payment-4").checked){
    return "Direct bank Transfer"
  }else{
    return "Cash On Delivery"

  }
}

function placeOrderBtnClick(){
  let user = JSON.parse(localStorage.getItem("user"))
  if(!user || !user.id) return

 let cName= document.getElementById("cName").value;
 let cEmail= document.getElementById("cEmail").value;
 let cContact= document.getElementById("cContact").value;
 let cAddress= document.getElementById("cAddress").value;
 let cCity= document.getElementById("cCity").value;
 let cPincode= document.getElementById("cPincode").value;
 let country= "India"
 let price= document.getElementById("grandTotalSpanCheckout").innerText;

 let payment = getPaymentMedium()
 let billingAddressObj={
  cName,
  cEmail,
  cContact,
  cAddress,
  cCity,
  cPincode,
  country,
 }

  let productsToBeOrdered=""
  cartItemsToOrder.forEach((item, index)=>{
    let product=JSON.parse(item.product.replace(/'/g,'"'))

    if(index!=item.length-1){
      productsToBeOrdered+=product.name+"_"+product.id+"-"
    }else{
      productsToBeOrdered+=product.name+"_"+product.id
    }
  })

 $.ajax({
    method: "POST",
    url: "server/orders.php",
    data: { function: "addOrder",
     address:JSON.stringify(billingAddressObj).replace(/"/g,"'"),
     products: productsToBeOrdered,
     payment:payment, 
     userId:user.id,
     price:price,
     status:"PENDING",
     date: new Date() },
  }).done(function (response) {
    // console.log("response", response)
    let res = getRes(response)
    alert(res) 
    if(res && res.includes("Hurray")) navigateToHome()
  });


}

function navigateToHome(){
  window.location.href = window.location.href.replace(/#.*$/, '');
  window.location.href = "index.html";
}