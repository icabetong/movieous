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

const SnackPanel = () => {
    const { t } = useTranslation();
    const [editorState, editorDispatch] = useReducer(editorReducer, initialEditorState);
    const onEditorCreate = () => editorDispatch({ type: "create" })
    const onEditorDismiss = () => editorDispatch({ type: "dismiss" })

    return (
        <Box>
            <HStack
                autoFlow="column"
                spacing={4}>
                <Button size="sm" leftIcon={<HiPlus/>} colorScheme="primary" onClick={onEditorCreate}>
                    {t("button.add")}
                </Button>
                <Button size="sm" leftIcon={<HiRefresh/>}>
                    {t("button.refresh")}
                </Button>
            </HStack>
            <SnackEditor isOpen={editorState.isOpen} onClose={onEditorDismiss}/>
        </Box>
    )
}

export default SnackPanel;