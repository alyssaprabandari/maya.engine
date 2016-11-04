import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';

import { Loading } from '/imports/ui/widgets/Bootstrap/Loading/Loading.js';
import { Alert, Grid, Row, Col, Table, Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

import { goLink } from '/imports/modules/utils';

import { Trx } from '/imports/api/trx/trx_collection';

const checkout = (shopId, event) => {
  // const qty = document.getElementById("qty").value;
  // console.log(qty);
  console.log('shopId',shopId);

};

const handleSubmit = (event) => {
  event.preventDefault();
};


const Cart = ({trxs}) => (
  trxs.length > 0
  ? <Grid>
    { trxs.map( (trx) => (
      <Row key={trx._id}>
        <Col xs={ 12 }>
          <hr/>
          <h3>{ trx.shop().name }</h3>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th className="textAlignCenter">Item</th>
                <th className="textAlignCenter">SubTotal(IDR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Makaroni Spaghetinista Foodism Excellently<br/>
                  Unit Price: IDR 100.000<br/>
                  <form onSubmit={ handleSubmit.bind(this) }>
                    <FormGroup>
                      <InputGroup>
                        <InputGroup.Addon>Qty</InputGroup.Addon>
                        <FormControl id="product1Shop1" type="number" defaultValue={ 3 } />
                        <InputGroup.Addon>Pieces</InputGroup.Addon>
                      </InputGroup>
                    </FormGroup>
                  </form>
                </td>
                <td className="textAlignRight">300.000</td>
              </tr>
              <tr>
                <td>
                  Eliksonn Type 123456<br/>
                  Unit Price: IDR 12.345.678<br/>
                  <form onSubmit={ handleSubmit.bind(this) }>
                    <FormGroup>
                      <InputGroup>
                        <InputGroup.Addon>Qty</InputGroup.Addon>
                        <FormControl id="product2Shop1" type="number" defaultValue={ 100 } />
                        <InputGroup.Addon>Kg</InputGroup.Addon>
                      </InputGroup>
                    </FormGroup>
                  </form>
                </td>
                <td className="textAlignRight">123.456.789</td>
              </tr>
              <tr>
                <td className="textAlignRight">Total(IDR)</td>
                <td className="textAlignRight"><b>123.456.789</b></td>
              </tr>
              <tr>
                <td colSpan="2" className="textAlignCenter">
                  <Button bsStyle="success" onClick={ checkout.bind(this, "shopId Pertama") } >Checkout</Button>
                </td>
              </tr>
            </tbody>
          </Table>
          <hr/>
        </Col>
      </Row>
    ))}
    </Grid>
  : <Alert bsStyle="warning">Cart is empty ...</Alert>
);

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('listCart');
  if (subscription.ready()){
    const trxs = Trx.find().fetch();    
    onData(null, { trxs });
  }  
};

export default composeWithTracker(composer, Loading)(Cart);

