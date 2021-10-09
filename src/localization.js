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
                navigation: {
                    home: "Home",
                    movies: "Movies",
                    blogs: "Blogs",
                    contact: "Contact Us",
                    about: "About",
                    account: "Account",
                    console: "Console"
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
                    "gender": "Gender",
                    "snack-name": "Snack Name",
                    "snack-type": "Snack Type",
                    "variations": "Variations",
                    "type-food": "Food",
                    "type-drink": "Drink",
                    "variant-name": "Variant Name",
                    "quantity": "Quantity",
                    "price": "Price",
                },
                placeholder: {
                    "email": "someone@example.com",
                    "password": "password",
                    "firstname": "John",
                    "lastname": "Doe",
                    "gender": "Select one",
                    "price": "Enter amount",
                    "snack-name": "Cotton Candy, Popcorn or etc."
                },
                button: {
                    "show": "Show",
                    "hide": "Hide",
                    "sign-in": "Sign-in",
                    "sign-up": "Sign-up",
                    "sign-out": "Sign-out",
                    "continue": "Continue",
                    "cancel": "Cancel",
                    "add": "Add",
                    "refresh": "Refresh",
                    "save": "Save",
                    "book": "Book",
                    "read-more": "Read More",
                    "learn-more": "Learn more",
                    "browse-movies": "Browse Movies",
                    "sign-in-with-google": "Sign-in with Google",
                    "back-to-home": "Back to Home"
                },
                error: {
                    "auth_empty_email": "Email is required",
                    "auth_empty_password": "Password is required",
                    "snack-create-error": "Error creating snack",
                    "snack-update-error": "Error updating snack",
                    "snack-remove-error": "Error removing snack",
                    "unauthorized-title": "Insufficient Permissions",
                    "unauthorized-message": "I'm afraid that you do not have the permission to do that..."
                },
                feedback: {
                    "creating-account": "Creating Account...",
                    "signing-in": "Signing-in...",
                    "snack-created": "Snack created",
                    "snack-updated": "Snack updated",
                    "snack-removed": "Snack removed",
                    "reservation-created": "Reservation created"
                },
                modal: {
                    "sign-out-title": "Sign-out?",
                    "sign-out-body": "You'll need to enter your information again next time you'll need to access the service.",
                    "editor-snack-create": "Create Snack",
                    "editor-snack-update": "Update Snack",
                    "editor-variant-create": "Create Variant",
                    "editor-variant-update": "Update Variant"
                },
                concat: {
                    "rating": "Rating: {{rating}}",
                    "popularity": "Popularity: {{popularity}}",
                    "rating-and-votes": "Rating {{rating}} &bull; {{votes}} Votes",
                    "release-date": "Release Date: {{date}}",
                    "price": "Price: $ {{price}}",
                    "available": " - {{stock}} Available"
                },
                console: {
                    "snacks": "Snacks",
                    "reservations": "Reservations",
                    "users": "Users"
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