// Global variables
var generateBtn = document.querySelector("#generate");
var passwordProps = {};
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const specialChars = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "]", "~", "`", "{" , "}", "|", "\\", ":", ";", "'", "\"", "<", ",", ".", ">", "?", "\/"];

//This array contains all the functions that will be used to generate the password
//Afer generating the initial character, random values will be selected from this array
//and since these are functions, eval will be used to execute them
var myFunctions = ['generateValue("LCASECHAR")', 'generateValue("UCASECHAR")', 'generateValue("NUMBER")', 'generateValue("SPECIALCHARS")'];

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
      alert("Please select at least one character type. Let's start again.");
      setPasswordProps();
    }  
  }

  var passwordArray = setPasswordChars();
  var initialChar = passwordArray[0];
  var remainingLength = parseInt(passwordArray[1]);
  var remainingPassword = setRemainingPasswordChars(remainingLength);

  return initialChar+remainingPassword;
  
}

function getPasswordLength() {
  var input = prompt("Please enter the length of the desired password. The value should be between 8 and 128.");
  //if user presses OK or Cancel button
  if ((input === null) || (input === "")) {
    return getPasswordLength();
  }
  //users needs to enter a number between 8 and 128
  else if ((input !== null) && ((parseInt(input) < 8) || (parseInt(input) > 128) || (isNaN(parseInt(input))))) {
    return getPasswordLength();
  }
  else return input;
  
}

function hasLowerCaseChar() {
  var lCaseChar = prompt("Should the password have lowercase characters? Type Yes or No.");
  //if user presses OK or Cancel button
  if ((lCaseChar === null) || (lCaseChar === "")) {
    return hasLowerCaseChar();
  }
  //if user types in any other input
  else if ((lCaseChar.toUpperCase() !== "YES") && (lCaseChar.toUpperCase() !== "NO")) {
    return hasLowerCaseChar();
  }
  else return lCaseChar;
}

function hasUpperCaseChar() {
  var uCaseChar = prompt("Should the password have uppercase characters? Type Yes or No.");
  //if user presses OK or Cancel button
  if ((uCaseChar === null) || (uCaseChar === "")) {
    return hasUpperCaseChar();
  }
  //if user types in any other input
  else if ((uCaseChar.toUpperCase() !== "YES") && (uCaseChar.toUpperCase() !== "NO")) {
    return hasUpperCaseChar();
  }
  else return uCaseChar;
}

function hasNumericValues() {
  var numValues = prompt("Should the password have numeric values? Type Yes or No.");
  //if user presses OK or Cancel button
  if ((numValues === null) || (numValues === "")) {
    return hasNumericValues();
  }
  //if user types in any other input
  else if ((numValues.toUpperCase() !== "YES") && (numValues.toUpperCase() !== "NO")) {
    return hasNumericValues();
  }
  else return numValues;
}

function hasSpecialChars() {
  var splChar = prompt("Should the password have special characters? Type Yes or No.");
  //if user presses OK or Cancel button
  if ((splChar === null) || (splChar === "")) {
    return hasSpecialChars();
  }
  //if user types in any other input
  else if ((splChar.toUpperCase() !== "YES") && (splChar.toUpperCase() !== "NO")) {
    return hasSpecialChars();
  }
  else return splChar;
}

function setPasswordProps() {
  //sets properties on the passwordProps object based on user's input
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
  //user needs to select atleast one character type
  var allClear = true;
  if ((passwordProps["hasLowerCaseChar"] === "NO") && 
      (passwordProps["hasUpperCaseChar"] === "NO") && 
      (passwordProps["hasNumericValues"] === "NO") && 
      (passwordProps["hasSpecialChars"] === "NO")) {
        allClear = false;
  }
  return allClear;
}

function setPasswordChars() {
  //set the first letter for the password
  var firstPasswordChar = '';
  var passwordLengthRemaining = passwordProps["length"];


  if (passwordProps["hasLowerCaseChar"] === "YES") {
    firstPasswordChar = generateValue("LCASECHAR");
    
  }

  if (passwordProps["hasUpperCaseChar"] === "YES") {
    firstPasswordChar = generateValue("UCASECHAR");
  }

  if (passwordProps["hasNumericValues"] === "YES") {
    firstPasswordChar = generateValue("NUMBER");
  }
  
  if (passwordProps["hasSpecialChars"] === "YES") {
    firstPasswordChar = generateValue("SPECIALCHARS");
  }

  return [firstPasswordChar, passwordLengthRemaining -1];
}

function setRemainingPasswordChars(length) {
  //This function sets the rest of the password characters keeping into consideration user's settings
  //on which char types to include/exclude
  var value = '';
  var tempValue = ''
  for (var i=0; i<length; i++) {
    //select a random function from myFunctions array and the eval function to execute the function 
    //check if the value confirms to the user's input
    //if not, then keep retrying
    tempValue = eval(myFunctions[Math.floor(Math.random() * myFunctions.length)]);
    if ((passwordProps["hasUpperCaseChar"] === "NO") && (characters.includes(tempValue))){
        i--;
    }
    else if ((passwordProps["hasLowerCaseChar"] === "NO") && (characters.toLowerCase().includes(tempValue))){
        i--;
    }
    else if ((passwordProps["hasNumericValues"] === "NO") && (numbers.toLowerCase().includes(tempValue))){
        i--;
    }
    else if ((passwordProps["hasSpecialChars"] === "NO") && (specialChars.indexOf(tempValue)>-1)){
        i--;
    }
    else {
       value += tempValue;
    }
  }
  return value;
}

function generateValue(type) {
  //return random value based on the 'type' parameter 
  var result = "";
  switch (type.toUpperCase()) {
    case "UCASECHAR": case "LCASECHAR":  
      const charactersLength = characters.length;
      result = characters.charAt(Math.floor(Math.random() * charactersLength))
      if (type === "UCASECHAR") {
        result = result.toUpperCase();
      }
      else {
        result = result.toLowerCase();
      }
      break;
    case "NUMBER":
      const numberLength = numbers.length;
      result = numbers.charAt(Math.floor(Math.random() * numberLength));
      break;
    case "SPECIALCHARS":
        const splCharLength = specialChars.length;
        result = specialChars[Math.floor(Math.random() * splCharLength)];
        break;
    }
    return result;
}
