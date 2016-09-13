import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '/imports/modules/rate-limit.js';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

import { Product } from '/imports/api/product/product_collection';
import { Member } from '/imports/api/member/member_collection';
import { Org } from '/imports/api/org/org_collection';

const apiType = 'Product.Method';
const APIs = {
  insertProduct: {
    name: 'insertProduct',
    description: 'Insert new Product',
    type: apiType,
    status: 'Active',
  },
  updateProduct: {
    name: 'updateProduct',
    description: 'Update existing Product',
    type: apiType,
    status: 'Active',
  },
  removeProduct: {
    name: 'removeProduct',
    description: 'Remove existing Product',
    type: apiType,
    status: 'Active',
  },
};

initAPIsToDB(APIs, apiType);

export const insertProduct = new ValidatedMethod({
  name: APIs.insertProduct.name,
  validate: Product.schema.pick(['name','unitPrice','currency','uom','description','type']).validator(),

  run(product) {
    try{
      // now sanity check
      const tenantId = isUserHasAccess(this.userId, this.connection, apiName, apiType);
      product.tenantId = tenantId;
      product.owners = [{
        partyId     : this.userId,
        partyType   : "Member"
      }];
      return Product.insert(product);

    }catch(exception){
      console.log('EXCEPTION - '+APIs.insertProduct.name+' - '+apiType+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});


rateLimit({
  methods: [
    insertProduct,
    // updateProduct,
    // removeProduct
  ],
  limit: 5,
  timeRange: 1000,
});

