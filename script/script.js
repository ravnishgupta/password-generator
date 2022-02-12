// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordProps = {};

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword() {

// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria

// WHEN prompted for password criteria
// THEN I select which criteria to include in the password

  if (confirm("Please answer the following prompts in order to generate your password.")) { 
    setPasswordProps();
    while (!checkPasswordProps()) {
      debugger;
      alert("Please select at least one character type. Let's start again.");
      setPasswordProps();
    }  
  }
  setPassword();
}

function getPasswordLength() {
  var input = prompt("Please enter the length of the desired password. The value should be between 8 and 128.");
  if ((input === null) || (input === "")) {
    return getPasswordLength();
  }
  else if ((input !== null) && ((parseInt(input) < 8) || (parseInt(input) > 128) || (isNaN(parseInt(input))))) {
    return getPasswordLength();
  }
  else return input;
  
}

function hasLowerCaseChar() {
  var lCaseChar = prompt("Should the password have lowercase characters? Type Yes or No.");
  if ((lCaseChar === null) || (lCaseChar === "")) {
    return hasLowerCaseChar();
  }
  else if ((lCaseChar.toUpperCase() !== "YES") && (lCaseChar.toUpperCase() !== "NO")) {
    return hasLowerCaseChar();
  }
  else return lCaseChar;
}

function hasUpperCaseChar() {
  var uCaseChar = prompt("Should the password have uppercase characters? Type Yes or No.");
  if ((uCaseChar === null) || (uCaseChar === "")) {
    return hasUpperCaseChar();
  }
  else if ((uCaseChar.toUpperCase() !== "YES") && (uCaseChar.toUpperCase() !== "NO")) {
    return hasUpperCaseChar();
  }
  else return uCaseChar;
}

function hasNumericValues() {
  var numValues = prompt("Should the password have numeric values? Type Yes or No.");
  if ((numValues === null) || (numValues === "")) {
    return hasNumericValues();
  }
  else if ((numValues.toUpperCase() !== "YES") && (numValues.toUpperCase() !== "NO")) {
    return hasNumericValues();
  }
  else return numValues;
}

function hasSpecialChars() {
  var splChar = prompt("Should the password have special characters? Type Yes or No.");
  if ((splChar === null) || (splChar === "")) {
    return hasSpecialChars();
  }
  else if ((splChar.toUpperCase() !== "YES") && (splChar.toUpperCase() !== "NO")) {
    return hasSpecialChars();
  }
  else return splChar;
}

function setPasswordProps() {
  passwordProps = {};

  // WHEN prompted for the length of the password
  // THEN I choose a length of at least 8 characters and no more than 128 characters 
  passwordProps["length"] = parseInt(getPasswordLength());

  // WHEN prompted for character types to include in the password
  // THEN I choose lowercase, uppercase, numeric, and/or special characters
  passwordProps["hasLowerCaseChar"] = hasLowerCaseChar().toUpperCase();

  // THEN I choose uppercase
  passwordProps["hasUpperCaseChar"] = hasUpperCaseChar().toUpperCase();

  // THEN I choose numeric
  passwordProps["hasNumericValues"] = hasNumericValues().toUpperCase();
    
  // THEN I choose and/or special characters
  passwordProps["hasSpecialChars"] = hasSpecialChars().toUpperCase();

}

function checkPasswordProps() {
  var allClear = true;
  if ((passwordProps["hasLowerCaseChar"] === "NO") && 
      (passwordProps["hasUpperCaseChar"] === "NO") && 
      (passwordProps["hasNumericValues"] === "NO") && 
      (passwordProps["hasSpecialChars"] === "NO")) {
        allClear = false;
  }
  return allClear;
}

function setPassword() {
  var thePassword = '';
  var passwordLength = passwordProps["length"];
  var myFunctions = ["generateValue(1, \"CHAR\").toLowerCase()", "generateValue(1, \"CHAR\").toUpperCase()", "generateValue(1, \"NUMBER\").toLowerCase()", "generateValue(1, \"SPECIALCHARS\")"];
  
  for (var f=0; f<myFunctions.length; f++) {
    console.log(myFunctions[f]);
  }

  if (passwordProps["hasLowerCaseChar"] === "YES") {
    thePassword += generateValue(1, "CHAR").toLowerCase();
    passwordLength -= 1;
  }

  if (passwordProps["hasUpperCaseChar"] === "YES") {
    thePassword += generateValue(1, "CHAR").toUpperCase();
    passwordLength -= 1;
  }

  if (passwordProps["hasNumericValues"] === "YES") {
    thePassword += generateValue(1, "NUMBER");
    passwordLength -= 1;

  }
  
  if (passwordProps["hasSpecialChars"] === "YES") {
    thePassword += generateValue(1, "SPECIALCHARS");
    passwordLength -= 1;
  }
  console.log(thePassword, passwordLength);

}



function generateValue(length, type) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "]", "~", "`", "{" , "}", "|", "\\", ":", ";", "'", "\"", "<", ",", ".", ">", "?", "/"];

    let result = "";
    switch (type.toUpperCase()) {
      case "CHAR":
        const charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result = characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        break;
      case "NUMBER":
        const numberLength = numbers.length;
        for (var i = 0; i < length; i++) {
          result = numbers.charAt(Math.floor(Math.random() * numberLength));
        }
        break;
      case "SPECIALCHARS":
        const splCharLength = specialChars.length;
        for (var i = 0; i < length; i++) {
          result = specialChars[Math.floor(Math.random() * splCharLength)];
        }
        break;
    }
    return result;
    //return result.substring(0, length);
}

//console.log(generateString(5));