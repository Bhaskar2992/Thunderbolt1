var isCurPassVerified = false;
var isNewPassLegit = false;
var isConfPassMatched = false;

$("#saveChangeAvatar").click(function () {
  $("#avatar_navbar").attr(
    "src",
    $("#changeAvatarModal_avatar_selected").attr("src")
  );
  $("#avatar_profile").attr(
    "src",
    $("#changeAvatarModal_avatar_selected").attr("src")
  );
  $("#avatar_dropdown").attr(
    "src",
    $("#changeAvatarModal_avatar_selected").attr("src")
  );

  var srcStr = $("#changeAvatarModal_avatar_selected").attr("src");
  selectedAvatarId = srcStr.substring(
    srcStr.lastIndexOf("/") + 1,
    srcStr.lastIndexOf(".")
  );

  saveAvatarFB(selectedAvatarId);

  $("#avatarChangeAlert").removeClass("hidden");
  $("#avatarChangeAlert")
    .fadeIn(500)
    .delay(2000)
    .fadeOut(500, function () {
      $(this).addClass("hidden");
    });
});

$("#openChangeAvatarModalBtn").click(function () {
  $("#changeAvatarModal_avatar_selected").attr(
    "src",
    $("#avatar_profile").attr("src")
  );
  loadAvatarListUI(selectedAvatarId);
  changeAvatarModal.showModal();
});

$("#editProfileBtn").click(function () {
  const name = $("#profileName").html().trim();
  const email = $("#profileEmail").html().trim();
  const phone = $("#profilePhone").html().trim();

  $("#updateProfileName").val(name);
  $("#updateProfileEmail").val(email);
  $("#updateProfilePhone").val(phone);

  updateProfileModal.showModal();
});

$("#updateProfileBtn").click(function () {
  const name = $("#updateProfileName").val();
  const phone = $("#updateProfilePhone").val();
  updateProfileFB(name, phone);
});

$(document).on("click", ".avatar_thunder", function (e) {
  let avatarId = $(this).attr("src");
  $("#changeAvatarModal_avatar_selected").attr("src", avatarId);

  $("#avatarList")
    .children()
    .each(function () {
      $(this)
        .children(".avatar_thunder")
        .removeClass("border-4 border-primary");
    });
  $(this).addClass("border-4 border-primary");
});

//password

function checkCurrPass(elem) {
  const pass = $(elem).val();
  if (pass != "") {
    $("#currPassVerifiedSpan").html(
      '<span class="loading loading-spinner loading-xs"></span>'
    );
    checkPassFB(pass);
  } else {
    $("#currPassVerifiedSpan").html("");
    isCurPassVerified = false;
  }
}

function checkIsLegit(elem) {
  const pass = $(elem).val();

  if (pass != "") {
    if (pass.length < 6) {
      $("#newPassVerifiedSpan").html(
        '<i class="text-error" data-lucide="circle-alert"></i>'
      );
      isNewPassLegit = false;
    } else {
      $("#newPassVerifiedSpan").html(
        '<i class="text-success" data-lucide="circle-check"></i>'
      );
      isNewPassLegit = true;
    }
    lucide.createIcons();
  } else {
    $("#newPassVerifiedSpan").html("");
    isNewPassLegit = false;
  }
  checkIsAllOK();
}

function checkIsMatchingConfPass(elem) {
  const pass = $(elem).val();

  if (pass != "") {
    if (pass != newPass.value) {
      $("#confPassVerifiedSpan").html(
        '<i class="text-error" data-lucide="circle-alert"></i>'
      );
      isConfPassMatched = false;
    } else {
      $("#confPassVerifiedSpan").html(
        '<i class="text-success" data-lucide="circle-check"></i>'
      );
      isConfPassMatched = true;
    }
    lucide.createIcons();
  } else {
    $("#confPassVerifiedSpan").html("");
    isConfPassMatched = false;
  }
  checkIsAllOK();
}

function checkIsAllOK() {
  if (
    isCurPassVerified == true &&
    isNewPassLegit == true &&
    isConfPassMatched == true
  ) {
    $("#changePassBtn").attr("disabled", false);
  } else {
    $("#changePassBtn").attr("disabled", true);
  }
}

$("#changePassBtn").click(function () {
  const pass = newPass.value;
  $("#changePassBtn").html(
    '<span class="loading loading-spinner text-primary loading-md"></span>'
  );
  $("#changePassBtn").attr("disabled", true);
  changePassFB(pass);
});

//Ajax methods

function checkPassFB(pass) {
  const data = { pass: pass };
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/user/checkPass");
  xhttp.onload = function () {
    const response = this.responseText;
    if (response == "true") {
      isCurPassVerified = true;
      $("#currPassVerifiedSpan").html(
        '<i class="text-success" data-lucide="circle-check"></i>'
      );
    } else {
      isCurPassVerified = false;
      $("#currPassVerifiedSpan").html(
        '<i class="text-error" data-lucide="circle-alert"></i>'
      );
    }
    checkIsAllOK();

    lucide.createIcons();
  };
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data));
}

function changePassFB(pass) {
  const data = { pass: pass };
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/user/changePass");
  xhttp.onload = function () {
    $("#changePassBtn").html("Change password");
    $("#changePassBtn").attr("disabled", false);
    if (this.responseText == "success") {
      $("#passUpdateSuccessAlert").removeClass("hidden");
      $("#passUpdateSuccessAlert")
        .fadeIn(500)
        .delay(2000)
        .fadeOut(500, function () {
          $(this).addClass("hidden");
        });
    } else {
      const err = JSON.parse(this.responseText);

      errAlertTextProfile.innerHTML = "Error occurred : " + err.code;
      $("#passUpdateErrorAlert").removeClass("hidden");
      $("#passUpdateErrorAlert")
        .fadeIn(500)
        .delay(2000)
        .fadeOut(500, function () {
          $(this).addClass("hidden");
        });
    }

    currPass.value = "";
    newPass.value = "";
    confPass.value = "";
  };
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data));
}

function saveAvatarFB(avID) {
  const data = { avID: avID };
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/user/setAvatarId");
  xhttp.onload = function () {};
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data));
}

function updateProfileFB(name, phone) {
  const data = { name: name, phone: phone };
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/user/updateUser");
  xhttp.onload = function () {
    if (this.responseText == "success") {
      $("#profileName").html(name);
      $("#navMenuName").html(name);
      $("#profilePhone").html(phone);
      $("#profileUpdateSuccessAlert").removeClass("hidden");
      $("#profileUpdateSuccessAlert")
        .fadeIn(500)
        .delay(2000)
        .fadeOut(500, function () {
          $(this).addClass("hidden");
        });
    } else {
      const err = JSON.parse(this.responseText);

      errAlertTextProfile.innerHTML = "Error occurred : " + err.code;
      $("#profileUpdateErrorAlert").removeClass("hidden");
      $("#profileUpdateErrorAlert")
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

function loadAvatarListUI(selectedAvatarId) {
  $("#avatarList").empty();
  for (let i = 1; i <= 17; i++) {
    $("#avatarList").append(`
            <div class="h-20 w-20 shrink-0 mask mask-circle">
                <img class="avatar_thunder ${
                  i == selectedAvatarId ? "border-4 border-primary" : ""
                }" src="images/avatars/${i}.avif" />
            </div>
            `);
  }
}

loadAvatarListUI(selectedAvatarId);
