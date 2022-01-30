let ladder_min;
let ladder_max;

let attempts;

let target;

// Variables de statuts de vérificcation
let settings_verification = false;
let settings_verification_laddermin = false;
let settings_verification_laddermax = false;
let settings_verification_attempts = false;

function update_settings() {
  // MIN VALUE CHECK
  console.log("----- 🔍Settings verification 🔎 -----");

  ladder_min = parseInt(document.getElementById("settings__minimum").value);
  ladder_max = parseInt(document.getElementById("settings__maximum").value);

  // ladder_min = parseInt(document.getElementById("settings__minimum").value);

  if (ladder_min) {
    console.log("✔ Min value defined");

    if (ladder_min > ladder_max || ladder_min == ladder_max) {
      console.log("❌ Min value is superior or equal than max value");
    } else {
      settings_verification_laddermin = true;
      console.log("✅ Min value is correct");
      if (ladder_max) {
        console.log("✅ Max value defined & correct");
        settings_verification_laddermax = true;
      }
    }
  } else {
    console.log("❌ Min value not defined");
  }

  // MAX VALUE CHECK
  // ladder_max = parseInt(document.getElementById("settings__maximum").value);

  // Vérification du nombre de tentatives
  attempts = parseInt(document.getElementById("settings__attempts").value);
  // console.log(attempts);

  if (attempts) {
    console.log("✔ Attempts value defined");
    if (attempts <= 0) {
      console.log("❌ Attempts value is inferior or equal than 0");
    } else {
      settings_verification_attempts = true;
      console.log("✅ Attempts value is correct");
    }
  } else {
    console.log("❌ Attempts value not defined");
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
        " with 🔃 " +
        attempts +
        " attempts"
    );
  } else {
    settings_verification = false;
    console.log("❌ settings are not valid");
  }
}

function removeAttempt() {
  console.log("remove the attempt " + attempts);
  document
    .getElementsByClassName("playbox__rules_parameter_attempts_attempt")
    [attempts - 1].classList.add("used");
  attempts--;
  console.log(attempts + " attempts remaining");
  document.getElementById("attempts").innerHTML = attempts;
}

function lock_settings() {
  // document.getElementsByClassName("settings")[0].classList.add("disabled");
  document.getElementsByClassName("settings")[0].style.display = "none";
}

function generate_number() {
  target = parseInt(Math.floor(Math.random() * ladder_max + ladder_min));
  console.log("🎲 Génération du nombre aléatoire : " + target);
}

function launch() {
  update_settings();

  if (settings_verification) {
    lock_settings();
    generate_number();
    generate_rules();
    generate_sendMessage();
    document.getElementById("inputbox").style.display = "flex";
  }
}

function generate_sendMessage() {
  document.getElementById("messageBox").style.display = "flex";
}

function generate_rules() {
  document.getElementById("rules").style.display = "flex";
  document.getElementById("playbox__rules_minimum").innerHTML = ladder_min;
  document.getElementById("playbox__rules_maximum").innerHTML = ladder_max;
  document.getElementById("attempts").innerHTML = attempts;

  for (i = 0; i < attempts; i++) {
    console.log("🔃 Generated attempts pastilles");
    let attemptPastille = document.createElement("div");
    document.getElementById("playbox__attempts").appendChild(attemptPastille);
    attemptPastille.classList.add("playbox__rules_parameter_attempts_attempt");
  }
}

// À chaque fois qu'un nombre est joué
function check() {
  console.log("##### CHECK FUNCTION #####");

  let input_value = parseInt(document.getElementById("player-input").value);

  if (input_value < ladder_min) {
    sendMessage(
      "❌ Le nombre ne peut pas être inférieur à la valeur minimale ❌",
      "is-danger"
    );
  } else if (input_value > ladder_max) {
    sendMessage(
      "❌ Le nombre ne peut pas être supérieur à la valeur maximale ❌",
      "is-danger"
    );
  } else {
    if (attempts > 1) {
      if (input_value) {
        console.log("Get value : " + input_value);
        console.log("Target : " + target);

        if (input_value < target) {
          console.log("🔼 C'est plus grand 🔼");
          sendMessage("🔼 C'est plus grand 🔼", "is-light");
          removeAttempt();
        } else if (input_value > target) {
          console.log("🔽 C'est plus petit 🔽");
          sendMessage("🔽 C'est plus petit 🔽", "is-light");
          removeAttempt();
        } else {
          victory();
        }
      }
    } else {
      console.log("defeat ! " + attempts + " remaining");
      defeat();
    }
  }
}

let previous_type = "is-info";
let messageBox = document.getElementById("messageBox");
let message = document.getElementById("message").innerHTML;

function sendMessage(message, type) {
  console.log("📩 Message function");

  if (previous_type == type) {
    console.log("same type, don't change message type.");
  } else {
    messageBox.classList.add(type);
    messageBox.classList.remove(previous_type);
  }

  document.getElementById("message").innerHTML = message;
  previous_type = type;
}

function victory() {
  document.getElementById("victory").style.display = "flex";
}

function defeat() {
  document.getElementById("defeat").style.display = "flex";
}

function restart() {
  window.location.reload(true);
}
