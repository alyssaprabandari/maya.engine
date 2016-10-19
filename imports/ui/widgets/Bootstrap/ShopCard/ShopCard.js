import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';

import { Loading } from '/imports/ui/widgets/Bootstrap/Loading/Loading.js';
import { Grid, Row, Col, Thumbnail, Alert } from 'react-bootstrap';

import { goLink } from '/imports/modules/utils';

import { Shop } from '/imports/api/shop/shop_collection';

const shopThumbnail = (images) => {
  if(images){
    const thumbnail = _.findWhere(images,{imgType:'Thumbnail'});
    if(thumbnail && thumbnail.imgUrl)
      return thumbnail.imgUrl;
  };
  return Meteor.settings.public.defaultShopThumbnail;
};

const ShopCard = ({shops}) => (
  shops.length > 0 
  ? <Grid>
  		<Row>
        { shops.map( (shop) => (
        	<Col key={shop._id} xs={12} md={4}>
        		<Thumbnail alt="Shop Name" src={ shopThumbnail(shop.images) } onClick={ goLink.bind(this, '/shop/'+shop._id) }>
        			<h3>{ shop.name }</h3>
              <p>{ shop.area }, { shop.city }</p>
        			<p>{ shop.country }</p>
        		</Thumbnail>
        	</Col>
        ))}
    </Row>
  </Grid>
  : <Alert bsStyle="warning">No Shop found...</Alert>
);

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('listActiveShop',Session.get('searchText'),10);
  if (subscription.ready()){
    const shops = Shop.find().fetch();
    onData(null, { shops: shops });
  }  
};

export default composeWithTracker(composer, Loading)(ShopCard);
