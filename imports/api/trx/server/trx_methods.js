import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '/imports/modules/rate-limit.js';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

import { Trx } from '/imports/api/trx/trx_collection.js';

import { Product } from '/imports/api/product/product_collection.js';
import { Shop } from '/imports/api/shop/shop_collection.js';
import { Tenant } from '/imports/api/tenant/tenant_collection.js';

const apiType = 'Trx.Method';

const APIs = {
  putProductToCart: {
    name: 'putProductToCart',
    description: 'put selected product to cart according the shopId',
    type: apiType,
    status: 'Active',
  },
};

initAPIsToDB(APIs, apiType);

export const putProductToCart = new ValidatedMethod({
  name: APIs.putProductToCart.name,
  validate: new SimpleSchema({
    shopId 		: { type: SimpleSchema.RegEx.Id },
    productId	: { type: SimpleSchema.RegEx.Id },
    qty 			: { type: Number },
  }).validator(),
  run({shopId, productId, qty}) {
    let trxId;  


    console.log('shopId', shopId); 
    console.log('productId', productId); 
    console.log('qty', qty);

    try{
      // now sanity check
      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      const tenantId = isUserHasAccess(this.userId, this.connection, APIs.putProductToCart.name, apiType);
    
      const product = Product.findOne(productId);
      if(!product)
        throw new Meteor.Error(454,'Product not found');
      if(product.shopId !== shopId)
      	throw new Meteor.Error(455, 'Product not match with Shop');
      if(product.tenantId !== tenantId)
      	throw new Meteor.Error(456,'Product not match with Tenant');

      const shop = Shop.findOne(shopId);
      if(!shop)
        throw new Meteor.Error(464,'Shop not found');
      if(shop.tenantId !== tenantId)
      	throw new Meteor.Error(466,'Shop not match with Tenant');

      let trx = Trx.findOne({buyer:{partyId:this.userId, partyType:'Member'}, tenantId: tenantId, shopId: shopId, status:'Open'});

      if(!trx){
      	console.log('gak ada trx dengan buyer dan shop');

      	const subTotal = product.unitPrice * qty;

      	const trxItem = {
					trxItemNr 	: 1,
					productId 	: product._id,
					name 				: product.name,
				  unitPrice 	: product.unitPrice,
				  currency 		: product.currency,
				  uom 				: product.uom,
				  qty 				: qty,
				  subTotal 		: subTotal,
				  type 				: product.type,
      	};

      	trx = {
      		name 			: 'Sales Order',
      		buyer 		: {
      			partyId 	: this.userId,
      			partyType	: 'Member'
      		},
      		tenantId 	: tenantId,
      		shopId 		: shopId,
      		trxItems 	: [ trxItem ],
      		currency 	: shop.currency,
      		total 		: subTotal,
      		type 			: 'Sales',
      		status 		: 'Open'
      	};

				trxId = Trx.insert(trx);

      }else{
      	const trxItem = _.findWhere(trx.trxItems,{productId:product._id});

      	if(!trxItem){
      		const subTotal = product.unitPrice * qty;

	      	const trxItem = {
						trxItemNr 	: trx.trxItems.length + 1,
						productId 	: product._id,
						name 				: product.name,
					  unitPrice 	: product.unitPrice,
					  currency 		: product.currency,
					  uom 				: product.uom,
					  qty 				: qty,
					  subTotal 		: subTotal,
					  type 				: product.type,
	      	};

      		Trx.update(
      			{_id:trx._id},
      			{
      				$push:{trxItems:trxItem},
      				$set:{total:trx.total+subTotal}
      			}
      		);

      	}else{
      		if(trxItem.qty !== qty){
      			const subTotalNew = product.unitPrice * qty;
      			const subTotalOld = trxItem.subTotal;

						Trx.update(
	      			{ 
	      				_id 									: trx._id, 
	      				"trxItems.trxItemNr" 	: trxItem.trxItemNr
	      			},
	      			{
	      				$set:{
	      					"trxItems.$.qty" 			: qty,
	      					"trxItems.$.subTotal" : subTotalNew,
	      					total 								: trx.total - subTotalOld + subTotalNew
	      				}
	      			}
	      		);
      		};
      	};

      	trxId = trx._id;
      }

      return trxId;

    }catch(exception){
      console.log('EXCEPTION - '+APIs.putProductToCart.name+' - '+apiType+' - userId: '+this.userId, exception);
      console.log('trxId:', trxId);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }

});


rateLimit({
  methods: [
  	putProductToCart
  ],
  limit: 5,
  timeRange: 1000,
});


