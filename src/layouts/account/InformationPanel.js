import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useUserData } from "../../utils/auth";
import history from "../../utils/history";
import { auth } from "../../index";

const InformationPanel = () => {
    const { t } = useTranslation();
    const user = useUserData();
    const { register, handleSubmit } = useForm();

    const onSignOut = () => {
        auth.signOut();
        history.push("/auth");
    }

    return (
        <Box>
            <HStack spacing={4}>
                <Button size="sm" onClick={onSignOut}>{t("button.sign-out")}</Button>
                <Button size="sm">{t("button.change-password")}</Button>
                <Button size="sm">{t("button.reset-password")}</Button>
            </HStack>

            <Stack as="form" my={4} maxWidth="50%" spacing={4}>
                <Text fontWeight="medium" color="primary.300" mb={4}>
                    {t("account.information")}
                </Text>

                <FormControl id="firstname" isRequired>
                    <FormLabel>{t("field.firstname")}</FormLabel>
                    <Input
                        type="text"
                        defaultValue={user.firstname}
                        placeholder={t("placeholder.firstname")}
                        focusBorderColor="primary.300"/>
                </FormControl>
                <FormControl id="lastname" isRequired>
                    <FormLabel>{t("field.lastname")}</FormLabel>
                    <Input
                        type="text"
                        defaultValue={user.lastname}
                        placeholder={t("placeholder.lastname")}
                        focusBorderColor="primary.300"/>
                </FormControl>
                <FormControl id="email" isRequired>
                    <FormLabel>{t("field.email")}</FormLabel>
                    <Input
                        type="text"
                        defaultValue={user.email}
                        placeholder={t("placeholder.email")}
                        focusBorderColor="primary.300"/>
                </FormControl>
                <Button
                    type="submit"
                    colorScheme="primary">
                    { t("button.continue") }
                </Button>
            </Stack>
        </Box>
    )
}

export default InformationPanel;