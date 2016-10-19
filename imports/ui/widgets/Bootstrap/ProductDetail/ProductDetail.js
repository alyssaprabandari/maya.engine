import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';

import { Loading } from '/imports/ui/widgets/Bootstrap/Loading/Loading.js';
import { Grid, Row, Col, Image, Thumbnail, Button, Alert, FormGroup, InputGroup, FormControl } from 'react-bootstrap';

import { goLink } from '/imports/modules/utils';

import { Product } from '/imports/api/product/product_collection';

const buyProduct = (productId, event) => {
  const qty = document.getElementById("qty").value;
  console.log(qty);
  console.log('productId',productId);

  // FIXME now call meteor method to create open trx
};

const handleSubmit = (event) => {
  event.preventDefault();
};

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
	  			<Col xs={12} md={8}>
	      		<Image src={ images[0].imgUrl } rounded responsive />
	      	</Col>
	        <Col xs={12} md={4}>
	          <h3>{ product.name }</h3>
	          <p onClick={ goLink.bind(this, '/shop/'+product.shop()._id) }>{ product.shop()?product.shop().name : '' }</p>
	          <p>{ product.currency } { product.unitPrice.toLocaleString() }</p>
	          <p>{ product.description }</p>
	          <form onSubmit={ handleSubmit.bind(this) }>
		          <FormGroup validationState="success">
					      <InputGroup>
					        <FormControl id="qty" type="number" defaultValue={ 1 } />
					        <InputGroup.Addon>{ product.uom }</InputGroup.Addon>
					      </InputGroup>
					    </FormGroup>
	          	<Button bsStyle="success" onClick={ buyProduct.bind(this, product._id) } >Buy Now</Button>
	          </form>
	          <p>&nbsp;</p>
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
    const product = Product.findOne({_id:props.params.productId});
    onData(null, { product });
  }  
};

export default composeWithTracker(composer, Loading)(ProductDetail);
