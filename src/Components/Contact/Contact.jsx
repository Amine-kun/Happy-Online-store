import React , {useState, useEffect} from 'react';
import './Contact.css';
import Spinner from '../Spinner/Spinner';
import Convo from './Convo/Convo';

const Contact = ({contact}) => {

	const [spinner, setSpinner] = useState(false);

	const [isOpened, setIsOpened] = useState(false);
	const [showConvo, setShowConvo] = useState(false);
	const [chat, setChat] = useState(null);

	const [newFriend, setNewFriend] = useState(null);
	const [initialMessage, setInitialMessage] = useState(null);

	const userInfo = localStorage.getItem('Ecom-user') !== 'undefined'
                 ? JSON.parse (localStorage.getItem('Ecom-user'))
                  : localStorage.clear();

	useEffect(() => {
		if(isOpened)
			setTimeout(()=>{setShowConvo(true);}, 50)

	}, [isOpened])

	const submitContact = () => {

		fetch(`https://happy-store-backend.herokuapp.com/user/Contact`,{
						              method:'post',
						              headers:{'Content-Type': 'application/json'},
						              body: JSON.stringify({
						              	initialMessage:{
						              		time: 
											  new Date(Date.now()).getHours() 
											  + ":" 
											  + new Date(Date.now()).getMinutes(),
						              		message:initialMessage,
						              	},
						              	newFriend:newFriend,
						              	from:{
						              		userId: userInfo._id,
						              		userName: userInfo.name,
						              		userImage:userInfo.userImage
						              	}
						              })
		      						})

					          	   .then((res)=>res.json())

	}

	const chatFunctions = (singleContact) =>{
			setIsOpened(true);
			setChat(singleContact._id);
	}
	
	if (spinner) return <Spinner/>

	return (
		<div className="contact__container">
			<div className="users__container">

				{!isOpened && 
					<>
						{!contact.length ? <div className="user-items">
                                      		  <p className="Boldtext" style={{color:"grey"}}>You have no Feedbacks at the moment</p>
                                	     </div>

                                     : contact.map((singleContact, i) => 
											<div className="user_convo pointer" onClick={()=>chatFunctions(singleContact)} key={i}>
												<img src={userInfo._id === singleContact.from.userId ? singleContact.to.userImage : singleContact.from.userImage} 
												className="sender-p" alt="userp"/>

													<span className="name-msg">
														<h4 className="text-set">
															{userInfo._id === singleContact.from.userId ? singleContact.to.userName : singleContact.from.userName}
														</h4>
														<p className="text-set message">Click to see the Chat</p>
													</span>
													
											</div>
											)}

						<div className="add">
							<input className="add__input" type="text" placeholder="add a friend" onChange={(e)=>setNewFriend(e.target.value)}/>
							<button onClick={()=> submitContact()} className="add__btn">Add</button>
						</div>
							<input type="text"  className="add__input" style={{width:"80%"}} placeholder="your message" onChange={(e)=>setInitialMessage(e.target.value)}/>
					</>
				}

				{isOpened && 
					<Convo showConvo={showConvo} chat={chat} setIsOpened={setIsOpened} userInfo={userInfo}/>
				}
				
			</div>
		</div>
	)
}

export default Contact;