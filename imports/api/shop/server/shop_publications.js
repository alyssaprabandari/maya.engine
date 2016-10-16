import { Meteor } from 'meteor/meteor';

import { initAPIsToDB, isUserHasAccess, constructSearchQuery } from '/imports/api/general/server/general_server_functions';

import { Shop } from '/imports/api/shop/shop_collection.js';

const apiType = 'Shop.Publication';
const APIs = {
  listAllShop: {
    name          : 'listAllShop',
    description   : 'List all Shop that current User has access',
    type          : apiType,
    status        : 'Active',
  },
  listActiveShop: {
    name          : 'listActiveShop',
    description   : 'List all Shop with Active as status',
    type          : apiType,
    status        : 'Active',
  },
  detailShop: {
    name          : 'detailShop',
    description   : 'Shop Detail',
    type          : apiType,
    status        : 'Active',
  },
};

initAPIsToDB(APIs, apiType);

const searchFieldNames = ['name','city','area','address','description','tags','type'];

Meteor.publishComposite(APIs.listAllShop.name, function(searchText, limit) {
  const apiName = APIs.listAllShop.name;
  try{
    check(limit, Number);
    check(searchText, Match.Maybe(String));
    
    if(searchText)
      check(searchText, Match.textOnly);

    const tenantId = isUserHasAccess(this.userId, this.connection, apiName, apiType);
        
    return {
      find() {
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
          fields: Shop.publicFields, //FIXME adjust sesuai kebutuhan
          sort: {
            sequenceNr        : 1,
            lastModifiedAt    : -1
          }
        };
        return Shop.find(query,options);
      },
    };
  }catch(exception){
    console.log('EXCEPTION - '+apiName+' - '+apiType+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publishComposite(APIs.listActiveShop.name, function(searchText, limit) {
  const apiName = APIs.listActiveShop.name;
  try{
    check(limit, Number);
    check(searchText, Match.Maybe(String));
    
    if(searchText)
      check(searchText, Match.textOnly);

    const tenantId = isUserHasAccess(this.userId, this.connection, apiName, apiType);
        
    return {
      find() {
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
          fields: Shop.publicFields, //FIXME adjust sesuai kebutuhan
          sort: {
            sequenceNr        : 1,
            lastModifiedAt    : -1
          }
        };
        return Shop.find(query,options);
      },
    };
  }catch(exception){
    console.log('EXCEPTION - '+apiName+' - '+apiType+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publishComposite(APIs.detailShop.name, function(shopId) {
  const apiName = APIs.detailShop.name;
  try{
    check(shopId, Match._id);
    
    const tenantId = isUserHasAccess(this.userId, this.connection, apiName, apiType);
        
    return {
      find() {
        const query = { 
          _id: shopId
        };
        const options = {
          fields: Shop.publicFields,
        };
        return Shop.find(query,options);
      },
    };
  }catch(exception){
    console.log('EXCEPTION - '+apiName+' - '+apiType+' - userId: '+this.userId, exception);
    return this.ready();
  }
});
