import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';

import { Loading } from '/imports/ui/widgets/Bootstrap/Loading/Loading.js';
import { Jumbotron, Image, Alert } from 'react-bootstrap';

import { Shop } from '/imports/api/shop/shop_collection';

const ShopDetail = ({shop}) => {
	if(!!shop){
		Session.set('searchText',shop.name);

		let images = _.where(shop.images,{imgType:'Detail'});
		if(images.length === 0)
			images = [{
				imgUrl : Meteor.settings.public.defaultShopDetail,
				imgType: "Detail"
			}];

		let indexImage = 0;
		return(
			<div className="shopDetail">
				<Image src={ images[0].imgUrl } responsive />
				<Jumbotron className="text-center">
					<h2>{ shop.name }</h2>
					<p>{ shop.description }</p>
					<p>{ shop.area }, {shop.city}</p>
					<p><small>Elo Rating: { shop.eloRating } | Viewed: { shop.viewCount }</small></p>
				</Jumbotron>
			</div>
		);
	}
	else
	 return <Alert bsStyle="warning">No Shop found...</Alert>;
}

const composer = (props, onData) => {
	const subscription = Meteor.subscribe('detailShop',props.params.shopId);
	if (subscription.ready()){
		const shop = Shop.findOne({_id:props.params.shopId});
		onData(null, { shop });
	}  
};

export default composeWithTracker(composer, Loading)(ShopDetail);
