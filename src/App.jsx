import { useState, useEffect } from "react";
import Editor from "./components/Editor";

import useLocalStorage from "./hooks/uselocalstorage";

import "./App.css";


function App() {
  const [html, sethtml] = useLocalStorage("html", "");
  const [css, setcss] = useLocalStorage("css", "");
  const [js, setjs] = useLocalStorage("js", "");

  const [srcDoc, setsrcDoc] = useState("");

 
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
    
    <img    src="https://i.pinimg.com/736x/a2/60/59/a2605901ccc8fc29583cab628b0d0ecb.jpg" alt="" />
    CodePlay 
  
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
