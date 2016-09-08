import { Meteor } from 'meteor/meteor';

import { Api } from '/imports/api/api/api_collection';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

const apiType = 'Api.Method';
const APIs = {
  updateApi: {
    name: 'updateApi',
    description: 'Update Api',
    type: apiType,
    status: 'Active',
  },
};

initAPIsToDB(APIs, apiType);

// FIXME 
// export const updateApi = new ValidatedMethod({
//   name: APIs.updateApi.name,

//   validate: new SimpleSchema([
//     Api.schema.pick([
//       'name','description','type','status',
//     ]),{
//       _id: { 
//         type: SimpleSchema.RegEx.Id,
//       },
//     }
//   ]).validator(),

//   run( member ) {
//     let rolesUpdated, memberUpdated;

//     try{

//       if( !this.userId )
//         throw new Meteor.Error(401, 'You must be logged in.');
      
//       if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
//         throw new Meteor.Error(444, 'Not enough Right');

//       rolesUpdated = false;
      
//       let tenantRoles = [];
//       if(member.tenants)
//         member.tenants.forEach((tenant) => {
//           const checkedTenant = checkTenant(tenant);
//           tenantRoles.push({
//             domain : checkedTenant.domain,
//             roles  : tenant.roles,
//           });
//         });

//       if(member.orgs)
//         member.orgs.forEach((org) => {
//           const checkedOrg = checkOrg(org);
//           tenantRoles.push({
//             domain  : checkedOrg.name+'#'+checkedOrg.getTenant().domain,
//             roles   : org.roles,
//           });
//         });

//       tenantRoles.forEach((doc) => {
//         Roles.setUserRoles(member._id, doc.roles, doc.domain);
//       });

//       rolesUpdated = true;
      
//       memberUpdated = Member.update(member._id, { $set: member });
//       return memberUpdated;

//     }catch(exception){
//       console.log('METHOD EXCEPTION - '+apiName.admMemberFormUpdate+' - userId: '+this.userId, exception);
//       console.log('rolesUpdated:', rolesUpdated);
//       console.log('memberUpdated:', memberUpdated);
//       throw new Meteor.Error(400,'Internal Server Exception');
//     }
//   },
// });