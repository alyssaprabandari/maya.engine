import { Document } from '/imports/api/document/document_collection';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '/imports/modules/rate-limit.js';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

const apiType = 'Document.Method';
const APIs = {
  insertDocument: {
    name: 'insertDocument',
    description: 'Insert new Document',
    type          : apiType,
    status        : 'Active',
  },
  updateDocument:{
    name: 'updateDocument',
    description: 'Update existing Document',
    type          : apiType,
    status        : 'Active',
  },
  removeDocument:{
    name: 'removeDocument',
    description: 'Remove existing Document',
    type          : apiType,
    status        : 'Active',
  },
};

initAPIsToDB(APIs, apiType);

export const insertDocument = new ValidatedMethod({
  name: APIs.insertDocument.name,
  validate: new SimpleSchema({
    title: { type: String },
  }).validator(),
  run(document) {
    isUserHasAccess(this.userId, this.connection, this.name, apiType);
    Document.insert(document);
  },
});

export const updateDocument = new ValidatedMethod({
  name: APIs.updateDocument.name,
  validate: new SimpleSchema({
    _id: { type: String },
    'update.title': { type: String, optional: true },
  }).validator(),
  run({ _id, update }) {
    isUserHasAccess(this.userId, this.connection, this.name, apiType);    
    Document.update(_id, { $set: update });
  },
});

export const removeDocument = new ValidatedMethod({
  name: APIs.removeDocument.name,
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {    
    isUserHasAccess(this.userId, this.connection, this.name, apiType);
    Document.remove(_id);
  },
});

rateLimit({
  methods: [
    insertDocument,
    updateDocument,
    removeDocument,
  ],
  limit: 5,
  timeRange: 1000,
});
