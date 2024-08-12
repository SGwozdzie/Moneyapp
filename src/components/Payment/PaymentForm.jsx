function PaymentForm({ }) {
  return (
    <form
      className="max-w-screen-lg p-1 my-2 mx-auto bg-pink-900 text-xs text-stone-50 shadow-md rounded-md"
    >
      <h1 className="text-center text-lg mb-4">Add payment</h1>
      <div className="flex items-center h-9 gap-4 px-2 hover:bg-pink-300 hover:shadow-lg hover:rounded-md hover:cursor-pointer my-1">      
        <p className="flex flex-col">
          <label htmlFor="date">Date</label>
          <input type="date" id='date' className="text-gray-600"/>
        </p>
        <p className="flex flex-col">
          <label htmlFor="category">Category</label>
          <input id='category' list='categories' className="flex w-7 h-7 items-center justify-center border-2 border-gray-300 overflow-hidden"/>
          <datalist id='categories'>
            <option value="First">1</option>
            <option value="Second">2</option>
            <option value="Third">3</option>
            <option value="Forth">4</option>
          </datalist>
        </p>
        <p className="flex flex-col basis-1/6">
          <label htmlFor="">Title</label>
          <input type="text" />
        </p>
        <p className="flex flex-col basis-1/6">
          <label htmlFor="">Title</label>
          <input type="text" />
        </p>
        <p className="flex flex-col basis-1/6">
          <label htmlFor="">Title</label>
          <input type="text" />
        </p>
        <p className="flex flex-col basis-1/6">
          <label htmlFor="">Title</label>
          <input type="text" />
        </p>
      </div>

    </form>
  );
}

export default PaymentForm;
