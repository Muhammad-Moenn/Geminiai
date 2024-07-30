import React, { useContext } from 'react'
import {assets} from '../../assets/assets';
import './Main.css'
import { Context } from '../../context/context';
function Main() {

  const {input,setinput,recentPrompt,setPrevPrompt,prevPrompt,showResult,loading,dataResult,onSend}=useContext(Context)
  const handleSubmit=(e)=>{
    e.preventDefault()
    onSend(input);
    setPrevPrompt([...prevPrompt,input]);
    setinput('');
  }
  return (
    <div className='main'>
      <div className='nav'>
        <p>Gemini</p>
        <img src={assets.user_icon} alt=''/>
      </div>
      <div className='main-container'>
        {showResult?
        <>
       <div className='greet'>
       <p><span>Hello,Dev</span></p>
       <p>How can I help you today?</p>
     </div>
     <div className='cards'>
       <div className='card'>
          <img src={assets.compass_icon} alt=''/>
          <p>Give me ways to add certain foods to my diet</p>
       </div>
       <div className='card'>
         <img src={assets.bulb_icon} alt=''/>
         <p>Plan a low-carb meal with what's available in my fridge</p>
       </div>
       <div className='card'>
         <img src={assets.message_icon} alt=''/>
         <p>As a social trend expert, explain a term</p>
       </div>
       <div className='card'>
         <img src={assets.code_icon} alt=''/>
         <p>Help me craft an OOO message based on a few details</p>
       </div>
      </div> 
      </> 
      :
      <div className='result'>
        <div className='result-title'>
          <img src={assets.user_icon}alt=''></img>
          <p>{recentPrompt}</p>
        </div>
        <div className='result-data'>
          <img src={assets.gemini_icon} alt=''></img>
          
          {loading?
          <div className='loader'>
            <hr className='hr1'/>
            <hr className='hr2'/>
            <hr className='hr3'/>
          </div>
          :
          <p dangerouslySetInnerHTML={{ __html: dataResult }}></p>
        }

        </div>
      </div>
      }
         
         <div className='main-container-bottom'>
          <div className='search-box'>
            <form onSubmit={handleSubmit}>
            <input onChange={(e)=>setinput(e.target.value)} value={input} type='text' placeholder='Enter a promt here'></input>
            </form>
            <div>
              <img src={assets.gallery_icon} alt=''></img>
              <img src={assets.mic_icon} alt=''></img>
              
              <img className={input!==""?" ":"hid"} onClick={()=>onSend()} src={assets.send_icon} alt=''></img>
            </div>
          </div>
          <p className='bottom-info'>Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps</p>
         </div>
        </div>
      </div>
   
  )
}

export default Main
