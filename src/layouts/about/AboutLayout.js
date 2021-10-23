import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import Page from "../../components/Page";
import { send } from "../../infrastructure/FeedbackRepository";

const AboutLayout = () => {
    const { t } = useTranslation();

    return (
        <Page title="navigation.about">
            <Flex
                align="center"
                justify={{base: "center", md: "space-around", xl: "space-between"}}
                direction={{base: "column-reverse", md: "row"}}
                wrap="no-wrap"
                minH="70vh"
                px={8}
                mb={16} >
                <Stack
                    spacing={4}
                    w={{base: "80%", md: "40%"}}
                    align={['center', 'center', 'flex-start', 'flex-start']} >
                    <Heading
                        as="h1"
                        size="xl"
                        fontWeight="bold"
                        color="blue.500"
                        textAlign={['center', 'center', "left", 'left']}>
                        {t("about_title")}
                    </Heading>
                    <Heading
                        as="h2"
                        size="md"
                        color="blue.100"
                        opacity="0.8"
                        fontWeight="normal"
                        lineHeight={1.5}
                        textAlign={["center", "center", "left", "left"]}>
                        {t("about_summary")}
                    </Heading>
                </Stack>
                <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
                    <Heading size="lg" mb={8}>
                        {t("info.got-feedback-or-concern")}
                    </Heading>
                    <FeedbackForm/>
                </Box>
            </Flex>
        </Page>
    )
}

const FeedbackForm = () => {
    const { t } = useTranslation();
    const [isSending, setSending] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const toast = useToast();

    const onSubmit = (data) => { 
        setSending(true);

        send(data).then(() => toast({
            title: t("feedback.feedback-sent"),
            status: "success",
            isClosable: true
        })).catch((error) => toast({
            title: t("error.feedbacks-send-error"),
            description: error.message,
            status: "error",
            isClosable: true
        })).finally(() => {
            setSending(false);
            reset();
        })
    }

    return (
        <Box>
            <Stack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>

                <FormControl id="email">
                    <FormLabel>{t("field.email")}</FormLabel>
                    <Input 
                        type="email"
                        placeholder={t("placeholder.email")}
                        {...register("email")}/>
                </FormControl>

                <FormControl as="fieldset">
                    <FormLabel as="type">{t("field.type")}</FormLabel>
                    <RadioGroup defaultValue="suggestion">
                        <Stack direction="row" spacing={4}>
                            <Radio {...register("type")} colorScheme="blue" value="suggestion">{t("type.suggestion")}</Radio>
                            <Radio {...register("type")} colorScheme="blue" value="feedback">{t("type.feedback")}</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>

                <FormControl id="concern">
                    <FormLabel>{t("field.message")}</FormLabel>
                    <Textarea
                        placeholder={t("placeholder.message")}
                        {...register("message")}/>
                </FormControl>

                <Button
                    type="submit"
                    isLoading={isSending}
                    colorScheme="blue">
                    {t("button.submit")}
                </Button>
            </Stack>
        </Box>
    )
}

export default AboutLayout;