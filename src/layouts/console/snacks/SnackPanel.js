import { useReducer } from "react";
import { useTranslation } from "react-i18next";
import {
    Box,
    Button,
    HStack
} from "@chakra-ui/react";
import {
    HiPlus,
    HiRefresh
} from "react-icons/hi";
import {
    SnackEditor, initialEditorState, editorReducer
} from "./SnackEditor";
import "firebase/compat/firestore";

const SnackPanel = () => {
    const { t } = useTranslation();
    const [editorState, editorDispatch] = useReducer(editorReducer, initialEditorState);
    const onEditorCreate = () => editorDispatch({ type: "create" })
    const onEditorDismiss = () => editorDispatch({ type: "dismiss" })

    return (
        <Box>
            <HStack
                spacing={4}>
                <Button size="sm" leftIcon={<HiPlus/>} colorScheme="primary" onClick={onEditorCreate}>
                    {t("button.add")}
                </Button>
                <Button size="sm" leftIcon={<HiRefresh/>}>
                    {t("button.refresh")}
                </Button>
            </HStack>
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