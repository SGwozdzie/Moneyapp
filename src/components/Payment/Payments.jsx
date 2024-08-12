import Button from "../UI/Button";
import PaymentList from "./PaymentList";
import PaymentForm from "./PaymentForm";
import { useState } from "react";

function Payments() {
  const tableSize = 10;
  const [add, setAdd] = useState(false)

  const handleToggle = () => {
    setAdd(!add)
  }

  return (
    <>
      <h1>Last payments:</h1>
      <PaymentList size={tableSize} />
      <Button onClick={handleToggle}>Add payment</Button>
      {add || <PaymentForm />}
    </>
  );
}

export default Payments;
