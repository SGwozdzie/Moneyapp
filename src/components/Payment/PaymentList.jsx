import { useSelector } from "react-redux";
import PaymentItem from "./PaymentItem";

function PaymentList({ size }) {
  const paymentsArray = useSelector((state) => state.payments);
  console.log(paymentsArray);

  return (
    <table>
      {paymentsArray.map((payment) => (
        <PaymentItem
          id={payment.id}
          hidden={payment.hidden}
          user={payment.userId}
          parameters={{
            category: payment.category,
            cost: payment.cost,
            currency: payment.currency,
            date: payment.date,
            user: payment.userName,
          }}
        />
      ))}
    </table>
  );
}

export default PaymentList;
