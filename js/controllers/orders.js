function getAllOrdersOfUser() {
  console.log("getAllOrdersOfUser");
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.id) return;

  $.ajax({
    method: "GET",
    url: "server/admin.php",
    data: { function: "getAllOrdersOfUser", userId:user.id },
  }).done(function (response) {
    setOrderForAdmin(getRes(response) || []);
  });
}

function setOrderForAdmin(ordersArr) {
  if (ordersArr && ordersArr.length > 0) {
    document.getElementById("noItemDivAdminOrders").style.display = "none";

    let adminOrdersBody = document.getElementById("adminOrdersBody");
    let html = "";

    ordersArr.forEach((orderItem) => {
      let address = JSON.parse(orderItem.address.replace(/'/g, '"'));
      let date = new Date(orderItem.date).toLocaleDateString("en-US");
      let _orders = orderItem.products.split("-");

      let orderList = "";

      console.log("ordersordersorders", _orders);
      _orders.forEach((_orderItem) => {
        let name = _orderItem.split("_")[0];
        orderList += "<p>" + name + "</p>";
      });

      let color = "blue";
      if (orderItem.status == "COMPLETED") {
        color = "green";
      } else if (orderItem.status == "CANCELLED") {
        color = "red";
      }

      html +=
        "<tr>" +
        "<td>" +
        orderList +
        "</td>" +
        "<td>" +
        address.cName +
        ", " +
        address.cAddress +
        ", " +
        address.cCity +
        ", " +
        address.cPincode +
        ", " +
        address.country +
        ", " +
        address.cContact +
        "</td>" +
        "<td>" +
        orderItem.price +
        "</td>" +
        "<td style='color:"+color+"'>" +
        orderItem.status +
        "</td>" +
        "<td>" +
        date +
        "</td>" +
        "<td>" +
        orderItem.payment +
        "</td>" +
        "</tr>";
    });
    adminOrdersBody.innerHTML = html;
  } else {
    document.getElementById("noItemDivAdminOrders").style.display = "block";
    document.getElementById("adminOrdersTable").style.display = "none";
  }
}
