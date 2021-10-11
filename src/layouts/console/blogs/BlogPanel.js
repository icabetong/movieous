import { useTranslation } from "react-i18next";
import {
    Box,
    Button,
    HStack,
} from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";

const BlogPanel = () => {
    const { t } = useTranslation();

    return (
        <Box>
            <HStack
                spacing={4}>
                <Button size="sm" leftIcon={<HiPlus/>} colorScheme="primary">
                    {t("button.add")}
                </Button>
            </HStack>
        </Box>
    )
}

export default BlogPanel;