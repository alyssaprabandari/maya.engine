import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';

import { Loading } from '/imports/ui/widgets/Bootstrap/Loading/Loading.js';
import { Grid, Row, Col, Image, Thumbnail, Button, Alert } from 'react-bootstrap';

import { Product } from '/imports/api/product/product_collection';

const ProductDetail = ({product}) => {
	if(!!product){
		let images = _.where(product.images,{imgType:'Detail'});
		if(images.length === 0)
			images = [{
				imgUrl : Meteor.settings.public.defaultProductDetail,
				imgType: "Detail"
			}];

		let indexImage = 0;
		return(
		  <Grid>
	  		<Row>
	        <Col xs={12} md={4}>
	          <h3>{ product.name }</h3>
	          <p>{ product.brand } { product.brandType }</p>
	          <p>{ product.currency } { product.unitPrice.toLocaleString() }</p>
	          <p>{ product.description }</p>
	          <Button bsStyle="primary">Buy Now</Button>
	          <p>&nbsp;</p>
	        </Col>
	      	<Col xs={12} md={8}>
	      		<Image src={ images[0].imgUrl } responsive />
	      	</Col>
	      </Row>
	      <hr/>
	      <Row>
	      	{ 
	      		images.map( (image) => (
		      		<Col xs={6} md={3} key={ indexImage++ } >
		      			<Image src={ image.imgUrl } thumbnail />
		      		</Col>
	      	))}
	      </Row>
	      <hr/>
		  </Grid>
		);
	}
	else
   return <Alert bsStyle="warning">No Product found...</Alert>;
}

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('detailProduct',props.params.productId);
  if (subscription.ready()){
    const product = Product.findOne();
    onData(null, { product });
  }  
};

export default composeWithTracker(composer, Loading)(ProductDetail);
