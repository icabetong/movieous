import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react";
import { sendPasswordResetEmail } from "@firebase/auth";
import { useUserData } from "../../utils/auth";
import history from "../../utils/history";
import { auth } from "../../index";

const InformationPanel = () => {
    const { t } = useTranslation();
    const toast = useToast();
    const user = useUserData();
    const [requestSignOut, setRequestSignOut] = useState(false);
    const [requestChangePassword, setRequestChangePassword] = useState(false);
    const [requestResetPassword, setRequestResetPassword] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSignOutRequest = () => setRequestSignOut(true);
    const onSignOutDismiss = () => setRequestSignOut(false);
    const onSignOut = () => {
        auth.signOut();
        history.push("/auth");
    }

    const onResetPasswordRequest = () => setRequestResetPassword(true);
    const onResetPasswordDismiss = () => setRequestResetPassword(false);
    const onResetPasswordConfirm = () => {
        const email = auth.currentUser.email;
        if (email) {
            sendPasswordResetEmail(auth, email)
                .then(() => toast({
                    title: "feedback.reset-password-email-sent",
                    status: "info",
                    isClosable: true
                })
                ).catch((error) => toast({
                    title: "feedback.reset-password-email-error",
                    description: error.message,
                    status: "error",
                    isClosable: true
                })
                ).finally(() => onResetPasswordDismiss())
        }
    }

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Box>
            <HStack spacing={4}>
                <Button size="sm" onClick={onSignOutRequest}>{t("button.sign-out")}</Button>
                <Button size="sm">{t("button.change-password")}</Button>
                <Button size="sm" onClick={onResetPasswordRequest}>{t("button.reset-password")}</Button>
            </HStack>

            <Stack 
                as="form" 
                my={4} 
                maxWidth="50%" 
                spacing={4}
                onSubmit={handleSubmit(onSubmit)}>
                <Text fontWeight="medium" color="primary.300" mb={4}>
                    {t("account.information")}
                </Text>

                <FormControl id="firstname" isRequired>
                    <FormLabel>{t("field.firstname")}</FormLabel>
                    <Input
                        type="text"
                        defaultValue={user.firstname}
                        placeholder={t("placeholder.firstname")}
                        focusBorderColor="primary.300"
                        {...register("firstname", { required: true })}/>
                </FormControl>
                <FormControl id="lastname" isRequired>
                    <FormLabel>{t("field.lastname")}</FormLabel>
                    <Input
                        type="text"
                        defaultValue={user.lastname}
                        placeholder={t("placeholder.lastname")}
                        focusBorderColor="primary.300"
                        {...register("lastname", { required: true })}/>
                </FormControl>
                <FormControl id="email" isRequired>
                    <FormLabel>{t("field.email")}</FormLabel>
                    <Input
                        type="text"
                        defaultValue={user.email}
                        placeholder={t("placeholder.email")}
                        focusBorderColor="primary.300"
                        {...register("email", { required: true })}/>
                </FormControl>
                <Button
                    type="submit"
                    colorScheme="primary">
                    { t("button.save") }
                </Button>
            </Stack>
            { requestSignOut &&
                <Modal isOpen={requestSignOut} onClose={onSignOutDismiss}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>{t("modal.sign-out-title")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{t("modal.sign-out-body")}</ModalBody>

                    <ModalFooter>
                        <Stack direction="row" spacing={4}>
                            <Button
                                colorScheme="primary"
                                onClick={onSignOut}>
                                {t('button.sign-out')}
                            </Button>
                            <Button
                                onClick={onSignOutDismiss}>
                                {t("button.cancel")}
                            </Button>
                        </Stack>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
            }
            { requestResetPassword &&
                <Modal isOpen={requestResetPassword} onClose={onResetPasswordDismiss}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>{t("modal.request-password-title")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{t("modal.request-password-body")}</ModalBody>

                    <ModalFooter>
                        <Stack direction="row" spacing={4}>
                            <Button
                                colorScheme="primary"
                                onClick={onResetPasswordConfirm}>
                                {t('button.send')}
                            </Button>
                            <Button
                                onClick={onResetPasswordDismiss}>
                                {t("button.cancel")}
                            </Button>
                        </Stack>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
            }
        </Box>
    )
}

export default InformationPanel;