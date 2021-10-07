import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next)
.init({
    resources: {
        en: {
            translation: {
                app_name: "Movieous",
                landing_title: "The Gateway to your entertainment",
                landing_summary: "Book and reserve to watch thousands of available movies in millions of locations worldwide.",
                landing_action: "Create an Account",
                navigation: {
                    home: "Home",
                    movies: "Movies",
                    blogs: "Blogs",
                    contact: "Contact Us",
                    about: "About"
                },
                auth: {
                    "sign-in": "Sign-in",
                    "sign-up": "Sign-up",
                    "sign-in-summary": "Enter your credentials to continue.",
                    "sign-up-summary": "Enter your information",
                    "sign-in-secondary-action": "Create an account",
                    "sign-up-secondary-action": "Sign-in with existing account"
                },
                field: {
                    "email": "Email",
                    "password": "Password",
                    "confirm-password": "Confirm Password",
                    "first-name": "First Name",
                    "last-name": "Last Name",
                    "age": "Age",
                    "gender": "Gender"
                }
            }
        }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
})

export default i18n;