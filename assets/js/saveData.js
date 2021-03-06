var validated = false;
var $sections = $(".form-section");
var last_count;
var token = null;
var checkStatus = false;
var otp_ajax_url = "http://devshare.noesis.tech/rest";
var token = null;
var otp_verified = false;
var storeData = {
  data: []
};


function navigateTo(index) {
  // Mark the current section with the class 'current'
  $sections
    .removeClass("current")
    .eq(index)
    .addClass("current");
  // Show only the navigation buttons that make sense for the current section:
  $(".form-navigation .previous").toggle(index > 0);
  var atTheEnd = index >= $sections.length - 1;
  $(".form-navigation .next").toggle(!atTheEnd);
  $(".form-navigation [type=submit]").toggle(atTheEnd);
}

function curIndex() {
  // Return the current index by looking at which section has the class 'current'
  return $sections.index($sections.filter(".current"));
}

// Previous button is easy, just go back
$(".form-navigation .previous").click(function() {
  navigateTo(curIndex() - 1);
});

// Next button goes forward iff current block validates
$(".form-navigation .next").click(function() {
  $sections = $(".form-section");
  $(".demo-form")
    .parsley()
    .whenValidate({
      group: "block-" + curIndex()
    })
    .done(function() {
      navigateTo(curIndex() + 1);
      validated = true;
    });
});

// Prepare sections by setting the `data-parsley-group` attribute to 'block-0', 'block-1', etc.
$sections.each(function(index, section) {
  $(section)
    .find(":input")
    .attr("data-parsley-group", "block-" + index);
});
navigateTo(0); 

$.getJSON("./assets/json/new.json", resp => {
  respdata = resp;
  $("#registrationForm").on("click", ".sk-beta-submit", function(e) {
    e.preventDefault();
    if (!$("input").hasClass("parsley-error")) {
          $(".otp_success").css("display", "none");
          $(".otp_error").css("display", "none");
          $("#otp").val("");
          checkStatus = true;
          window.location = "thankyou.html";

          // if(checkStatus){
          //   var ans_obj = {};
          //   ans_obj.element = jQuery(".sk-beta-submit");
          //   ans_obj.next = jQuery(".sk-beta-submit").data("next");
          //   ans_obj.current_section = jQuery(".sk-beta-submit").data("section");
          //   ans_obj.current_index = jQuery(".sk-beta-submit").data("index");
          //   ans_obj.data = jQuery(".sk-beta-submit").data();

          //   storeDataOnNext(ans_obj);
          //   respdata.is_lead_user = true;
          //   // feedbackObj = {};
          //   // storeData.data = [];
          //   // feedbackObj["name"] = $("input[name=name]").val();
          //   // feedbackObj["mobile"] = $("input[name=phone]").val();
          //   // feedbackObj["email"] = $("input[name=email]").val();
          //   // feedbackObj["pincode"] = $("input[name=pincode]").val();

          //   // // storeData.data.push(feedbackObj);

          //   // for(let i = 0; i < common_question.personal_data.length; i++){
          //   //   common_question.personal_data[i].user_answer = feedbackObj
          //   // }
          // }
      }
  });
});

function sendData(data) {
  if ((token == "") | (token == null)) {
    tryAgain("Invalid Request");
  }
  $.ajax({
    url: otp_ajax_url,
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    headers: {
      Authorization: "Bearer " + token
    },
    // dataType: 'json',
    async: false,
    success: function(data, textStatus, jqXHR) {
      data = $.parseJSON(data);
      //console.log("data check2",data.last_count);
      if (data.last_count) {
        last_count = data.last_count;
        //console.log(last_count, 'count2');
        //  $(".user_count").innerHTML(last_count);
        localStorage.setItem("uid", last_count);
      }
      if (status == 400) {
        tryAgain(data.message);
      }
      // $('#verifyModal').modal('toggle');
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    }
  });
}

