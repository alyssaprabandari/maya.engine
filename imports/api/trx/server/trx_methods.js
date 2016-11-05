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
		description: 'Put selected product to cart according the shopId',
		type: apiType,
		status: 'Active',
	},
	changeProductQtyInCart: {
		name: 'changeProductQtyInCart',
		description: 'Change quantity of selected product in cart while status still Open',
		type: apiType,
		status: 'Active',
	},
	removeProductInCart: {
		name: 'removeProductInCart',
		description: 'Remove selected product in cart while status still Open. Trx automatically deleted if last product.',
		type: apiType,
		status: 'Active',
	},
	removeTrxInCart: {
		name: 'removeTrxInCart',
		description: 'Remove selected trx in cart while status still Open.',
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
				const subTotal = product.unitPrice * qty;

				const trxItem = {
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
					name 			: 'Order - '+shop.name,
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
								"trxItems.productId" 	: trxItem.productId
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

export const changeProductQtyInCart = new ValidatedMethod({
	name: APIs.changeProductQtyInCart.name,
	validate: new SimpleSchema({
		trxId 		: { type: SimpleSchema.RegEx.Id },
		productId	: { type: SimpleSchema.RegEx.Id },
		qtyNew 		: { type: Number },
	}).validator(),
	run({trxId, productId, qtyNew}) {
		try{
			// now sanity check
			if(!this.userId)
				throw new Meteor.Error(401, 'You must be logged in.');

			const tenantId = isUserHasAccess(this.userId, this.connection, APIs.putProductToCart.name, apiType);
		
			let trx = Trx.findOne({_id:trxId, tenantId:tenantId, buyer:{partyId:this.userId, partyType:'Member'}, status:'Open'});

			if(!trx)
				throw new Meteor.Error(474,'Trx not Found');

			const trxItem = _.findWhere(trx.trxItems,{productId:productId});

			if(!trxItem)
				throw new Meteor.Error(475,'TrxItem not Found');

			const subTotalNew = trxItem.unitPrice * qtyNew;
			const subTotalOld = trxItem.subTotal;

			return Trx.update(
				{ 
					_id 									: trx._id, 
					"trxItems.productId" 	: trxItem.productId
				},
				{
					$set:{
						"trxItems.$.qty" 			: qtyNew,
						"trxItems.$.subTotal" : subTotalNew,
						total 								: trx.total - subTotalOld + subTotalNew
					}
				}
			);

		}catch(exception){
			console.log('EXCEPTION - '+APIs.putProductToCart.name+' - '+apiType+' - userId: '+this.userId, exception);
			throw new Meteor.Error(400,'Internal Server Exception');
		}
	}
});

export const removeProductInCart = new ValidatedMethod({
	name: APIs.removeProductInCart.name,
	validate: new SimpleSchema({
		trxId     : { type: SimpleSchema.RegEx.Id },
		productId : { type: SimpleSchema.RegEx.Id },
	}).validator(),
	run({trxId, productId}) {
		try{
			// now sanity check
			if(!this.userId)
				throw new Meteor.Error(401, 'You must be logged in.');

			const tenantId = isUserHasAccess(this.userId, this.connection, APIs.removeProductInCart.name, apiType);
		
			let trx = Trx.findOne({_id:trxId, tenantId:tenantId, buyer:{partyId:this.userId, partyType:'Member'}, status:'Open'});

			if(!trx)
				throw new Meteor.Error(474,'Trx not Found');

			const trxItem = _.findWhere(trx.trxItems,{productId:productId});

			if(!trxItem)
				throw new Meteor.Error(475,'TrxItem not Found');

			if(trx.trxItems.length > 1)
				return Trx.update(
					{ 
						_id                   : trx._id
					},
					{
						$set: {
							total               : trx.total - trxItem.subTotal
						},
						$pull: { 
							trxItems: { 
								productId 				: productId 
							} 
						},
					}
				);
			else
				return Trx.remove({_id:trxId}); //last product in trx, so just delete the trx
		}catch(exception){
			console.log('EXCEPTION - '+APIs.removeProductInCart.name+' - '+apiType+' - userId: '+this.userId, exception);
			throw new Meteor.Error(400,'Internal Server Exception');
		}
	}
});

export const removeTrxInCart = new ValidatedMethod({
	name: APIs.removeTrxInCart.name,
	validate: new SimpleSchema({
		trxId     : { type: SimpleSchema.RegEx.Id },
	}).validator(),
	run({trxId}) {
		try{
			// now sanity check
			if(!this.userId)
				throw new Meteor.Error(401, 'You must be logged in.');

			const tenantId = isUserHasAccess(this.userId, this.connection, APIs.removeTrxInCart.name, apiType);
		
			let trx = Trx.findOne({_id:trxId, tenantId:tenantId, buyer:{partyId:this.userId, partyType:'Member'}, status:'Open'});

			if(!trx)
				throw new Meteor.Error(474,'Trx not Found');

			return Trx.remove({_id:trxId});
		}catch(exception){
			console.log('EXCEPTION - '+APIs.removeTrxInCart.name+' - '+apiType+' - userId: '+this.userId, exception);
			throw new Meteor.Error(400,'Internal Server Exception');
		}
	}
});

rateLimit({
	methods: [
		putProductToCart,
		changeProductQtyInCart,
		removeProductInCart,
		removeTrxInCart,
	],
	limit: 5,
	timeRange: 1000,
});


