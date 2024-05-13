import { useEffect, useState, useCallback, useRef } from 'react';
function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef()

  const passwordgenerator = useCallback (() =>{
    let pass = ""
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"

    if(number) str += "1234567890"
    if(character) str += "!@#$%^&*()-=_+[]{};:'/?.,\|"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)

      pass += str.charAt(char);
    }
    setPassword(pass)

  }, [length, number, character, setPassword])

  const clickpasswordcopy = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])
  useEffect(()=>{
    passwordgenerator()
  }, [length, number, character, passwordgenerator])
  return (
      <>
      <div className='w-full max-w-md pt-0.5 pb-2 mx-auto shadow-md rounded-lg px-4 my-7 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3 text-2xl '>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" 
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}/>
          <button 
          onClick={clickpasswordcopy}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
            copy</button>
        </div>
        <div className='flex text-lg gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" 
            min={1}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) =>{setLength(e.target.value)}}/>
            <label >Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked={number}
            id='numberinput'
            onChange={()=>{
              setNumber((prev) => !prev)
            }}/>
            <label htmlFor="numberinput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked={number}
            id='charinput'
            onChange={()=>{
              setCharacter((prev) => !prev)
            }}/>
            <label htmlFor="charinput">character</label>
          </div>
          
        </div>
      </div>
      
      </>
  );
}

export default App;
