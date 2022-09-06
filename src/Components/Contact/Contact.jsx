import React , {useState, useEffect} from 'react';
import './Contact.css';
import Spinner from '../Spinner/Spinner';
import Convo from './Convo/Convo';

const Contact = ({contact}) => {

	const [spinner, setSpinner] = useState(false);
	const [isOpened, setIsOpened] = useState(false);
	const [showConvo, setShowConvo] = useState(false);
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

		fetch(`http://localhost:3001/user/Contact`,{
						              method:'post',
						              headers:{'Content-Type': 'application/json'},
						              body: JSON.stringify({
						              	initialMessage:{
						              		time:"20:00pm",
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
	
	if (spinner) return <Spinner/>

	return (
		<div className="contact__container">
			<div className="users__container">

				{!isOpened && 
					<>
						<div className="user_convo pointer" onClick={()=>setIsOpened(true)}>
							<img src={userInfo._id === contact.from.userId ? contact.to.userImage : contact.from.userImage} className="sender-p" alt="userp"/>
								<span className="name-msg">
									<h4 className="text-set">{userInfo._id === contact.from.userId ? contact.to.userName : contact.from.userName}</h4>
									<p className="text-set message">yoooooooo dude whatsupp, been ...</p>
								</span>
						</div>
						<div>
							<input type="text" placeholder="add a friend" onChange={(e)=>setNewFriend(e.target.value)}/>
							<button onClick={()=> submitContact()}>Add</button>
						</div>
							<input type="text" placeholder="your message" onChange={(e)=>setInitialMessage(e.target.value)}/>
					</>
				}

				{isOpened && 
					<Convo showConvo={showConvo} contact={contact} setIsOpened={setIsOpened} userInfo={userInfo}/>
				}
				
			</div>
		</div>
	)
}

export default Contact;