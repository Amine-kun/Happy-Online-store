import React, {useState, useEffect, useRef} from 'react';
import './Convo.css';
import Spinner from '../../Spinner/Spinner';

import { io }  from "socket.io-client";

const Convo = ({showConvo, chat, setIsOpened, userInfo}) => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState(null);
	const [spinner, setSpinner] = useState(true);

	const bottomRef = useRef();
	
	const socket = io('https://happy-store-backend.herokuapp.com/', {
			  withCredentials: true
			});

			useEffect(() => {
				socket.emit("join_chat", chat);

				fetch(`https://happy-store-backend.herokuapp.com/user/conversation/${chat}`,{
		              method:'get',
		              headers:{'Content-Type': 'application/json'},
		      	})
		            .then((res)=>res.json())
		             .then((data)=>{
		 					setMessages(data.messages);
							setSpinner(false);
							bottomRef.current?.scrollIntoView({behavior:"smooth"})
		                     })
					
			}, [])

			useEffect(() => {
				 socket.on('receive_message', (data) => {
				   setMessages((prev) => [...prev, data])
				});
			}, [socket])
	

				const sendMessage = async () =>{
					const getTime = new Date(Date.now()).getHours() 
									+ ":" 
									+ new Date(Date.now()).getMinutes();

					const messageData =  {channel:chat,
										  message:message, 
										  source:{
											     userId:userInfo._id,
											     userImage:userInfo.userImage,
												 userName:userInfo.name}, 
										   time: getTime,
										   };


					if (!message || message === ''){
						console.log("enter a valid message")
					} else {
							await socket.emit("send_message", messageData);

							fetch(`https://happy-store-backend.herokuapp.com/user/conversation`,{
						              method:'post',
						              headers:{'Content-Type': 'application/json'},
						              body: JSON.stringify({
						              	convoId: chat,
						              	time: getTime,
						              	message:message,
						              	source:{
						              		userId:userInfo._id,
						              		userName:userInfo.name,
						              		userImage:userInfo.userImage
						              	}
						              })
		      						})

					          	   .then((res)=>res.json())
						             .then((data)=>{
						 				setMessage('');
						 				bottomRef.current?.scrollIntoView({behavior:"smooth"})
						                     })
								}
			 }
 	
	
	if (spinner) return <Spinner/>

	return (
		<div className={`convo__section ${showConvo && 'active__convo'}`}>
						<div className="msgs">
							{messages?.map((msg, i)=>( 
							<>
								{msg.source.userId === userInfo._id
									? <span className="right">
											<p className="text-set msg__comp" >{msg.message}</p>
											<p className="text-set time">{msg.time}</p>
										</span>
									: <span className="left">
											<img src={msg.source.userImage} className="sender" alt="contacter"/>
											<p className="text-set msg__comp" >{msg.message}</p>
											<p className="text-set time">{msg.time}</p>
									  </span>
									}
							</>))}
								<div className="ref-div" ref={bottomRef}></div>
						</div>

						<div className="chat__inputs">
							<input className="chat__input" type="text" value={message}placeholder="Send a message..." onChange={(e)=>setMessage(e.target.value)}/>
							<button className="chat__btn" onClick={()=>sendMessage()}>Send</button>
						</div>

		</div>
	)
}

export default Convo;