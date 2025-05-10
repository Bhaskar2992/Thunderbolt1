//============================
// Login validation
//============================

var isValidEmailLogin = false;
var isValidPassLogin = false;

function checkValidEmailLogin(elem) {
  const email = $(elem).val();
  const regex =
    /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (email != "") {
    if (!regex.test(email)) {
      $(elem)
        .siblings("span")
        .html('<i class="text-error" data-lucide="circle-alert"></i>');
      lucide.createIcons();
      isValidEmailLogin = false;
    } else {
      $(elem)
        .siblings("span")
        .html('<i class="text-success" data-lucide="circle-check"></i>');
      lucide.createIcons();
      isValidEmailLogin = true;
    }
  } else {
    $(elem).siblings("span").html("");
    isValidEmailLogin = false;
  }
}

function checkValidPasswordLogin(elem) {
  const pass = $(elem).val();

  if (pass != "") {
    if (pass.length < 6) {
      $(elem)
        .siblings("span")
        .html('<i class="text-error" data-lucide="circle-alert"></i>');
      lucide.createIcons();
      isValidPassLogin = false;
    } else {
      $(elem)
        .siblings("span")
        .html('<i class="text-success" data-lucide="circle-check"></i>');
      lucide.createIcons();
      isValidPassLogin = true;
    }
  } else {
    $(elem).siblings("span").html("");
    isValidPassLogin = true;
  }
}

$("#btnLogin").click(function () {
  if (isValidEmailLogin == true && isValidPassLogin == true) {
    const email = loginEmail.value;
    const pass = loginPass.value;
    $(this).html(
      '<span class="loading loading-spinner text-accent loading-md"></span>'
    );
    $(this).attr("disabled", true);
    LoginFB(email, pass);
  } else {
    loginAlertContent.innerHTML = "Invalid credentials!";
    $("#loginAlert")
      .removeClass("hidden")
      .fadeIn(500)
      .delay(2000)
      .fadeOut(500, function () {
        $(this).addClass("hidden");
      });
  }
});

//============================
// Signup validation
//============================

var isValidNameSignup = false;
var isValidEmailSignup = false;
var isValidPhoneSignup = false;

function checkValidEmailSignup(elem) {
  const email = $(elem).val();
  const regex =
    /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (email != "") {
    if (!regex.test(email)) {
      $(elem)
        .siblings("span")
        .html('<i class="text-error" data-lucide="circle-alert"></i>');
      lucide.createIcons();
      isValidEmailSignup = false;
    } else {
      $(elem)
        .siblings("span")
        .html('<i class="text-success" data-lucide="circle-check"></i>');
      lucide.createIcons();
      isValidEmailSignup = true;
    }
  } else {
    $(elem).siblings("span").html("");
    isValidEmailSignup = false;
  }
}

function checkValidNameSignup(elem) {
  const name = $(elem).val();

  if (name != "") {
    $(elem)
      .siblings("span")
      .html('<i class="text-success" data-lucide="circle-check"></i>');
    lucide.createIcons();
    isValidNameSignup = true;
  } else {
    $(elem).siblings("span").html("");
    isValidNameSignup = false;
  }
}

function checkValidPhoneSignup(elem) {
  const phone = $(elem).val();

  if (phone != "") {
    if ($.isNumeric(phone) && phone.length == 10) {
      $(elem)
        .siblings("span")
        .html('<i class="text-success" data-lucide="circle-check"></i>');
      lucide.createIcons();
      isValidPhoneSignup = true;
    } else {
      $(elem)
        .siblings("span")
        .html('<i class="text-error" data-lucide="circle-alert"></i>');
      lucide.createIcons();
      isValidPhoneSignup = false;
    }
  } else {
    $(elem).siblings("span").html("");
    isValidPhoneSignup = false;
  }
}

$("#btnSignup").click(function () {
  if (
    isValidNameSignup == true &&
    isValidEmailSignup == true &&
    isValidPhoneSignup == true
  ) {
    const name = signupName.value;
    const email = singupEmail.value;
    const phone = signupPhone.value;
    $(this).html(
      '<span class="loading loading-spinner text-accent loading-md"></span>'
    );
    $(this).attr("disabled", true);
    SignupFB(name, email, phone);
  } else {
    signupAlertErrorContent.innerHTML = "Invalid details!";
    $("#signupAlertError")
      .removeClass("hidden")
      .fadeIn(500)
      .delay(2000)
      .fadeOut(500, function () {
        $(this).addClass("hidden");
      });
  }
});

//============================
// AJAX methods
//============================

function LoginFB(email, pass) {
  const data = { email: email, password: pass };
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/login");
  xhttp.onload = function () {
    const response = this.responseText;
    if (response == 1) {
      location.href = "/dashboard";
    } else {
      $("#btnLogin").html("Login");
      $("#btnLogin").attr("disabled", false);
      loginAlertContent.innerHTML = response;
      $("#loginAlert")
        .removeClass("hidden")
        .fadeIn(500)
        .delay(2000)
        .fadeOut(500, function () {
          $(this).addClass("hidden");
        });
    }
  };
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data));
}

function SignupFB(name, email, phone) {
  const data = { name: name, email: email, phone: phone };
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/login/createAccount");
  xhttp.onload = function () {
    const response = this.responseText;
    if (response == 1) {
      $("#btnSignup").html("Login");
      $("#btnSignup").attr("disabled", false);

      signupName.value = "";
      singupEmail.value = "";
      signupPhone.value = "";

      signupAlertSuccessContent.innerHTML = "Successfully signed up <strong>" + name + "</strong>. Please login to continue.";
      $("#signupAlertSuccess")
        .removeClass("hidden")
        .fadeIn(500)
        .delay(2000)
        .fadeOut(500, function () {
          $(this).addClass("hidden");
        });
    } else {
      $("#btnSignup").html("Login");
      $("#btnSignup").attr("disabled", false);
      signupAlertErrorContent.innerHTML = response;
      $("#signupAlertError")
        .removeClass("hidden")
        .fadeIn(500)
        .delay(2000)
        .fadeOut(500, function () {
          $(this).addClass("hidden");
        });
    }
  };
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data));
}
