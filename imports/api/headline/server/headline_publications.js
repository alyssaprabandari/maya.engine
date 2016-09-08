import { Meteor } from 'meteor/meteor';

import { Headline } from '/imports/api/headline/headline_collection';

import { Tenant } from '/imports/api/tenant/tenant_collection';

import { constructQuery } from '/imports/modules/utils';
import { apiName, searchFieldNames } from './headline_methods';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_server_functions';

Meteor.publishComposite(apiName.headlineList, function headlineList() {
  try{
    const tenant = Tenant.findOne({domain:getCurrentUserRootDomain(this.connection)});
    
    if(!tenant)
      throw new Meteor.Error(445,'Tenant not found');
    
    return {
      find() {
        const query = {
          status    : 'Active',
          tenantId  : tenant._id,
        };
        const options = {
        };        
        return Headline.find(query,options);
      },
    };
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admHeadlineList+' - userId: '+this.userId, exception);
    return this.ready();
  }
});


//all publications for own account
// Meteor.publishComposite(apiName.myDetail, function myDetail(){
//   try{

//     // purposely not check because if user logout in myPage, it throws exception.
//     // if(!this.userId) throw new Meteor.Error(401, 'You must be logged in.');

//     return {
//       find() {
//         const query = {
//           _id: this.userId,
//         };
//         const options = {
//           fields: Headline.publicFields,
//         };
        
//         return Headline.find(query, options);
//       },

//       children: [{
//         find(headline) {
//           return Org.find({ _id: headline.orgId }, { fields: Org.publicFields });
//         },
//       },{
//       	find(headline) {
//           return Acct.find({ ownerId: headline._id }, { fields: Acct.publicFields });
//         },
//       }],
//     };
//   }catch(exception){
//     console.log('PUBLISH EXCEPTION - '+apiName.myDetail+' - userId: '+this.userId, exception);
//     return this.ready();
//   }
// });


//all publications for other public
// Meteor.publishComposite(apiName.headlineDetail, function headlineDetail(headlineId) {
//   try{
//     check(headlineId, Match._id);

//     if(!this.userId)
//       throw new Meteor.Error(401, 'You must be logged in.');

//     return {
//       find() {
//         const query = {
//           _id: headlineId,
//           status: 'Active',
//         };
//         const options = {
//           fields: Headline.publicFields,
//         };

//         const result = Headline.find(query, options);

//         if(result.count() !== 1){
//           console.log('PUBLISH WARNING (424 - supplied PK/status is wrong) - '+apiName.headlineDetail+' - userId: '+this.userId, query);
//         }

//         return result;
//       },
//       children: [{
//         find(headline) {
//           return Org.find({ _id: headline.orgId }, { fields: Org.publicFields });
//         },
//       }],
//     };
//   }catch(exception){
//     console.log('PUBLISH EXCEPTION - '+apiName.headlineDetail+' - userId: '+this.userId, exception);
//     return this.ready();
//   }
// });

// now all publications for admistrators
// Meteor.publishComposite(apiName.admHeadlineDetail, function admHeadlineDetail(headlineId) {
//   try{
//     check(headlineId, Match._id);

//     if(!this.userId)
//       throw new Meteor.Error(401, 'You must be logged in.');

//     if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
//       throw new Meteor.Error(444, 'Not enough Right');

//     return {
//       find() {
//         const query = {
//           _id: headlineId,
//         };
//         const options = { };

//         const result = Headline.find(query,options);
        
//         if(result.count() !== 1){
//           console.log('PUBLISH WARNING (414 - supplied PK is wrong) - '+apiName.admHeadlineDetail+' - userId: '+this.userId, query);
//         }

//         return result;
//       },

//       children: [{
//         find(headline) {
//           let tenantIds = [];
//           if(headline.tenants)
//             tenantIds = _.uniq(_.pluck(headline.tenants, 'tenantId'));
//           return Tenant.find({_id: {$in: tenantIds}});
//         },
//       },{
//         find(headline) {
//           let orgIds = [];
//           if(headline.orgs)
//             orgIds = _.uniq(_.pluck(headline.orgs, 'orgId'));
//           return Org.find({_id: {$in: orgIds}});
//         },
//       },{
//         find(headline) {
//           let orgIds = [];
//           if(headline.orgs)
//             orgIds = _.uniq(_.pluck(headline.orgs, 'orgId'));
//           return Acct.find({
//             $or:[
//               {ownerId: headline._id},
//               {ownerId: {$in: orgIds}},
//             ]
//           });
//         },
//       },{
//         find(headline) {
//           return Log.find({refName:'Headline',refId:headline._id},{sort: {timestamp: -1}});
//         },
//       }],
//     };

//   }catch(exception){
//     console.log('PUBLISH EXCEPTION - '+apiName.admHeadlineDetail+' - userId: '+this.userId, exception);
//     return this.ready();
//   }
// });

Meteor.publishComposite(apiName.admHeadlineList, function admHeadlineList(searchText, limit) {
  try{
    check(searchText, Match.Maybe(String));
    check(limit, Number);

    if(searchText)
      check(searchText, Match.textOnly);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
      throw new Meteor.Error(444, 'Not enough Right');

    return {
      find() {
        // Meteor._sleepForMs(1000);
        const query = constructQuery(searchFieldNames, searchText);
        const options = {
          limit: limit
        };
        return Headline.find(query,options);
      },

      children: [],
    };

  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admHeadlineList+' - userId: '+this.userId, exception);
    return this.ready();
  }
});
