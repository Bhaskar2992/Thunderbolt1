class Prospect {
  constructor({
    id,
    name,
    week,
    zone,
    city = "",
    chatting = false,
    socialMedia = false,
    stage1=false,
    stage1Week = "",
    stage2=false,
    stage2Week = "",
    info = false,
    infoWeek = "",
    infoResponse = "",
    reinfo = false,
    reinfoWeek = "",
    reinfoResponse = "",
    meetup = false,
    invi = false,
    inviWeek = "",
    inviResponse = "",
    plan = false,
    planWeek = "",
    planStatus = "",
    remarks = "",
  }) {
    this.id = id;
    this.name = name;
    this.week = week;
    this.zone = zone;
    this.city = city;
    this.chatting = chatting;
    this.socialMedia = socialMedia;
    this.stage1 = stage1;
    this.stage1Week = stage1Week;
    this.stage2 = stage2;
    this.stage2Week = stage2Week;
    this.info = info;
    this.infoWeek = infoWeek;
    this.infoResponse = infoResponse;
    this.reinfo = reinfo;
    this.reinfoWeek = reinfoWeek;
    this.reinfoResponse = reinfoResponse;
    this.meetup = meetup;
    this.invi = invi;
    this.inviWeek = inviWeek;
    this.inviResponse = inviResponse;
    this.plan = plan;
    this.planWeek = planWeek;
    this.planStatus = planStatus;
    this.remarks = remarks;
  }
}

var namelist = [];
var searchedNL = [];
var isFilter = false;

function generateSortWeekDropDownUI() {
  var weekDropDownUI = "";
  for (var i = 1; i <= 53; i++) {
    weekDropDownUI += "<option>" + i + "</option>";
  }
  $("#sortWeek").children("select").append(weekDropDownUI);
  $("#weekAddPerson").children("select").append(weekDropDownUI);
}

function clearSelectionUI() {
  $("#NLTable")
    .children("thead")
    .children("tr")
    .each(function () {
      $(this)
        .children("td")
        .each(function () {
          $(this).removeClass("searchedField");
        });
      $(this)
        .children("th")
        .each(function () {
          $(this).removeClass("searchedField");
        });
    });
}

function enableSelectionUI(value) {
  if (value == "Name") {
    $(".name").addClass("searchedField");
  }
  if (value == "Week Added") {
    $(".weekAdded").addClass("searchedField");
  }
  if (value == "City") {
    $(".city").addClass("searchedField");
  }
  if (value == "Zone") {
    $(".zone").addClass("searchedField");
  }
  if (value == "Chatting") {
    $(".chatting").addClass("searchedField");
  }
  if (value == "Social Media") {
    $(".socialMedia").addClass("searchedField");
  }
   if (value == "Stage 1") {
    $(".stage1").addClass("searchedField");
  }
   if (value == "Stage 2") {
    $(".stage2").addClass("searchedField");
  }
  if (value == "Info") {
    $(".info").addClass("searchedField");
  }
  if (value == "Reinfo") {
    $(".reinfo").addClass("searchedField");
  }
  if (value == "Meetup") {
    $(".meetup").addClass("searchedField");
  }
  if (value == "Invi") {
    $(".invi").addClass("searchedField");
  }
  if (value == "Plan") {
    $(".plan").addClass("searchedField");
  }
}

function filterValueChanged(elem) {
  generateNL(namelist);
  clearSelectionUI();
  enableSelectionUI($(elem).val());

  $(".option").each(function () {
    $(this).addClass("hidden");
  });

  if ($(elem).val() != "") {
    isFilter = true;
    $("#cancelFilterBtn").removeClass("hidden");
  } else {
    isFilter = false;
    $("#cancelFilterBtn").addClass("hidden");
  }

  if ($(elem).val() == "Name") {
    $("#sortName").parent().removeClass("hidden");
  } else if ($(elem).val() == "Week Added") {
    $("#sortWeek option").prop("selected", function () {
      // return defaultSelected property of the option
      return this.defaultSelected;
    });
    $("#sortWeek").parent().removeClass("hidden");
  } else if ($(elem).val() == "Zone") {
    $("#sortZone option").prop("selected", function () {
      // return defaultSelected property of the option
      return this.defaultSelected;
    });
    $("#sortZone").parent().removeClass("hidden");
  } else if ($(elem).val() == "City") {
    $("#sortCity").parent().removeClass("hidden");
  } else if (
    
    $(elem).val() == "Chatting" ||
    $(elem).val() == "Social Media" ||
    $(elem).val() == "Stage 1" ||
    $(elem).val() == "Stage 2" ||
    $(elem).val() == "Info" ||
    $(elem).val() == "Reinfo" ||
    $(elem).val() == "Meetup" ||
    $(elem).val() == "Invi" ||
    $(elem).val() == "Plan"
  ) {
    $("#sortDonePending option").prop("selected", function () {
      // return defaultSelected property of the option
      return this.defaultSelected;
    });
    $("#sortDonePending").parent().removeClass("hidden");
  }
}

