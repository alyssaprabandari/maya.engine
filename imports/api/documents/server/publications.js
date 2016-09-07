import { Meteor } from 'meteor/meteor';
import { Documents } from '/imports/api/documents/documents';

import { isUserHasAccess } from '/imports/api/general/server/general_functions';

Meteor.publishComposite('documents', function documents(){
  try{
    isUserHasAccess(this.userId, this.connection, 'documents', 'Subscription');
    return {
      find() {
        const query = {
        };
        const options = {
        };
        
        return Documents.find(query, options);
      },

    };
  }catch(exception){
    console.log('PUBLISH EXCEPTION - documents - userId: '+this.userId, exception);
    return this.ready();
  }
});