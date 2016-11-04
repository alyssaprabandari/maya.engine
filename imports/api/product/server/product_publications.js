import { Meteor } from 'meteor/meteor';

import { initAPIsToDB, isUserHasAccess, constructSearchQuery } from '/imports/api/general/server/general_server_functions';

import { Product } from '/imports/api/product/product_collection.js';

import { Shop } from '/imports/api/shop/shop_collection.js';

const apiType = 'Product.Publication';
const APIs = {
  listAllProduct: {
    name          : 'listAllProduct',
    description   : 'List all Product that current User has access',
    type          : apiType,
    status        : 'Active',
  },
  listActiveProduct: {
    name          : 'listActiveProduct',
    description   : 'List all Product with Active as status',
    type          : apiType,
    status        : 'Active',
  },
  detailProduct: {
    name          : 'detailProduct',
    description   : 'Product Detail with Active as status',
    type          : apiType,
    status        : 'Active',
  },
};

initAPIsToDB(APIs, apiType);

const searchFieldNames = ['name','unitPrice','currency','uom','description','brand','brandType','tags','type'];

Meteor.publishComposite(APIs.listAllProduct.name, function(searchText, limit) {
  const apiName = APIs.listAllProduct.name;
  try{
    check(limit, Number);
    check(searchText, Match.Maybe(String));
    
    if(searchText)
      check(searchText, Match.textOnly);

    const tenantId = isUserHasAccess(this.userId, this.connection, apiName, apiType);
        
    return {
      find(){
        const querySearch = constructSearchQuery(searchFieldNames,searchText);
        const query = { 
          $and:[
            {
              'tenantId'          : tenantId,
              'owners.partyId'    : this.userId,
              'owners.partyType'  : 'Member',
            }, querySearch
          ]
        };
        const options = {
          fields: Product.publicFields, //FIXME adjust sesuai kebutuhan
          sort: {
            sequenceNr        : 1,
            lastModifiedAt    : -1
          }
        };
        return Product.find(query,options);
      },
      children: [{
        find(product) {
          return Shop.find({ _id: product.shopId });
        }
      }],
    };
  }catch(exception){
    console.log('EXCEPTION - '+apiName+' - '+apiType+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publishComposite(APIs.listActiveProduct.name, function(searchText, limit) {
  const apiName = APIs.listActiveProduct.name;
  try{
    check(limit, Number);
    check(searchText, Match.Maybe(String));
    
    if(searchText)
      check(searchText, Match.textOnly);

    const tenantId = isUserHasAccess(this.userId, this.connection, apiName, apiType);
        
    return {
      find(){
        const querySearch = constructSearchQuery(searchFieldNames,searchText);        
        const query = { 
          $and:[
            {
              'tenantId'          : tenantId,
              'status'            : 'Active',
            }, querySearch
          ]
        };
        const options = {
          fields: Product.publicFields, //FIXME adjust sesuai kebutuhan
          sort: {
            sequenceNr        : 1,
            lastModifiedAt    : -1
          }
        };
        return Product.find(query,options);
      },
      children: [{
        find(product) {
          return Shop.find({ _id: product.shopId });
        }
      }],
    };
  }catch(exception){
    console.log('EXCEPTION - '+apiName+' - '+apiType+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publishComposite(APIs.detailProduct.name, function(productId) {
  const apiName = APIs.detailProduct.name;
  try{
    check(productId, Match._id);
    
    const tenantId = isUserHasAccess(this.userId, this.connection, apiName, apiType);
        
    return {
      find(){
        const query = { 
          _id: productId,
          status: 'Active'
        };
        const options = {
          fields: Product.publicFields,
        };
        return Product.find(query,options);
      },
      children: [{
        find(product) {
          return Shop.find({ _id: product.shopId });
        }
      }],
    };
  }catch(exception){
    console.log('EXCEPTION - '+apiName+' - '+apiType+' - userId: '+this.userId, exception);
    return this.ready();
  }
});
