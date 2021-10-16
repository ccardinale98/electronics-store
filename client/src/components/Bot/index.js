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
    
    const handleClick = async (e) => {
       const code = e.keyCode || e.which;
       
       if (code === 13) {
           console.log(message);
           appendMessage();
           setMessage("");
       }
    }
    
    function appendMessage() {
        console.log(message)
        var ulEl = document.getElementById("message-list");

        var mess = message.toLowerCase();

        if (message) {
            var userMess = document.createElement("li");
            userMess.innerHTML = message;
            userMess.classList.add("message")
            userMess.classList.add("user-message")
            ulEl.append(userMess);
        
            var botMess = document.createElement("li");
            botMess.classList.add("message")
            botMess.classList.add("bot-message")

            if (mess == "hi" || mess == "hello" || mess == "howdy") {
                botMess.innerHTML = "Hello!";
            } else if (mess.includes("how are you")) {
                botMess.innerHTML = "I am well.";
            } else if (mess.includes("category")) {
                botMess.innerHTML = "These are the items in that category:";
                // make if for each category (import categories)
            } else if (mess.includes("tell") || mess.includes("explain")) {
                // (import products) make if for the prodicts
            } else if (mess.includes("contact") || mess.includes("person")) {
                botMess.append(showContact())
            } else if (mess.includes("bye") || mess.includes("goodbye")) {
                botMess.innerHTML = "Bye!"
            } else {
                botMess.innerHTML = "Sorry, I did not catch that. I am still learning."
            }

            var wait = document.createElement("li");
            wait.innerHTML = "...";
            ulEl.append(wait);

            setTimeout(
                function () {
                    ulEl.append(botMess);
                    wait.remove();
                }, 2000
            )
        }  
    }
    
    function showContact() {
        return (
            <div>
                <p>Name: </p>
                <input id="contact-name"></input>
                <p>Email: </p>
                <input id="contact-email"></input>
                <p>Message: </p>
                <input id="contact-message"></input>
                <button id="contact-submit">Submit</button>
            </div>
        )
    } 
    
    return (
        <div id="chat-box-div">
            <h1 id="chat-box-title">Virtual Assistant</h1>
            <div>
                <ul id="message-list">
                </ul>
            </div>
            <input id="chatBox" onChange={(e) => setMessage(e.target.value)} onKeyPress={handleClick} value={message}></input>
        </div>
    )
}

export default Bot;