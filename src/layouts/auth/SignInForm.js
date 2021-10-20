import React from "react";
import { useTranslation } from "react-i18next"; 
import { useForm } from "react-hook-form";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Heading,
    Stack,
} from "@chakra-ui/react";
import {
    FaGoogle
} from "react-icons/fa";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import history from "../../utils/history";
import { auth } from "../../index";

const SignInForm = (props) => {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = React.useState(false);
    const [isAuthenticating, setAuthenticating] = React.useState(false);

    const onSubmit = (data) => {
        const { email, password } = data;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => { history.push("/") })
            .catch((error) => { console.log(error); })
            .finally(() => { setAuthenticating(false); })
    }

    const onSignInWithGoogle = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                if (result.user) {
                    props.setMode("enter-info");
                }
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <Stack
            border="1px"
            borderColor="gray.600"
            borderRadius="md"
            bg="gray.700"
            spacing={{base: 2, md: 4}}
            w={{base: "90%", md: "60%"}}
            p={12}
            align="center">
            <Heading
                as="h1"
                size="lg"
                fontWeight="bold"
                color="blue.300"
                textAlign="center" >
                { t("auth.sign-in") }
            </Heading>
            <Heading
                as="h2"
                size="sm"
                color="gray.200"
                opacity="0.8"
                fontWeight="normal"
                textAlign="center">
                { t("auth.sign-in-summary")}
            </Heading>

            <Stack 
                as="form"
                spacing={4}
                align="center"
                onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.email && errors.email} isRequired>
                    <FormLabel htmlFor="email">{t("field.email")}</FormLabel>
                    <Input
                        type="email"
                        id="email"
                        placeholder={t("placeholder.email")}
                        {...register("email", { required: "error.auth_empty_email" })}/>
                    <FormErrorMessage>{t(errors.email && errors.email.message)}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password && errors.password} isRequired>
                    <FormLabel htmlFor="password">{t("field.password")}</FormLabel>
                    <InputGroup>
                        <Input 
                            pr="4.5rem"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder={t("placeholder.password")}
                            {...register("password", { required: "error.auth_empty_password", min: 8 })}/>
                        <InputRightElement width="4.5rem">
                            <Button variant="ghost" h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                                { t(showPassword ? "button.hide" : "button.show") }
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{t(errors.password && errors.password.message)}</FormErrorMessage>
                </FormControl>

                <Button colorScheme="blue" type="submit" mb="4" borderRadius="md" isLoading={isAuthenticating} loadingText={t("feedback.signing-in")}>
                    {t("button.sign-in")}
                </Button>
                <Button colorScheme="gray" variant="outline" leftIcon={<FaGoogle/>} onClick={onSignInWithGoogle}>
                    {t("button.sign-in-with-google")}
                </Button>
            </Stack>
            
            <Button 
                variant="link" 
                borderRadius="md"
                onClick={() => props.setMode("sign-up")} >
                {t("auth.sign-in-secondary-action")}
            </Button>
        </Stack>
    )
}

export default SignInForm;