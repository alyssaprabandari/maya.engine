import { Meteor } from 'meteor/meteor';

import { Product } from '/imports/api/product/product_collection.js';

import { Member } from '/imports/api/member/member_collection.js';
import { Org } from '/imports/api/org/org_collection.js';

import { constructQuery } from '/imports/modules/utils';
import { apiName, searchFieldNames } from './product_methods';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_server_functions';

//all publications for own account
Meteor.publish(apiName.myProductList, function myProductList(){
  try{
    
    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');
  
    return Product.find({ ownerId: this.userId }, { fields: Product.publicFields });
  
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.myProductList+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publish(apiName.myProductDetail, function myProductDetail(productId){
  try{
    check(productId, Match._id);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    return Product.find({ _id: productId, ownerId: this.userId }, { fields: Product.publicFields });
  
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.myProductDetail+' - userId: '+this.userId, exception);
    return this.ready();
  }
});


// now all publications for admistrators
Meteor.publishComposite(apiName.admProductDetail, function admProductDetail(productId) {
  try{
    check(productId, Match._id);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
      throw new Meteor.Error(444, 'Not enough Right');

    return {
      find() {
        
        const query = {
          _id: productId,
        };

        const options = {

        };

        return Product.find(query, options);
      },

      children: [{
        find(product) {
          if(product.ownerType === "Member")
            return Member.find({ _id: product.ownerId });
          if(product.ownerType === "Org")
            return Org.find({ _id: product.ownerId });
        },
      }],
    };

  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admProductDetail+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publishComposite(apiName.admProductList, function admProductList(searchText, limit) {
  try{
    check(searchText, Match.Maybe(Match.textOnly));
    check(limit, Number);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
      throw new Meteor.Error(444, 'Not enough Right');

    return {
      find() {
        const query = constructQuery(searchFieldNames,searchText);
        const options = {
          limit: limit
        };
        return Product.find(query,options);
      },

      children: [{
        find(product) {
          if(product.ownerType === "Member")
            return Member.find({ _id: product.ownerId });
          if(product.ownerType === "Org")
            return Org.find({ _id: product.ownerId });
        },
      }],
    };
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admProductList+' - userId: '+this.userId, exception);
    return this.ready();
  }  
});

