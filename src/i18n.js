import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign Up': 'Sign Up',
                'Username': 'Username',
                'Email address': 'Email address',
                'Phone number': 'Phone number',
                'Password': 'Password',
                'Password repeat': 'Password repeat',
                'password missmatch': 'password missmatch'

            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kayıt Ol',
                'Username': 'Kullanıcı adı',
                'Email address': 'Eposta adresi',
                'Phone number': 'Telefon numarası',
                'Password': 'Parola',
                'Password repeat': 'Parolayı tekrarla',
                'password missmatch': 'parolalar uyuşmuyor'             
            }
        }
    },
    fallbackLng: 'tr', //default language
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
});

export default i18n;