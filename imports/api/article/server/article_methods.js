import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '/imports/modules/rate-limit.js';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

import { Article } from '/imports/api/article/article_collection.js';

const apiType = 'Article.Method';
const APIs = {
  insertArticle: {
    name: 'insertArticle',
    description: 'Insert new Article',
    type: apiType,
    status: 'Active',
  },
  updateArticle: {
    name: 'updateArticle',
    description: 'Update existing Article',
    type: apiType,
    status: 'Active',
  },
  removeArticle: {
    name: 'removeArticle',
    description: 'Remove existing Article',
    type: apiType,
    status: 'Active',
  },
};

initAPIsToDB(APIs, apiType);



rateLimit({
  methods: [

  ],
  limit: 5,
  timeRange: 1000,
});