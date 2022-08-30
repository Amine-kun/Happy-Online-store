import React from 'react';
import './Contact.css'

const Contact = ({contact}) => {
	return (
		<div className="contact__container">
			<div className="users__container">

				<div className="user_convo">
					<img src={contact.from.userImage} className="sender-p" alt="userp"/>
						<span className="name-msg">
							<h4 className="text-set">{contact.from.userName}</h4>
							<p className="text-set message">yoooooooo dude whatsupp, been ...</p>
						</span>
				</div>
				<div className="user_convo">
					<img src={contact.from.userImage} className="sender-p" alt="userp"/>
						<span className="name-msg">
							<h4 className="text-set">{contact.from.userName}</h4>
							<p className="text-set">yoooooooo dude whatsupp, been ...</p>
						</span>
				</div>
				<div className="user_convo">
					<img src={contact.from.userImage} className="sender-p" alt="userp"/>
						<span className="name-msg">
							<h4 className="text-set">{contact.from.userName}</h4>
							<p className="text-set">yoooooooo dude whatsupp, been ...</p>
						</span>
				</div>
				<div className="user_convo">
					<img src={contact.from.userImage} className="sender-p" alt="userp"/>
						<span className="name-msg">
							<h4 className="text-set">{contact.from.userName}</h4>
							<p className="text-set">yoooooooo dude whatsupp, been ...</p>
						</span>
				</div>

			</div>
		</div>
	)
}

export default Contact;