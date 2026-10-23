import { useState } from "react"

function App() {
  const [count,setCount]=useState(15)
  const AddValue = () =>{
    setCount(prev => prev + 1)
      setCount(prev => prev + 1)
        setCount(prev => prev + 1)
  }
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={AddValue}>AddValue</button>
      
    </div>
  )
}

export default App
