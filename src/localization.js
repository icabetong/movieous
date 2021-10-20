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
                    theater: "Now Showing",
                    blogs: "Blogs",
                    contact: "Contact Us",
                    about: "About",
                    account: "Account",
                    console: "Console",
                    reservation: "Reservation"
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
                    "old-password": "Old Password",
                    "new-password": "New Password",
                    "firstname": "First Name",
                    "lastname": "Last Name",
                    "birthday": "Birthday",
                    "gender": "Gender",
                    "snack-name": "Snack Name",
                    "snack-type": "Snack Type",
                    "snack-variant": "Snack Variant",
                    "variations": "Variations",
                    "type-food": "Food",
                    "type-drink": "Drink",
                    "type-bundle": "Bundle",
                    "variant-name": "Variant Name",
                    "quantity": "Quantity",
                    "price": "Price",
                    "available-snacks": "Available Snacks: ",
                    "movie": "Movie",
                    "total-seats": "Total Seats",
                    "is-active": "Is Active",
                    "type": "Type",
                    "message": "Message",
                    "seats-to-reserve": "Tickets to Reserve"
                },
                placeholder: {
                    "email": "someone@example.com",
                    "password": "password",
                    "firstname": "John",
                    "lastname": "Doe",
                    "gender": "Select one",
                    "price": "Enter amount",
                    "snack-name": "Cotton Candy, Popcorn or etc.",
                    "variant-name": "ex. Soda Large or Medium Variant",
                    "movie": "Click on the button beside to select one",
                    "message": "Type your message here"
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
                    "delete": "Delete",
                    "send": "Send",
                    "pick": "Pick",
                    "reserve": "Reserve",
                    "read-more": "Read More",
                    "learn-more": "Learn more",
                    "browse-movies": "Browse Movies",
                    "sign-in-with-google": "Sign-in with Google",
                    "back-to-home": "Back to Home",
                    "change-password": "Change Password",
                    "reset-password": "Reset Password",
                    "submit": "Submit",
                },
                error: {
                    "generic-title": "Ooops!",
                    "generic-message": "We can't seem to find the page you're looking for.",
                    "auth-generic": "Authentication Error",
                    "auth_empty_email": "Email is required",
                    "auth_empty_password": "Password is required",
                    "snack-create-error": "Error creating snack",
                    "snack-update-error": "Error updating snack",
                    "snack-remove-error": "Error removing snack",
                    "unauthorized-title": "Insufficient Permissions",
                    "unauthorized-message": "I'm afraid that you do not have the permission to do that...",
                    "passwords-not-matched": "Passwords do not match",
                    "feedback-send-error": "Error sending feedback"
                },
                feedback: {
                    "creating-account": "Creating Account...",
                    "signing-in": "Signing-in...",
                    "authenticating": "Authenticating...",
                    "snack-created": "Snack created",
                    "snack-updated": "Snack updated",
                    "snack-removed": "Snack removed",
                    "reservation-created": "Reservation created",
                    "feedback-sent": "Feedback sent"
                },
                modal: {
                    "sign-out-title": "Sign-out?",
                    "sign-out-body": "You'll need to enter your information again next time you'll need to access the service.",
                    "change-password-title": "Change Password",
                    "change-password-body": "You can change your account's password here, be remember to first enter your old one to do so.",
                    "request-password-title": "Send Password Reset Link",
                    "request-password-body": "If you have forgotten your password, we can send you a reset link in your email account associated with this account.",
                    "delete-snack-title": "Delete this snack?",
                    "delete-snack-body": "Once completed, this action cannot be undone.",
                    "delete-theater-title": "Delete this theater?",
                    "delete-theater-body": "Once completed, this action cannot be undone.",
                    "variation-delete-title": "Delete this variation?",
                    "variation-delete-body": "Once completed, this action cannot be undone.",
                    "editor-snack-create": "Create Snack",
                    "editor-snack-update": "Update Snack",
                    "editor-variant-create": "Create Variant",
                    "editor-variant-update": "Update Variant",
                    "editor-theater-create": "Create Theater",
                    "editor-theater-update": "Update Theater",
                    "select-variant": "Select Snack Variant",
                    "select-movie": "Select Movie",
                    "editor-blog-create": "Create Blog Entry",
                    "editor-blog-update": "Update Blog Entry"
                },
                concat: {
                    "rating": "Rating: {{rating}}",
                    "popularity": "Popularity: {{popularity}}",
                    "rating-and-votes": "Rating {{rating}} &bull; {{votes}} Votes",
                    "release-date": "Release Date: {{date}}",
                    "price": "Price: $ {{price}}",
                    "available": " - {{stock}} Available",
                    "variations": "{{variation}} Variations",
                    "price-ranges": "$ {{lowest}} - $ {{highest}}",
                    "price-start-at": "Prices start at ",
                    "price-sign-only": "$ {{price}}",
                    "selected-movie": "Selected Movie: ",
                    "about-to-delete": "You are about to delete: ",
                    "number-of-seats": "{{seats}} Seats",
                    "available-seats": "{{free}} Available Tickets"
                },
                console: {
                    "snacks": "Snacks",
                    "theater": "Theater",
                    "reservations": "Reservations",
                    "blogs": "Blogs",
                },
                account: {
                    "account": "Account",
                    "reservations": "Reservations",
                    "information": "Basic Information"
                },
                info: {
                    "now-showing": "Now Showing",
                    "got-feedback-or-concern": "Got a feedback or concern?",
                    "markdown-guide": "The editor is using Markdown as syntax. "
                },
                "gender-option-male": "Male",
                "gender-option-female": "Female",
                "gender-option-unspecified": "Unspecified",
                type: {
                    "suggestion": "Suggestion",
                    "feedback": "Feedback"
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