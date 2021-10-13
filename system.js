let ladder_min = document.getElementById("minimum").value;
let ladder_max = document.getElementById("maximum").value;

let attempts = document.getElementById("attempts").value;

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
  }
}

function update_settings() {
  // MIN VALUE CHECK
  console.log("##### Verification #####");

  ladder_min = parseInt(document.getElementById("minimum").value);

  if (ladder_min) {
    settings_verification_laddermin = true;
    console.log("✅ Min value");
  } else {
    console.log("❌ Min value not defined");
  }

  // MAX VALUE CHECK
  ladder_max = parseInt(document.getElementById("maximum").value);
  if (ladder_max) {
    if (ladder_max < ladder_min) {
      console.log("❌ Max value can't be inferior than min value");
    } else {
      settings_verification_laddermax = true;
      console.log("✅ Max value");
    }
  }

  // ATTEMPTS VALUE CHECK
  attempts = parseInt(document.getElementById("attempts").value);
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

function lock_settings() {
  document.getElementsByClassName("settings")[0].classList.add("disabled");
}

function generate_number() {
  target = parseInt(Math.floor(Math.random() * ladder_max + ladder_min));
  console.log("Defined target : 🎯 " + target);
}

function check() {
  console.log("##### CHECK FUNCTION #####");

  let input_value = parseInt(document.getElementById("player-input").value);
  
  if (input_value) {
    console.log("Get value : " + input_value);
    console.log("Target : " + target);

    if (input_value < target) {
      console.log("plus grand");
    } else if (input_value > target) {
      console.log("plus petit");
    } else {
      success();
    }
  }
}
