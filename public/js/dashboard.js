



//============================
// AJAX methods
//============================


function loadCount(){
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/dashboard/getCounts");
  xhttp.onload = function () {
    const response = JSON.parse(this.responseText);
    countNamelist.innerHTML = response.countNL;
    countKIV.innerHTML = response.countKIV;
    countLL.innerHTML = response.countLL;
  };
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send();
}

loadCount();
