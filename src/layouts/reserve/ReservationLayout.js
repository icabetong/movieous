import { useEffect, useState, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { 
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    GridItem,
    Heading,
    HStack,
    Image,
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
    SimpleGrid,
    Stack,
    Text,
    useRadio,
    useRadioGroup,
    useToast
} from "@chakra-ui/react";
import { collection, doc, onSnapshot } from "firebase/firestore";

import Page from "../../components/Page";
import { buildImageUrl } from "../../infrastructure/MovieRepository";
import { transform } from "../../infrastructure/SnackRepository";
import { reserve } from "../../infrastructure/ReservationRepository";
import { useAuthState } from "../../utils/auth";
import { firestore } from "../../index";
import { generate } from "../../utils/id";

const ReservationLayout = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [theater, setTheater] = useState({});
    const [snacks, setSnacks] = useState([]);
    const [seats, setSeats] = useState(1);
    const [selectedSnack, setSelectedSnack] = useState({});
    const { handleSubmit, setValue } = useForm();
    const [state, dispatcher] = useReducer(reducer, initialSelectorState);

    const onSelectorView = () => dispatcher({ type: "select" });
    const onSelectorDismiss = () => dispatcher({ type: "dismiss" });

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(firestore, "theaters", id), (snapshot) => {
            setTheater(snapshot.data());
        })
        return () => unsubscribe();
    }, [id]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, "snacks"), (snapshot) => {
            setSnacks(transform(snapshot));
        })
        return () => unsubscribe();
    }, []);

    const onSubmit = (data) => {
        setSelectedSnack(JSON.parse(data.snack));
        
        onSelectorView();
    }

    return (
        <Page title="navigation.reservation">
            <Flex
                justify={{base: "center", md: "space-around", xl: "space-between"}}
                direction={{base: "column-reverse", md: "row"}}
                wrap="no-wrap"
                minH="70vh"
                px={8}
                mt={8}
                mb={16}>
                <Stack
                    spacing={4}
                    w={{base: "100%", md: "40%"}}
                    align={['center', 'center', 'flex-start', 'flex-start']} >
                    <Heading
                        as="h1"
                        size="xl"
                        fontWeight="bold"
                        color="blue.500"
                        textAlign={['center', 'center', "left", 'left']}>
                        {theater.movie ? theater.movie.title : ""}
                    </Heading>
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2">
                        {t("concat.rating", { rating: theater.movie ? theater.movie.vote_average : 0})}
                    </Box>
                    <Text
                        size="md"
                        color="gray.200"
                        opacity="0.8"
                        fontWeight="normal"
                        lineHeight={1.5}
                        textAlign={["center", "center", "left", "left"]}>
                        {theater.movie ? theater.movie.overview : ""}
                    </Text>
                    <Text>{t("concat.release-date", { date: theater.movie ? theater.movie.release_date : "" })}</Text>

                    <Box fontWeight="medium" fontSize="xl">{ t("concat.available-seats", { free: parseInt(theater.freeSeats) }) }</Box>
                    <Box fontWeight="medium" fontSize="lg">{ t("concat.price", { price: parseFloat(theater.price).toFixed(2) }) }</Box>

                    <Box
                        fontSize="lg"
                        fontWeight="medium"
                        color="blue.300">
                        {t("field.available-snacks")}
                    </Box>

                    <Stack 
                        width="100%"
                        as="form"
                        onSubmit={handleSubmit(onSubmit)} 
                        spacing={8}>

                        <FormControl id="seats">
                            <FormLabel>{t("field.seats-to-reserve")}</FormLabel>
                            <NumberInput min={1} defaultValue={1} onChange={(s, v) => setSeats(parseInt(v))}>
                                <NumberInputField value={seats}/>
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <SnackList
                            maxW="100%"
                            snacks={snacks}
                            setValue={setValue}/>

                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems={{base: "center", md: "baseline"}}>
                            <Button
                                disabled={theater.free < 1}
                                colorScheme="blue"
                                type="submit" 
                                borderRadius="8px" 
                                lineHeight="1" >
                                {t("button.reserve")}
                            </Button>
                        </Box>

                    </Stack>
                </Stack>
                <Box display="flex" justifyContent="center" w={{ base: "100%", sm: "100%", md: "50%" }} mb={{ base: 12, md: 0 }}>
                    <Image loading="lazy" src={theater.movie ? buildImageUrl(theater.movie.poster_path) : ""} size="100%" rounded="1rem" shadow="2xl" />
                </Box>
            </Flex>
            { selectedSnack &&
                <SnackVariationSelector
                    isOpen={state.isOpen}
                    theater={theater.theaterId}
                    movie={theater.movie}
                    snack={selectedSnack}
                    seats={seats}
                    variations={selectedSnack.variations}
                    onClose={onSelectorDismiss}/>}
        </Page>
    )
}

