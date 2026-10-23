

export default function Card6({username,user,numbers
}) {
  return (
    <div className="relative block group  text-white">
      <span className="absolute inset-0 border-2 border-white border-dashed rounded-lg"></span>
      <div className="transition bg-black border-2 border-white rounded-lg group-hover:-translate-x-2 group-hover:-translate-y-2">
        <div className="p-6 ">
          <p className="mt-4 text-lg font-medium">Lorem ipsum dolor</p>
          <p className="mt-1 text-xs">{username ="nini"}</p>
          <p>{user.username}<span>{user.age}</span></p>
          <p>{numbers[0]}</p>
        </div>
      </div>
    </div>
  )
}
