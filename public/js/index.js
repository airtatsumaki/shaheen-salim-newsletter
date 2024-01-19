var formData = {
  fname: "",
  lname: "",
  phoneNumber: "",
  email: ""
};

function checkFormData(){
  let result = true;
  for (const key in formData) {
    if (!formData[key]){
      result = false;
      break;
    }
  }
  console.log(formData);
  if(result)
    $("#signup").removeClass("disabled");
  else
    $("#signup").addClass("disabled");
}

$("#fname").on("keyup", function() {
  formData['fname'] = $.trim($(this).val());
  checkFormData();
});
$("#lname").on("keyup", function() {
  formData['lname'] = $.trim($(this).val());
  checkFormData();
});
$("#phoneNumber").on("keyup", function() {
  formData['phoneNumber'] = $.trim($(this).val());
  checkFormData();
});
$("#email").on("keyup", function() {
  formData['email'] = $.trim($(this).val());
  checkFormData();
});
