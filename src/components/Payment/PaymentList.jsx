import { useSelector } from "react-redux";
import PaymentItem from "./PaymentItem";

function PaymentList({ size }) {
  const paymentsArray = useSelector((state) => state.payments);
  console.log(paymentsArray);

  return (
    <section className="max-w-screen-lg p-1 my-2 mx-auto border-2 rounded-md border-stone-400 overflow-hidden bg-pink-200">
      {paymentsArray.map((payment) => (
        <PaymentItem
          id={payment.id}
          hidden={payment.hidden}
          user={payment.userId}
          parameters={{
            category: payment.category,
            cost: payment.cost,
            title: payment.title,
            currency: payment.currency,
            date: payment.date,
            user: payment.userName,
          }}
        />
      ))}
    </section>
  );
}

export default PaymentList;
