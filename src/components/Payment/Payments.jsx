import Button from "../UI/Button";
import PaymentList from "./PaymentList";

function Payments() {
  const tableSize = 10;

  return (
    <main>
      <h1>Last payments:</h1>
      <section>
        <PaymentList size={tableSize} />
      </section>
      <Button>Add payment</Button>
    </main>
  );
}

export default Payments;
