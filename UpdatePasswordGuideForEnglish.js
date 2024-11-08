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

        // Create a new div and add the necessary text inside
        const newDiv = document.createElement("div");
        newDiv.id = "passwordHintDiv"; // You can set any ID here

        // Add initial styles to the new div
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
        
        // Append the new div to the content
        const contentDiv = document.getElementById("content");
        contentDiv.parentNode.insertBefore(newDiv, contentDiv.nextSibling);

        // Media query: Change styles when screen width is below 600px
        const mediaQuery = window.matchMedia("(max-width: 600px)");

        // Function: Change styles based on the width
        function handleMediaChange(e) {
            if (e.matches) { // When screen width is less than 600px
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
            } else { // For screen width above 600px, revert to the original style
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

        // Media query listener
        mediaQuery.addListener(handleMediaChange);

        // Check the media query when the page loads
        handleMediaChange(mediaQuery);
    }
} catch(e) { console.log(e) }

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
        PasswordLengthError: "password-length-error", // Element representing the error message for password length
        PasswordComplexityError: "password-complexity-error", // Element representing the error message for password complexity
        PasswordTurkishCharsError: "password-turkish-chars-error", // Element representing the error message for Turkish characters
        SubmitButtonBackgroundColor: document.getElementById("submitButton").style.backgroundColor
    },
    Messages: {
        PasswordLengthMessage: "",
        PasswordComplexityMessage: "Your password must contain at least one uppercase letter, one lowercase letter, one number, and one special character ( ~!@#?$%^&()_- ).",
        PasswordTurkishCharMessage: "Due to technical limitations, your password must not contain Turkish characters (ı,İ,ğ,Ğ,ş,Ş,ü,Ü,ö,Ö,ç,Ç)."
    },
    Conditions: {
        hasSpecialCharacter: false, // Checks if the password contains special characters
        hasNumber: false,           // Checks if the password contains numbers
        hasUppercase: false,        // Checks if the password contains uppercase letters
        hasLowercase: false,        // Checks if the password contains lowercase letters
        hasTurkishCharacter: false, // Checks if the password contains Turkish characters
        hasValidLength: false       // Checks if the password length is valid (min 8, max 20)
    }
}
Properties.Messages.PasswordLengthMessage = `Your password must be between ${Properties.MinLength} and ${Properties.MaxLength} characters long.`

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
 * It also shows or hides the relevant error messages.
 */
function validatePasswordConditions() {
    // Check password conditions
    Properties.Conditions.hasSpecialCharacter = Properties.ConditionSpecialCharacters.test(Properties.Elements.NewPasswordInput.value) && Properties.ConditionSpecialCharacters.test(Properties.Elements.ConfirmNewPasswordInput.value);
    Properties.Conditions.hasNumber = Properties.ConditionNumbers.test(Properties.Elements.NewPasswordInput.value) && Properties.ConditionNumbers.test(Properties.Elements.ConfirmNewPasswordInput.value);
    Properties.Conditions.hasUppercase = Properties.ConditionUppercase.test(Properties.Elements.NewPasswordInput.value) && Properties.ConditionUppercase.test(Properties.Elements.ConfirmNewPasswordInput.value);
    Properties.Conditions.hasLowercase = Properties.ConditionLowercase.test(Properties.Elements.NewPasswordInput.value) && Properties.ConditionLowercase.test(Properties.Elements.ConfirmNewPasswordInput.value);
    Properties.Conditions.hasTurkishCharacter = Properties.ConditionTurkishCharacters.test(Properties.Elements.NewPasswordInput.value) || Properties.ConditionTurkishCharacters.test(Properties.Elements.ConfirmNewPasswordInput.value);
    Properties.Conditions.hasValidLength = Properties.Elements.NewPasswordInput.value.length >= Properties.MinLength && Properties.Elements.NewPasswordInput.value.length <= Properties.MaxLength;

    // Enable/disable submit button based on conditions
    if (Properties.Conditions.hasValidLength && Properties.Conditions.hasSpecialCharacter && Properties.Conditions.hasNumber && Properties.Conditions.hasUppercase && Properties.Conditions.hasLowercase && !Properties.Conditions.hasTurkishCharacter) {
        Properties.Elements.SubmitButton.disabled = false;
    } else {
        Properties.Elements.SubmitButton.disabled = true;
    }

    // Update error messages visibility based on conditions
    Properties.Elements.PasswordLengthError.style.display = Properties.Conditions.hasValidLength ? 'none' : 'inline';
    Properties.Elements.PasswordComplexityError.style.display = Properties.Conditions.hasSpecialCharacter && Properties.Conditions.hasNumber && Properties.Conditions.hasUppercase && Properties.Conditions.hasLowercase ? 'none' : 'inline';
    Properties.Elements.PasswordTurkishCharsError.style.display = Properties.Conditions.hasTurkishCharacter ? 'inline' : 'none';
}

// Call the function to validate password
validatePasswordConditions();
