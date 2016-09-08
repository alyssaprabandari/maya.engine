/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Document } from '/imports/api/document/document_collection.js';
import { insertDocument, updateDocument, removeDocument } from '/imports/api/document/server/document_methods.js';

describe('Document methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts a document into the Document collection', function () {
    insertDocument.call({ title: 'You can\'t arrest me, I\'m the Cake Boss!' });
    const getDocument = Document.findOne({ title: 'You can\'t arrest me, I\'m the Cake Boss!' });
    assert.equal(getDocument.title, 'You can\'t arrest me, I\'m the Cake Boss!');
  });

  it('updates a document in the Document collection', function () {
    const { _id } = Factory.create('document');

    updateDocument.call({
      _id,
      update: {
        title: 'You can\'t arrest me, I\'m the Cake Boss!',
      },
    });

    const getDocument = Document.findOne(_id);
    assert.equal(getDocument.title, 'You can\'t arrest me, I\'m the Cake Boss!');
  });

  it('removes a document from the Document collection', function () {
    const { _id } = Factory.create('document');
    removeDocument.call({ _id });
    const getDocument = Document.findOne(_id);
    assert.equal(getDocument, undefined);
  });
});
