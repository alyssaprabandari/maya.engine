import { Meteor } from 'meteor/meteor';

import { Document } from '/imports/api/document/document_collection';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

const apiType = 'Document.Publication';
const APIs = {
  listDocument: {
    name          : 'listDocument',
    description   : 'List all Document',
    type          : apiType,
    status        : 'Active',
  },
  detailDocument: {
    name          : 'detailDocument',
    description   : 'Detail of a Document',
    type          : apiType,
    status        : 'Active',
  },
};

initAPIsToDB(APIs, apiType);

Meteor.publishComposite(APIs.listDocument.name, function(){
  const apiName = APIs.listDocument.name;
  try{
    isUserHasAccess(this.userId, this.connection, apiName, apiType);
    return {
      find() {
        const query = {
        };
        const options = {
        };
        
        return Document.find(query, options);
      },

    };
  }catch(exception){
    console.log('EXCEPTION - '+apiName+' - '+ apiType+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publishComposite(APIs.detailDocument.name, function(documentId){
  const apiName = APIs.detailDocument.name;
  try{
    check(documentId, Match._id);
    isUserHasAccess(this.userId, this.connection, apiName, apiType);
    
    return {
      find() {
        const query = {
          _id: documentId,
        };
        const options = {
        };
        
        return Document.find(query, options);
      },

    };
  }catch(exception){
    console.log('EXCEPTION - '+apiName+' - '+ apiType+' - userId: '+this.userId, exception);
    return this.ready();
  }
});
