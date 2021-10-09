import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Stack,
} from "@chakra-ui/react";
import {
    BiDollar
} from "react-icons/bi";
import { generate } from "../../../utils/id";

export const VariantEditor = (props) => {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit(props.onCommit)}>
            <ModalHeader>{t(props.isCreate ? "modal.editor-variant-create" : "modal.editor-variant-update")}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Stack spacing={4}>
                    <input 
                        type="hidden" 
                        value={props.variation.variantId}
                        {...register("variantId")}/>
                    <FormControl id="name" isInvalid={errors.name} isRequired>
                        <FormLabel>{t("field.variant-name")}</FormLabel>
                        <Input 
                            type="name"
                            focusBorderColor="primary.300"
                            {...register("name", { required: "error.empty-variant-name"})} />
                    </FormControl>
                    <FormControl id="quantity" isRequired>
                        <FormLabel>{t("field.quantity")}</FormLabel>
                        <NumberInput 
                            max={15} 
                            min={1}
                            defaultValue={1}
                            focusBorderColor="primary.300"
                            {...register("quantity")}>
                            <NumberInputField />
                            <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <FormControl id="price" isRequired>
                        <FormLabel>{t("field.price")}</FormLabel>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<BiDollar color="gray.300" />}/>
                            <Input 
                                type="number" 
                                focusBorderColor="primary.300"
                                placeholder={t("placeholder.price")}
                                {...register("price", { required: "error.empty-price"})} />
                        </InputGroup>
                    </FormControl>
                </Stack>
            </ModalBody>

            <ModalFooter>
                <Stack spacing={4} direction="row">
                    <Button 
                        colorScheme="primary" 
                        type="submit">
                        {t("button.save")}
                    </Button>
                    <Button onClick={props.onClose}>{t("button.cancel")}</Button>
                </Stack>
            </ModalFooter>
            </ModalContent>
      </Modal>
    )
}

export const variantEditorState = {
    variation: { variantId: generate() },
    isCreate: false,
    isOpen: false
}

export const variantEditorReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case "create":
            return {
                ...state,
                isCreate: true,
                isOpen: true,
            }
        case "update": 
            return {
                variation: payload,
                isCreate: true,
                isOpen: true
            }
        case "dismiss":
            return {
                ...state,
                isOpen: false,
                variation: { variantId: generate() }
            }
        default: return state;
    }
}