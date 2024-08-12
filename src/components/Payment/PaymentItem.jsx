import React from "react";

function PaymentItem({ id, hidden, user, parameters }) {
  // const date = `${parameters.date.getDate()}.${(parameters.date.getMonth()+1) > 9 ? (parameters.date.getMonth()+1) : '0'+(parameters.date.getMonth()+1)}`

  return (
<div className="flex items-center h-9 gap-4 px-2 hover:bg-pink-300 hover:shadow-lg hover:rounded-md hover:cursor-pointer my-1">
    <div className="text-left text-gray-600">{parameters.date}</div>
    <div className="flex basis-9 h-9 items-center justify-center border-2 border-gray-300 overflow-hidden">
        {parameters.category}
    </div>
    <div className="text-left grow">{parameters.title}</div>
    <div className="text-left text-blue-600 basis-36">
        {parameters.cost} {parameters.currency}
    </div>
    <div className="text-left font-bold">{parameters.user}</div>
</div>

  );
}

export default PaymentItem;
