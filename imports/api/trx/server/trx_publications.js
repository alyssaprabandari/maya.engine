import { Meteor } from 'meteor/meteor';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

import { Trx } from '/imports/api/trx/trx_collection.js';

import { Shop } from '/imports/api/shop/shop_collection.js';

const apiType = 'Trx.Publication';
const APIs = {
  listCart: {
    name          : 'listCart',
    description   : 'List Cart, list all Trx whose status is not Cancel, Void, Closed',
    type          : apiType,
    status        : 'Active',
  },
	detailTrx: {
    name          : 'detailTrx',
    description   : 'Trx Detail',
    type          : apiType,
    status        : 'Active',
  },
};

initAPIsToDB(APIs, apiType);

// const searchFieldNames = ['name','unitPrice','currency','uom','description','brand','brandType','tags','type'];

Meteor.publishComposite(APIs.listCart.name, function() {
  const apiName = APIs.listCart.name;
  try{
    const tenantId = isUserHasAccess(this.userId, this.connection, apiName, apiType);
        
    return {
      find(){
        const query = { 
          'tenantId' 	: tenantId,
          'buyer' 		: {
  					'partyId' 	: this.userId,
  					'partyType'	: 'Member'
  				},
          'status' 	: {
          	$nin 	: ['Cancel', 'Void', 'Closed']
          }
        };
        const options = {
          fields: Trx.publicFields,
          sort: {
            sequenceNr        : 1,
            lastModifiedAt    : -1
          }
        };
        return Trx.find(query,options);
      },
      children: [{
        find(trx) {
          return Shop.find({ _id: trx.shopId });
        },
      }],
    };
  }catch(exception){
    console.log('EXCEPTION - '+apiName+' - '+apiType+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publishComposite(APIs.detailTrx.name, function(trxId) {
  const apiName = APIs.detailTrx.name;
  try{
    check(trxId, Match._id);
    
    const tenantId = isUserHasAccess(this.userId, this.connection, apiName, apiType);
        
    return {
      find(){
        const query = { 
          _id: trxId
        };
        const options = {
          fields: Trx.publicFields,
        };
        return Trx.find(query,options);
      },
      children: [{
        find(trx) {
          return Shop.find({ _id: trx.shopId });
        }
      }],
    };
  }catch(exception){
    console.log('EXCEPTION - '+apiName+' - '+apiType+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

