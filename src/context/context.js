import { createContext, useState, useCallback } from "react";
import run from "../config/geminiai";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setinput] = useState('');
  const [recentPrompt, setRecentPrompt] = useState('');
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dataResult, setDataResult] = useState('');
  // const delaypara=(index,nextword)=>{
    const delaypara=(index,nextword)=>{
     setTimeout(()=>{
             setDataResult(pre=>pre+nextword)
     },75*index)
  }

  const newchat=()=>{
    setLoading(false)
    setShowResult(true)
  }
  const formatResponse = (response) => {
    const responseArray = response.split("**");
   
    let formattedResponse = " ";
  
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        formattedResponse += responseArray[i];
        
      } else {
        // Assuming headings and subheadings are in the format "**Heading**" and "**Subheading**"
        const heading = responseArray[i].trim();
        const nheading=heading.split(",");
        formattedResponse += `<br></br>`+`<b>${nheading}</b>`;
      }
    }
  
    return formattedResponse;
  };
  
  const onSend = useCallback(async (prompt) => {
    setDataResult('');
    setLoading(true);
    setShowResult(false);
    let response;
    if(prompt!==undefined){
      response = await run(prompt);
      setRecentPrompt(prompt);
    }else{
      setPrevPrompt([...prevPrompt,input]);
      setRecentPrompt(input);
      response = await run(input);

    }
    const formattedResponse = formatResponse(response);
    const newformattedresponse = formattedResponse.split("*");
    const newformattedresponse2=newformattedresponse.join().split(" ");
    for( let i=0;i<newformattedresponse2.length;i++){
      let nextword=newformattedresponse2[i];
      delaypara(i,nextword+" ")
      // setDataResult(pre=>pre+newformattedresponse2[i])
      // await new Promise(resolve => setTimeout(resolve, 75*i));
    }
    // setDataResult(newformattedresponse);
    setinput('');
    setLoading(false);
  }, [input]);

  const contextValue = {
    input,
    setinput,
    recentPrompt,
    setRecentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    dataResult,
    setDataResult,
    onSend,
    newchat,
        
  };
// console.log(input);
  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
