import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import gptlogo from './Assets/chatgpt.svg';
import addBtn from './Assets/add-30.png';
import msgIcon from './Assets/message.svg';
import home from './Assets/home.svg';
import saved from './Assets/bookmark.svg';
import rocket from './Assets/rocket.svg';
import sendBtn from './Assets/send.svg';
import userIcon from './Assets/user-icon.png';
import gptImgLogo from './Assets/chatgptLogo.svg';
import { sendMsgToOpenAI } from './openai';

const App = () => {

  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
    text: "Hi, I am ChatGPT.",
    isBot: true,
  }
]);

useEffect(() => {
  msgEnd.current.scrollIntoView()
}, [messages])

  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      {text: input, isBot: false},
      {text: res, isBot: true}
    ]);
  }

  const handleEnter = async (e) => {
    if(e.key === 'Enter') await handleSend()
  }

  const handleQuery = async (e) => {
    const text = e.target.value;
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      {text: input, isBot: false},
      {text: res, isBot: true}
    ]);
  }

  return (
    <div className='App'>
      <div className='side-bar'>
        <div className='upper-side'>
          <div className='upper-side-top'><img src={gptlogo} alt='' className='logo' /><span className='brand'>ChatGPT</span></div>
          <button className='mid-btn' onClick={() => {window.location.reload()}}><img src={addBtn} alt='new chat' className='add-btn' />New Chat</button>
          <div className='upper-side-bottom'>
            <button className='query' onClick={handleQuery} value={"What is Programming ?"}><img src={msgIcon} alt='Query' />What is Programming ?</button>
            <button className='query' onClick={handleQuery} value={"How to use an API ?"}><img src={msgIcon} alt='Query' />How to use an API ?</button>
          </div>
        </div>
        <div className='lower-side'>
          <div className='list-items'><img src={home} alt='' className='list-item-img' />Home</div>
          <div className='list-items'><img src={saved} alt='' className='list-item-img' />Saved</div>
          <div className='list-items'><img src={rocket} alt='' className='list-item-img' />Upgrade to Pro</div>
      </div>
      </div>
      
      <div className='main'>
        <div className='chats'>
          {messages.map((message, i) => 
            <div key={i} className={message.isBot?"chat bot": "chat"}>
                <img className='chat-img' src={message.isBot?gptImgLogo:userIcon} alt={message.bot?"Bot":"User"} /><p className='text'>{message.text}</p>
            </div>
          )}
          <div ref={msgEnd} />
        </div>
        <div className='chat-footer'>
          <div className='inp'>
            <input type='text' placeholder='How can ChatGPT help you ?' value={input} onKeyDown={handleEnter} onChange={(e) =>{setInput(e.target.value)}} /><button className='send' onClick={handleSend}><img src={sendBtn} alt='Send' /></button>
          </div>
          <p>ChatGPT may produce incorrect results or inaccurate informations about people, places or facts.</p>
        </div>
      </div>
    </div>
  )
}

export default App