const SnackList = (props) => {
    const { getRootProps, getRadioProps } = useRadioGroup({ 
        name: "snack", 
        onChange: (v) => props.setValue("snack", v)
    });

    const group = getRootProps();
    return (
        <SimpleGrid 
            {...group}
            columns={{ base: 1, sm: 2, md: 3 }}
            spacing={4}>
            {props.snacks.map((snack) => {
                return (
                    <SnackItem 
                        key={snack.snackId}
                        snack={snack} 
                        {...getRadioProps({ value: JSON.stringify(snack) })}/>
                )
            })}
        </SimpleGrid>
    )
}

const SnackItem = (props) => {
    const { t } = useTranslation();
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    const variants = Object.values(props.snack.variations);
    const lowest = variants.reduce((prev, curr) => prev.price < curr.price ? prev : curr );

    return (
        <GridItem as="label">
            <input {...input} />
            <Box
                {...checkbox}
                p={4}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                color="gray.600"
                _checked={{ bg: "blue.700", color: "blue.100", borderColor: "blue.300", }}
                _focus={{ boxShadow: "outline" }}>
                <Box
                    color="white"
                    fontWeight="medium"
                    textAlign="center"
                    isTruncated>{props.snack.name}
                </Box>
                <Box fontSize="sm">
                    { t("concat.price-start-at") }
                    <Box as="span" fontSize="md" color="white">
                        {t("concat.price-sign-only", { price: lowest.price.toFixed(2) })}
                    </Box>
                </Box>
            </Box>
        </GridItem>
    )
}

const SnackVariationSelector = (props) => {
    const { t } = useTranslation();
    const [isWritePending, setWritePending] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "variant",
        onChange: (v) => setValue("variant", v)
    });
    const variations = props.variations ? Object.values(props.variations) : [] ;
    const toast = useToast();
    const { user } = useAuthState();

    const onSubmit = (data) => {
        setWritePending(true);

        const variant = JSON.parse(data.variant);
        const reservation = {
            reservationId: generate(),
            movie: {
                id: props.movie.id,
                title: props.movie.title
            },
            snack: {
                name: props.snack.name,
                variantName: variant.name,
                price: variant.price,
            },
            dateTime: Date.now(),
            seats: props.seats,
            email: user.email,
            userId: user.userId
        }
        
        reserve(reservation, props.theater)
            .then(() => toast({
                title: t("feedback.reservation-created"),
                status: "success",
                isClosable: true
            })).catch((error) => () => toast({
                title: t("error.reservation-create-error"),
                description: error.message,
                status: "error",
                isClosable: true
            })).finally(() => { setWritePending(false); props.onClose() })
    }

    const group = getRootProps();

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader>{t("modal.select-variant")}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text mb={4}>
                        {t("concat.selected-movie")}
                        <Box as="span" fontWeight="semibold" color="blue.500">
                            {props.movie ? props.movie.title : ""}
                        </Box>
                    </Text>
                    <FormControl>
                        <FormLabel>{t("field.snack-variant")}</FormLabel>
                        <Stack {...group}>
                            { variations.map(v => {
                                return (
                                    <SnackVariationCheckBox
                                        {...getRadioProps({ value: JSON.stringify(v) })}
                                        key={v.variantId}
                                        variation={v}/>
                                )
                            })
                            }
                        </Stack>
                    </FormControl>
                    <FormControl mt={4} id="quantity" isRequired>
                        <FormLabel>{t("field.quantity")}</FormLabel>
                        <NumberInput
                            max={10} 
                            min={1}
                            defaultValue={1}
                            focusBorderColor="blue.500" >
                            <NumberInputField
                                {...register("quantity", { required: "error.empty-quantity" })}/>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <HStack direction="horizontal" spacing={4}>
                        <Button
                            type="submit"
                            isLoading={isWritePending}
                            colorScheme="blue">
                                {t("button.reserve")}
                        </Button>
                        <Button 
                            variant="ghost"
                            onClick={props.onClose}>
                                {t("button.cancel")}
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
      </Modal>
    )
}

const SnackVariationCheckBox = (props) => {
    const { t } = useTranslation();
    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label">
            <input {...input}/>
            <Box
                {...checkbox}
                py={2}
                px={4}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                color="gray.600"
                _checked={{ bg: "blue.500", borderColor: "blue.500", color: "blue.100" }}
                _focus={{ boxShadow: "none" }}>
                <Box isTruncated>
                    <Box as="span" fontSize="md" fontWeight="medium" color="white">
                        {`${props.variation.name} - `}
                    </Box>
                    {t("concat.price-sign-only", { price: props.variation.price.toFixed(2) } )}
                </Box>
            </Box>
        </Box>
    )
}

const initialSelectorState = {
    isOpen: false
}
const reducer = (state, action) => {
    const { type } = action;

    switch(type) {
        case "select":
            return {
                isOpen: true
            }
        case "dismiss":
            return {
                isOpen: false
            }
        default: return state;
    }
}

export default ReservationLayout;