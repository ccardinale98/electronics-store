import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function Bot() {
    const [message, setMessage] = useState("");
    
    // function botConfig() {
    //     console.log('Hi, I am your virtual assistant. Some commonly used commands include: \n"Explain X." \n"Show me products in X category." \n"Tell me more about X." \n"Contact a real person."')
    //     if (input == "hello" || input == "hi" || input == "howdy") {
    //         console.log("Hello!")
    //     } else if (input.includes("how are you")) {
    //         console.log("I am well! Thank you for asking.")
    //     } else if (input == "hello" || input == "hi" || input == "howdy")
    // }
    const handleClick = async (e) => {
       const code = e.keyCode || e.which;
       
       if (code === 13) {
           console.log(message);
           setMessage("");
       }
    }
    
    function appendMessage() {
        var ulEl = document.getElementById("message-list");

        if (message) {
            var userMess = document.createElement("li");
            userMess.innerHTML = message;
            ulEl.append(userMess);
        
            var botMess = document.createElement("li");
            
        }  
    }
    
    
    
    
    
    
    return (
        <div>
            <h1>Virtual Assistant</h1>
            <div>
                <ul id="message-list">
                </ul>
            </div>
            <input id="chatBox" onChange={(e) => setMessage(e.target.value)} onKeyPress={handleClick} value={message}></input>
        </div>
    )
}

export default Bot;