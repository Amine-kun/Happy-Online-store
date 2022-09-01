import React , {useState, useEffect} from 'react';
import './Contact.css';
import Spinner from '../Spinner/Spinner';
import Convo from './Convo/Convo';

const Contact = ({contact}) => {

	const [spinner, setSpinner] = useState(false);
	const [isOpened, setIsOpened] = useState(false);
	const [showConvo, setShowConvo] = useState(false);

	useEffect(() => {
		if(isOpened)
			setTimeout(()=>{setShowConvo(true);}, 50)

	}, [isOpened])

	
	if (spinner) return <Spinner/>

	return (
		<div className="contact__container">
			<div className="users__container">

				{!isOpened && 

					<div className="user_convo pointer" onClick={()=>setIsOpened(true)}>
						<img src={contact.from.userImage} className="sender-p" alt="userp"/>
							<span className="name-msg">
								<h4 className="text-set">{contact.from.userName}</h4>
								<p className="text-set message">yoooooooo dude whatsupp, been ...</p>
							</span>
					</div>
				}

				{isOpened && 
					<Convo showConvo={showConvo} contact={contact} setIsOpened={setIsOpened}/>
				}
				
			</div>
		</div>
	)
}

export default Contact;