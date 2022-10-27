function onIndexPageLoad() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    console.log("user not logged in yet");

    document.getElementById("addProductLink").style.display = "none";
    document.getElementById("cartLink").style.display = "none";
    document.getElementById("checkoutLink").style.display = "none";
    if(document.getElementById("accountLink"))
    document.getElementById("accountLink").style.display = "none";
    if(document.getElementById("wishlistBtn"))
    document.getElementById("wishlistBtn").style.display = "none";
    if(document.getElementById("cartBtn"))
    document.getElementById("cartBtn").style.display = "none";
    document.getElementById("logoutLink").style.display = "none";
    document.getElementById("adminOrdersLink").style.display = "none";
    document.getElementById("ordersLink").style.display = "none";
    document.getElementById("userLink").style.display = "none";
    
    return;
  }

  document.getElementById("loginRegisterLink").style.display = "none";
  document.getElementById("headerContact").innerHTML = user.contact;
  document.getElementById("headerEmail").innerHTML = user.email;

  if (user.type == "customer") {
    if(document.getElementById("adminOrdersLink"))
    document.getElementById("adminOrdersLink").style.display = "none";
    document.getElementById("addProductLink").style.display = "none";
    if(document.getElementById("userLink"))
    document.getElementById("userLink").style.display = "none";

  } else {
    document.getElementById("cartLink").style.display = "none";
    document.getElementById("checkoutLink").style.display = "none";
    document.getElementById("cartLink").style.display = "none";
    
    if(document.getElementById("ordersLink"))
    document.getElementById("ordersLink").style.display = "none";

    if(document.getElementById("cartBtn"))
    document.getElementById("cartBtn").style.display = "none";
    if(document.getElementById("wishlistBtn"))
    document.getElementById("wishlistBtn").style.display = "none";
    document.getElementById("userLink").style.display = "block";

  }
}
