import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { register } from "timeago.js";

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
        Send: "Send",
        "Load Old Post": "Load Old Post",
        "Load New Post": "Load New Post",
        Delete: "Delete",
        "Are you sure to delete post?": "Are you sure to delete post?",
        "Delete Post": "Delete Post",
        Cancel: "Cancel",
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
        Send: "Gönder",
        "Load Old Post": "Geçmiş Gönderileri Getir",
        "Load New Post": "Yeni Gönderileri Getir",
        Delete: "Sil",
        "Are you sure to delete post?":
          "Post'u silmek istediğinizden emin misiniz?",
        "Delete Post": "Post'u Sil",
        Cancel: "İptal Et",
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

const timeago = (number, index) => {
  return [
    ["az önce", "şimdi"],
    ["%s saniye önce", "%s saniye içinde"],
    ["1 dakika önce", "1 dakika içinde"],
    ["%s dakika önce", "%s dakika içinde"],
    ["1 saat önce", "1 saat içinde"],
    ["%s saat önce", "%s saat içinde"],
    ["1 gün önce", "1 gün içinde"],
    ["%s gün önce", "%s gün içinde"],
    ["1 hafta önce", "1 hafta içinde"],
    ["%s hafta önce", "%s hafta içinde"],
    ["1 ay önce", "1 ay içinde"],
    ["%s ay önce", "%s ay içinde"],
    ["1 yıl önce", "1 yıl içinde"],
    ["%s yıl önce", "%s yıl içinde"],
  ][index];
};
register("tr", timeago);

export default i18n;
