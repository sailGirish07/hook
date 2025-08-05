import React, { useCallback } from "react";
import Child1 from "./Child1";
import Child2 from "./Child2";
import { useState } from "react";


const Parent = () => {
  const [parent, setParent] = useState(0);
  const [child1, setChild1] = useState(0);
  const [child2, setChild2] = useState(0);

  const updateParent = () => {
    setParent(Math.floor(Math.random() * 100) + 1);
  };

  const updateChild1 = useCallback(() => {
    setChild1(Math.floor(Math.random() * 100) + 1);
  },[child1]);

  const updateChild2 = useCallback(() => {
    setChild2(Math.floor(Math.random() * 100) + 1);
  },[child2]);

  console.log("Parent rerendered");

  return (
    <>
      <p>Parent - {parent}</p>
      <button onClick={updateParent}>Update Parent</button>
      <Child1 value={child1} updateValue={updateChild1} />
      <Child2 value={child2} updateValue={updateChild2} />
    </>
  );
};

export default Parent;