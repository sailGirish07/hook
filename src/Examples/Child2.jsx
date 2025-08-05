const Child2  = ({ value, updateValue }) => {
  console.log("Child 2 rerendered");

  return (
    <>
      <p>Child 2- {value}</p>
      <button onClick={updateValue}>Update Child 2</button>
    </>
  );
};

export default Child2;