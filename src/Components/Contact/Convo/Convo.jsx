import React, {useState, useEffect} from 'react';
import './Convo.css';
import { io }  from "socket.io-client";

const Convo = ({showConvo, contact, setIsOpened, userInfo}) => {

	const [message, setMessage] = useState(null);
	const [messages, setMessages] = useState(null);
	const [channel, setChannel] = useState({id:userInfo._id, name:userInfo.name});
	const socket = io('http://localhost:3001');

			useEffect(() => {

				fetch(`http://localhost:3001/user/conversation/${contact._id}`,{
		              method:'get',
		              headers:{'Content-Type': 'application/json'},
		      	})
		            .then((res)=>res.json())
		             .then((data)=>{
		 										setMessages(data.messages);
		                     })
					
			}, [])

			useEffect(() => {
				 socket.on('receive_message', (data) => {
				 		setMessages((prev) => [...prev, data])
				});

				 return () => {
		        socket.disconnect();
		      }

			}, [])
	

				const sendMessage = () =>{
					if (!message || message === ''){
						console.log("enter a valid message")
					} else {
							socket.emit("send_message", {message:message, source:{userId:userInfo._id, userName:userInfo.name}});

							fetch(`http://localhost:3001/user/conversation`,{
						              method:'post',
						              headers:{'Content-Type': 'application/json'},
						              body: JSON.stringify({
						              	convoId: contact._id,
						              	time:"20:00pm",
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
						 										console.log(data)
						                     })
								}
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