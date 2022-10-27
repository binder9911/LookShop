function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var rememberMe = document.getElementById("rememberMe").checked;

  let obj = {
    email,
    password,
  };

  if (email == "" || password == "") {
    alert("Please enter valid email and password.");
    return;
  }
  $.ajax({
    method: "POST",
    url: "server/account.php",
    // data: {
    //   function: "login",
    //   email: "binder1119@gmail.com",
    //   password: "password",
    // },
    data: { function: "login", email: email, password: password },
  }).done(function (response) {
    let res = getRes(response);
    if (!res || !res.id) {
      clearLocalStorageItem("user");
      alert("Invalid email or password details.");
    } else {
      if(res.status!="ACTIVE"){
        alert("User disabled, please contact admin to enable user.");
        return
      }

      if (rememberMe) {
        setLocalStorageItem("credentials", JSON.stringify(obj));
      } else {
        clearLocalStorageItem("credentials");
      }
      setLocalStorageItem("user", response);
      window.location.href = "index.html";
    }
  });
}

function signUp() {
  var name = document.getElementById("signUpName").value;
  var email = document.getElementById("signUpEmail").value;
  var contact = document.getElementById("signUpMobile").value;
  var password = document.getElementById("signUpPassword").value;
  var city = document.getElementById("signUpCity").value;
  var pincode = document.getElementById("signUpPincode").value;
  var address = document.getElementById("signUpAddress").value;
  var gender = document.getElementById("signUpGender").value;

  if (name == "") {
    alert("Please enter valid name.");
    return;
  } else if (email == "") {
    alert("Please enter valid email.");
    return;
  } else if (contact == "" || isNaN(contact)) {
    alert("Please enter valid mobile number.");
    return;
  } else if (password == "") {
    alert("Please enter valid password.");
    return;
  } else if (city == "") {
    alert("Please enter valid city.");
    return;
  } else if (pincode == "" || isNaN(contact)) {
    alert("Please enter valid pincode.");
    return;
  } else if (address == "") {
    alert("Please enter valid v.");
    return;
  }

  $.ajax({
    method: "POST",
    url: "server/account.php",
    data: {
      function: "signUp",
      name: name,
      email: email,
      contact: contact,
      password: password,
      city: city,
      pincode: pincode,
      address: address,
      gender: gender,
    },
    // data: {
    //   function: "signUp",
    //   name: "name",
    //   email: "email",
    //   contact: "contact",
    //   password: "password",
    //   city: "city",
    //   pincode: "pincode",
    //   address: "address",
    //   gender: "gender",
    // },
  }).done(function (response) {
    let res = getRes(response);
    if (!res) {
      clearLocalStorageItem("user");
      alert("Something went wrong.");
    } else {
      alert(res);

      if (res == "User created successfully") {
        clearInputFields();
      }
    }
  });
}

function clearInputFields() {
  document.getElementById("signUpName").value = "";
  document.getElementById("signUpEmail").value = "";
  document.getElementById("signUpMobile").value = "";
  document.getElementById("signUpPassword").value = "";
  document.getElementById("signUpCity").value = "";
  document.getElementById("signUpPincode").value = "";
  document.getElementById("signUpAddress").value = "";
}

function clearLocalStorageItem(key) {
  localStorage.removeItem(key);
}

function setLocalStorageItem(key, value) {
  localStorage.setItem(key, value);
}

function clearAllLocalStorage() {
  localStorage.clear();
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

function logout(){
  clearLocalStorageItem('user')

  window.location.href = window.location.href.replace(/#.*$/, '');
  window.location.href = "index.html";
  window.location.reload();
}

function setCredentials() {
  let credentials = localStorage.getItem("credentials");

  if (credentials && credentials.length > 0) {
    let _credentials = JSON.parse(credentials);
    document.getElementById("email").value = _credentials.email;
    document.getElementById("password").value = _credentials.password;
    document.getElementById("rememberMe").checked = true;
  }
}
