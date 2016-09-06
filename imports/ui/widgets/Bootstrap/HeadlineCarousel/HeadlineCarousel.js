import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';

import { Loading } from '/imports/ui/widgets/Bootstrap/Loading/Loading.js';

import { Headline } from '/imports/api/headline/headline_collection';

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
	const subscription = Meteor.subscribe('headline.list');
	if (subscription.ready()){
		const headlines = Headline.find().fetch();
		onData(null, { headlines: headlines });
	}
};

export default composeWithTracker(composer, Loading)(HeadlineCarousel);
