import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
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
import { sendPasswordResetEmail, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "@firebase/auth";
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

    const onChangePasswordRequest = () => setRequestChangePassword(true);
    const onChangePasswordDismiss = () => setRequestChangePassword(false);

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
                <Button size="sm" onClick={onChangePasswordRequest}>{t("button.change-password")}</Button>
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
            { requestChangePassword &&
                <ChangePasswordModal
                    isOpen={requestChangePassword}
                    onClose={onChangePasswordDismiss} />
            }
            { requestResetPassword &&
                <Modal isOpen={requestResetPassword} onClose={onResetPasswordDismiss}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>{t("modal.request-password-title")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody> {t("modal.request-password-body")}</ModalBody>

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

const ChangePasswordModal = (props) => {
    const { t } = useTranslation();
    const toast = useToast();
    const [authPending, setAuthPending] = useState(false);
    const { register, handleSubmit, formState: { errors }, setError } = useForm();

    const onSubmit = (data) => {
        setAuthPending(true);
        const oldPassword = data.old_password;
        const newPassword = data.new_password;
        const confirmPassword = data.confirm_password;
        if (newPassword !== confirmPassword) {
            setAuthPending(false);
            setError("new_password", {
                type: "manual",
                message: t("error.passwords-not-matched")
            }, { shouldFocus: true })
            return;
        }

        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        reauthenticateWithCredential(user, credential)
            .then(() => {
                updatePassword(user, newPassword)
                    .then(() => toast({
                        title: t("feedback.changed-password"),
                        status: "success",
                        isClosable: true
                    })).catch((error) => toast({
                        title: t("error.changed-password"),
                        description: error.message,
                        status: "error",
                        isClosable: true
                    }))
            }).catch(() => 
                setError("old_password", {
                    type: "manual",
                    message: t("error.auth-invalid-password")
                }, { shouldFocus: true })
            ).finally(() => {
                props.onClose();
                setAuthPending(false);
            })
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader>{t("modal.change-password-title")}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {t("modal.change-password-body")}
                    <Stack direction="column" spacing={4} mt={4}>
                        <FormControl id="old-password" isRequired>
                            <FormLabel>{t("field.old-password")}</FormLabel>
                            <Input
                                type="password"
                                placeholder={t("placeholder.password")}
                                focusBorderColor="primary.300"
                                {...register("old_password", { required: true })}/>
                        </FormControl>
                        <FormControl id="new-password" isRequired isInvalid={errors.new_password && errors.new_password}>
                            <FormLabel>{t("field.new-password")}</FormLabel>
                            <Input
                                type="password"
                                placeholder={t("placeholder.password")}
                                focusBorderColor="primary.300"
                                {...register("new_password", { required: true })}/>
                            <FormErrorMessage>{errors.new_password && errors.new_password.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl id="confirm-password" isRequired>
                            <FormLabel>{t("field.confirm-password")}</FormLabel>
                            <Input
                                type="password"
                                placeholder={t("placeholder.password")}
                                focusBorderColor="primary.300"
                                {...register("confirm_password", { required: true })}/>
                        </FormControl>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Stack direction="row" spacing={4}>
                        <Button
                            type="submit"
                            colorScheme="primary"
                            isLoading={authPending}
                            loadingText={t("feedback.authenticating")}
                            onClick={props.onConfirm}>
                            {t('button.change-password')}
                        </Button>
                        <Button
                            onClick={props.onClose}>
                            {t("button.cancel")}
                        </Button>
                    </Stack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default InformationPanel;