var formData = {
  name: "",
  phoneNumber: 0,
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

$("#name").on("keyup", function() {
  formData['name'] = $.trim($(this).val());
  checkFormData();
});
$("#phoneNumber").on("keyup", function() {
  // console.log($(this).val());
  if(!$(this).val())
    formData['phoneNumber'] = 0;
  else
    formData['phoneNumber'] = $.trim($(this).val());
  checkFormData();
});
$("#email").on("keyup", function() {
  formData['email'] = $.trim($(this).val());
  checkFormData();
});
