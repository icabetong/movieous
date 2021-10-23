import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
    Box,
    GridItem,
    SimpleGrid,
} from "@chakra-ui/react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { transform } from "../../infrastructure/ReservationRepository";
import { useAuthState } from "../../utils/auth";
import { firestore } from "../../index";

const ReservationPanel = () => {
    const { user } = useAuthState();
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const q = query(collection(firestore, "reservations"), where("userId", "==", user.userId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setReservations(transform(snapshot));
        })
        return () => unsubscribe();
    }, []);

    return (
        <Box>
            <ReservationList
                reservations={reservations}/>
        </Box>
    );
}

export default ReservationPanel;

const ReservationList = (props) => {
    return (
        <SimpleGrid  columns={{base: 1, md: 2, lg: 4}} spacing={{base: 2, md: 4}} my={8} mx={2}>
            {props.reservations.map(reservation => (
                <ReservationCard
                    reservation={reservation}/>
            ))}
        </SimpleGrid>
    )
}

const ReservationCard = (props) => {
    const { t } = useTranslation();

    return (
        <GridItem>
            <Box 
                p={4}
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.600"
                _hover={{ borderColor: "blue.500", bg: "gray.700" }}>
                <Box 
                    as="h4" 
                    fontWeight="medium"
                    lineHeight="tight">
                    {props.reservation.movie.title}
                </Box>
                <Box>
                    {t("concat.tickets", { tickets: props.reservation.seats })}
                </Box>
            </Box>
        </GridItem>
    )
}