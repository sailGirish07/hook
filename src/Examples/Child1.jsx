const Child1 = ({ value, updateValue }) => {
  console.log("Child 1 rerendered");

  return (
    <>
      <p>Child 1- {value}</p>
      <button onClick={updateValue}>Update Child 1</button>
    </>
  );
};

export default Child1