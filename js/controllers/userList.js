function getAllUsers() {
  console.log("getAllUsers");
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.id) return;

  $.ajax({
    method: "GET",
    url: "server/admin.php",
    data: { function: "getAllUsers" },
  }).done(function (response) {
    setUsersForAdmin(getRes(response) || []);
  });
}

function setUsersForAdmin(usersArr) {
  if (usersArr && usersArr.length > 0) {
    document.getElementById("noItemDivuserList").style.display = "none";

    let userListBody = document.getElementById("userListBody");
    let html = "";

    usersArr.forEach((user) => { 

      let color = "red";
      if (user.status == "ACTIVE") {
        color = "green";
      }

      html +=
        "<tr>" +
        "<td>" +
        user.id +
        "</td>" +
        "<td>" +
        user.name +
        "</td>" +
        "<td>" +
        user.gender +
        "</td>" +
        "<td>" +
        user.email +
        "</td>" +
        "<td>" +
        user.contact +
        "</td>" +
        "<td>" +
        user.date +
        "</td>" +
        "<td>" +
        user.address +", "+ user.city+", "+ user.pincode+
        "</td>" +
        "<td style='color:"+color+"'>" +
        user.status +
        "</td>" +
        "<td>" +
        "<button class='checkBtn' onclick='activateUser(" +
        JSON.stringify(user.id) +
        ")'><i class='fa fa-check'></i></button>" +
        "<button  onclick='disableUser(" +
        JSON.stringify(user.id) +
        ")'><i class='fa fa-times'></i></button>" +
        "</td>" +
        "</tr>";
    });
    userListBody.innerHTML = html;
  } else {
    document.getElementById("noItemDivuserList").style.display = "block";
    document.getElementById("userListTable").style.display = "none";
  }
}

function activateUser(id) {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.id) return;

  $.ajax({
    method: "GET",
    url: "server/admin.php",
    data: { function: "activateUser", id: id },
  }).done(function (response) {
    if (getRes(response).includes("Something")) {
      alert(getRes(response));
    } else {
      getAllUsers();
    }
  });
}

function disableUser(id) {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.id) return;

  $.ajax({
    method: "GET",
    url: "server/admin.php",
    data: { function: "disableUser", id: id },
  }).done(function (response) {
    if (getRes(response).includes("Something")) {
      alert(getRes(response));
    } else {
      getAllUsers();
    }
  });
}
