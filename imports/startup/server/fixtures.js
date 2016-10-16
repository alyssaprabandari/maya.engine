if(process.env.NODE_ENV === 'development'){
	import { Meteor } from 'meteor/meteor';

	import { Roles } from 'meteor/alanning:roles';
	import { Accounts } from 'meteor/accounts-base';

	import { Tenant } from '/imports/api/tenant/tenant_collection';
	import { Member } from '/imports/api/member/member_collection';
	import { Article } from '/imports/api/article/article_collection';
	import { Info } from '/imports/api/info/info_collection';
	
	import { Shop } from '/imports/api/shop/shop_collection';
	import { Product } from '/imports/api/product/product_collection';
	
	const tenants = [{
		"domain" 	: "localhost",
		"name" 		: "Localhost",
		"email" 	: "info@localhost",
		"layout" : {
		  "framework" : "Bootstrap",
		  "appWidget" : "App",
		  "cssUrl" 		: ""
		},
		"description" : "Localhost Server",
		"roles" : [ 
		  "Member.Free", 
		  "Internal.Ops", 
		  "Admin"
		],
		"standardRole" : "Member.Free",
		"APIs" : [{
		    "name" 	: "memberSignup",
		    "roles" : [],
		    "type" 	: "Member.Method"
		  },{
		    "name" 	: "memberLogin",
		    "roles" : [],
		    "type" 	: "Member.Method"
		  },{
		    "name" 	: "listDocument",
		    "roles" : [ 
		      "Internal.Ops", 
		      "Admin"
		    ],
		    "type" 	: "Document.Publication"
		  },{
		    "name" 	: "detailDocument",
		    "roles" : [ 
		      "Internal.Ops", 
		      "Admin"
		    ],
		    "type" 	: "Document.Publication"
		  },{
		    "name" 	: "insertDocument",
		    "roles" : [ 
		      "Admin"
		    ],
		    "type" 	: "Document.Method"
		  },{
		    "name" 	: "updateDocument",
		    "roles" : [ 
		      "Admin", 
		      "Internal.Ops"
		    ],
		    "type" 	: "Document.Method"
		  },{
		    "name" 	: "removeDocument",
		    "roles" : [ 
		      "Admin"
		    ],
		    "type" 	: "Document.Method"
		  },{
		    "name" 	: "listHeadline",
		    "roles" : [],
		    "type" 	: "Info.Publication"
		  },{
		    "name" 	: "listFaq",
		    "roles" : [],
		    "type" 	: "Info.Publication"
		  }
		],
		"index" : {
		  "title" 	: "Home Page of Localhost",
		  "path" 		: "/",
		  "roles" 	: [],
		  "widgets" : [ 
		    "AppNavigation", 
		    "HeadlineCarousel", 
		    "Welcome",
	    	"Footer"
		  ]
		},
		"pages" : [ 
		  {
		    "title" 	: "Login",
		    "path" 		: "/login",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "Login",
		      "Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Recover Password",
		    "path" 		: "/recover-password",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "RecoverPassword",
		      "Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Reset Password",
		    "path" 		: "/reset-password/:token",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "ResetPassword",
		      "Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Signup",
		    "path" 		: "/signup",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "Signup",
		      "Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Selamat Datang",
		    "path" 		: "/welcome",
		    "widgets" : [ 
		      "AppNavigation", 
		      "ProductCard",
		      "Footer"
		    ],
		    "menuNr" 	: 1
		  }, 
		  {
		    "title" 	: "Halaman Kedua",
		    "path" 		: "/kedua",
		    "roles" 	: [ 
		      "Member.Free", 
		      "Internal.Ops", 
		      "Admin"
		    ],
		    "widgets" : [ 
		      "AppNavigation", 
		      "Welcome", 
		      "DocumentTable",
		    	"Footer"
		    ],
		    "menuNr" 	: 2
		  }, 
		  {
		    "title" 	: "Document Detail",
		    "path" 		: "/document/:docId/detail",
		    "roles" 	: [ 
		      "Member.Free", 
		      "Internal.Ops", 
		      "Admin"
		    ],
		    "widgets" : [ 
		      "AppNavigation", 
		      "DocumentDetail",
		    	"Footer"
		    ]
		  }, 
		  {
		    "title" 	: "FAQ",
		    "path" 		: "/faq",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "FAQ",
		    	"Footer"
		    ],
		    "menuNr" 	: 3
		  }, 
		  {
		    "title" 	: "Ops",
		    "path" 		: "/ops",
		    "roles" 	: [ 
		      "Internal.Ops"
		    ],
		    "widgets" : [ 
		      "AppNavigation", 
		      "Documents", 
		      "Documents",
		    	"Footer"
		    ],
		    "menuNr" 	: 4
		  }
		],
		"isPublicMenuInAuthNav" : true,
		"currency" 							: "IDR",
		"type" 									: "maya.engine",
		"status" 								: "Active",
	},{
		"domain" 	: "ecommerce.maya",
		"name" 		: "maya eCommerce",
		"email" 	: "info@ecommerce.maya",
		"layout" : {
		  "framework" : "Bootstrap",
		  "appWidget" : "App",
		  "cssUrl" 		: "http://ecommerce.maya:3000/css/ecommerce.maya.css"
		},
		"description" : "eCommerce Example using Maya Engine",
		"roles" : [ 
		  "Member.Free", 
		  "Internal.Ops", 
		  "Admin"
		],
		"standardRole" : "Member.Free",
		"APIs" : [{
		    "name" 	: "memberSignup",
		    "roles" : [],
		    "type" 	: "Member.Method"
		  },{
		    "name" 	: "memberLogin",
		    "roles" : [],
		    "type" 	: "Member.Method"
		  },{
		    "name" 	: "listDocument",
		    "roles" : [ 
		      "Internal.Ops", 
		      "Admin"
		    ],
		    "type" 	: "Document.Publication"
		  },{
		    "name" 	: "detailDocument",
		    "roles" : [ 
		      "Internal.Ops", 
		      "Admin"
		    ],
		    "type" 	: "Document.Publication"
		  },{
		    "name" 	: "insertDocument",
		    "roles" : [ 
		      "Admin"
		    ],
		    "type" 	: "Document.Method"
		  },{
		    "name" 	: "updateDocument",
		    "roles" : [ 
		      "Admin", 
		      "Internal.Ops"
		    ],
		    "type" 	: "Document.Method"
		  },{
		    "name" 	: "removeDocument",
		    "roles" : [ 
		      "Admin"
		    ],
		    "type" 	: "Document.Method"
		  },{
		    "name" 	: "listHeadline",
		    "roles" : [],
		    "type" 	: "Info.Publication"
		  },{
		    "name" 	: "listFaq",
		    "roles" : [],
		    "type" 	: "Info.Publication"
		  },{
		    "name" 	: "insertProduct",
		    "roles" : ["Admin", "Internal.Ops"],
		    "type" 	: "Product.Method"
		  },{
		    "name" 	: "listActiveProduct",
		    "roles" : [],
		    "type" 	: "Product.Publication"
		  },{
		    "name" 	: "listAllProduct",
		    "roles" : ["Admin", "Internal.Ops"],
		    "type" 	: "Product.Publication"
		  },{
		    "name" 	: "detailProduct",
		    "roles" : [],
		    "type" 	: "Product.Publication"
		  }
		],
		"index" : {
		  "title" 	: "Home Page of eCommerce Example using Maya Engine",
		  "path" 		: "/",
		  "roles" 	: [],
		  "widgets" : [ 
		    "AppNavigation", 
		    "HeadlineCarousel", 
		    "Welcome",
	      	"Footer"
		  ]
		},
		"pages" : [ 
		  {
		    "title" 	: "Login",
		    "path" 		: "/login",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "Login",
		      "Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Recover Password",
		    "path" 		: "/recover-password",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "RecoverPassword",
		      "Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Reset Password",
		    "path" 		: "/reset-password/:token",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "ResetPassword",
		      "Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Signup",
		    "path" 		: "/signup",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "Signup",
		      "Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Products",
		    "path" 		: "/products",
		    "widgets" : [ 
		      "AppNavigation", 
		      "SearchForm",
		      "ProductCard",
		      "Footer"
		    ],
		    "menuNr" 	: 1
		  }, 
		  {
		    "title" 	: "Product Detail",
		    "path" 		: "/product/:productId/detail",
		    "widgets" : [ 
		      "AppNavigation", 
		      "ProductDetail",
		      "Footer"
		    ],
		  }, 
		  {
		    "title" 	: "Halaman Kedua",
		    "path" 		: "/kedua",
		    "roles" 	: [ 
		      "Member.Free", 
		      "Internal.Ops", 
		      "Admin"
		    ],
		    "widgets" : [ 
		      "AppNavigation", 
		      "Welcome", 
		      "DocumentTable",
		      "Footer"
		    ],
		    "menuNr" 	: 2
		  }, 
		  {
		    "title" 	: "Document Detail",
		    "path" 		: "/document/:docId/detail",
		    "roles" 	: [ 
		      "Member.Free", 
		      "Internal.Ops", 
		      "Admin"
		    ],
		    "widgets" : [ 
		      "AppNavigation", 
		      "DocumentDetail",
		      "Footer"
		    ]
		  }, 
		  {
		    "title" 	: "FAQ",
		    "path" 		: "/faq",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "FAQ",
		      "Footer"
		    ],
		    "menuNr" 	: 3
		  }, 
		  {
		    "title" 	: "Ops",
		    "path" 		: "/ops",
		    "roles" 	: [ 
		      "Internal.Ops"
		    ],
		    "widgets" : [ 
		      "AppNavigation", 
		      "Documents",
		      "Footer"
		    ],
		    "menuNr" 	: 4
		  }
		],
		"isPublicMenuInAuthNav" : true,
		"currency" 							: "IDR",
		"type" 									: "eCommerce",
		"status" 								: "Active",
	},{
		"domain" 	: "crowdfunding.maya",
		"name" 		: "Maya Crowdfunding",
		"email" 	: "info@crowdfunding.maya",
		"layout" : {
		  "framework" : "Bootstrap",
		  "appWidget" : "App",
		  "cssUrl" 		: "http://crowdfunding.maya:3000/css/crowdfunding.maya.css"
		},
		"description" : "Crowdfunding Example using Maya Engine",
		"roles" : [ 
		  "Member.Free",
		  "Member.Scholar", 
		  "Internal.Ops", 
		  "Admin"
		],
		"standardRole" : "Member.Free",
		"APIs" : [{
		    "name" 	: "memberSignup",
		    "roles" : [],
		    "type" 	: "Member.Method"
		  },{
		    "name" 	: "memberLogin",
		    "roles" : [],
		    "type" 	: "Member.Method"
		  },{
		    "name" 	: "listDocument",
		    "roles" : [ 
		      "Internal.Ops", 
		      "Admin"
		    ],
		    "type" 	: "Document.Publication"
		  },{
		    "name" 	: "detailDocument",
		    "roles" : [ 
		      "Internal.Ops", 
		      "Admin"
		    ],
		    "type" 	: "Document.Publication"
		  },{
		    "name" 	: "insertDocument",
		    "roles" : [ 
		      "Admin"
		    ],
		    "type" 	: "Document.Method"
		  },{
		    "name" 	: "updateDocument",
		    "roles" : [ 
		      "Admin", 
		      "Internal.Ops"
		    ],
		    "type" 	: "Document.Method"
		  },{
		    "name" 	: "removeDocument",
		    "roles" : [ 
		      "Admin"
		    ],
		    "type" 	: "Document.Method"
		  },{
		    "name" 	: "listHeadline",
		    "roles" : [],
		    "type" 	: "Info.Publication"
		  },{
		    "name" 	: "listFaq",
		    "roles" : [],
		    "type" 	: "Info.Publication"
		  },{
		    "name" 	: "insertProduct",
		    "roles" : ["Admin", "Internal.Ops"],
		    "type" 	: "Product.Method"
		  }
		],
		"index" : {
		  "title" 	: "Home Page of Crowdfunding Example using Maya Engine",
		  "path" 		: "/",
		  "roles" 	: [],
		  "widgets" : [ 
		    "AppNavigation", 
		    "HeadlineCarousel", 
		    "Welcome",
		    "Footer"
		  ]
		},
		"pages" : [ 
		  {
		    "title" 	: "Login",
		    "path" 		: "/login",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "Login",
		    	"Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Recover Password",
		    "path" 		: "/recover-password",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "RecoverPassword",
		    	"Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Reset Password",
		    "path" 		: "/reset-password/:token",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "ResetPassword",
		    	"Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Signup",
		    "path" 		: "/signup",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "Signup",
		    	"Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Selamat Datang",
		    "path" 		: "/welcome",
		    "widgets" : [ 
		      "AppNavigation", 
		      "ProductCard",
		    	"Footer"
		    ],
		    "menuNr" 	: 1
		  }, 
		  {
		    "title" 	: "Halaman Kedua",
		    "path" 		: "/kedua",
		    "roles" 	: [ 
		      "Member.Free", 
		      "Internal.Ops", 
		      "Admin"
		    ],
		    "widgets" : [ 
		      "AppNavigation", 
		      "Welcome", 
		      "DocumentTable",
		    	"Footer"
		    ],
		    "menuNr" 	: 2
		  }, 
		  {
		    "title" 	: "Document Detail",
		    "path" 		: "/document/:docId/detail",
		    "roles" 	: [ 
		      "Member.Free", 
		      "Internal.Ops", 
		      "Admin"
		    ],
		    "widgets" : [ 
		      "AppNavigation", 
		      "DocumentDetail",
		    	"Footer"
		    ]
		  }, 
		  {
		    "title" 	: "FAQ",
		    "path" 		: "/faq",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "FAQ",
		    	"Footer"
		    ],
		    "menuNr" 	: 3
		  }, 
		  {
		    "title" 	: "Ops",
		    "path" 		: "/ops",
		    "roles" 	: [ 
		      "Internal.Ops"
		    ],
		    "widgets" : [ 
		      "AppNavigation", 
		      "Documents",
		    	"Footer"
		    ],
		    "menuNr" 	: 4
		  }
		],
		"isPublicMenuInAuthNav" : true,
		"currency" 							: "IDR",
		"type" 									: "Crowdfunding",
		"status" 								: "Active",
	}];

	const users = [{
	  email: 'admin@localhost',
	  password: 'password',
	  profile: {
	    fullname: 'Admin Localhost',
	  },
	  roles: ['Member.Free','Internal.Ops','Admin'],
	  domain: 'localhost'
	},{
	  email: 'admin2@localhost',
	  password: 'password',
	  profile: {
	    fullname: '2nd Admin Localhost',
	  },
	  roles: ['Admin'],
	  domain: 'localhost'
	},{
	  email: 'internal.ops@localhost',
	  password: 'password',
	  profile: {
	    fullname: 'Localhost Internal Ops',
	  },
	  roles: ['Internal.Ops'],
	  domain: 'localhost'
	},{
	  email: 'first.member@localhost',
	  password: 'password',
	  profile: {
	    fullname: 'First Free Member Localhost',
	  },
	  roles: ['Member.Free'],
	  domain: 'localhost'
	},{
	  email: 'admin@crowdfunding.maya',
	  password: 'password',
	  profile: {
	    fullname: 'Admin Maya Crowdfunding',
	  },
	  roles: ['Member.Free','Internal.Ops','Admin'],
	  domain: 'crowdfunding.maya'
	},{
	  email: 'admin2@crowdfunding.maya',
	  password: 'password',
	  profile: {
	    fullname: '2nd Admin Crowdfunding',
	  },
	  roles: ['Admin'],
	  domain: 'crowdfunding.maya'
	},{
	  email: 'internal.ops@crowdfunding.maya',
	  password: 'password',
	  profile: {
	    fullname: 'Crowdfunding Internal Ops',
	  },
	  roles: ['Internal.Ops'],
	  domain: 'crowdfunding.maya'
	},{
	  email: 'first.member@crowdfunding.maya',
	  password: 'password',
	  profile: {
	    fullname: 'First Free Member Maya Crowdfunding',
	  },
	  roles: ['Member.Free'],
	  domain: 'crowdfunding.maya'
	},{
	  email: 'first.scholar@crowdfunding.maya',
	  password: 'password',
	  profile: {
	    fullname: 'First Scholar Maya Crowdfunding',
	  },
	  roles: ['Member.Scholar'],
	  domain: 'crowdfunding.maya'
	},{
	  email: 'second.scholar@crowdfunding.maya',
	  password: 'password',
	  profile: {
	    fullname: 'Second Scholar Maya Crowdfunding',
	  },
	  roles: ['Member.Scholar'],
	  domain: 'crowdfunding.maya'
	},{
	  email: 'third.scholar@crowdfunding.maya',
	  password: 'password',
	  profile: {
	    fullname: 'Third Scholar Maya Crowdfunding',
	  },
	  roles: ['Member.Scholar'],
	  domain: 'crowdfunding.maya'
	},{
	  email: 'admin@ecommerce.maya',
	  password: 'password',
	  profile: {
	    fullname: 'Admin Maya eCommerce',
	  },
	  roles: ['Member.Free','Internal.Ops','Admin'],
	  domain: 'ecommerce.maya'
	},{
	  email: 'admin2@ecommerce.maya',
	  password: 'password',
	  profile: {
	    fullname: '2nd Admin Maya eCommerce',
	  },
	  roles: ['Admin'],
	  domain: 'ecommerce.maya'
	},{
	  email: 'internal.ops@ecommerce.maya',
	  password: 'password',
	  profile: {
	    fullname: 'eCommerce Internal Ops',
	  },
	  roles: ['Internal.Ops'],
	  domain: 'ecommerce.maya'
	},{
	  email: 'first.member@ecommerce.maya',
	  password: 'password',
	  profile: {
	    fullname: 'First Free Member Maya eCommerce',
	  },
	  roles: ['Member.Free'],
	  domain: 'ecommerce.maya'
	},{
		email: 'william@ecommerce.maya',
	  password: 'password',
	  profile: {
	    fullname: 'William Setiadi',
	  },
	  roles: ['Member.Free', 'Member.Seller'],
	  domain: 'ecommerce.maya'
	},{
		email: 'lanny@ecommerce.maya',
	  password: 'password',
	  profile: {
	    fullname: 'Queen Lanny',
	  },
	  roles: ['Member.Free', 'Member.Seller'],
	  domain: 'ecommerce.maya'
	}];

	//FIXME harusnya dari articles otomatis create infos
	//FIXME save markdown dulu kali yah sementara? atau mau langsung draft.js?
	const articles = [{
		"title" 				: "Chef William", 
		"description" 	: "Once you try it, you will never forget it", 
		"type" 					: "Profile.Member",
		"status" 				: "Active",
		"images"				: [{
			"imgUrl" 	: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/profile_william.jpg",
			"imgType" : "Thumbnail"
		},{
			"imgUrl" 	: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/profile_william.jpg",
			"imgType" : "Detail"
		},{
			"imgUrl" 	: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/mie_ijo.jpg",
			"imgType" : "Detail"
		},{
			"imgUrl" 	: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/brownies.jpg",
			"imgType" : "Detail"
		}],
		"domain"  			: "ecommerce.maya",
	}];

	const infos = [{
		"title" 				: "1900 x 640 Brownies Lezat", 
		"description" 	: "Once you try it, you will never forget it", 
		"type" 					: "Headline.Product",
		"status" 				: "Active",
		"imgUrl" 				: "http://www.backtokimi.com.s3.amazonaws.com/images/sample/brownies_1900x640.jpg",
		"domain"  			: "ecommerce.maya",
	},{
		"title" 				: "1900 x 750 Brownies Lezat", 
		"description" 	: "Once you try it, you will never forget it", 
		"type" 					: "Headline.Product",
		"status" 				: "Active",
		"imgUrl" 				: "http://www.backtokimi.com.s3.amazonaws.com/images/sample/brownies_1900x750.jpg",
		"domain"  			: "ecommerce.maya",
	},{
		"title" 				: "1900 x 860 Brownies Lezat", 
		"description" 	: "Once you try it, you will never forget it", 
		"type" 					: "Headline.Product",
		"status" 				: "Active",
		"imgUrl" 				: "http://www.backtokimi.com.s3.amazonaws.com/images/sample/brownies_1900x860.jpg",
		"domain"  			: "ecommerce.maya",
	},{
		"title" 				: "1900 x 970 Brownies Lezat", 
		"description" 	: "Once you try it, you will never forget it", 
		"type" 					: "Headline.Product",
		"status" 				: "Active",
		"imgUrl" 				: "http://www.backtokimi.com.s3.amazonaws.com/images/sample/brownies_1900x970.jpg",
		"domain"  			: "ecommerce.maya",
	},{
		"title" 				: "1900 x 1080 Brownies Lezat", 
		"description" 	: "Once you try it, you will never forget it", 
		"type" 					: "Headline.Product",
		"status" 				: "Active",
		"imgUrl" 				: "http://www.backtokimi.com.s3.amazonaws.com/images/sample/brownies_1900x1080.jpg",
		"domain"  			: "ecommerce.maya",
	},{
		"title" 				: "Chef William", 
		"description" 	: "Once you try it, you will never forget it", 
		"type" 					: "Headline.Article",
		"status" 				: "Active",
		"imgUrl" 				: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/profile_william.jpg",
		"domain"  			: "ecommerce.maya",
	},{
		"title" 				: "Lezatnya Mie Ijo", 
		"description" 	: "Siapa bilang tidak ada makanan enak yang sehat", 
		"type" 					: "Headline.Product",
		"status" 				: "Active",
		"imgUrl" 				: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/mie_ijo.jpg",
		"domain"  			: "ecommerce.maya",
	},{
		"title" 				: "Queen Lanny", 
		"description" 	: "From Manado with Love", 
		"type" 					: "Headline.Article",
		"status" 				: "Active",
		"imgUrl" 				: "http://www.backtokimi.com.s3.amazonaws.com/images/warungngana/profile_lanny.jpg",
		"domain"  			: "ecommerce.maya",
	},{
		"title" 				: "First FAQ", 
		"description" 	: "This is the answer of the first FAQ", 
		"type" 					: "FAQ",
		"status" 				: "Active",
		"domain"  			: "crowdfunding.maya",
	},{
		"title" 				: "Second FAQ", 
		"description" 	: "Hier ist die Antwort von dem zweiten FAQ", 
		"type" 					: "FAQ",
		"status" 				: "Active",
		"domain"  			: "crowdfunding.maya",
	}];

	const shops = [{
		name 				: "Deliciozo",
		city 				: "Jakarta Pusat",
		area 				: "Mega Kuningan",
		address 		: "Jalan coba coba kolang kaling no 21",
		country 		: "Indonesia",
		description : "Penjelasan tentang Deliciozo",
		userEmail 	: "william@ecommerce.maya",
		type 				: "Food",
		status 			: "Active",
		images			: [{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/mie_ijo.jpg",
			imgType : "Thumbnail"
		},{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/mie_ijo.jpg",
			imgType : "Detail"
		},{
			imgUrl 	: "http://ecommerce.maya:3000/images/750x500.png",
			imgType : "Detail"
		}],
		tags 				: [ "Bakmi", "Brownies", "Mie", "Caisim" ], 
		domain 			: "ecommerce.maya",
	},{
		name 				: "Warung Ngana",
		city 				: "Jakarta Utara",
		area 				: "Kelapa Gading",
		address 		: "Jalan Boulevard Raya Sana Sini Blok ABC No. 123",
		country 		: "Indonesia",
		description : "Penjelasan tentang Warung Ngana",
		userEmail 	: "lanny@ecommerce.maya",
		type 				: "Food",
		status 			: "Active",
		images			: [{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/warungngana/roa.jpg",
			imgType : "Thumbnail"
		},{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/warungngana/roa.jpg",
			imgType : "Detail"
		},{
			imgUrl 	: "http://ecommerce.maya:3000/images/750x500.png",
			imgType : "Detail"
		}],
		tags 				: [ "Manado", "Menado", "Sambel", "Roa" ], 
		domain 			: "ecommerce.maya",
	}];

	const products = [{
		name 				: "Mie Ijo",
		unitPrice 	: 123456,
		currency 		: "IDR",
		uom 				: "Porsi",
		description : "Penjelasan tentang Mie Ijo",
		type 				: "Physical",
		status 			: "Active",
		shopName 		: "Deliciozo",
		images			: [{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/mie_ijo.jpg",
			imgType : "Thumbnail"
		},{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/mie_ijo.jpg",
			imgType : "Detail"
		},{
			imgUrl 	: "http://ecommerce.maya:3000/images/750x500.png",
			imgType : "Detail"
		}],
		tags 				: [ "Bakmi", "Mi", "Mie", "Caisim" ], 
		domain 			: "ecommerce.maya",
	},{
		name 				: "Sambel Roa",
		unitPrice 	: 987654321,
		currency 		: "IDR",
		uom 				: "Botol",
		description : "Penjelasan dari Sambel Roa",
		type 				: "Physical",
		status 			: "Active",
		shopName 		: "Warung Ngana",
		images			: [{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/warungngana/roa.jpg",
			imgType : "Thumbnail"
		},{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/warungngana/roa.jpg",
			imgType : "Detail"
		},{
			imgUrl 	: "http://ecommerce.maya:3000/images/750x500.png",
			imgType : "Detail"
		},{
			imgUrl 	: "http://ecommerce.maya:3000/images/750x500.png",
			imgType : "Detail"
		},{
			imgUrl 	: "http://ecommerce.maya:3000/images/750x500.png",
			imgType : "Detail"
		}],
		tags 				: [ "Sambel", "Sambal", "Roa", "Menado", "Manado" ], 
		domain 			: "ecommerce.maya",
	},{
		name 				: "Ayam Woku",
		unitPrice 	: 987654321,
		currency 		: "IDR",
		uom 				: "Porsi",
		description : "Penjelasan dari Ayam Woku",
		type 				: "Physical",
		status 			: "Active",
		shopName 		: "Warung Ngana",
		images			: [{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/warungngana/ayam_woku.jpg",
			imgType : "Thumbnail"
		},{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/warungngana/ayam_woku.jpg",
			imgType : "Detail"
		},{
			imgUrl 	: "http://ecommerce.maya:3000/images/750x500.png",
			imgType : "Detail"
		}],
		tags 				: [ "Ayam", "Woku", "Menado", "Manado" ], 
		domain 			: "ecommerce.maya",
	},{
		name 				: "Brownies Coklat",
		unitPrice 	: 1250000,
		currency 		: "IDR",
		uom 				: "Pieces",
		description : "Penjelasan tentang Brownies rasa Coklat",
		type 				: "Physical",
		status 			: "Active",
		shopName 		: "Deliciozo",
		sku 				: "Brownies-Coklat-001",
		images			: [{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/brownies.jpg",
			imgType : "Thumbnail"
		},{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/brownies.jpg",
			imgType : "Detail"
		},{
			imgUrl 	: "http://ecommerce.maya:3000/images/750x500.png",
			imgType : "Detail"
		}],
		tags 				: [ "Brownies", "Coklat", "Kue" ],
		domain 			: "ecommerce.maya",
	},{
		name 				: "Brownies Keju",
		unitPrice 	: 1250000,
		currency 		: "IDR",
		uom 				: "Pieces",
		description : "Penjelasan tentang Brownies rasa Keju",
		type 				: "Physical",
		status 			: "Active",
		shopName 		: "Deliciozo",
		sku 				: "Brownies-Keju-001",
		images			: [{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/brownies.jpg",
			imgType : "Thumbnail"
		},{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/brownies.jpg",
			imgType : "Detail"
		},{
			imgUrl 	: "http://ecommerce.maya:3000/images/750x500.png",
			imgType : "Detail"
		}],
		tags 				: [ "Brownies", "Keju", "Kue" ],
		domain 			: "ecommerce.maya",
	}];

	tenants.forEach((tenant) => {
		console.log('****************** START fixtures for tenant: ', tenant.domain);

		let tenantId;
		const tenantFound = Tenant.findOne({domain:tenant.domain});
		if(!tenantFound){
			console.log('Not found in DB, now processing fixtures...');

			tenantId = Tenant.insert(tenant, { validate: false });
			console.log('tenantId created: ',tenantId);
		}else{
	  	console.log('Found in DB, skipping...');
	  	tenantId = tenantFound._id;
	  };
	  
		const tenantUsers = _.where(users,{domain:tenant.domain});
		console.log('tenantUsers found in fixtures: ', tenantUsers.length);

		let tenantOwners = [];

		tenantUsers.forEach((tenantUser) => {
			console.log('now checking user with email: ', tenantUser.email);
	  	const userExists = Meteor.users.findOne({ 'emails.address': tenantUser.email });
	  	
	  	let userId;
		  if (!userExists){
		  	// console.log('user not found in DB, now processing fixtures...');
		    userId = Accounts.createUser({ email:tenantUser.email, password:tenantUser.password, profile:tenantUser.profile });
		    console.log('userId created: ', userId);
			}else{
				console.log('user found in DB, skipping...');
				userId = userExists._id;
			};

	    if(!Member.findOne(userId)){
		    const memberId= Member.insert({
		    	"_id" 			: userId, 
		    	"fullname" 	: tenantUser.profile.fullname, 
		    	"nickname" 	: tenantUser.profile.fullname, 
		    	"tenants" 	: [{ 
		    		"tenantId" 	: tenantId, 
		    		"roles" 		: tenantUser.roles, 
		    		"status" 		: "Active" 
		    	}],
		    },{ validate: false });
		    console.log('memberId created: ', memberId);	 
	  
	      Roles.addUsersToRoles(userId, tenantUser.roles, tenantUser.domain);
		    console.log('Roles added to user: ',tenantUser.roles);
	   	
	    }else{
	    	console.log('Found member in DB, skipping...');
	    }

			// if(Roles.userIsInRole(userId, 'Admin', tenantUser.domain))
			// 	tenantOwners.push({
			// 		"partyId" 	: userId,
			// 		"partyType" : "Member"
			// 	});
		});

		Tenant._collection.update({ _id: tenantId }, { $set:{ owners:tenantOwners } });
		console.log('update Tenant with owners: ', tenantOwners);

		// FIXME seharusnya otomatis aja waktu create article, create info juga
		const tenantArticles = _.where(articles,{domain:tenant.domain});
		console.log('tenantArticles found in fixtures: ', tenantArticles.length);

		tenantArticles.forEach((tenantArticle) => {
			const foundArticle = Article.findOne({title:tenantArticle.title});
			if(!foundArticle){
				delete tenantArticle["domain"];
				tenantArticle.tenantId = tenantId;
				tenantArticle.owners 	= tenantOwners;
				console.log('tenantArticle', tenantArticle);
				const articleId = Article.insert(tenantArticle,{validate:false});
				console.log('created articleId: ', articleId);
			};
		});

		// FIXME jadi di sini yang bukan article ditembak masuk ke info
		const tenantInfos = _.where(infos,{domain:tenant.domain});
		console.log('tenantInfos found in fixtures: ', tenantInfos.length);

		tenantInfos.forEach((tenantInfo) => {
			const foundInfo = Info.findOne({title:tenantInfo.title});
			if(!foundInfo){
				delete tenantInfo["domain"];
				tenantInfo.tenantId = tenantId;
				tenantInfo.owners 	= tenantOwners;
				console.log('tenantInfo', tenantInfo);
				const infoId = Info.insert(tenantInfo,{validate:false});
				console.log('created infoId: ', infoId);
			};
		});

		// if(Info.find({tenantId:tenantId}).fetch().length < infos.length ){
		// 	console.log('now injecting info collection...');
		// 	infos.forEach((info) => {
		// 		info.tenantId = tenantId;
		// 		info.imgUrl 	= "http://"+tenant.domain+":3000/images/1900x1080_SlideOne.png";
		// 		info.owners 	= tenantOwners;

		// 		//FIXME harusnya cek type, bila Product, inject juga ke refs, tentunya kita buat data dulu di Product Collection 

		// 		const infoId = Info.insert(info,{ validate: false});
		// 		console.log('created infoId: ', infoId);
		// 	});
		// }else{
		// 	console.log('skipping infos creation...');
		// };

		const tenantShops = _.where(shops,{domain:tenant.domain});
		console.log('tenantShops found in fixtures: ', tenantShops.length);

		tenantShops.forEach((tenantShop) => {
			const foundShop = Shop.findOne({name:tenantShop.name});
			if(!foundShop){
				delete tenantShop["domain"];
				tenantShop.tenantId = tenantId;

				const userExists = Meteor.users.findOne({ 'emails.address': tenantShop.userEmail });
				if(!!userExists){
					tenantShop.owners = [{
						partyId: userExists._id
					}];
					console.log('tenantShop', tenantShop);
					const shopId = Shop.insert(tenantShop,{validate:false});
					console.log('created shopId: ', shopId);
				};
			};
		});

		const tenantProducts = _.where(products,{domain:tenant.domain});
		console.log('tenantProducts found in fixtures: ', tenantProducts.length);

		tenantProducts.forEach((tenantProduct) => {
			const foundProduct = Product.findOne({name:tenantProduct.name});
			if(!foundProduct){
				delete tenantProduct["domain"];
				tenantProduct.tenantId = tenantId;

				const shop = Shop.findOne({name:tenantProduct.shopName});
				if(!!shop){
					tenantProduct.shopId = shop._id;
					console.log('tenantProduct', tenantProduct);
					const productId = Product.insert(tenantProduct,{validate:false});
					console.log('created productId: ', productId);
				};
			};
		});
		

	  console.log('****************** END fixtures for tenant: ', tenant.domain);
	});

};