function sendOtp() {
  var mobile = $("input[name=phone]").val();
  var email = $("input[name=email]").val();
  var name = $("input[name=name]").val();
  $(".otp_success").css("display", "none");
  $(".otp_error").css("display", "none");
  $("#otp").val("");
  var tested = false;

  $.ajax({
    url: otp_ajax_url,
    type: "POST",
    data: JSON.stringify({ mobile: mobile, email: email, name: name }),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    headers: {
      Authorization: "Basic"
    },
    // dataType: 'json',
    async: false,
    success: function(data, textStatus, jqXHR) {
      status = jqXHR.getResponseHeader("Statuscode");
      if (data) {
        if (status == 200) {
          $("#verifyModal").modal("toggle");
          otp_verified = true;
        } else if (status == 400 || status == 201) {
          // please try again message
          tryAgain(data.message);
          tested = false;
          otp_verified = false;
        }
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    }
  });
  return otp_verified;
}

$("#otp_submit").click(function() {
  var otpVerified = otpVerification();
  if (status != 400) {
    if (otpVerified) {
      sendData(respdata);
      $(".otp_error").css("display", "none");
      checkStatus = true;
      $(".otp_success").css("display", "block");
      setTimeout(function() {
        $("#verifyModal").modal("toggle");
      }, 1000);
      setTimeout(function() {
        window.location = "thankyou.html";
      }, 1200);
    } else {
      $(".otp_error").css("display", "block");
      $("#otp").val("");
    }
  }
});

function clearField() {
  $("#otp").val("");
}
function otpVerification() {
  var otp_val = $("input[name=otp]").val();
  var mobile = $("input[name=phone]").val();
  var email = $("input[name=email]").val();
  var tested = false;
  $.ajax({
    url: otp_ajax_url,
    type: "POST",
    data: JSON.stringify({ "mobile": mobile, "otp": otp_val, "email": email }),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    headers: {
      Authorization: "Basic "
    },
    // dataType: 'json',
    async: false,
    success: function(data, textStatus, jqXHR) {
      status = jqXHR.getResponseHeader("Statuscode");
      if (data) {
        if (status == 200) {
          // show next page
          tested = true;
          token = data.token;
          existingData = data.existing_data;
        } else if (status == 400) {
          // otp expired please try again ..please try again message
          setTimeout(function() {
            $("#verifyModal").modal("toggle");
          }, 1000);
          $(".otp_error").css("display", "none");
          $(".otp_success").css("display", "block");
          otpExpired(data.message);
          tested = false;
        } else if (status == 201) {
          //show enter valid otpc message with popup
          $(".otp_error").css("display", "block");
          tested = false;
        }
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    }
  });
  return tested;
}

function storeDataOnNext(ans_obj) {
  var selected_answer = null;
  if (ans_obj.element.closest("#form_01").find("input").length > 0) {
    //Save multiple answers
    var ans_set = ans_obj.element.closest("#form_01").find("input");
    var length = ans_set.length;
    for (var x = 0; x < length; x++) {
      var resp_index = respdata[ans_obj.current_section][ans_obj.current_index]
        .map(function(o) {
          return o.key;
        })
        .indexOf(ans_set[x].name);
      respdata[ans_obj.current_section][ans_obj.current_index][
        resp_index
      ].user_answer =
        ans_set[x].value;
      if (
        respdata[ans_obj.current_section][ans_obj.current_index][resp_index]
          .user_answer == ""
      ) {
        null_value += 1;
      }
      if (
        respdata[ans_obj.current_section][ans_obj.current_index][resp_index]
          .user_answer != ""
      ) {
        respdata[ans_obj.current_section].section_1_attempted = true;
      } else {
        respdata[ans_obj.current_section].section_1_attempted = false;
      }
    }
  }
}

function tryAgain(mesg) {
  $.alert({
    content: mesg
  });
}

function otpExpired(mesg) {
  setTimeout(function() {
    $.alert({
      content: mesg
    });
  }, 1500);
}
