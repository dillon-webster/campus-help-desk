import { useState, useEffect } from "react";


export default function NameSaver() {
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>{localStorage.getItem("name")}</p>
    </div>
  )
}




















// export default function Clock() {
//   const [time, setTime] = useState<Date>(new Date());
//
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setTime(new Date());
//     }, 1000);
//     return () => clearInterval(intervalId)
//   }, []);
//
//
//   return <p>{time.toLocaleTimeString()}</p>
//
// }
