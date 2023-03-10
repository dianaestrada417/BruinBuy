import React from "react";
import Img from './img.png'
import Attachment from './attach.png'

const Input = () => {
    return(
        <div className="input">
            <input type='text' placeholder='Type something...'/>
            <div className="send">
                <img src={Attachment}/>
                <input type='file' style={{display:'none'}} id='file'/>
                <label htmlFor='file'>
                    <img src={Img}/>
                </label>
                <button>Send</button>
            </div>
        </div>
    )
}

export default Input