import React, {useState} from 'react';
import './Convo.css';
import socketClient  from "socket.io-client";

const Convo = ({showConvo, contact, setIsOpened}) => {

	const userInfo = localStorage.getItem('Ecom-user') !== 'undefined'
                 ? JSON.parse (localStorage.getItem('Ecom-user'))
                  : localStorage.clear();

	const [message, setMessage] = useState(null);
	const [channel, setChannel] = useState({id:userInfo._id, name:userInfo.name})
	const socket = socketClient('http://localhost:4000');
	
	const sendMessage = () =>{

		 // fetch('http://localhost:3001/user/conversation',{
   //            method:'post',
   //            headers:{'Content-Type': 'application/json'},
   //            body: JSON.stringify({
   //              message:message,
   //              convoId:contact._id,
   //      	})
   //    	})
   //          .then((res)=>res.json())
   //           .then((data)=>{
 		// 								setIsOpened(false);
   //                   })
 }

			 socket.on('connection', () => {
			    console.log("hii")
			})
 	
	return (
		<div className={`convo__section ${showConvo && 'active__convo'}`}>
						<div className="msgs">
							{contact.messages.map((msg, i)=>( 
							<>
								{msg.from === 'me' 
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