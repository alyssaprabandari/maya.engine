import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';

import { Loading } from '/imports/ui/widgets/Bootstrap/Loading/Loading.js';
import { Grid, Row, Col, Thumbnail, Alert } from 'react-bootstrap';

import { Product } from '/imports/api/product/product_collection';

const ProductCard = ({products}) => (
  products.length > 0 
  ? <Grid>
  		<Row>
        { products.map( (product) => (
        	<Col key={product._id} xs={12} md={4}>
        		<Thumbnail href="/product/detail" alt="Product Name" src="/images/carousel.png">
        			<h3>{ product.name }</h3>
        			<p>{ product.description }</p>
        		</Thumbnail>
        	</Col>
        ))}
    </Row>
  </Grid>
  : <Alert bsStyle="warning">No Product found...</Alert>
);

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('listActiveProduct',Session.get('searchText'),10);
  if (subscription.ready()){
    const products = Product.find().fetch();
    onData(null, { products: products });
  }  
};

export default composeWithTracker(composer, Loading)(ProductCard);
