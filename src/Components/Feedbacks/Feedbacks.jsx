import React from 'react';
import './Feedbacks.css'

const Feedbacks = ({feedback}) => {
	return (
		<div className="feedback">

				<p className="text-set fbtitle">{feedback.fbContent}</p>
				<p className="text-set">I really liked this product and im gonna always fall back here when i want to buy it next time</p>
										
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