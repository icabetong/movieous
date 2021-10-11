import { useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Box,
    Button,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast
} from "@chakra-ui/react";
import {
    HiPlus
} from "react-icons/hi";
import {
    SnackEditor, initialEditorState, editorReducer
} from "./SnackEditor";
import SnackList from "./SnackList";
import { collection, onSnapshot } from "firebase/firestore";
import { transform, remove } from "../../../infrastructure/SnackRepository";
import { firestore } from "../../../index";

const SnackPanel = () => {
    const { t } = useTranslation();
    const toast = useToast();
    const [snacks, setSnacks] = useState([]);
    const [snackToDelete, setSnackToDelete] = useState();
    const [editorState, editorDispatch] = useReducer(editorReducer, initialEditorState);
    const onEditorCreate = () => editorDispatch({ type: "create" })
    const onEditorDismiss = () => editorDispatch({ type: "dismiss" })
    const onEditorUpdate = (snack) => editorDispatch({ type: "update", payload: snack })

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, "snacks"), (snapshot) => {
            setSnacks(transform(snapshot));
        });
        return () => unsubscribe();
    }, []);

    const onDeleteSnack = (snack) => setSnackToDelete(snack)
    const onDeleteCancel = () => setSnackToDelete(undefined)
    const onDeleteConfirmed = () => {
        remove(snackToDelete)
            .then(() => toast({
                title: t("feedback.snack-removed"),
                status: "success",
                isClosable: true
            }))
            .catch((error) => toast({
                title: t("feedback.snack-remove-error"),
                description: error.message,
                status: "error",
                isClosable: true,
            }))
            .finally(() => onDeleteCancel())
    }

    return (
        <Box>
            <HStack
                spacing={4}>
                <Button size="sm" leftIcon={<HiPlus/>} colorScheme="primary" onClick={onEditorCreate}>
                    {t("button.add")}
                </Button>
            </HStack>
            <SnackList 
                snacks={snacks} 
                onClick={onEditorUpdate}
                onDelete={onDeleteSnack}/>
            { editorState.snack &&
                <SnackEditor
                    key={editorState.snack.snackId}
                    snack={editorState.snack}
                    isOpen={editorState.isOpen} 
                    isCreate={editorState.isCreate}
                    onClose={onEditorDismiss}/>
            }
            { snackToDelete &&
                <Modal isOpen={snackToDelete && snackToDelete} onClose={onDeleteCancel}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>{t("modal.delete-snack-title")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {t("modal.delete-snack-body")}
                        <Box mt={4}>
                            { t("concat.about-to-delete")}
                            <Box as="span" color="primary.300" fontWeight="semibold">
                                { snackToDelete.name }
                            </Box>
                        </Box>
                    </ModalBody>
            
                    <ModalFooter>
                        <HStack spacing={4}>
                            <Button
                                colorScheme="primary"
                                onClick={onDeleteConfirmed}>
                                { t("button.delete") }
                            </Button>
                            <Button>
                                { t("button.cancel") }
                            </Button>
                        </HStack>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
            }
        </Box>
    )
}

export default SnackPanel;