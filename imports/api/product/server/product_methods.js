import { Meteor } from 'meteor/meteor';

import { Product } from '/imports/api/product/product_collection.js';

import { Member } from '/imports/api/member/member_collection.js';
import { Org } from '/imports/api/org/org_collection.js';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { constructQuery } from '/imports/modules/utils';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_functions';

export const apiName = {
  myProductList         : 'my.product.list',
  myProductDetail       : 'my.product.detail',
  admProductList        : 'adm.product.list',
  admProductListCount   : 'adm.product.list.count',
  admProductDetail      : 'adm.product.detail',
  admProductFormInsert  : 'adm.product.form.insert',
  admProductFormUpdate  : 'adm.product.form.update',
};

export const searchFieldNames = ['name','coaNr','ownerId','ownerType','unitPrice','currency','uom','description','type','status', 'refs'];

export const admProductListCount = new ValidatedMethod({
  name: apiName.admProductListCount,
  validate: new SimpleSchema({
    searchText: { type: String, optional: true }
  }).validator(),

  run({searchText}) {
    try{
      check(searchText, Match.Maybe(Match.textOnly));

      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      const query = constructQuery(searchFieldNames,searchText);
      return Product.find(query).count();

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admProductListCount+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

export const admProductFormInsert = new ValidatedMethod({
  name: apiName.admProductFormInsert,
  validate: Product.schema.pick(['name','coaNr','ownerId','ownerType','unitPrice','currency','uom','description','type','status']).validator(),

  run(product) {
    try{
      // now sanity check
      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      let owner;
      switch(product.ownerType){
        case 'Org'  : 
          owner = Org.findOne({_id: product.ownerId});
          break;
        case 'Member'   : 
          owner = Member.findOne({_id: product.ownerId});
          break;
      };

      if(!owner)
        throw new Meteor.Error(449,'Owner not Found');

      return Product.insert(product);

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admProductFormInsert+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

export const admProductFormUpdate = new ValidatedMethod({
  name: apiName.admProductFormUpdate,

  validate: new SimpleSchema([
    Product.schema.pick(['name','coaNr','ownerId','ownerType','unitPrice','currency','uom','description','type','status']),
    {
      _id: { 
        type: SimpleSchema.RegEx.Id,
      },
    }
  ]).validator(),

  run( product ) {
    try{

      if( !this.userId )
        throw new Meteor.Error(401, 'You must be logged in.');
      
      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      let owner;
      switch(product.ownerType){
        case 'Org'  : 
          owner = Org.findOne({_id: product.ownerId});
          break;
        case 'Member'   : 
          owner = Member.findOne({_id: product.ownerId});
          break;
      };

      if(!owner)
        throw new Meteor.Error(449,'Owner not Found');

      Product.update(product._id, { $set: product });

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admProductFormUpdate+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  },
});

