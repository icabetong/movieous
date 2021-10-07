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
    Stack,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../index";

const SignUpFormLayout = (props) => {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const [showPassword, setShowPassword] = React.useState(false);
    const [isCreating, setCreating] = React.useState(false);

    const onSubmit = (data) => {
        const { email, password } = data;
        setCreating(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => { props.setCreatedAccount(true) })
            .catch((error) => { console.log(error) })
            .finally(() => setCreating(false))
    }

    return (
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
                    isDisabled={isCreating}
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
                        placeholder={t("field.password")}
                        isDisabled={isCreating}
                        {...register("password", { 
                            required: "error.auth_empty_password", 
                            min: 8,
                            validate: value => value === getValues("confirm_password")
                    })}/>
                    <InputRightElement width="4.5rem">
                        <Button variant="ghost" h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                            { t(showPassword ? "button.hide" : "button.show") }
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{t(errors.password && errors.password.message)}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.confirm_password && errors.confirm_password} isRequired>
                <FormLabel htmlFor="password">{t("field.confirm-password")}</FormLabel>
                <InputGroup>
                    <Input 
                        pr="4.5rem"
                        id="confirm_password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t("field.confirm-password")}
                        isDisabled={isCreating}
                        {...register("confirm_password", { 
                            required: "error.auth_empty_confirm_password", 
                            min: 8,
                            validate: value => value === getValues("password")
                    })}/>
                    <InputRightElement width="4.5rem">
                        <Button variant="ghost" h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                            { t(showPassword ? "button.hide" : "button.show") }
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{t(errors.confirm_password && errors.confirm_password)}</FormErrorMessage>
            </FormControl>
            
            <Button type="submit" mb="4" borderRadius="md" isLoading={isCreating} loadingText={t("feedback.creating-account")}>
                {t("button.sign-up")}
            </Button>
        </Stack>
    )
}

export default SignUpFormLayout;