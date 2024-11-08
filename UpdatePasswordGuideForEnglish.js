/*!
 * Author: Emre Doğan Çelik
 * Website: https://emredogancelik.com
 * Email: contact@emredogancelik.com
 * Date: 2024-11-08
 * Description: This script validates the password according to predefined conditions (length, complexity, special characters, etc.)
 * Version: 1.0.0
 * License: MIT License
 * Copyright (c) 2024 Emre Doğan Çelik
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * provided to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

try {
    if (window.location.href.includes("updatepassword")) {

        // Create a new div and insert the required text inside it
        const newDiv = document.createElement("div");
        newDiv.id = "passwordHintDiv"; // You can assign any id here

        // Add initial styling to the new div
        newDiv.style.backgroundColor = "white";
        newDiv.style.padding = "15px";
        newDiv.style.borderRadius = "5px";
        newDiv.style.width = "80%";
        newDiv.style.maxWidth = "80%";
        newDiv.style.boxSizing = "border-box";
        newDiv.style.display = "inline-block";
        newDiv.style.position = "fixed";
        newDiv.style.top = "13%";
        newDiv.style.left = "50%";
        newDiv.style.transform = "translate(-50%, -50%)";
        newDiv.style.boxShadow = "0 2px 3px rgba(0, 0, 0, 0.55)";
        newDiv.style.border = "1px solid rgba(0, 0, 0, 0.4)";
        newDiv.style.fontFamily = "system-ui";

        // Set the text as an HTML list format

        // Append the new div to the #content div
        const contentDiv = document.getElementById("content");
        contentDiv.parentNode.insertBefore(newDiv, contentDiv.nextSibling);

        // Media query: Change styling when screen width falls below 600px
        const mediaQuery = window.matchMedia("(max-width: 600px)");

        // Function: Change styles based on screen size
        function handleMediaChange(e) {
            if (e.matches) { // When it falls below 600px
                newDiv.style.display = "block";
                newDiv.style.position = "relative";
                newDiv.style.top = "0";
                newDiv.style.left = "0";
                newDiv.style.transform = "none";
                newDiv.style.marginLeft = "auto";
                newDiv.style.marginRight = "auto";
                newDiv.style.maxWidth = "80%";
                newDiv.style.width = "80%";
                newDiv.style.boxShadow = "none";
                newDiv.style.border = "none";
            } else { // Above 600px, revert to initial styles
                newDiv.style.display = "inline-block";
                newDiv.style.position = "fixed";
                newDiv.style.top = "13%";
                newDiv.style.left = "50%";
                newDiv.style.transform = "translate(-50%, -50%)";
                newDiv.style.maxWidth = "80%";
                newDiv.style.width = "80%";
                newDiv.style.boxShadow = "0 2px 3px rgba(0, 0, 0, 0.55)";
                newDiv.style.border = "1px solid rgba(0, 0, 0, 0.4)";
            }
        }

        // Listen for media query changes
        mediaQuery.addListener(handleMediaChange);

        // Check the media query on page load
        handleMediaChange(mediaQuery);
    }
}
catch { console.log("1") }

const Properties = {
    MaxLength: 20, // Maximum length of the password
    MinLength: 8,  // Minimum length of the password
    ConditionTurkishCharacters: /[çÇğĞıİöÖşŞüÜ]/, // Regex to check Turkish characters
    ConditionSpecialCharacters: /[~!@#?$%^&()_-]/, // Regex to check special characters
    ConditionNumbers: /[0-9]/, // Regex to check numbers
    ConditionUppercase: /[A-Z]/,
    ConditionLowercase:/[a-z]/,

    Elements: {
        SubmitButton: document.getElementById("submitButton"), // Element representing the Submit button
        ConfirmNewPasswordInput: document.getElementById("confirmNewPasswordInput"), // Input field for confirming the new password
        NewPasswordInput: document.getElementById("newPasswordInput"), // Input field for the new password
        PasswordLengthError:"password-length-error", // Element representing the password length error message
        PasswordComplexityError: "password-complexity-error", // Element representing the password complexity error message
        PasswordTurkishCharsError: "password-turkish-chars-error", // Element representing the error message for Turkish characters in the password
        SubmitButtonBackgroundColor: document.getElementById("submitButton").style.backgroundColor
    },
    Messages: {
        PasswordLengthMessage: "",
        PasswordComplexityMessage: "The password you choose must contain at least one uppercase letter, one lowercase letter, one number, and one special character (~!@#?$%^&()_-).",
        PasswordTurkishCharMessage: "The password you choose must not contain Turkish characters (ı,İ,ğ,Ğ,ş,Ş,ü,Ü,ö,Ö,ç,Ç) due to technical limitations."
    },
    Conditions: {
        hasSpecialCharacter: false, // Checks if there is a special character in the password
        hasNumber: false,           // Checks if there is a number in the password
        hasUppercase: false,        // Checks if there is an uppercase letter in the password
        hasLowercase: false,        // Checks if there is a lowercase letter in the password
        hasTurkishCharacter: false, // Checks if there is a Turkish character in the password
        hasValidLength: false       // Checks if the password length is valid (min 8, max 20)
    }
}
Properties.Messages.PasswordLengthMessage = `The password you choose must be at least ${Properties.MinLength} and at most ${Properties.MaxLength} characters long.`
 
document.getElementById("passwordHintDiv").innerHTML = `
<h3 style="font-weight:bold !important;">Password Change Guidelines</h3>
<ul>
    <li>${Properties.Messages.PasswordLengthMessage} <span id="password-length-error" style="display:none; font-weight:bold; background:red; color:white;">Failed</span></li>
    <li>${Properties.Messages.PasswordComplexityMessage} <span id="password-complexity-error" style="display:none; font-weight:bold; background:red; color:white;">Failed</span></li>
    <li>${Properties.Messages.PasswordTurkishCharMessage} <span id="password-turkish-chars-error" style="display:none; font-weight:bold; background:red; color:white;">Failed</span></li>
</ul>
`;
Properties.Elements.PasswordLengthError = document.getElementById(Properties.Elements.PasswordLengthError);
Properties.Elements.PasswordComplexityError = document.getElementById(Properties.Elements.PasswordComplexityError);
Properties.Elements.PasswordTurkishCharsError = document.getElementById(Properties.Elements.PasswordTurkishCharsError);

/**
 * Checks the password conditions and updates the status.
 * It checks both password input elements and disables or enables the button.
 * It also shows or hides relevant error messages.
 */
