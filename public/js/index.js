$("#email").on("keyup", function() {
  if($(this).val() == "")
    $("#signup").addClass("disabled");
  else
    $("#signup").removeClass("disabled");
});