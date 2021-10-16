import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
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
    Switch,
    useToast,
} from "@chakra-ui/react";
import MoviePicker from "./MoviePicker";
import { create, update } from "../../../infrastructure/TheaterRepository";
import { generate } from "../../../utils/id";

export const TheaterEditor = (props) => {
    const { t } = useTranslation();
    const toast = useToast();
    const [isWritePending, setWritePending] = useState(false);
    const [isPickerOpen, setPickerOpen] = useState(false);
    const [movie, setMovie] = useState(props.isCreate ? {} : props.theater.movie);
    const { register, handleSubmit } = useForm();

    const onPickerShow = () => setPickerOpen(true);
    const onPickerDismiss = () => setPickerOpen(false);

    const onSubmit = (data) => {
        setWritePending(true)
        let theater = {
            theaterId: generate(),
            movie: { ...movie },
            totalSeats: parseInt(data.totalSeats),
            freeSeats: parseInt(data.freeSeats),
            price: parseFloat(data.price)
        }
        
        if (props.isCreate) {
            create(theater).then(() => toast({
                title: t("feedback.theater-created"),
                status: "success",
                isClosable: true,
            })).catch((error) => toast({
                title: t("feedback.theater-create-error"),
                description: error.message,
                status: "error",
                isClosable: true,
            })).finally(() => {
                setWritePending(false);
                props.onClose();
            })
        } else {
            update(theater).then(() => toast({
                title: t("feedback.theater-updated"),
                status: "success",
                isClosable: true
            })).catch((error) => toast({
                title: t("feedback.theater-update-error"),
                description: error.message,
                status: "error",
                isClosable: true
            })).finally(() => {
                setWritePending(false);
                props.onClose();
            })
        }
    }

    const onMovieSelect = (e, movie) => {
        e.preventDefault();

        setMovie(movie);
        onPickerDismiss();
    }

    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>{t(props.isCreate ? "modal.editor-theater-create" : "modal.editor-theater-update")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack
                            spacing={4}
                            align="center">
                            <FormControl>
                                <FormLabel>{t("field.movie")}</FormLabel>
                                <InputGroup>
                                    <Input 
                                        pr="4.5rem" 
                                        defaultValue={movie !== undefined ? movie.title : ""}
                                        placeholder={t("placeholder.movie")}
                                        focusBorderColor="primary.300"
                                        isReadOnly/>
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={onPickerShow}>
                                            {t("button.pick")}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <FormLabel>{t("field.price")}</FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                        fontSize="1.2em"
                                        children="$"/>
                                    <Input 
                                        step="0.01"
                                        defaultValue={props.isCreate ? 0 : props.theater.price}
                                        placeholder={t("placeholder.price")}
                                        focusBorderColor="primary.300"
                                        {...register("price")}/>
                                </InputGroup>
                            </FormControl>

                            <FormControl id="seats">
                                <FormLabel>{t("field.total-seats")}</FormLabel>
                                <NumberInput 
                                    focusBorderColor="primary.300"
                                    defaultValue={props.isCreate ? 0 : props.theater.seats} 
                                    min={0} 
                                    max={100}>
                                    <NumberInputField {...register("totalSeats")}/>
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>

                            <input type="hidden" value={props.theater.freeSeats} {...register("freeSeats")}/>

                            <FormControl display="flex" alignItems="center">
                                <FormLabel htmlFor="active" mb="0">
                                    { t("field.is-active") }
                                </FormLabel>
                                <Switch 
                                    id="active" 
                                    colorScheme="primary"
                                    {...register("is-active")}/>
                            </FormControl>
                        </Stack>
                    </ModalBody>    

                <ModalFooter>
                    <Stack spacing={4} direction="row">
                        <Button 
                            isLoading={isWritePending}
                            colorScheme="primary"
                            type="submit">
                            {t("button.save")}
                        </Button>
                        <Button onClick={props.onClose}>{t("button.cancel")}</Button>
                    </Stack>
                </ModalFooter>
                </ModalContent>
            </Modal>
            <MoviePicker
                isOpen={isPickerOpen}
                onItemSelect={onMovieSelect}
                onClose={onPickerDismiss}/>
        </>
    );
}

export const initialState = {
    theater: { theaterId: generate() },
    isOpen: false,
    isCreate: true,
}
export const editorReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case "create":
            return {
                theater: { theaterId: generate() },
                isCreate: true,
                isOpen: true,
            }
        case "update":
            return {
                theater: payload,
                isCreate: false,
                isOpen: true,
            }
        case "dismiss": 
            return {
                ...state,
                isOpen: false,
                movie: undefined,
            }
        default: return state;
    }
}