import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Flex,
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
    Spinner,
    Stack,
    useToast
} from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { generate } from "../../../utils/id";
import { create, update, download } from "../../../infrastructure/BlogEntryRepository";
import 'react-markdown-editor-lite/lib/index.css';

export const BlogEditor = (props) => {
    const { t } = useTranslation();
    const [md, setMd] = useState("");
    const [isContentLoading, setContentLoading] = useState(false);
    const [isWritePending, setWritePending] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const editor = useRef(undefined);
    const toast = useToast();
    const parser = MarkdownIt();

    useEffect(() => {
        if (props.isOpen && !props.isCreate) {
            setContentLoading(true);
            download(props.entry && props.entry)
                .then((response) => setMd(response))
                .catch((error) => console.log(error))
                .finally(() => setContentLoading(false))
        }
    }, [props.entry, props.isOpen, props.isCreate]);

    const onEditorChange = ({ text }) => setMd(text);
    
    const onDismiss = () => {
        setMd("");
        props.onClose()
    }

    const onSubmit = (data) => {
        setWritePending(true);
        const markdown = new Blob([editor.current.getMdValue()], { type: "text/markdown" });

        const entry = {
            entryId: props.entry !== undefined ? props.entry.entryId : generate(),
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
                })).finally(() => {
                    setWritePending(false);
                    onDismiss()
                })
        } else {
            update(entry, markdown)
                .then(() => toast({
                    title: t("feedback.entry-updated"),
                    status: "success",
                    isClosable: true
                })).catch((error) => toast({
                    title: "feedback.entry-update-error",
                    description: error.message,
                    status: "error",
                    isClosable: true
                })).finally(() => {
                    setWritePending(false);
                    onDismiss()
                })
        }
    }

    return (
        <Modal isOpen={props.isOpen} onClose={onDismiss} size="full">
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
                                disabled={isWritePending}
                                defaultValue={props.entry ? props.entry.title : ""}
                                placeholder={t("placeholder.entry-title")}
                                {...register("title", { required: "feedback.empty-title" })} />
                            <FormHelperText>{errors.title && errors.title.message}</FormHelperText>
                        </FormControl>
                        
                        <Box fontSize="sm" color="gray.300">
                            {t("info.markdown-guide")}
                            <Link to="cheatsheet">
                                <Box as="span" color="white">
                                    {t("button.learn-more")}
                                </Box>
                            </Link>
                        </Box>

                        { !isContentLoading
                            ? <MdEditor
                                ref={editor}
                                value={md}
                                readOnly={isWritePending}
                                onChange={onEditorChange}
                                renderHTML={text => parser.render(text)}/>
                            : <Flex 
                                w="100%" 
                                h="100%"
                                alignItems="center"
                                justifyContent="center">
                                <Spinner size="lg"/>
                             </Flex>
                        }
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Stack direction="row" spacing={4}>
                        <Button
                            isLoading={isWritePending}
                            type="submit"
                            colorScheme="blue">
                            {t("button.save")}
                        </Button>
                        <Button
                            disabled={isWritePending}
                            onClick={onDismiss}>
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