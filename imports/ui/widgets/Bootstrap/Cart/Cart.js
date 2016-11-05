import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';

import { Loading } from '/imports/ui/widgets/Bootstrap/Loading/Loading.js';
import { Alert, Grid, Row, Col, Table, Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

import { goLink } from '/imports/modules/utils';

import { Trx } from '/imports/api/trx/trx_collection';

const checkout = (trxId, event) => {
  // const qty = document.getElementById("qty").value;
  // console.log(qty);
  console.log('trxId',trxId);
};

const removeTrxInCart = (trxId, event) => {
  try{
    Meteor.call('removeTrxInCart', {trxId}, function(error,result){
      if(error)
      	Bert.alert(error.message+', please contact helpdesk of '+Meteor.settings.public.tenant,'danger');
    });
  }catch(exception){
    Bert.alert(exception,'danger');
  }
};

const removeProductInCart = (trxId, productId, event) => {
  try{
    Meteor.call('removeProductInCart', {trxId, productId}, function(error,result){
      if(error)
      	Bert.alert(error.message+', please contact helpdesk of '+Meteor.settings.public.tenant,'danger');
    });
  }catch(exception){
    Bert.alert(exception,'danger');
  }
};

const changeProductQtyInCart = (trxId, trxItem, event) => {
  try{
    const qtyNew = Number(event.target.value);

    if(isNaN(qtyNew) || qtyNew === 0)
      throw "may not empty";

    if(qtyNew !== trxItem.qty)
      Meteor.call('changeProductQtyInCart', {trxId: trxId, productId:trxItem.productId, qtyNew:qtyNew}, function(error,result){
        if(error){
          Bert.alert(error.message+', please contact helpdesk of '+Meteor.settings.public.tenant,'danger');
          document.getElementById(trxId+'_'+trxItem.productId).value = trxItem.qty;
        };
      });
  }catch(exception){
  	Bert.alert(exception,'danger');
    document.getElementById(trxId+'_'+trxItem.productId).value = trxItem.qty;
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
};


const Cart = ({trxs}) => (
  trxs.length > 0
  ? <Grid>
    { trxs.map( (trx) => (
      <Row key={ trx._id }>
        <Col xs={ 12 }>
          <hr/>
          <h3>{ trx.name }</h3>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th className="textAlignCenter">Item</th>
                <th className="textAlignCenter">SubTotal(IDR)</th>
              </tr>
            </thead>
            <tbody>
              { trx.trxItems.map( (trxItem) => (
                
                <tr key={ trxItem.productId }>
                  <td>
                    { trxItem.name }<br/>
                    Unit Price: { trxItem.currency } { trxItem.unitPrice.toLocaleString() }<br/>
                    <form onSubmit={ handleSubmit.bind(this) }>
                      <FormGroup>
                        <InputGroup>
                          <InputGroup.Addon>Qty</InputGroup.Addon>
                          <FormControl id={ trx._id + '_' + trxItem.productId } type="number" defaultValue={ trxItem.qty } onBlur={ changeProductQtyInCart.bind(this, trx._id, trxItem) }/>
                          <InputGroup.Addon>{ trxItem.uom }</InputGroup.Addon>
                        </InputGroup>
                      </FormGroup>
                    </form>
                  </td>
                  <td className="textAlignRight">
                  	{ trxItem.subTotal.toLocaleString() }<br/>
                  	<Button bsStyle="danger" onClick={ removeProductInCart.bind(this, trx._id, trxItem.productId) } >Cancel</Button>
                  </td>
                </tr>

              ))}

              <tr>
                <td className="textAlignRight">Total({ trx.currency })</td>
                <td className="textAlignRight"><b>{ trx.total.toLocaleString() }</b></td>
              </tr>
              <tr>
                <td className="textAlignCenter">
                  <Button bsStyle="danger" onClick={ removeTrxInCart.bind(this, trx._id) } >Cancel All</Button>
                </td>
                <td className="textAlignCenter">
                  <Button bsStyle="success" onClick={ checkout.bind(this, trx._id) } >Checkout</Button>
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