$("#cancelFilterBtn").click(function () {
  isFilter = false;
  clearSelectionUI();
  $(".option").each(function () {
    $(this).addClass("hidden");
  });

  generateNL(namelist);

  $("#fliterDropDown").val("");
  $(this).addClass("hidden");
});

//Search methods

function searchByName(elem) {
  pageNumber.innerHTML = 1;
  const searchStr = $(elem).val();
  searchedNL = [];

  if (searchStr != "") {
    for (let i = 0; i < namelist.length; i++) {
      if (namelist[i].name.toLowerCase().match(searchStr.toLowerCase())) {
        searchedNL.push(namelist[i]);
      }
    }
  } else {
    searchedNL = namelist;
  }
  generateNL(searchedNL);
}

function searchByWeekAdded(elem) {
  pageNumber.innerHTML = 1;
  const weekAdded = $(elem).val();
  searchedNL = [];
  if (weekAdded != "") {
    for (let i = 0; i < namelist.length; i++) {
      if (namelist[i].week == weekAdded) {
        searchedNL.push(namelist[i]);
      }
    }
  } else {
    searchedNL = namelist;
  }

  generateNL(searchedNL);
}

function searchByZone(elem) {
  pageNumber.innerHTML = 1;
  const zone = $(elem).val();
  searchedNL = [];
  if (zone != "") {
    for (let i = 0; i < namelist.length; i++) {
      if (namelist[i].zone == zone) {
        searchedNL.push(namelist[i]);
      }
    }
  } else {
    searchedNL = namelist;
  }
  generateNL(searchedNL);
}

function searchByCity(elem) {
  pageNumber.innerHTML = 1;
  const searchStr = $(elem).val();
  searchedNL = [];

  if (searchStr != "") {
    for (let i = 0; i < namelist.length; i++) {
      if (namelist[i].city.toLowerCase().match(searchStr.toLowerCase())) {
        searchedNL.push(namelist[i]);
      }
    }
  } else {
    searchedNL = namelist;
  }
  generateNL(searchedNL);
}

//helper
function getTF(donePendingStr) {
  pageNumber.innerHTML = 1;
  if (donePendingStr == "Done") {
    return true;
  } else {
    return false;
  }
}

function searchByDonePending(elem) {
  pageNumber.innerHTML = 1;
  const donePending = $(elem).val();
  searchedNL = [];

  if (donePending != "") {
    if ($("#fliterDropDown").val() == "Chatting") {
      for (let i = 0; i < namelist.length; i++) {
        if (namelist[i].chatting == getTF(donePending)) {
          searchedNL.push(namelist[i]);
        }
      }
    }
    if ($("#fliterDropDown").val() == "Social Media") {
      for (let i = 0; i < namelist.length; i++) {
        if (namelist[i].socialMedia == getTF(donePending)) {
          searchedNL.push(namelist[i]);
        }
      }
    }
    if ($("#fliterDropDown").val() == "Stage 1") {
      for (let i = 0; i < namelist.length; i++) {
        if (namelist[i].stage1 == getTF(donePending)) {
          searchedNL.push(namelist[i]);
        }
      }
    }
    if ($("#fliterDropDown").val() == "Stage 2") {
      for (let i = 0; i < namelist.length; i++) {
        if (namelist[i].stage2 == getTF(donePending)) {
          searchedNL.push(namelist[i]);
        }
      }
    }
    if ($("#fliterDropDown").val() == "Info") {
      for (let i = 0; i < namelist.length; i++) {
        if (namelist[i].info == getTF(donePending)) {
          searchedNL.push(namelist[i]);
        }
      }
    }
    if ($("#fliterDropDown").val() == "Reinfo") {
      for (let i = 0; i < namelist.length; i++) {
        if (namelist[i].reinfo == getTF(donePending)) {
          searchedNL.push(namelist[i]);
        }
      }
    }
    if ($("#fliterDropDown").val() == "Meetup") {
      for (let i = 0; i < namelist.length; i++) {
        if (namelist[i].meetup == getTF(donePending)) {
          searchedNL.push(namelist[i]);
        }
      }
    }
    if ($("#fliterDropDown").val() == "Invi") {
      for (let i = 0; i < namelist.length; i++) {
        if (namelist[i].invi == getTF(donePending)) {
          searchedNL.push(namelist[i]);
        }
      }
    }
    if ($("#fliterDropDown").val() == "Plan") {
      for (let i = 0; i < namelist.length; i++) {
        if (namelist[i].plan == getTF(donePending)) {
          searchedNL.push(namelist[i]);
        }
      }
    }
  } else {
    searchedNL = namelist;
  }

  generateNL(searchedNL);
}

