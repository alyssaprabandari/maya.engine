import { Koleksi } from './koleksi';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '../../modules/rate-limit.js';

export const insertKoleksi = new ValidatedMethod({
  name: 'koleksi.insert',
  validate: new SimpleSchema({
    title: { type: String },
  }).validator(),
  run(document) {
    Koleksi.insert(document);
  },
});

export const updateKoleksi = new ValidatedMethod({
  name: 'koleksi.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.title': { type: String, optional: true },
  }).validator(),
  run({ _id, update }) {
    Koleksi.update(_id, { $set: update });
  },
});

export const removeKoleksi = new ValidatedMethod({
  name: 'koleksi.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Koleksi.remove(_id);
  },
});

rateLimit({
  methods: [
    insertKoleksi,
    updateKoleksi,
    removeKoleksi,
  ],
  limit: 5,
  timeRange: 1000,
});
