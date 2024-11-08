# AdfsUpdatePassword
 The "Update Password" page provides explanations for end users and implements a structure for password resets within specific rules.\
Türkçe\
1.Eğer belirlenen şartlar sağlanmazsa, kullanıcılar için hata durumu gösteren değerler döndürülecektir.\
![image](https://github.com/user-attachments/assets/7e99d73e-9e19-41cb-9327-39bf99966a90)
\
2.Şartlar sağlandığında, kullanıcı şifresini ADFS üzerinden iletebilir.\
![image](https://github.com/user-attachments/assets/ca590fb3-02ef-45df-84b0-04859dd71e22)
\
3.Ayarları düzeltmek için, JS dosyasındaki Properties objesini düzenleyebilirsiniz.\
![image](https://github.com/user-attachments/assets/813a2f13-afc4-45b4-9917-b2ee7061093b)
\
4.Onload.js dosyasının son kısmına bu scripti ekleyerek ADFS ortamınızda başarıyla aktifleştirebilirsiniz. İyi çalışmalar dilerim.\
\
English\
1.In the event that the specified conditions are not met, error values indicating failure will be returned for users.\
![image](https://github.com/user-attachments/assets/293641e5-1098-4944-824c-cf10ac7daec7)\
\
2.Once the conditions are met, the user will be able to submit their password through ADFS.\
![image](https://github.com/user-attachments/assets/84e7722b-6e99-440e-890c-ce83f9e99b5f)\
\
3.To adjust the settings, you can modify the Properties object within the JS file.\
![image](https://github.com/user-attachments/assets/ba01120e-822a-44c4-b6d2-4b75a6f64418)\
4.By adding this script to the end of the Onload.js file, you can successfully activate it within your ADFS environment. Wishing you successful work ahead.
