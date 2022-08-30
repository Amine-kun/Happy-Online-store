import React from 'react';
import './Feedbacks.css';

import {AiFillStar} from 'react-icons/ai';

const Feedbacks = ({feedback}) => {
	
	return (
		<div className="feedback">
				<div className="stars">
					{[...Array(feedback.stars)].map((e,i)=> <AiFillStar key={i}/>)}
				</div>

				<p className="text-set fbtitle">{feedback.fbContent}</p>
				<p className="text-set">{feedback.fbText}</p>
										
						<span className="barV">
						</span>			

				<div className="sender-info">	
					<img src={feedback.from.userImage} alt="sender" className="sender-p"/>
					<span className="">
						<p className="text-set sendername">{feedback.from.userName}</p>
						<p className="text-set date">yesterday</p>
					</span>
				</div>
		
		</div>
	)
}

export default Feedbacks;