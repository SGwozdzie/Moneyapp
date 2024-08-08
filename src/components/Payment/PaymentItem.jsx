import React from "react";

function PaymentItem({ id, hidden, user, parameters }) {
  console.log(parameters);
  const date = parameters.date.toLocaleDateString();

  return (
    <tr className="bg-gray-50 border-b border-gray-200 hover:bg-gray-100">
      <th className="py-2 px-4 text-left">{parameters.category}</th>
      <th className="py-2 px-4 text-left text-blue-600">
        {parameters.cost} {parameters.currency}
      </th>
      <th className="py-2 px-4 text-left font-bold">{parameters.user}</th>
      <th className="py-2 px-4 text-left text-gray-600">{date}</th>
    </tr>
  );
}

export default PaymentItem;