function validatePasswordConditions() {
    // Check the password conditions
    Properties.Conditions.hasSpecialCharacter = Properties.ConditionSpecialCharacters.test(Properties.Elements.NewPasswordInput.value) && Properties.ConditionSpecialCharacters.test(Properties.Elements.ConfirmNewPasswordInput.value);
    Properties.Conditions.hasNumber = Properties.ConditionNumbers.test(Properties.Elements.NewPasswordInput.value) && Properties.ConditionNumbers.test(Properties.Elements.ConfirmNewPasswordInput.value);
    Properties.Conditions.hasUppercase = Properties.ConditionUppercase.test(Properties.Elements.NewPasswordInput.value) && Properties.ConditionUppercase.test(Properties.Elements.ConfirmNewPasswordInput.value);
    Properties.Conditions.hasLowercase = Properties.ConditionLowercase.test(Properties.Elements.NewPasswordInput.value) && Properties.ConditionLowercase.test(Properties.Elements.ConfirmNewPasswordInput.value);
    Properties.Conditions.hasTurkishCharacter = Properties.ConditionTurkishCharacters.test(Properties.Elements.NewPasswordInput.value) || Properties.ConditionTurkishCharacters.test(Properties.Elements.ConfirmNewPasswordInput.value);
    Properties.Conditions.hasValidLength = (Properties.Elements.NewPasswordInput.value.length >= Properties.MinLength && Properties.Elements.NewPasswordInput.value.length <= Properties.MaxLength) && (Properties.Elements.ConfirmNewPasswordInput.value.length >= Properties.MinLength && Properties.Elements.ConfirmNewPasswordInput.value.length <= Properties.MaxLength);

    // Validate and show errors
    if (Properties.Conditions.hasValidLength) {
        Properties.Elements.PasswordLengthError.style.display = "none";
    } else {
        Properties.Elements.PasswordLengthError.style.display = "inline-block";
    }

    if (Properties.Conditions.hasUppercase && Properties.Conditions.hasLowercase && Properties.Conditions.hasNumber && Properties.Conditions.hasSpecialCharacter) {
        Properties.Elements.PasswordComplexityError.style.display = "none";
    } else {
        Properties.Elements.PasswordComplexityError.style.display = "inline-block";
    }

    if (!Properties.Conditions.hasTurkishCharacter) {
        Properties.Elements.PasswordTurkishCharsError.style.display = "none";
    } else {
        Properties.Elements.PasswordTurkishCharsError.style.display = "inline-block";
    }

    // Enable or disable the submit button based on the validation results
    if (Properties.Conditions.hasValidLength && Properties.Conditions.hasUppercase && Properties.Conditions.hasLowercase && Properties.Conditions.hasNumber && Properties.Conditions.hasSpecialCharacter && !Properties.Conditions.hasTurkishCharacter) {
        Properties.Elements.SubmitButton.style.backgroundColor = Properties.Elements.SubmitButtonBackgroundColor;
        Properties.Elements.SubmitButton.disabled = false;
    } else {
        Properties.Elements.SubmitButton.style.backgroundColor = "gray";
        Properties.Elements.SubmitButton.disabled = true;
    }
}

try {
    Properties.Elements.ConfirmNewPasswordInput.addEventListener('keyup', (e) => {
        validatePasswordConditions();
    });
    Properties.Elements.NewPasswordInput.addEventListener('keyup', (e) => {
        validatePasswordConditions();
    });
} catch { }


/*
* Good luck with your project! Feel free to reach out for anything else. 
* Best regards, and hope to collaborate again soon!
*/
