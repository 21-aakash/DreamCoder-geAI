import { useState, useEffect , react } from "react";
import Editor from "./components/Editor";

import useLocalStorage from "./hooks/uselocalstorage";
import axios from 'axios';


import "./App.css";


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');


  const handleChange = (e) => setPrompt(e.target.value);
  const spider = 'https://cdn-icons-png.flaticon.com/512/1094/1094625.png';

  const [html, sethtml] = useLocalStorage("html", "");
  const [css, setcss] = useLocalStorage("css", "");
  const [js, setjs] = useLocalStorage("js", "");

  const [srcDoc, setsrcDoc] = useState("");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);







  const handleSubmit = async (e) => {
    e.preventDefault();
  

  
  try {
    const response = await axios({
      url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBxg1M2U7k_uZshIoFYT-PcXBW8cDpPxbw',
      
      method: "post",
      data: {
        contents: [{ parts: [{ text: prompt }] }],
      },
    });

    console.log(response);
    setResponse(response.data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.log(error);
    setResponse("Sorry - Something went wrong. Please try again!");
  }
  

  }
  
 
 
  useEffect(() => {
    const timeout = setTimeout(() => {
      setsrcDoc(
        `
        <html> 
          <body> ${html} </body>
          <style> ${css} </style>
          <script>
            ${js}
          </script>
        </html>
        `
      );
    }, 250);
  
    return () => clearTimeout(timeout);
  }, [html, css, js]);
  
  return (
    <>
    <div className="navbar"> 
    
    <img  className="h-8 w-8 m-2"  src="https://cdn-icons-png.flaticon.com/512/1094/1094625.png" alt="" />
    DreamCoder | CodeAI 
  
   <i> <h6 className="m-2  text-xs">Powered by Goolge genAI</h6>  </i>
    </div>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={sethtml}
        />

        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setcss}
        />

        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setjs}
        />
      </div>

<div className="">

 <button onClick={handleOpen}  className=" w-16 md:w-24 lg:w-28 h-16 md:w-32 lg:w-48 flex justify-center items-center  fixed top-1/2 transform-translate-x-0 right-0 px-4 py-2 bg-yellow-300 text-black rounded-full shadow-lg shadow-cyan-500/50 hover:shadow-lg ">
 Dream with AI?  <img className="aiimg" src={spider} height="50"  width="50" alt="" />
</button>

{isOpen && (
        <div className="popup ">
          <div className="popup-inner">
            <button className="close-btn" onClick={handleClose}>
              &times;
            </button>
            <form onSubmit={handleSubmit}>
              <textarea
                value={prompt}
                onChange={handleChange}
                placeholder="Enter your prompt here..."
              />
              <button  className="subtn"  type="submit">Submit</button>
            </form>
            

            {response && <div className="response">{response}
            </div>}
           
            


          </div>
        </div>
      )}



</div>

      <div className="pane">
        <iframe
      
          srcDoc={srcDoc}
          title="output"
          frameBorder="0"
          sandbox="allow-scripts"
          height="100%"
          width="100%"
        />
      </div>
    </>
  )
}

export default App;
