import React, {useState} from 'react';
import './Convo.css';

const Convo = ({showConvo, contact}) => {

	const [message, setMessage] = useState(null);
	
	const sendMessage = () =>{
		console.log('sfsadfsadfsfsd')

		 fetch('http://localhost:3001/user/conversation',{
              method:'post',
              headers:{'Content-Type': 'application/json'},
              body: JSON.stringify({
                message:message,
                convoId:contact._id,
        	})
      	})
            .then((res)=>res.json())
             .then((data)=>
               console.log(data)
              )
 }
 	
	return (
		<div className={`convo__section ${showConvo && 'active__convo'}`}>
						<div className="msgs">
							{contact.messages.map((msg, i)=>( 
							<>
								{msg.from === 'me' 
									? <p className="text-set right">{msg.message}</p> 
									: <p className="text-set left">{msg.message}</p>
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