import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Select,
    Stack,
} from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import history from "../../utils/history";
import { auth, firestore } from "../../index";

const GettingStartedLayout = () => {
    const { t } = useTranslation();

    return (
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
                { t("auth.getting-started-title") }
            </Heading>
            <Heading
                as="h2"
                size="sm"
                color="text.secondary"
                opacity="0.8"
                fontWeight="normal"
                textAlign="center">
                { t("auth.getting-started-summary")}
            </Heading>

            <InformationFormLayout/>
        </Stack>
    );
}

const InformationFormLayout = () => {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isProcessing, setProcessing] = React.useState(false);

    const onSubmit = (data) => {
        setProcessing(true);
        const uid = auth.currentUser.uid;
        const email = auth.currentUser.email;

        setDoc(doc(firestore, "users", uid), {
            userId: uid,
            email: email,
            ...data
        }).then(() => { history.push("/") })
        .catch((error) => { console.log(error) })
        .finally(() => { setProcessing(false) })
    }

    return (
        <Stack 
            as="form"
            spacing={4}
            align="center"
            onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.firstname && errors.firstname} isRequired>
                <FormLabel htmlFor="firstname">{t("field.firstname")}</FormLabel>
                <Input
                    type="text"
                    id="firstname"
                    placeholder={t("placeholder.firstname")}
                    {...register("firstname", { required: "error.auth_empty_firstname", min: 3 })}/>
                <FormErrorMessage>{t(errors.firstname && errors.firstname.message)}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.lastname && errors.lastname} isRequired>
                <FormLabel htmlFor="lastname">{t("field.lastname")}</FormLabel>
                <Input
                    type="text"
                    id="lastname"
                    placeholder={t("placeholder.lastname")}
                    {...register("lastname", { required: "error.auth_empty_lastname", min: 2 })}/>
                <FormErrorMessage>{t(errors.lastname && errors.lastname.message)}</FormErrorMessage>
            </FormControl>
            <FormControl id="gender">
                <FormLabel>{t("field.gender")}</FormLabel>
                <Select placeholder={t("placeholder.gender")} {...register("gender", { required: "error.auth_empty_gender"})}>
                    <option>{t("gender-option-male")}</option>
                    <option>{t("gender-option-female")}</option>
                    <option>{t("gender-option-unspecified")}</option>
                </Select>
            </FormControl>
            
            <Button type="submit" mb="4" borderRadius="md" isLoading={isProcessing} loadingText={t("feedback.signing-in")}>
                {t("button.continue")}
            </Button>
        </Stack>
    );
}

export default GettingStartedLayout;