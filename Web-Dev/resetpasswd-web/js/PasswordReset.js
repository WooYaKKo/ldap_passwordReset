(function ($) {
  "use strict";

  const url_base = "https://ad.inpark.kr:9443/api/resetpasswd";

  /*==================================================================
    [ Focus input ]*/
  $(".input100").each(function () {
    $(this).on("blur", function () {
      if ($(this).val().trim() != "") {
        $(this).addClass("has-val");
      } else {
        $(this).removeClass("has-val");
      }
    });
  });

  //  Validate
  var input = $(".validate-input .input100");

  var setMessage = function (s) {
    $("span[name=message]").text(s);
  };

  var resetPassword = function (id, email) {
    var url = url_base + "/" + id.val();

    var param = {
      email: email.val(),
      url: url_base,
    };

    $.ajax({
      url: url,
      type: "DELETE",
      dataType: "json",
      data: JSON.stringify(param),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        if (data.retCode == "200") {
          setMessage("이메일을 전송했습니다");
        } else {
          setMessage("잘못된 이메일입니다 이메일을 확인해 주세요");
        }
      },
    });
  };

  // $('.login100-form-btn').on('click',function(){
  $(".validate-form").on("submit", function (e) {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    if (check) {
      var id = $("input[name=id]");
      var email = $("input[name=email]");

      resetPassword(id, email);
    }

    e.preventDefault();
    e.stopPropagation();
    return check;
  });

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if ($(input).val().trim() == "") {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }

  /*==================================================================
    [ Show pass ]*/
  var showPass = 0;
  $(".btn-show-pass").on("click", function () {
    alert(0);
    if (showPass == 0) {
      $(this).next("input").attr("type", "text");
      $(this).find("i").removeClass("zmdi-eye");
      $(this).find("i").addClass("zmdi-eye-off");
      showPass = 1;
    } else {
      $(this).next("input").attr("type", "password");
      $(this).find("i").addClass("zmdi-eye");
      $(this).find("i").removeClass("zmdi-eye-off");
      showPass = 0;
    }
  });
})(jQuery);
