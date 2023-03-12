import React from "react";

const Message = () => {
    return(
        <div className='message owner'>
            <div className="messageInfo">
                <span>Emanuel</span>
               <span>just now</span> 
            </div>
            <div className="messageContent">
                <p>hello</p>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/The_University_of_California_UCLA.svg/640px-The_University_of_California_UCLA.svg.png'></img>
            </div>
        </div>
    )
}

export default Message