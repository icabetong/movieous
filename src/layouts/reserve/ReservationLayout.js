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
    useRadioGroup
} from "@chakra-ui/react";
import { collection, onSnapshot } from "firebase/firestore";

import Page from "../../components/Page";
import { fetchSingle, buildImageUrl } from "../../infrastructure/MovieRepository";
import { transform } from "../../infrastructure/SnackRepository";
import { firestore } from "../../index";

const ReservationLayout = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [movie, setMovie] = useState({});
    const [snacks, setSnacks] = useState([]);
    const [selectedSnack, setSelectedSnack] = useState({});
    const { handleSubmit, setValue } = useForm();
    const [state, dispatcher] = useReducer(reducer, initialSelectorState);

    const onSelectorView = () => dispatcher({ type: "select" });
    const onSelectorDismiss = () => dispatcher({ type: "dismiss" });

    useEffect(() => {
        fetchSingle(id)
            .then((response) => { setMovie(response.data); })
            .catch((error) => { console.log(error) })
    }, [id]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, "snacks"), (snapshot) => {
            setSnacks(transform(snapshot));
        })
        return () => unsubscribe();
    }, [])

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
                    w={{base: "80%", md: "40%"}}
                    align={['center', 'center', 'flex-start', 'flex-start']} >
                    <Heading
                        as="h1"
                        size="xl"
                        fontWeight="bold"
                        color="primary.300"
                        textAlign={['center', 'center', "left", 'left']}>
                        {movie.title}
                    </Heading>
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2">
                        {t("concat.rating", { rating: movie.vote_average})}
                    </Box>
                    <Text
                        size="md"
                        color="gray.200"
                        opacity="0.8"
                        fontWeight="normal"
                        lineHeight={1.5}
                        textAlign={["center", "center", "left", "left"]}>
                        {movie.overview}
                    </Text>
                    <Text>{t("concat.release-date", { date: movie.release_date })}</Text>

                    <Box
                        fontSize="lg"
                        fontWeight="medium"
                        color="primary.300">
                        {t("field.available-snacks")}
                    </Box>

                    <Stack 
                        width="100%"
                        as="form"
                        onSubmit={handleSubmit(onSubmit)} 
                        spacing={8}>

                        <SnackList
                            maxW="100%"
                            snacks={snacks}
                            setValue={setValue}/>

                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems={{base: "center", md: "baseline"}}>
                            <Button
                                colorScheme="primary"
                                type="submit" 
                                borderRadius="8px" 
                                lineHeight="1" >
                                {t("button.reserve")}
                            </Button>
                        </Box>

                    </Stack>
                </Stack>
                <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
                    <Image loading="lazy" src={buildImageUrl(movie.poster_path)} size="100%" rounded="1rem" shadow="2xl" />
                </Box>
            </Flex>
            { selectedSnack &&
                <SnackVariationSelector
                    isOpen={state.isOpen}
                    movie={movie}
                    snack={selectedSnack}
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
                _checked={{ bg: "primary.300", color: "primary.100", borderColor: "primary.300", }}
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
    const { register, handleSubmit, setValue } = useForm();
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "variant",
        onChange: (v) => setValue("variant", v)
    });
    const variations = props.variations ? Object.values(props.variations) : [] ;

    const onSubmit = (data) => {
        const variant = JSON.parse(data.variant);
        const reservation = {
            movie: {
                id: props.movie.id,
                title: props.movie.title
            },
            snack: {
                name: props.snack.name,
                variantName: variant.name,
                price: variant.price,
            },
            dateTime: Date.now()
        }
        console.log(reservation);
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
                        <Box as="span" fontWeight="semibold" color="primary.300">
                            {props.movie.title}
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
                            focusBorderColor="primary.300" >
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
                            colorScheme="primary">
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
                _checked={{ bg: "primary.300", borderColor: "primary.300", color: "primary.100" }}
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