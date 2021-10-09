import { useState, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Radio,
    RadioGroup,
    Stack,
    useToast,
} from "@chakra-ui/react";
import {
    HiPlus
} from "react-icons/hi"

import {
    VariantEditor, variantEditorState, variantEditorReducer
} from "./VariationEditor";
import { generate } from "../../../utils/id";
import { create, update } from "../../../infrastructure/SnackRepository";

export const SnackEditor = (props) => {
    const { t } = useTranslation();
    const [isWritePending, setWritePending] = useState(false);
    const [variations, setVariations] = useState(props.snack.variations ? new Map(Object.entries(props.snack.variations)) : new Map());
    const [editorState, editorDispatch] = useReducer(variantEditorReducer, variantEditorState);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const toast = useToast();

    const onEditorCreate = () => editorDispatch({ type: "create" })
    const onEditorDimiss = () => editorDispatch({ type: "dismiss" })

    const onSubmit = (data) => {
        setWritePending(true);
        const snack = {
            snackId: props.snack.snackId,
            variations: Object.fromEntries(variations),
            ...data
        }

        if (editorState.isCreate) {
            create(snack)
                .then(() => 
                    toast({  
                        title: t("feedback.snack-created"),
                        status: "success",
                        isClosable: true
                    })
                ).catch((error) => 
                    toast({
                        title: t("feedback.snack-create-error"),
                        description: error.message,
                        status: "error",
                        isClosable: true,
                    })
                ).finally(() => {
                    setWritePending(false);
                    onDismiss();
                })
        } else {
            update(snack)
                .then(() => {
                    toast({
                        title: t("feedback.snack-updated"),
                        status: "success",
                        isClosable: true
                    })
                }).catch((error) => 
                    toast({
                        title: t("feedback.snack-update-error"),
                        description: error.message,
                        status: "error",
                        isClosable: true,
                    })
                ).finally(() => {
                    setWritePending(false);
                    onDismiss();
                })
        }
    }

    const onDismiss = () => {
        setVariations(new Map());
        props.onClose();
    }

    const onEditorCommit = (data) => {
        const id = editorState.variation.variantId;

        const variants = variations;
        variants.set(id, {
            ...data,
            variantId: id, 
            price: parseFloat(data.price),
            quantity: parseInt(data.quantity)
        });
        setVariations(variants);

        editorDispatch({ type: "dismiss" });
    }

    const onVariantClicked = (variant) => {
        editorDispatch({
            type: "update",
            payload: variant
        })
    }

    return (
        <>
            <Modal isOpen={props.isOpen} onClose={onDismiss}>
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>{t("modal.editor-snack-create")}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                    <Stack
                        spacing={4}
                        align="center">
                        <FormControl id="name" isRequired>
                            <FormLabel>{t("field.snack-name")}</FormLabel>
                            <Input 
                                type="text"
                                defaultValue={props.snack.name}
                                placeholder={t("placeholder.snack-name")}
                                focusBorderColor="primary.300"
                                {...register("name", { required: "error.snack-name-empty"})}/>
                            <FormErrorMessage>{t(errors.name && errors.name.message)}</FormErrorMessage>
                        </FormControl>
                        <FormControl as="fieldset">
                            <FormLabel as="legend">{t("field.snack-type")}</FormLabel>
                            <RadioGroup defaultValue={props.snack.type} {...register("type")}>
                                <Stack direction="row" spacing="24px">
                                    <Radio value="food" colorScheme="primary">{t("field.type-food")}</Radio>
                                    <Radio value="drink" colorScheme="primary">{t("field.type-drink")}</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>{t("field.variations")}</FormLabel>
                            { variations &&
                                Array.from(variations.values())
                                    .map(v => 
                                        <Variation 
                                            key={v.variantId}
                                            variant={v} 
                                            onClick={onVariantClicked}/>
                                    ) 
                            } 
                            <Center>
                                <Button 
                                    size="sm" 
                                    leftIcon={<HiPlus/>}
                                    onClick={onEditorCreate}>
                                        {t("button.add")}
                                </Button>
                            </Center>
                        </FormControl>
                    </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Stack spacing={4} direction="row">
                            <Button 
                                colorScheme="primary" 
                                isLoading={isWritePending}
                                type="submit">
                                {t("button.save")}
                            </Button>
                            <Button onClick={onDismiss}>{t("button.cancel")}</Button>
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            { editorState.variation &&
                <VariantEditor 
                    key={editorState.variation.variationId}
                    isOpen={editorState.isOpen} 
                    isCreate={editorState.isCreate}
                    variation={editorState.variation}
                    onClose={onEditorDimiss}
                    onCommit={onEditorCommit}/>
            }
        </>
    )
}

const Variation = (props) => {
    const { t } = useTranslation();

    return (
        <Box 
            cursor="pointer" 
            display="flex" 
            flexDirection="column" 
            alignItems="baseline"
            onClick={() => props.onClick(props.variant)}>
            <Box fontWeight="medium">
                {props.variant.name}
                <Box as="span" color="gray.600" fontSize="sm">
                    {t("concat.available", { stock: props.variant.quantity })}
                </Box>
            </Box>
            <Box color="gray.400">
                {t("concat.price", { price: props.variant.price.toFixed(2) })}
            </Box>
        </Box>
    )
}

export const initialEditorState = {
    snack: { snackId: generate(), type: "food" },
    isCreate: false,
    isOpen: false,
}
export const editorReducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
        case "create":
            return {
                snack: { snackId: generate(), type: "food" },
                isCreate: true,
                isOpen: true
            }
        case "update":
            return {
                snack: payload,
                isCreate: false,
                isOpen: true
            }
        case "dismiss":
            return {
                ...state,
                isOpen: false,
                snack: undefined
            }
        default: return state;
    }
}