function generateRowNamelistUI(sl, prospect) {
  //
  $("#namelistTable").append(`
        						<tr>
							<td class="sl">${sl}</td>
							<th class="name_col z-[2] name"><input type="text" value="${
                prospect.name
              }" onchange="updateName(${prospect.id}, this)"/></th>
							<td class="weekAdded"><input type="text" placeholder="week" onchange="updateWeekAdded(${
                prospect.id
              }, this)" value="${prospect.week}" /></td>
							<td class="zone">
								<select onchange="updateZone(${prospect.id}, this)">
									<option ${prospect.zone == "Office" ? "selected" : ""}>Office</option>
									<option ${prospect.zone == "PG" ? "selected" : ""}>PG</option>
									<option ${prospect.zone == "School" ? "selected" : ""}>School</option>
									<option ${prospect.zone == "College" ? "selected" : ""}>College</option>
									<option ${prospect.zone == "Others" ? "selected" : ""}>Others</option>
								</select>
							</td>
							<td class="city"><input type="text" placeholder="city" onchange="updateCity(${
                prospect.id
              }, this)" value="${prospect.city}" /></td>
							<td class="chatting bl"> <input type="checkbox" class="checkbox" onchange="updateChatting(${
                prospect.id
              }, this)" ${prospect.chatting == true ? "checked" : ""}/></td>
							<td class="br socialMedia"> <input type="checkbox" class="checkbox" onchange="updateSocialMedia(${
                prospect.id
              }, this)" ${prospect.socialMedia == true ? "checked" : ""}/></td>
              <td class="bl stage1"> <input type="checkbox" class="checkbox" onchange="updateStage1(${
                prospect.id
              }, this)" ${prospect.stage1 == true ? "checked" : ""}/></td>
              <td class="br weekStage1 stage1"><input type="text" placeholder="week" onchange="updateStage1Week(${
                prospect.id
              }, this)" value="${prospect.stage1Week}"/></td>
              <td class="bl stage2"> <input type="checkbox" class="checkbox" onchange="updateStage2(${
                prospect.id
              }, this)" ${prospect.stage2 == true ? "checked" : ""}/></td>
              <td class="br weekStage2 stage2"><input type="text" placeholder="week" onchange="updateStage2Week(${
                prospect.id
              }, this)" value="${prospect.stage2Week}"/></td>

							<td class="bl info"> <input type="checkbox" class="checkbox" onchange="updateInfo(${
                prospect.id
              }, this)" ${prospect.info == true ? "checked" : ""}/></td>
							<td class="weekInfo info"><input type="text" placeholder="week" onchange="updateInfoWeek(${
                prospect.id
              }, this)" value="${prospect.infoWeek}"/></td>
							<td class="br info">
								<select class="response responseInfo" onchange="updateInfoResponse(${
                  prospect.id
                }, this)">
									<option></option>
									<option ${prospect.infoResponse == "A" ? "selected" : ""}>A</option>
									<option ${prospect.infoResponse == "B" ? "selected" : ""}>B</option>
									<option ${prospect.infoResponse == "C" ? "selected" : ""}>C</option>
								</select>
							</td>
							<td class="bl reinfo"> <input type="checkbox" class="checkbox" onchange="updateReInfo(${
                prospect.id
              }, this)" ${prospect.reinfo == true ? "checked" : ""}/></td>
							<td class="weekReinfo reinfo"><input type="text" placeholder="week" onchange="updateReInfoWeek(${
                prospect.id
              }, this)" value="${prospect.reinfoWeek}"/></td>
							<td class="br reinfo">
								<select class="response responseReinfo" onchange="updateReInfoResponse(${
                  prospect.id
                }, this)">
									<option></option>
									<option ${prospect.reinfoResponse == "A" ? "selected" : ""}>A</option>
									<option ${prospect.reinfoResponse == "B" ? "selected" : ""}>B</option>
									<option ${prospect.reinfoResponse == "C" ? "selected" : ""}>C</option>
								</select>
							</td>
							<td class="meetup"> <input type="checkbox" class="checkbox" onchange="updateMeetup(${
                prospect.id
              }, this)" ${prospect.meetup == true ? "checked" : ""}/></td>
							<td class="bl invi"> <input type="checkbox" class="checkbox" onchange="updateInvi(${
                prospect.id
              }, this)" ${prospect.invi == true ? "checked" : ""}/></td>
							<td class="weekInvite invi"><input type="text" placeholder="week" onchange="updateInviWeek(${
                prospect.id
              }, this)" value="${prospect.inviWeek}"/></td>
							<td class="br invi">
								<select class="responseInvite" onchange="updateInviResponse(${
                  prospect.id
                }, this)">
									<option></option>
									<option ${prospect.inviResponse == "Yes" ? "selected" : ""}>Yes</option>
									<option ${prospect.inviResponse == "No" ? "selected" : ""}>No</option>
								</select>
							</td>
							<td class="bl plan"> <input type="checkbox" class="checkbox" onchange="updatePlan(${
                prospect.id
              }, this)" ${prospect.plan == true ? "checked" : ""}/></td>
							<td class="weekPlan plan"><input type="text" placeholder="week" onchange="updatePlanWeek(${
                prospect.id
              }, this)" value="${prospect.planWeek}"/></td>
							<td class="br plan">
								<select class="planStatus" onchange="updatePlanStatus(${prospect.id}, this)">
									<option></option>
									<option ${prospect.planStatus == "CIP" ? "selected" : ""}>CIP</option>
									<option ${prospect.planStatus == "AOS" ? "selected" : ""}>AOS</option>
									<option ${prospect.planStatus == "LA2" ? "selected" : ""}>LA2</option>
									<option ${prospect.planStatus == "LA" ? "selected" : ""}>LA</option>
									<option ${prospect.planStatus == "MIA" ? "selected" : ""}>MIA</option>
									<option ${prospect.planStatus == "OOZ" ? "selected" : ""}>OOZ</option>
									<option ${
                    prospect.planStatus == "Onboarded" ? "selected" : ""
                  }>Onboarded</option>
								</select>
							</td>
							<td class="remarks"><input type="text" placeholder="remarks" onchange="updateRemarks(${
                prospect.id
              }, this)" value="${prospect.remarks}"/></td>
							<th>
								<div class="flex">
                <div class=""><button class="btn btn-soft btn-sm btn-accent p-0 h-7 w-7" onclick="transferProspectToNamelist(${
                    prospect.id
                  })"><i
												class="w-5 h-5" data-lucide="book-user"></i></button></div>
									<div class="ml-1"><button class="btn btn-soft btn-sm btn-info p-0 h-7 w-7" onclick="transferProspectToKIV(${
                    prospect.id
                  })"><i
												class="w-5 h-5" data-lucide="eye"></i></button>
									</div>
									
									<div class="ml-1"><button class="btn btn-soft btn-sm btn-error p-0 h-7 w-7" onclick="openDeleteModal(${
                    prospect.id
                  })"><i
												class="w-5 h-5" data-lucide="trash-2"></i></button></div>
								</div>


							</th>
						</tr>
        
        `);
  lucide.createIcons();
}

