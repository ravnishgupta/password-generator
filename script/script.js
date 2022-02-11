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

    // WHEN prompted for the length of the password
    // THEN I choose a length of at least 8 characters and no more than 128 characters  
    passwordProps["length"] = parseInt(getPasswordLength());
    //passwordProps.length = parseInt(getPasswordLength());
    //console.log("password length: " + passwordProps.length)

    // WHEN prompted for character types to include in the password
    // THEN I choose lowercase, uppercase, numeric, and/or special characters
    passwordProps["hasLowerCaseChar"] = hasLowerCaseChar().toUpperCase();
    // console.log("has lower case chars: " + password.hasLowerCaseChar);

    // // THEN I choose uppercase
    passwordProps["hasUpperCaseChar"] = hasUpperCaseChar().toUpperCase();
    // console.log("has upper case chars: " + password.hasUpperCaseChar);

    // // THEN I choose numeric
    passwordProps["hasNumericValues"] = hasNumericValues().toUpperCase();
    // console.log("has numeric values: " + password.hasNumericValues);
      
    // // THEN I choose and/or special characters
    passwordProps["hasSpecialChars"] = hasSpecialChars().toUpperCase();
    // console.log("has special characters: " + password.hasSpecialChars);

    console.log(passwordProps);
  }


// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected
// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria
// WHEN the password is generated
//return passwordProps.length;

}

function getPasswordLength() {
  //debugger;
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