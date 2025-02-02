import React from "react";
import {useState} from 'react';


import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";

import { Controlled as ControlledEditor } from "react-codemirror2";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'


const Editor = ( props ) => {
  const { language, displayName, value, onChange } = props;

function handleChange(editor, data, value){

onChange(value)
}


const [open,  setopen]  = useState(true)

  return (


    <div className={`editor-container ${open ? '': 'collapsed'}`}>
      <div className="editor-title">
        {props.displayName}
        <button
        
        onClick={()=>{

setopen(prevopen =>!prevopen);

type="button"
          className="expand-collapse-btn"
        }}
        
        
        >

<FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />


        </button>
      </div>

      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          theme:'material',
        }}
      />
    </div>




  )
}

export default Editor;
