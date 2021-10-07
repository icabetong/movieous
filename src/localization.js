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
                    about: "About",
                    account: "Account"
                },
                auth: {
                    "sign-in": "Let's get you signed-in",
                    "sign-up": "Let's create your account",
                    "sign-in-summary": "You'll need to enter your valid email and password to access your account",
                    "sign-up-summary": "You'll need to enter valid information to create an account",
                    "sign-in-secondary-action": "Create an account",
                    "sign-up-secondary-action": "Sign-in with existing account",
                    "getting-started-title": "Mind telling us about you?",
                    "getting-started-summary": "We'll need a few basic details to know you."
                },
                field: {
                    "email": "Email",
                    "password": "Password",
                    "confirm-password": "Confirm Password",
                    "firstname": "First Name",
                    "lastname": "Last Name",
                    "birthday": "Birthday",
                    "gender": "Gender"
                },
                placeholder: {
                    "email": "someone@example.com",
                    "password": "password",
                    "firstname": "John",
                    "lastname": "Doe",
                    "gender": "Select one"
                },
                button: {
                    "show": "Show",
                    "hide": "Hide",
                    "sign-in": "Sign-in",
                    "sign-up": "Sign-up",
                    "sign-out": "Sign-out",
                    "continue": "Continue",
                    "cancel": "Cancel"
                },
                error: {
                    "auth_empty_email": "Email is required",
                    "auth_empty_password": "Password is required"
                },
                feedback: {
                    "creating-account": "Creating Account...",
                    "signing-in": "Signing-in..."
                },
                modal: {
                    "sign-out-title": "Sign-out?",
                    "sign-out-body": "You'll need to enter your information again next time you'll need to access the service."
                },
                "gender-option-male": "Male",
                "gender-option-female": "Female",
                "gender-option-unspecified": "Unspecified"
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