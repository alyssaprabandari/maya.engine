/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from 'meteor/practicalmeteor:chai';
import { Document } from '/imports/api/document/document_collection.js';

describe('Document collection', function () {
  it('registers the collection with Mongo properly', function () {
    assert.equal(typeof Document, 'object');
  });
});
