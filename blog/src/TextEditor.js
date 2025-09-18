import React from 'react'
import JoditEditor from 'jodit-react'
import { useState } from 'react'
import { useRef } from 'react'
import './TextEditor.css';
function TextEditor() {
      const editor = useRef(null)
      const [content,setContent] = useState('')



  return (
    <div className='editor'>
       <JoditEditor
        ref = {editor}
        value={content}
        onChange={newContent=>setContent(newContent)}/>
       

    </div>

   
  )
}

export default TextEditor
