import React, {useState, useEffect} from 'react';
import './Convo.css';
import { io }  from "socket.io-client";

const Convo = ({showConvo, contact, setIsOpened}) => {

	const userInfo = localStorage.getItem('Ecom-user') !== 'undefined'
                 ? JSON.parse (localStorage.getItem('Ecom-user'))
                  : localStorage.clear();

	const [message, setMessage] = useState(null);
	const [messages, setMessages] = useState(null);
	let newlyConvo;
	const [channel, setChannel] = useState({id:userInfo._id, name:userInfo.name});
	const socket = io('http://localhost:3001');

			useEffect(() => {

				fetch(`http://localhost:3001/user/conversation/${contact._id}`,{
		              method:'post',
		              headers:{'Content-Type': 'application/json'},
		      	})
		            .then((res)=>res.json())
		             .then((data)=>{
		 										newlyConvo = data.messages;
		 										setMessages(newlyConvo);
		                     })
					
			}, [])

			useEffect(() => {
				 socket.on('receive_message', (data) => {
				    setMessages(data);
				})
			}, [socket])
	

				const sendMessage = () =>{
					socket.emit("send_message", [{message:message, source:{userId:userInfo._id, userName:userInfo.name}, time:"20:00pm"}, {message:message, source:{userId:userInfo._id, userName:userInfo.name}, time:"20:00pm"}])
			 }
 	
	return (
		<div className={`convo__section ${showConvo && 'active__convo'}`}>
						<div className="msgs">
							{messages?.map((msg, i)=>( 
							<>
								{msg.source.userId === userInfo._id
									? <p className="text-set right" >{msg.message}</p> 
									: <p className="text-set left" >{msg.message}</p>
									}
							</>))}
						</div>

						<div>
							<input type="text" placeholder="Send a message..." onChange={(e)=>setMessage(e.target.value)}/>
							<button onClick={()=>sendMessage()}>Send</button>
						</div>

		</div>
	)
}

export default Convo;