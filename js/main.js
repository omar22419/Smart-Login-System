var data = [];
var signUpName = document.getElementById("SignUpNameId");
var signUpEmail = document.getElementById("SignUpEmailId");
var signUpPassword = document.getElementById("SignUpPasswordId");

var loginEmail = document.getElementById("loginEmailId");
var loginPassword = document.getElementById("loginPasswordId");

var signUpStatus = document.getElementById("SignUpStatus");
var signInStatus = document.getElementById("status");

if(localStorage.getItem('data')!==null){
    data = JSON.parse(localStorage.getItem("data"));
}


function signUp() {
  if (
    validation(signUpName, "signUpName") &&
    validation(signUpEmail, "signUpEmail") &&
    validation(signUpPassword, "signUpPassword")
  ) {
    console.log(6)
    var status = 1;
    var person = {
      name: signUpName.value,
      email: signUpEmail.value,
      password: signUpPassword.value,
    };
     for (var i = 0; i < data.length; i++) {
        if (data[i].name === person.name && data[i].email === person.email) {
          status = 0;
          break;
        }
      }
      console.log(status);
      if (status === 1) {
        data.push(person);
        localStorage = localStorage.setItem("data", JSON.stringify(data));
        signUpStatus.innerHTML = "Success";
        signUpStatus.classList.remove("text-danger");
        signUpStatus.classList.add("text-success");
        signUpStatus.classList.remove("d-none");
      } else {
        signUpStatus.innerHTML = "email alrady exists";
        signUpStatus.classList.add("text-danger");
        signUpStatus.classList.remove("text-success");
        signUpStatus.classList.remove("d-none");
      }
  } 
}

function login() {
  var email = loginEmail.value;
  var password = loginPassword.value;
  for (var i = 0; i < data.length; i++) {
      if (data[i].email.toLowerCase() === email.toLowerCase()) {
          if (data[i].password.toLowerCase() === password.toLowerCase()) {
              signInStatus.innerHTML=`Welcome ${data[i].name}`;
              signInStatus.classList.remove('d-none');
              localStorage.setItem("welcomeName", data[i].name);
              open('welcome.html',"_self")
            } else {
                signInStatus.innerHTML="Enter the valid password";
            }
        } else {
            signInStatus.innerHTML="Enter the valid Email and Password";
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {
  var name = localStorage.getItem("welcomeName");
  var welcomeElement = document.getElementById("welcome");

  if (name && welcomeElement) {
    welcomeElement.innerText = "Welcome " + name;
  } else {
    welcomeElement.innerText = "Welcome Guest";
  }
});


var validRegex = {
  signUpName: /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/,
  signUpEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  signUpPassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
};

function validation(value, index) {
  var regex = validRegex[`${index}`];
  if (regex.test(value.value)) {
    document.getElementById(`${index}`).classList.add("d-none");
    return true;
} else {
    document.getElementById(`${index}`).classList.remove("d-none");
  }
}

signUpName.addEventListener("input", function () {
  validation(signUpName, "signUpName");
});

signUpEmail.addEventListener("input", function () {
  validation(signUpEmail, "signUpEmail");
});

signUpPassword.addEventListener("input", function () {
  validation(signUpPassword, "signUpPassword");
});

function logout(){
    localStorage.removeItem(localStorage.getItem("welcomeName"));
    location.href='../index.html';
}