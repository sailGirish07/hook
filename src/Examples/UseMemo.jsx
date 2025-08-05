// import React, { useMemo, useState } from "react";

// export default function UseMemo(){

//     const[inc, setInc] = useState(0);
//     const[minus, setMinus] = useState(10);
//     const tableCal = useMemo( () => {
//         console.log("Table");
//         for(let i=2; i<=20; i=i+2){
//             console.log(i);
//         }
//     }, [] );

//     return(
//         <div>
//             <p>{tableCal}</p>
//             <button onClick={() => setInc(inc + 1)}>Increment</button> {inc}
//             <button onClick={() => setMinus(minus - 1)}>Decrement</button>{minus}
//            </div>
//     );
// }

import React, { useMemo } from 'react';

function UseMemo({ data }) {
  const processedData = () => {
    return data.map(item => item * 2); 
  }; 

  return (
    <div>
        {processedData}
    </div>
  );
}

export default UseMemo;