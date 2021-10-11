import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    Flex,
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
    Spacer,
    Stack,
} from "@chakra-ui/react";
import {
    BiDollar
} from "react-icons/bi";
import { generate } from "../../../utils/id";

export const VariantEditor = (props) => {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => { props.onCommit(data); };
    const onDismiss = () => { props.onClose() }

    return (
        <Modal isOpen={props.isOpen} onClose={onDismiss}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>{t(props.isCreate ? "modal.editor-variant-create" : "modal.editor-variant-update")}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Stack spacing={4}>
                    <FormControl id="name" isInvalid={errors.name} isRequired>
                        <FormLabel>{t("field.variant-name")}</FormLabel>
                        <Input 
                            type="text"
                            placeholder={t("placeholder.variant-name")}
                            defaultValue={props.variation.name ? props.variation.name : "" }
                            focusBorderColor="primary.300"
                            {...register("name", { required: "error.empty-name" })}/>
                    </FormControl>
                    <FormControl id="quantity" isRequired>
                        <FormLabel>{t("field.quantity")}</FormLabel>
                        <NumberInput
                            max={15} 
                            min={1}
                            defaultValue={props.variation.quantity ? props.variation.quantity : 1 }
                            focusBorderColor="primary.300" >
                            <NumberInputField
                                {...register("quantity", { required: "error.empty-quantity" })}/>
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
                                step="0.01"
                                defaultValue={props.variation.price ? props.variation.price : 0 }
                                focusBorderColor="primary.300"
                                placeholder={t("placeholder.price")}
                                {...register("price", { required: "error.empty-price" })} />
                        </InputGroup>
                    </FormControl>
                </Stack>
            </ModalBody>

            <ModalFooter>
                <Flex width="100%">
                    <Box>
                        <Button
                            disabled={props.isCreate}
                            onClick={() => props.onDelete(props.variation)}>
                            {t("button.delete")}
                        </Button>
                    </Box>
                    <Spacer/>
                    <Stack direction="row" spacing={4}>
                        <Button 
                            colorScheme="primary" 
                            type="submit">
                            {t("button.save")}
                        </Button>
                        <Button onClick={onDismiss}>{t("button.cancel")}</Button>
                    </Stack>
                </Flex>
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
                variation: { variantId: generate(), name: "", quantity: 0, price: 0 },
                isCreate: true,
                isOpen: true,
            }
        case "update": 
            return {
                variation: payload,
                isCreate: false,
                isOpen: true
            }
        case "dismiss":
            return {
                ...state,
                isOpen: false,
                variation: undefined
            }
        default: return state;
    }
}