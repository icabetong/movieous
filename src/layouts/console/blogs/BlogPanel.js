import { useEffect, useState, useReducer } from "react";
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
    useToast,
} from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";

import BlogEntryList from "./BlogList";
import { 
    BlogEditor, 
    initialEditorState,
    editorReducer
} from "./BlogEditor";
import { collection, onSnapshot } from "firebase/firestore";
import { transform, remove } from "../../../infrastructure/BlogEntryRepository";
import { firestore } from "../../../index";

const BlogPanel = () => {
    const { t } = useTranslation();
    const toast = useToast();
    const [entries, setEntries] = useState([]);
    const [entryToDelete, setEntryToDelete] = useState();
    const [state, dispatch] = useReducer(editorReducer, initialEditorState);

    const onDeleteEntry = (entry) => setEntryToDelete(entry);
    const onDeleteCancel = () => setEntryToDelete(undefined);
    const onDeleteConfirmed = () => {
        remove(entryToDelete)
            .then(() => toast({
                title: t("feedback.entry-removed"),
                status: "success",
                isClosable: true,
            }))
            .catch(error => toast({
                title: t("feedback.entry-remove-error"),
                description: error.message,
                status: "error",
                isClosable: true,
            })).finally(onDeleteCancel)
    }

    const onEditorCreate = () => dispatch({ type: "create" })
    const onEditorDismiss = () => dispatch({ type: "dismiss" })
    const onEditorUpdate = (entry) => dispatch({
        type: "update",
        payload: entry
    })

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, "entries"), (snapshot) => {
            setEntries(transform(snapshot));
        })
        return () => unsubscribe();
    }, [])

    return (
        <>
            <Box>
                <HStack
                    spacing={4}>
                    <Button size="sm" leftIcon={<HiPlus/>} colorScheme="primary" onClick={onEditorCreate}>
                        {t("button.add")}
                    </Button>
                </HStack>
                <BlogEntryList
                    entries={entries}
                    onClick={onEditorUpdate}
                    onDelete={onDeleteEntry}/>
            </Box>
            <BlogEditor 
                isOpen={state.isOpen}
                isCreate={state.isCreate}
                entry={state.entry}
                onClose={onEditorDismiss}/>
            { entryToDelete &&
                <Modal isOpen={entryToDelete && entryToDelete} onClose={onDeleteCancel}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>{t("modal.delete-snack-title")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {t("modal.delete-snack-body")}
                        <Box mt={4}>
                            { t("concat.about-to-delete")}
                            <Box as="span" color="primary.300" fontWeight="semibold">
                                { entryToDelete.title }
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
                            <Button
                                onClick={onDeleteCancel}>
                                { t("button.cancel") }
                            </Button>
                        </HStack>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
            }
        </>
    )
}

export default BlogPanel;