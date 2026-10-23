import { useState } from "react"

export default function App() {
  const [color,setColor]=useState("olive");
  const colors =["red","blue","green","yellow","orange","purple","pink",]
  return (
    <div className="w-full h-screen duration-200" style={{backgroundColor:color}}>
      <div className="flex flex-wrap justify-center gap-3 bg-white shadow-lg px-3 py-2 rounded-xl">
        {colors.map((colorName)=>(<button className="px-4 py-11 outline-none rounded-full shadow-lg"
       style={{backgroundColor:colorName}} onClick={()=>setColor(colorName)}>{colorName}</button>))}

      </div>
      
    </div>
  )
}
