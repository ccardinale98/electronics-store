import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import {
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
  } from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { Link } from "react-router-dom";

function Bot() {
    const [message, setMessage] = useState("");
    const [state, dispatch] = useStoreContext();
    const { categories, products } = state;
    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
    const { data } = useQuery(QUERY_PRODUCTS);
    
    useEffect(() => {
        if (data) {
          dispatch({
            type: UPDATE_PRODUCTS,
            products: data.products,
          });
          data.products.forEach((product) => {
            idbPromise('products', 'put', product);
          });
        }
      }, [data, dispatch]);
    
      useEffect(() => {
        if (categoryData) {
          dispatch({
            type: UPDATE_CATEGORIES,
            categories: categoryData.categories,
          });
          console.log(categoryData.categories);
          categoryData.categories.forEach((category) => {
            idbPromise("categories", "put", category);
          });
        } else if (!loading) {
          console.log("useEffect", categories);
          idbPromise("categories", "get").then((categories) => {
            dispatch({
              type: UPDATE_CATEGORIES,
              categories: categories,
            });
          });
        }
      }, [categoryData, loading, dispatch]);



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
                console.log(categories)
                for (var i = 0; i < categories.length; i++) {
                    if (mess.includes(categories[i].name.toLowerCase())) {
                        botMess.innerHTML = "Here are the " + categories[i].name + ":";
                        
                        var productCatListEl = document.createElement("ul");
                        botMess.append(productCatListEl)

                        var catID = categories[i]._id
                        console.log(products)
                        for (var p = 0; p < products.length; p++) {
                            if (products[p].category._id == catID) {
                                var productCatEl = document.createElement("li");
                                productCatEl.innerHTML = products[p].name;
                                productCatListEl.append(productCatEl);
                            }
                        }
                    }
                }
            } else if (mess.includes("tell") || mess.includes("explain")) {
                for (var i = 0; i < products.length; i++) {
                    var nm = products[i].name.toLowerCase();
                    var nmSplit = nm.split(" ");
                    console.log(nmSplit[0]);
                    console.log(nmSplit[1]);
                    if (mess.includes(nmSplit[0]) || mess.includes(nmSplit[1]) || mess.includes(nmSplit[2])) {
                        console.log(nmSplit);
                        botMess.innerHTML = "The " + products[i].name + " costs $" + products[i].price + " and there are " + products[i].quantity + " in stock.";
                    }
                }
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

    function showChat() {
        var chatBoxEl = document.getElementById("chat-box-div")
        chatBoxEl.hidden=false
        if (chatBoxEl.style.display === "block") {
            console.log("HIDDEN")
            chatBoxEl.style.display = "none"
        } else {
            chatBoxEl.style.display = "block"
        }
    }
    
    return (
        <div id="chat-box-main">
            <div id="chat-box-div" hidden={true}>
                <h1 id="chat-box-title">Virtual Assistant</h1>
                <div id="message-list-div">
                    <ul id="message-list">
                        <li classList="bot-message message">Hi I will be your virtual assistant. What can I help with today?</li>
                    </ul>
                </div>
                <input id="chatBox" onChange={(e) => setMessage(e.target.value)} onKeyPress={handleClick} value={message}></input>
            </div>
            <button onClick={() => showChat()}>Virtual Assistant</button>
        </div>
    )
}

export default Bot;