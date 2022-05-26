import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        "Sign In": "Sign In",
        "Sign Up": "Sign Up",
        Username: "Username",
        "Email address": "Email address",
        "Phone number": "Phone number",
        Password: "Password",
        "Password repeat": "Password repeat",
        "password missmatch": "password missmatch",
        Logout: "Logout",
        "My Profile": "My Profile",
      },
    },
    tr: {
      translations: {
        "Sign In": "Giriş Yap",
        "Sign Up": "Kayıt Ol",
        Username: "Kullanıcı adı",
        "Email address": "Eposta adresi",
        "Phone number": "Telefon numarası",
        Password: "Parola",
        "Password repeat": "Parolayı tekrarla",
        "password missmatch": "parolalar uyuşmuyor",
        Logout: "Çıkış",
        "My Profile": "Profilim",
      },
    },
  },
  fallbackLng: "tr", //default language
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
  react: {
    wait: true,
  },
});

export default i18n;
