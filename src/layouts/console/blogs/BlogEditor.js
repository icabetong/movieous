import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Stack,
    useToast
} from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { generate } from "../../../utils/id";
import { create } from "../../../infrastructure/BlogEntryRepository";
import 'react-markdown-editor-lite/lib/index.css';

export const BlogEditor = (props) => {
    const { t } = useTranslation();
    const toast = useToast();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const editor = useRef(undefined);
    const parser = MarkdownIt();

    const onSubmit = (data) => {
        const markdown = new Blob([editor.current.getMdValue()], { type: "text/markdown"} );

        const entry = {
            entryId: generate(),
            title: data.title,
        }
        if (props.isCreate) {
            create(entry, markdown)
                .then(() => toast({
                    title: t("feedback.entry-created"),
                    status: "success",
                    isClosable: true
                })).catch((error) => toast({
                    title: t("feedback.entry-create-error"),
                    desc: error.message,
                    status: "error",
                    isClosable: true
                })).finally(props.onClose)
        }
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} size="full">
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader>{t(props.isCreate ? "modal.editor-blog-create" : "modal.editor-blog-update")}</ModalHeader>
                <ModalCloseButton />
                <ModalBody h="100%">
                    <Stack p={4} h="80vh" spacing={4}>
                        <FormControl id="title">
                            <FormLabel>{t("field.title")}</FormLabel>
                            <Input 
                                type="text"
                                defaultValue={props.entry ? props.entry.title : ""}
                                placeholder={t("placeholder.entry-title")}
                                focusBorderColor="primary.300"
                                {...register("title", { required: "feedback.empty-title" })} />
                            <FormHelperText>{errors.title && errors.title.message}</FormHelperText>
                        </FormControl>

                        <MdEditor
                            ref={editor}
                            renderHTML={text => parser.render(text)}/>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Stack direction="row" spacing={4}>
                        <Button
                            type="submit"
                            colorScheme="primary">
                            {t("button.save")}
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

export const initialEditorState = {
    entry: { entryId: generate() },
    isCreate: false,
    isOpen: false
}
export const editorReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case "create":
            return {
                entry: { entryId: generate() },
                isCreate: true,
                isOpen: true
            }
        case "update":
            return {
                entry: payload,
                isCreate: false,
                isOpen: true
            }
        case "dismiss":
            return {
                ...state,
                isOpen: false,
                entry: undefined
            }
        default: return state;
    }
}