import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';

import { Loading } from '/imports/ui/widgets/Bootstrap/Loading/Loading.js';
import { Grid, Row, Col, Button, Alert } from 'react-bootstrap';

import { Product } from '/imports/api/product/product_collection';

const ProductDetail = ({product}) => (
  !!product 
  ? 
  <Grid>
  		<Row>
      	<Col xs={12} md={6}>
    			<h3>{ product.name }</h3>
    			<p>{ product.currency } { product.unitPrice }</p>
          <Button bsStyle="primary">Buy Now</Button>
      	</Col>
        <Col xs={12} md={6}>
          <p>{ product.description }</p>
          <p>{ product.brand } { product.brandType }</p>
        </Col>
      </Row>
  </Grid>
  : <Alert bsStyle="warning">No Product found...</Alert>
);

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('detailProduct',props.params.productId);
  if (subscription.ready()){
    const product = Product.findOne();
    onData(null, { product });
  }  
};

export default composeWithTracker(composer, Loading)(ProductDetail);