function clearFormAddPerson() {
  addPersonName.value = "";
  addPersonCity.value = "";
}

function setNLCount(count) {
  if (count > 0) {
    $("#pagination").removeClass("hidden");
  } else {
    $("#pagination").addClass("hidden");
  }
  nlCount.innerHTML = count;
  fromProspect.innerHTML = (parseInt(pageNumber.innerHTML) - 1) * 10 + 1;
  if (count > parseInt(pageNumber.innerHTML) * 10) {
    toProspect.innerHTML = parseInt(pageNumber.innerHTML) * 10;
  } else {
    toProspect.innerHTML = count;
  }
}

function goBack() {
  if (parseInt(pageNumber.innerHTML) > 1) {
    pageNumber.innerHTML = parseInt(pageNumber.innerHTML) - 1;
  }
  if(isFilter){
    generateNL(searchedNL);
  }else{
    generateNL(namelist);
  }
}

function goForward() {
  if (parseInt(pageNumber.innerHTML) < namelist.length / 10) {
    pageNumber.innerHTML = parseInt(pageNumber.innerHTML) + 1;
  }
  if(isFilter){
    generateNL(searchedNL);
  }else{
    generateNL(namelist);
  }
 
}

//Addition
function addPerson() {
  const name = addPersonName.value;
  const city = addPersonCity.value;
  const week = addPersonWeekAdded.value;
  const zone = addPersonZone.value;

  const prospect = new Prospect({
    id: Date.now(),
    name: name,
    week: week,
    zone: zone,
    city: city,
  });

  namelist.push(prospect);
  addProspectFB(prospect);

  clearFormAddPerson();

  generateNL(namelist);
}



