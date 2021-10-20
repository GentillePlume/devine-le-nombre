let ladder_min = document.getElementById("settings__minimum").value;
let ladder_max = document.getElementById("settings__maximum").value;

let attempts = document.getElementById("settings__attempts").value;

let target;
let settings_verification = false;
let settings_verification_laddermin = false;
let settings_verification_laddermax = false;
let settings_verification_attempts = false;

function launch() {
  update_settings();

  if (settings_verification) {
    lock_settings();
    generate_number();
    generate_rules();
    document.getElementById('play').style.display = "flex";
  }
}

function generate_rules() {
  document.getElementById("rules").style.display = "flex";
  document.getElementById("rules__minimum").innerHTML = ladder_min;
  document.getElementById("rules__maximum").innerHTML = ladder_max;

  for(i = 0; i < attempts; i++){
    console.log('added attemp');
    document.getElementById('rules__list').appendChild(document.createElement("div"));
  }
}

function update_settings() {
  // MIN VALUE CHECK
  console.log("##### Verification #####");

  ladder_min = parseInt(document.getElementById("settings__minimum").value);

  if (ladder_min) {
    settings_verification_laddermin = true;
    console.log("✅ Min value");
  } else {
    console.log("❌ Min value not defined");
  }

  // MAX VALUE CHECK
  ladder_max = parseInt(document.getElementById("settings__maximum").value);
  if (ladder_max) {
    if (ladder_max < ladder_min) {
      console.log("❌ Max value can't be inferior than min value");
    } else {
      settings_verification_laddermax = true;
      console.log("✅ Max value");
    }
  }

  // ATTEMPTS VALUE CHECK
  attempts = parseInt(document.getElementById("settings__attempts").value);
  if (attempts) {
    settings_verification_attempts = true;
    console.log("✅ Attempts value");
  } else {
    console.log("❌ Min value not defined");
  }

  if (
    settings_verification_laddermin &&
    settings_verification_laddermax &&
    settings_verification_attempts
  ) {
    settings_verification = true;
    console.log("✅ settings updated");
    console.log(
      "between ⬇ " +
        ladder_min +
        " and ⬆ " +
        ladder_max +
        " with " +
        attempts +
        " attempts"
    );
  } else {
    settings_verification = false;
    console.log("❌ settings not completed");
  }
}

function removeAttempt(){
  console.log("remove the attempt " + attempts);
  $("#rules__list div")[attempts - 1].classList.add("used");
  attempts--;
  console.log(attempts + " attempts remaining");
}

function lock_settings() {
  // document.getElementsByClassName("settings")[0].classList.add("disabled");
  document.getElementsByClassName("settings")[0].style.display = "none";
}

function generate_number() {
  target = parseInt(Math.floor(Math.random() * ladder_max + ladder_min));
  console.log("Defined target : 🎯 " + target);
}

function check() {
  console.log("##### CHECK FUNCTION #####");

  let input_value = parseInt(document.getElementById("player-input").value);
  
  if(attempts > 1){
    if (input_value) {
      console.log("Get value : " + input_value);
      console.log("Target : " + target);
  
      if (input_value < target) {
        console.log("plus grand");
        message("plus grand");
        removeAttempt();
      } else if (input_value > target) {
        console.log("plus petit");
        message("plus petit");
        removeAttempt();
      } else {
        victory();
      }
    }
  } else{
    console.log("defeat ! " + attempts + " remaining")
    defeat();
  }
  
}

function message(message){
  document.getElementById('message').innerHTML = message;
}

function victory(){
  document.getElementById('victory').style.display = "flex";
}
function defeat(){
  document.getElementById('defeat').style.display = "flex";
}
function restart(){
  window.location.reload(true);
}
