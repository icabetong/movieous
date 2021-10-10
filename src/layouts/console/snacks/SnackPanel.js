import { useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Box,
    Button,
    HStack
} from "@chakra-ui/react";
import {
    HiPlus
} from "react-icons/hi";
import {
    SnackEditor, initialEditorState, editorReducer
} from "./SnackEditor";
import SnackList from "./SnackList";
import { collection, onSnapshot } from "firebase/firestore";
import { transform } from "../../../infrastructure/SnackRepository";
import { firestore } from "../../../index";

const SnackPanel = () => {
    const { t } = useTranslation();
    const [snacks, setSnacks] = useState([]);
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

    return (
        <Box>
            <HStack
                spacing={4}>
                <Button size="sm" leftIcon={<HiPlus/>} colorScheme="primary" onClick={onEditorCreate}>
                    {t("button.add")}
                </Button>
            </HStack>
            <SnackList snacks={snacks} onClick={onEditorUpdate}/>
            { editorState.snack &&
                <SnackEditor
                    key={editorState.snack.snackId}
                    snack={editorState.snack}
                    isOpen={editorState.isOpen} 
                    isCreate={editorState.isCreate}
                    onClose={onEditorDismiss}/>
            }
        </Box>
    )
}

export default SnackPanel;