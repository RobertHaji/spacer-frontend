import { useLocation } from "react-router-dom";


function PaymentForm() {
    const { state } = useLocation();
    const booking = state?.booking;
}
export default PaymentForm;
