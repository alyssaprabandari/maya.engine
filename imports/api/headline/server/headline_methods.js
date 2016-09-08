import { Meteor } from 'meteor/meteor';

import { Headline } from '../headline_collection.js';

import { Tenant } from '/imports/api/tenant/tenant_collection.js';
import { Acct } from '/imports/api/acct/acct_collection.js';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { constructQuery } from '/imports/modules/utils';

import { checkTenant, checkOrg, getCurrentUserRootDomain } from '/imports/api/general/server/general_server_functions';

export const apiName = {
  headlineList           : 'headline.list',
  admHeadlineList        : 'adm.headline.list',
  admHeadlineListCount   : 'adm.headline.list.count',
  admHeadlineDetail      : 'adm.headline.detail',
  // admHeadlineFormInsert  : 'adm.headline.form.insert',
  admHeadlineFormUpdate  : 'adm.headline.form.update',
};

export const searchFieldNames = ['title','description','refs.refId'];

export const admHeadlineListCount = new ValidatedMethod({
  name: apiName.admHeadlineListCount,
  validate: new SimpleSchema({
    searchText: { type: String, optional: true }
  }).validator(),

  run({searchText}) {
    try{
      // now sanity check
      if(searchText)
        check(searchText, Match.textOnly);

      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      const query = constructQuery(searchFieldNames, searchText);
      return Headline.find(query).count();

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admHeadlineListCount+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

// export const admHeadlineFormInsert = new ValidatedMethod({
//   name: apiName.admHeadlineFormInsert,
//   validate: Headline.schema.pick(['fullname','nickname','dob','bio','type','status']).validator(),

//   run(headline) {
//     try{
//       // now sanity check
//       if(!this.userId)
//         throw new Meteor.Error(401, 'You must be logged in.');

//       if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
//         throw new Meteor.Error(444, 'Not enough Right');

//       //FIXME harusnya buat meteor user dulu di sini yang gak pake password
//       console.log('FIX ME!!!! harusnya buat meteor user dulu di sini yang gak pake password');

//       // Accounts.createUser();
//       // Accounts.sendEnrollmentEmail(userId, [email])

//       return Headline.insert(headline);

//     }catch(exception){
//       console.log('METHOD EXCEPTION - '+apiName.admHeadlineFormInsert+' - userId: '+this.userId, exception);
//       throw new Meteor.Error(400,'Internal Server Exception');
//     }
//   }
// });

// export const admHeadlineFormUpdate = new ValidatedMethod({
//   name: apiName.admHeadlineFormUpdate,

//   validate: new SimpleSchema([
//     Headline.schema.pick([
//       'fullname','nickname','dob','description',
//       'images','images.$','images.$.imgUrl','images.$.imgType',
//       'tenants','tenants.$','tenants.$.tenantId','tenants.$.roles','tenants.$.roles.$','tenants.$.status',
//       'orgs','orgs.$','orgs.$.orgId','orgs.$.positions','orgs.$.positions.$','orgs.$.roles','orgs.$.roles.$',
//       'refs','refs.$','refs.$.refId','refs.$.refType','refs.$.description',
//     ]),{
//       _id: { 
//         type: SimpleSchema.RegEx.Id,
//       },
//     }
//   ]).validator(),

//   run( headline ) {
//     let rolesUpdated, headlineUpdated;

//     try{

//       if( !this.userId )
//         throw new Meteor.Error(401, 'You must be logged in.');
      
//       if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
//         throw new Meteor.Error(444, 'Not enough Right');

//       rolesUpdated = false;
      
//       let tenantRoles = [];
//       if(headline.tenants)
//         headline.tenants.forEach((tenant) => {
//           const checkedTenant = checkTenant(tenant);
//           tenantRoles.push({
//             domain : checkedTenant.domain,
//             roles  : tenant.roles,
//           });
//         });

//       if(headline.orgs)
//         headline.orgs.forEach((org) => {
//           const checkedOrg = checkOrg(org);
//           tenantRoles.push({
//             domain  : checkedOrg.name+'#'+checkedOrg.getTenant().domain,
//             roles   : org.roles,
//           });
//         });

//       tenantRoles.forEach((doc) => {
//         Roles.setUserRoles(headline._id, doc.roles, doc.domain);
//       });

//       rolesUpdated = true;
      
//       headlineUpdated = Headline.update(headline._id, { $set: headline });
//       return headlineUpdated;

//     }catch(exception){
//       console.log('METHOD EXCEPTION - '+apiName.admHeadlineFormUpdate+' - userId: '+this.userId, exception);
//       console.log('rolesUpdated:', rolesUpdated);
//       console.log('headlineUpdated:', headlineUpdated);
//       throw new Meteor.Error(400,'Internal Server Exception');
//     }
//   },
// });

