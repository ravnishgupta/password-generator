// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword() {
var passwordProps = {};
// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria

// WHEN prompted for password criteria
// THEN I select which criteria to include in the password

  if (confirm("Please answer the following prompts in order to generate your password.")) {

    // WHEN prompted for the length of the password
    // THEN I choose a length of at least 8 characters and no more than 128 characters  
    passwordProps.length = parseInt(getPasswordLength());
    console.log("password length: " + passwordProps.length)

    password.hasLowerCaseChar = hasLowerCaseChar();
    console.log("has lower case chars: " + password.hasLowerCaseChar);

  }

// WHEN prompted for character types to include in the password
// THEN I choose lowercase, uppercase, numeric, and/or special characters
// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected
// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria
// WHEN the password is generated
//return passwordProps.length;

}

function getPasswordLength() {
  var input = prompt("Please enter the length of the desired password. The value should be between 8 and 128.");
  if (input !== null) {
    if ((parseInt(input) < 8) || (parseInt(input) > 128) || (isNaN(parseInt(input)))) {
      getPasswordLength();
    }
    else return input;
  }
}

function hasLowerCaseChar() {
  var lCaseChar = prompt("Should the password have lowercase characters? Type Yes or No.").toUpperCase();
  if ((lCaseChar !== "YES") && (lCaseChar !== "NO")) {
    hasLowerCaseChar();
  }
  else return lCaseChar;
}