//updation
function updateName(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].name = $(elem).val();
      updateProspectFB(id, "name", $(elem).val());
      break;
    }
  }
}
function updateWeekAdded(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].week = $(elem).val();
      updateProspectFB(id, "week", $(elem).val());
      break;
    }
  }
}
function updateZone(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].zone = $(elem).val();
      updateProspectFB(id, "zone", $(elem).val());
      break;
    }
  }
}
function updateCity(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].city = $(elem).val();
      updateProspectFB(id, "city", $(elem).val());
      break;
    }
  }
}
function updateChatting(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].chatting = $(elem).prop("checked");
      updateProspectFB(id, "chatting", $(elem).prop("checked"), "bool");
      break;
    }
  }
}
function updateSocialMedia(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].socialMedia = $(elem).prop("checked");
      updateProspectFB(id, "socialMedia", $(elem).prop("checked"), "bool");
      break;
    }
  }
}
function updateStage1(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].stage1 = $(elem).prop("checked");
      updateProspectFB(id, "stage1", $(elem).prop("checked"), "bool");
      break;
    }
  }
}
function updateStage1Week(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].stage1Week = $(elem).val();
      updateProspectFB(id, "stage1Week", $(elem).val());
      break;
    }
  }
}
function updateStage2(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].stage2 = $(elem).prop("checked");
      updateProspectFB(id, "stage2", $(elem).prop("checked"), "bool");
      break;
    }
  }
}
function updateStage2Week(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].stage2Week = $(elem).val();
      updateProspectFB(id, "stage2Week", $(elem).val());
      break;
    }
  }
}
function updateInfo(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].info = $(elem).prop("checked");
      updateProspectFB(id, "info", $(elem).prop("checked"), "bool");
      break;
    }
  }
}
function updateInfoWeek(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].infoWeek = $(elem).val();
      updateProspectFB(id, "infoWeek", $(elem).val());
      break;
    }
  }
}
function updateInfoResponse(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].infoResponse = $(elem).val();
      updateProspectFB(id, "infoResponse", $(elem).val());
      break;
    }
  }
}
function updateReInfo(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].reinfo = $(elem).prop("checked");
      updateProspectFB(id, "reinfo", $(elem).prop("checked"), "bool");
      break;
    }
  }
}
function updateReInfoWeek(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].reinfoWeek = $(elem).val();
      updateProspectFB(id, "reinfoWeek", $(elem).val());
      break;
    }
  }
}
function updateReInfoResponse(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].reinfoResponse = $(elem).val();
      updateProspectFB(id, "reinfoResponse", $(elem).val());
      break;
    }
  }
}
function updateMeetup(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].meetup = $(elem).prop("checked");
      updateProspectFB(id, "meetup", $(elem).prop("checked"), "bool");
      break;
    }
  }
}
function updateInvi(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].invi = $(elem).prop("checked");
      updateProspectFB(id, "invi", $(elem).prop("checked"), "bool");
      break;
    }
  }
}
function updateInviWeek(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].inviWeek = $(elem).val();
      updateProspectFB(id, "inviWeek", $(elem).val());
      break;
    }
  }
}
function updateInviResponse(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].inviResponse = $(elem).val();
      updateProspectFB(id, "inviResponse", $(elem).val());
      break;
    }
  }
}
function updatePlan(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].plan = $(elem).prop("checked");
      updateProspectFB(id, "plan", $(elem).prop("checked"), "bool");
      break;
    }
  }
}
function updatePlanWeek(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].planWeek = $(elem).val();
      updateProspectFB(id, "planWeek", $(elem).val());
      break;
    }
  }
}
function updatePlanStatus(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].planStatus = $(elem).val();
      updateProspectFB(id, "planStatus", $(elem).val());
      break;
    }
  }
}
function updateRemarks(id, elem) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist[i].remarks = $(elem).val();
      updateProspectFB(id, "remarks", $(elem).val());
      break;
    }
  }
}

