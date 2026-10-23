import React from 'react'
import Card from './Card'
function App() {
  let myObj = {
    username:"jina",
    age:28,

  }
  let myArr=[1,2,3,4]
  return (
    <div>
     <h1 className="bg-green-400 text-white p-4">
  Tailwind Test
</h1>
<Card username="" user ={myObj} numbers={myArr} />
    </div>
  )
}

export default App
