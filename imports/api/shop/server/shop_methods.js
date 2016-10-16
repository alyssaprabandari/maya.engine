import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '/imports/modules/rate-limit.js';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

import { Shop } from '/imports/api/shop/shop_collection';
import { Member } from '/imports/api/member/member_collection';
import { Org } from '/imports/api/org/org_collection';

const apiType = 'Shop.Method';
const APIs = {
  insertShop: {
    name: 'insertShop',
    description: 'Insert new Shop',
    type: apiType,
    status: 'Active',
  },
  updateShop: {
    name: 'updateShop',
    description: 'Update existing Shop',
    type: apiType,
    status: 'Active',
  },
  removeShop: {
    name: 'removeShop',
    description: 'Remove existing Shop',
    type: apiType,
    status: 'Active',
  },
};

initAPIsToDB(APIs, apiType);

export const insertShop = new ValidatedMethod({
  name: APIs.insertShop.name,
  validate: Shop.schema.pick(['name','city','area','address','country','latitude','longitude','description','type']).validator(),

  run(shop) {
    try{
      // now sanity check
      const tenantId = isUserHasAccess(this.userId, this.connection, apiName, apiType);
      shop.tenantId = tenantId;
      shop.owners = [{
        partyId     : this.userId,
        partyType   : "Member"
      }];
      return Shop.insert(shop);

    }catch(exception){
      console.log('EXCEPTION - '+APIs.insertShop.name+' - '+apiType+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});


rateLimit({
  methods: [
    insertShop,
    // updateShop,
    // removeShop
  ],
  limit: 5,
  timeRange: 1000,
});

