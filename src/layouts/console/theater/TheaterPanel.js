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
    useToast,
} from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";
import {
    TheaterEditor,
    initialState,
    editorReducer
} from "./TheaterEditor";
import TheaterList from "./ThreaterList";
import { collection, onSnapshot } from "firebase/firestore";
import { transform, remove } from "../../../infrastructure/TheaterRepository";
import { firestore } from "../../../index";

const TheaterPanel = () => {
    const { t } = useTranslation();
    const toast = useToast();
    const [theaters, setTheaters] = useState([]);
    const [theaterToDelete, setTheaterToDelete] = useState();
    const [editorState, editorDispatch] = useReducer(editorReducer, initialState);
    const onEditorCreate = () => editorDispatch({ type: "create" })
    const onEditorDismiss = () => editorDispatch({ type: "dismiss" })
    const onEditorUpdate = (theater) => editorDispatch({ payload: theater, type: "update" })

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, "theaters"), (snapshot) => {
            setTheaters(transform(snapshot));
        })
        return () => unsubscribe();
    }, []);

    const onDeleteTheater = (theater) => setTheaterToDelete(theater)
    const onDeleteCancel = () => setTheaterToDelete(undefined)
    const onDeleteConfirmed = () => {
        remove(theaterToDelete).then(() => toast({
            title: t("feedback.theater-removed"),
            status: "success",
            isClosable: true
        })).catch((error) => toast({
            title: t("feedback.theater-remove-error"),
            description: error.message,
            status: "error",
            isClosable: true,
        })).finally(() => onDeleteCancel())
    }

    return (
        <>
            <Box>
                <HStack
                    spacing={4}>
                    <Button 
                        size="sm" 
                        leftIcon={<HiPlus/>} 
                        colorScheme="primary"
                        onClick={onEditorCreate}>
                        {t("button.add")}
                    </Button>
                </HStack>
                <TheaterList
                    theaters={theaters}
                    onClick={onEditorUpdate}
                    onDelete={onDeleteTheater}/>
            </Box>
            { editorState.isOpen &&
                <TheaterEditor
                    isOpen={editorState.isOpen}
                    isCreate={editorState.isCreate}
                    theater={editorState.theater}
                    onClose={onEditorDismiss}/>
            }
            { theaterToDelete &&
                <Modal isOpen={theaterToDelete && theaterToDelete} onClose={onDeleteCancel}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>{t("modal.delete-theater-title")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {t("modal.delete-theater-body")}
                        <Box mt={4}>
                            { t("concat.about-to-delete")}
                            <Box as="span" color="primary.300" fontWeight="semibold">
                                { theaterToDelete.movie.title }
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

export default TheaterPanel;