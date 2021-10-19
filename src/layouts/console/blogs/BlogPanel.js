import { useReducer } from "react";
import { useTranslation } from "react-i18next";
import {
    Box,
    Button,
    HStack,
} from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";

import { 
    BlogEditor, 
    initialEditorState,
    editorReducer
 } from "./BlogEditor";

const BlogPanel = () => {
    const { t } = useTranslation();
    const [state, dispatch] = useReducer(editorReducer, initialEditorState);

    const onEditorCreate = () => dispatch({ type: "create" })
    const onEditorDismiss = () => dispatch({ type: "dismiss" })
    const onEditorUpdate = (entry) => dispatch({
        type: "update",
        payload: entry
    })

    return (
        <>
            <Box>
                <HStack
                    spacing={4}>
                    <Button size="sm" leftIcon={<HiPlus/>} colorScheme="primary" onClick={onEditorCreate}>
                        {t("button.add")}
                    </Button>
                </HStack>
            </Box>
            <BlogEditor 
                isOpen={state.isOpen}
                entry={state.entry}
                isCreate={state.isCreate}
                onClose={onEditorDismiss}/>
        </>
    )
}

export default BlogPanel;