import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';

import { Loading } from '/imports/ui/widgets/Bootstrap/Loading/Loading.js';
import { Grid, Row, Col, Thumbnail, Alert } from 'react-bootstrap';

import { Info } from '/imports/api/info/info_collection';

const ProductCard = ({products}) => (
  products.length > 0 
  ? <Grid>
  		<Row>
        { products.map( (product) => (
        	<Col key={product._id} xs={12} md={4}>
        		<Thumbnail href="/product/detail" alt="Product Name" src="/images/carousel.png">
        			<h3>Thumbnail label</h3>
        			<p>Description</p>
        		</Thumbnail>
        	</Col>
        ))}
    </Row>
  </Grid>
  : <Alert bsStyle="warning">No Product yet.</Alert>
);

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('listFaq');
  if (subscription.ready()){
    const products = Info.find().fetch();
    onData(null, { products: products });
  }  
};

export default composeWithTracker(composer, Loading)(ProductCard);