//Actions
function removeProspect(id) {
  const name = getName(id);
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist.splice(i, 1);
      break;
    }
  }
  removeProspectFB(id, name);
  generateNL(namelist);
}
function transferProspectToKIV(id) {
  const name = getName(id);
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist.splice(i, 1);
      break;
    }
  }
  transferProspectToKIVFB(id, name);
  generateNL(namelist);
  //Add to KIV list
}

function transferProspectToNamelist(id) {
  const name = getName(id);
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      namelist.splice(i, 1);
      break;
    }
  }
  transferProspectToNamelistFB(id, name);
  generateNL(namelist);
  //Add to LL list
}

//Modals

function openDeleteModal(id){
  deleteModalProsName.innerHTML = getName(id);
  deleteModalProsID.innerHTML = id;
  deleteProspectModal.showModal();
}

$("#deleteProspectBtn").click(function(){
  removeProspect(deleteModalProsID.innerHTML);
});

//ajax methods
function addProspectFB(prospect) {
  const data = { prospect: prospect };
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/latelatif/addProspect");
  xhttp.onload = function () {
    showAlert(this.responseText);
  };
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data));
}

function showAlert(content, type = "success") {
  $(".alert")
    .removeClass("alert-error")
    .removeClass("alert-info")
    .removeClass("alert-primary")
    .removeClass("alert-success")
    .addClass("alert-" + type)
    .removeClass("hidden");
  alertContent.innerHTML = content;
}

function getNLData() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/latelatif/getData");
  xhttp.onload = function () {
    const response = JSON.parse(this.responseText);
    namelist = response;
    generateNL(namelist);
    showAlert("Latelatif List loaded");
    $("#fliterDropDown").attr("disabled", false);
    $(".loading").addClass("hidden");
    $("#addProspectModalBtn").attr("disabled", false);
  };
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send();
}

function removeProspectFB(id, name) {
  const data = { id: id };
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/latelatif/removeProspect");
  xhttp.onload = function () {
    showAlert(name + " removed successfully!", "error");
  };
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data));
}

function transferProspectToKIVFB(id, name) {
  const data = { id: id };
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/latelatif/transferToKIV");
  xhttp.onload = function () {
    showAlert(name + " transferred to KIV List successfully!", "info");
  };
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data));
}

function transferProspectToNamelistFB(id, name) {
  const data = { id: id };
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/latelatif/transferToNamelist");
  xhttp.onload = function () {
    showAlert(name + " transferred to Working List successfully!", "info");
  };
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data));
}

function getName(id) {
  for (let i = 0; i < namelist.length; i++) {
    if (namelist[i].id == id) {
      return namelist[i].name;
    }
  }
}

function updateProspectFB(id, fieldName, value, type = "str") {
  const data = { id: id, fieldName: fieldName, value: value, type: type };
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/latelatif/updateProspect");
  xhttp.onload = function () {
    showAlert(getName(id) + " updated successfully!");
  };
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data));
}

//loading
function loadNameListUI(namelist, count) {
  $("#namelistTable").empty();
  var sl = 1 + (parseInt(pageNumber.innerHTML) - 1) * 10;
  for (let i = 0; i < namelist.length; i++) {
    generateRowNamelistUI(sl, namelist[i]);
    sl++;
  }
  setNLCount(count);
}

function generateNL(namelist) {
  if (namelist.length > parseInt(pageNumber.innerHTML) * 10) {
    loadNameListUI(
      namelist.slice(
        (parseInt(pageNumber.innerHTML) - 1) * 10,
        parseInt(pageNumber.innerHTML) * 10
      ),
      namelist.length
    );
  } else {
    loadNameListUI(
      namelist.slice(
        (parseInt(pageNumber.innerHTML) - 1) * 10,
        namelist.length
      ),
      namelist.length
    );
  }

  if(isFilter){
    enableSelectionUI($("#fliterDropDown").val());
  }
}

generateSortWeekDropDownUI();

//loadnamelist
getNLData();
