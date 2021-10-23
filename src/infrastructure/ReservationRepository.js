import axios from "axios";
import { setDoc, updateDoc, doc, increment } from "firebase/firestore";
import { firestore } from "../index";

const HOST = "https://server-production-1055.up.railway.app";
const ACTION = `${HOST}/reserve-success`;

export const reserve = async (reservation, theaterId) => {
    console.log(reservation.seats);
    await setDoc(doc(firestore, "reservations", reservation.reservationId), reservation)
    await updateDoc(doc(firestore, "theaters", theaterId), { freeSeats: increment(reservation.seats * -1) })

    const reserve = {
        movie: reservation.move.title,
        seats: reservation.seats,
        email: reservation.email
    }

    return await axios.post(ACTION, reserve);
}   

export const transform = (snapshot) => {
    const data = [];

    snapshot.docs.forEach(doc => data.push(doc.data()));
    return data;
}