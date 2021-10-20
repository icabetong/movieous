import { useTranslation } from "react-i18next";
import {
    Box,
    Button,
    HStack,
} from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";


const ReservationPanel = () => {
    const { t } = useTranslation();

    return (
        <Box>
            <HStack
                spacing={4}>
                <Button size="sm" leftIcon={<HiPlus/>} colorScheme="blue">
                    {t("button.add")}
                </Button>
            </HStack>
        </Box>
    )
}

export default ReservationPanel;