import React from "react";
import { useTranslation } from "react-i18next"; 
import { useForm } from "react-hook-form";
import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Heading,
    Stack,
} from "@chakra-ui/react";
import Page from "../../sections/Page";

const AuthLayout = () => {
    const { t } = useTranslation();
    const [isSignIn, setSignIn] = React.useState(true);

    return (
        <Page>
            <Flex
                align="center"
                justify="center"
                direction={{base: "column-reverse", md: "row"}}
                wrap="no-wrap"
                minW={{base: "90%", md: "60%", lg: "60%"}}
                minH="70vh"
                px={{base: 0, md: 6}}
                mb={16}>
                <Stack
                    border="1px"
                    borderColor="surface.400"
                    borderRadius="md"
                    bg="surface.700"
                    spacing={{base: 2, md: 4}}
                    w={{base: "90%", md: "60%"}}
                    p={12}
                    align="center">
                    <Heading
                        as="h1"
                        size="lg"
                        fontWeight="bold"
                        color="primary.300"
                        textAlign="center" >
                        { t(isSignIn ? "auth.sign-in" : "auth.sign-up") }
                    </Heading>
                    <Heading
                        as="h2"
                        size="sm"
                        color="text.secondary"
                        opacity="0.8"
                        fontWeight="normal"
                        textAlign="center">
                        { t(isSignIn ? "auth.sign-in-summary" : "auth.sign-up-summary")}
                    </Heading>

                    {   isSignIn 
                        ? <SignInFormLayout />
                        : <SignUpFormLayout />
                    }
                    
                    <Button 
                        variant="ghost" 
                        borderRadius="md"
                        onClick={() => setSignIn(!isSignIn)} >
                        {t(isSignIn ? "auth.sign-in-secondary-action" : "auth.sign-up-secondary-action")}
                    </Button>
                </Stack>
            </Flex>
        </Page>
    )
}

const SignInFormLayout = () => {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = React.useState(false);

    const onSubmit = (data) => {
        console.log(data);
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

            <Button type="submit" mb="4" borderRadius="md">
                {t("auth.sign-in")}
            </Button>
        </Stack>
    )
}

const SignUpFormLayout = () => {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = React.useState(false);

    const onSubmit = (data) => {
        console.log(data);
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
                        {...register("password", { required: "error.auth_empty_password", min: 8 })}/>
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
                        {...register("confirm_password", { required: "error.auth_empty_confirm_password", min: 8 })}/>
                    <InputRightElement width="4.5rem">
                        <Button variant="ghost" h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                            { t(showPassword ? "button.hide" : "button.show") }
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{t(errors.confirm_password && errors.confirm_password)}</FormErrorMessage>
            </FormControl>
            
            <Button type="submit" mb="4" borderRadius="md">
                {t("auth.sign-up")}
            </Button>
        </Stack>
    )
}

export default AuthLayout;