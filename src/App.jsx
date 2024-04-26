import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length,setLength] = useState(1);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword] = useState(false);

  const passwordRef = useRef(null);
  const generateRandomPassword = useCallback(()=> {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_{}<>?"
    for(let i =1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[length,numberAllowed,charAllowed])

  const copyToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
  
useEffect(()=>{
  generateRandomPassword()
},[length,numberAllowed,charAllowed,generateRandomPassword])
  return (
    <>
    <div className='main-container'
     style={{
      backgroundColor: 'grey',
      width: '150%',
      height: '20vh',
      textAlign: 'center',
      borderRadius: '8px'

     }}
    >
      <h3
       style={{
        paddingTop: '12px'
       }}
      >Password Generator</h3>
      <div>
        <input className='input-password'
         type='text'
         placeholder='Password'
         value={password}
         readOnly
         ref={passwordRef}
         style={{
          padding: '5px',
          margin: '5px',
          width: '50%',
          height: '25px',
          border: '1px solid black',
          borderRadius: '4px',
         }}
        />
        <button className='copy-btn'
          style={{
            backgroundColor: 'blue',
            color: 'white'
          }}
          onClick={copyToClipBoard}
        >
          Copy
        </button>
      </div>
      <div>
        <input 
          type='range'
          min = {1}
          max={100}
          value={length}
          onChange={(e)=> {setLength(e.target.value)}}
        />
        <label
        className='length-label'
        >Length ({length})
        </label>
        <input 
         type='checkbox'
         defaultChecked= {numberAllowed}
         onChange={() => {setNumberAllowed((prev) => !prev)}}
        />
        <label
         className='number-label'
        >Numbers</label>
        <input 
         type='checkbox'
         defaultChecked= {charAllowed}
         onChange={() => {setCharAllowed((prev) => !prev)}}
        />
        <label
         className='character-label'
        >Characters</label>
      </div>
    </div>
     
    </>
  )
}

export default App
