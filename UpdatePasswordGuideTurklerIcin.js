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

        // Yeni bir div oluştur ve gerekli metni içine ekle
        const newDiv = document.createElement("div");
        newDiv.id = "passwordHintDiv"; // İstediğiniz id'yi buraya verebilirsiniz

        // Yeni div'e başlangıç stili ekle
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

        // Metni maddeler halinde HTML biçiminde ayarla


        // Yeni div'i #content'in altına ekle
        const contentDiv = document.getElementById("content");
        contentDiv.parentNode.insertBefore(newDiv, contentDiv.nextSibling);

        // Medya sorgusu: Ekran genişliği 600px altına düştüğünde stili değiştir
        const mediaQuery = window.matchMedia("(max-width: 600px)");

        // Fonksiyon: Genişliğe göre stil değiştir
        function handleMediaChange(e) {
            if (e.matches) { // 600px altına düştüğünde
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
            } else { // 600px üstünde, başlangıç stiline geri döner
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

        // Medya sorgusu dinleme
        mediaQuery.addListener(handleMediaChange);

        // Sayfa yüklendiğinde medya sorgusunu kontrol et
        handleMediaChange(mediaQuery);
    }
}
catch { console.log("1") }

const Properties = {
    MaxLength: 20, // Parolanın maksimum uzunluğu
    MinLength: 8,  // Parolanın minimum uzunluğu
    ConditionTurkishCharacters: /[çÇğĞıİöÖşŞüÜ]/, // Türkçe karakterleri kontrol etmek için regex
    ConditionSpecialCharacters: /[~!@#?$%^&()_-]/, // Özel karakterleri kontrol etmek için regex
    ConditionNumbers: /[0-9]/, // Rakamları kontrol etmek için regex,
    ConditionUppercase: /[A-Z]/,
    ConditionLowercase:/[a-z]/,

    Elements: {
        SubmitButton: document.getElementById("submitButton"), // Submit butonunu temsil eden element
        ConfirmNewPasswordInput: document.getElementById("confirmNewPasswordInput"), // Yeni parolanın doğrulanması için input alanı
        NewPasswordInput: document.getElementById("newPasswordInput"), // Yeni parola input alanı
        PasswordLengthError:"password-length-error", // Parolanın uzunluğu ile ilgili hata mesajını temsil eden element
        PasswordComplexityError: "password-complexity-error", // Parola karmaşıklığı ile ilgili hata mesajını temsil eden element
        PasswordTurkishCharsError: "password-turkish-chars-error", // Parolada Türkçe karakter olup olmadığını belirten hata mesajını temsil eden element
        SubmitButtonBackgroundColor: document.getElementById("submitButton").style.backgroundColor
    },
    Messages: {
        PasswordLengthMessage: "",
        PasswordComplexityMessage: "Seçeceğiniz parola içerisinde bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter ( ~!@#?$%^&()_- ) mutlaka olmalıdır.",
        PasswordTurkishCharMessage: "Seçeceğiniz parola, teknik sınırlamalar nedeniyle Türkçe karakterler (ı,İ,ğ,Ğ,ş,Ş,ü,Ü,ö,Ö,ç,Ç) harflerini içermemelidir."
    },
    Conditions: {
        hasSpecialCharacter: false, // Parolada özel karakter olup olmadığını kontrol eder
        hasNumber: false,           // Parolada rakam olup olmadığını kontrol eder
        hasUppercase: false,        // Parolada büyük harf olup olmadığını kontrol eder
        hasLowercase: false,        // Parolada küçük harf olup olmadığını kontrol eder
        hasTurkishCharacter: false, // Parolada Türkçe karakter olup olmadığını kontrol eder
        hasValidLength: false       // Parolanın uzunluğunun geçerli olup olmadığını kontrol eder (min 8, max 20)
    }
}
Properties.Messages.PasswordLengthMessage = `Seçeceğiniz parola, en az ${Properties.MinLength}, en fazla ${Properties.MaxLength} karakter olmalıdır.`
 
document.getElementById("passwordHintDiv").innerHTML = `
<h3 style="font-weight:bold !important;">Parola Değişikliğinde Dikkat Edilecek Hususlar</h3>
<ul>
    <li>${Properties.Messages.PasswordLengthMessage} <span id="password-length-error" style="display:none; font-weight:bold; background:red; color:white;">Başarısız</span></li>
    <li>${Properties.Messages.PasswordComplexityMessage} <span id="password-complexity-error" style="display:none; font-weight:bold; background:red; color:white;">Başarısız</span></li>
    <li>${Properties.Messages.PasswordTurkishCharMessage} <span id="password-turkish-chars-error" style="display:none; font-weight:bold; background:red; color:white;">Başarısız</span></li>
</ul>
`;
Properties.Elements.PasswordLengthError = document.getElementById(Properties.Elements.PasswordLengthError);
Properties.Elements.PasswordComplexityError = document.getElementById(Properties.Elements.PasswordComplexityError);
Properties.Elements.PasswordTurkishCharsError = document.getElementById(Properties.Elements.PasswordTurkishCharsError);

/**
 * Parola koşullarını kontrol eder ve durumu günceller.
 * Parolanın her iki input elemanını kontrol eder ve butonu devre dışı bırakır veya etkinleştirir.
 * Ayrıca ilgili hata mesajlarını gösterir veya gizler.
 */
/**
 * Parola koşullarını kontrol eder ve durumu günceller.
 * Parolanın her iki input elemanını kontrol eder ve butonu devre dışı bırakır veya etkinleştirir.
 * Ayrıca ilgili hata mesajlarını gösterir veya gizler.
 */
function validatePasswordConditions() {
    // Parola koşullarını kontrol et
    Properties.Conditions.hasSpecialCharacter = Properties.ConditionSpecialCharacters.test(Properties.Elements.NewPasswordInput.value) && Properties.ConditionSpecialCharacters.test(Properties.Elements.ConfirmNewPasswordInput.value);
    Properties.Conditions.hasNumber = Properties.ConditionNumbers.test(Properties.Elements.NewPasswordInput.value) && Properties.ConditionNumbers.test(Properties.Elements.ConfirmNewPasswordInput.value);
    Properties.Conditions.hasUppercase = Properties.ConditionUppercase.test(Properties.Elements.NewPasswordInput.value) && Properties.ConditionUppercase.test(Properties.Elements.ConfirmNewPasswordInput.value);
    Properties.Conditions.hasLowercase = Properties.ConditionLowercase.test(Properties.Elements.NewPasswordInput.value) && Properties.ConditionLowercase.test(Properties.Elements.ConfirmNewPasswordInput.value);
    Properties.Conditions.hasTurkishCharacter = Properties.ConditionTurkishCharacters.test(Properties.Elements.NewPasswordInput.value) || Properties.ConditionTurkishCharacters.test(Properties.Elements.ConfirmNewPasswordInput.value);
    Properties.Conditions.hasValidLength = (Properties.Elements.NewPasswordInput.value.length >= Properties.MinLength && Properties.Elements.NewPasswordInput.value.length <= Properties.MaxLength) && (Properties.Elements.ConfirmNewPasswordInput.value.length >= Properties.MinLength && Properties.Elements.ConfirmNewPasswordInput.value.length <= Properties.MaxLength);

    // Eğer bir koşul sağlanmıyorsa butonu devre dışı bırak, yoksa etkinleştir
    if (Properties.Conditions.hasTurkishCharacter || !Properties.Conditions.hasValidLength || !Properties.Conditions.hasSpecialCharacter || !Properties.Conditions.hasNumber || !Properties.Conditions.hasUppercase || !Properties.Conditions.hasLowercase) {
        Properties.Elements.SubmitButton.disabled = true;
        Properties.Elements.SubmitButton.style.backgroundColor = "gray";
    } else {
        Properties.Elements.SubmitButton.disabled = false;
        Properties.Elements.SubmitButton.style.backgroundColor = Properties.Elements.SubmitButtonBackgroundColor;
    }

    // Parolanın geçerli uzunlukta olup olmadığını kontrol et
    if (!Properties.Conditions.hasValidLength) {
        Properties.Elements.PasswordLengthError.style.display = "inline-block";
    } else {
        Properties.Elements.PasswordLengthError.style.display = "none";
    }

    // Parolanın karmaşıklığına dair koşulları kontrol et
    if (!Properties.Conditions.hasUppercase || !Properties.Conditions.hasLowercase || !Properties.Conditions.hasSpecialCharacter || !Properties.Conditions.hasNumber) {
        Properties.Elements.PasswordComplexityError.style.display = "inline-block";
    } else {
        Properties.Elements.PasswordComplexityError.style.display = "none";
    }

    // Türkçe karakterlerin olup olmadığını kontrol et
    if (Properties.Conditions.hasTurkishCharacter) {
        Properties.Elements.PasswordTurkishCharsError.style.display = "inline-block";
    } else {
        Properties.Elements.PasswordTurkishCharsError.style.display = "none";
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
 