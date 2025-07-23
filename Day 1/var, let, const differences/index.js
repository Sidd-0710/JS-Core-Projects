document.getElementById("Dark").addEventListener("click", function () {
    document.querySelector("body").style.backgroundColor = "GREY "
})

document.getElementById("Light").addEventListener("click", function () {
    document.querySelector("body").style.backgroundColor = "White "
})




document.getElementById("Submit_btn").addEventListener("click", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

   function validateEmail() {
  const email = document.getElementById("email").value;
  const error = document.getElementById("error");
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!pattern.test(email)) {
    error.textContent = "Invalid email address ❌";
    error.style.color = "red";
    return false;
  }

  error.textContent = "Valid email ✅";
  error.style.color = "green";
  return true;
}

     if (!validateEmail()) {
    return; // Stop if email is invalid
  }


    let birthday = document.getElementById("birthday").value;
    let phone = document.getElementById("phone").value;

    if (phone.length != 10) {
        let errMsg = "Plss Enter The 10 Digit Number ❌"
        document.getElementById("contactErr").innerHTML = errMsg
        document.getElementById("contactErr").style.color = "red"
    } else {
        document.getElementById("contactErr").innerHTML = "You are Good To GO✅"
        document.getElementById("contactErr").style.color = "green"
    }



    const gender = document.querySelector('input[name="gender"]:checked')?.value || "Not selected";

    // Collecting subjects
    const subjects = [];
    document.querySelectorAll('input[name="subjects[]"]:checked').forEach(function (checkbox) {
        subjects.push(checkbox.value);
    })



    let StudentDetails = []
    let std = {
        "name": name,
        "email": email,
        "birthday": birthday,
        "phone": phone,
        "gender": gender,
        "subjects": subjects
    }

    console.log(std);
    StudentDetails.push(std);
    console.log(`Details of Students - ${StudentDetails}`);

    // // Log collected data
    // console.log("Form Data:");
    // console.log("Name:", name);
    // console.log("Email:", email);
    // console.log("Birthday:", birthday);
    // console.log("Gender:", gender);
    // console.log("Phone:", phone);
    // console.log("Subjects:", subjects);
});
