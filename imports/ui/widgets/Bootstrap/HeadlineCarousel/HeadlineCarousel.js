import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';

import { Loading } from '/imports/ui/widgets/Bootstrap/Loading/Loading.js';

import { Info } from '/imports/api/info/info_collection';

import { Carousel } from 'react-bootstrap';

const HeadlineCarousel = ({ headlines }) => {
	return (
	  headlines.length > 0
	  ?
		  <Carousel>
				{headlines.map((headline) => (
					<Carousel.Item key={ headline._id }>
						<img alt={headline.title} src={headline.imgUrl}/>
	    			<Carousel.Caption>
	      			<h3>{ headline.title }</h3>
	    				<p>{ headline.description }</p>
	    			</Carousel.Caption>
					</Carousel.Item>
				))}
		  </Carousel>
	  :
			<div></div>
	);
}

const composer = (params, onData) => {
	const subscription = Meteor.subscribe('listHeadline');
	if (subscription.ready()){
		const headlines = Info.find().fetch();
		onData(null, { headlines: headlines });
	}
};

export default composeWithTracker(composer, Loading)(HeadlineCarousel);
