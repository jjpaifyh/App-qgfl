var express = require('express');
var router = express.Router();
var connection=require('../db/sql.js')
var user=require('../db/UserSql')
var jwt_decode=require('jwt-decode')
// 设置请求头，避免跨域
router.all('*',(req,res,next)=>{
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin","*");
	//允许的header类型
	res.header("Access-Control-Allow-Headers","content-type");
	//跨域允许的请求方式 
	res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
	next()
})

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// 发送验证码
router.post('/api/code', function(req, res, next) {
  let params = {
  	userName : req.body.phone
  }
  // 接入短信sdk

  res.send({
	  data:{
		  success:true,
		  code:'4986'
	  }
  })
});

// 购物车列表
router.post('/api/goodscart',function(req,res,next){
	console.log(req.body.data.phone);
	res.send({
		a:'测试'
	})
	
})




//添加地址
router.post('/api/addpath',function(req,res,next){

	let data=req.body
	console.log(data);
	let params={
		userName:data.phone
	}
	console.log(params);
	if(data.userId==''){
		connection.query( user.queryUserName( params ) , function (err, ress) {
			console.log(ress);
			
			data.userId=ress.id
		})
		
	}
	connection.query( `insert into address (name,tel,city,isDefault,userId,address) values ("${data.name}","${data.tel}","${data.city}","${data.isDefault?0:1}","${data.userId}","${data.address}")`, function (error, results, fields) {
		res.send({
			data:"添加成功"
		})
	})
	
})


// 请求地址
router.post('/api/selectAddress',function(req,res,next){
	
	let token=jwt_decode(req.body.token)      
	connection.query( `select * from user where phone ='${token.name}'`, function (error, results, fields) {
		
		let id=results[0].id
		connection.query( `select * from address where userId ='${id}'`, function (err, result) {
			res.send({
				data:result,
			})
		})
		
	})
	
})

// 第三方登录
router.post('/api/loginother',function(req,res,next){
	let params={
		provider:req.body.provider,
		openId:req.body.openId,
		nickName:req.body.nickName,
		avatarUrl:req.body.avatarUrl	
	}
	console.log(req.body);
	//查询数据库中有没有此用户
	connection.query( user.queryUserName( params ) , function (error, results, fields) {
		if( results.length > 0){
			console.log(1);
			//数据库中存在      : 读取
			connection.query( user.queryUserName( params ) , function (e, r) {
				res.send({
					data:r[0]
				})
			})
		}else{
			//数据库中[不]存在  : 存储 ==>读取
			connection.query( user.insertData( params ) , function (er, result) {
				connection.query( user.queryUserName( params ) , function (e, r) {
					res.send({
						data:r[0]
					})
				})
			})
		}
	})
	
	
})




// 注册=》添加一条数据
router.post('/api/addUser', function(req, res, next) {
	let params={
		userName:req.body.userName,
		userCode:req.body.code
	}
	if(params.userCode=="4986"){
		 connection.query( user.insertData( params ) , function (error, results, fields) {
			  connection.query( user.queryUserName( params ) , function (err, results, fields) {
				  res.send({
				  				 data:{
				  					 success:true,
				  					 msg:"注册成功",
				  					 date:results[0]
				  				 }
				  })
			  })

		 })
	}
  
});



// 检查手机号是否存在
router.post('/api/registered', function(req, res, next) {
  let params = {
  	userName : req.body.phone,
  
  }
  connection.query( user.queryUserName( params ) , function (err, results, fields) {
	  if(results.length>0){
		  res.send({
			  data:{
				  success:false,
				  mag:"手机号已经存在",
			  }
		  })
	  }else{
		  res.send({
			  data:{
				  success:true
			  }
		  })
	  }
  })
  
});



//用户登录
router.post('/api/login', function(req, res, next) {
	
	//前端给后端的数据
	let params = {
		userName : req.body.userName,
		userPwd  : req.body.userPwd
	}
	//查询用户名或者手机号存在不存在
	 connection.query( user.queryUserName( params ) , function (error, results, fields) {
		if( results.length > 0 ){
			 connection.query( user.queryUserPwd( params ) , function (err, result) {
				 if(  result.length > 0 ){
					 res.send({
					 	data:{
					 		success:true,
					 		msg:"登录成功",
							data:result[0]
					 	}
					 })
				 }else{
					 res.send({
						data:{
							success:false,
							msg:"密码不正确"
						}
					 })
				 }
			 })
		}else{
			res.send({
				data:{
					success:false,
					msg:"用户名或手机号不存在"
				}
			})
		}
	 })
});


// 商品
router.get('/api/goods/id', function(req, res, next) {
  connection.query(`select * from goods_search where id=${req.query.id} `,function(err,resu,fie){
  	if(err)throw error()
  	res.send({
  		code:'0',
  		data:resu
  	})
  })
});

// 分类
router.get('/api/goods/list', function(req, res, next) {
  res.json({
	  code:0,
	  data:[
		  {
			  id:1,
			  name:"家居家纺",
			  data:[
				  {
					  id:1,
					  name:"家纺类",
					  data:[
						  {
							  id:1,
							  imgUrl:"../../static/img/Furnishing2.jpg",
							  name:"毛巾"
						  },
						  {
							  id:1,
							  imgUrl:"../../static/img/Furnishing1.jpg",
							  name:"毛巾"
						  },
						  {
							  id:2,
							  imgUrl:"../../static/img/Furnishing3.jpg",
							  name:"毛巾"
						  },
						  {
							  id:3,
							  imgUrl:"../../static/img/list1.jpg",
							  name:"毛巾"
						  },
						  {
							  id:4,
							  imgUrl:"../../static/img/list1.jpg",
							  name:"毛巾"
						  }
					  ]
				  },
				  {
					  id:2,
					  name:"大家居类",
					  data:[
						  {
							  id:1,
							  imgUrl:"../../static/img/list1.jpg",
							  name:"床套"
						  },
						  {
							  id:2,
							  imgUrl:"../../static/img/list1.jpg",
							  name:"毛巾"
						  },
						  {
							  id:3,
							  imgUrl:"../../static/img/list1.jpg",
							  name:"毛巾"
						  },
						  {
							  id:4,
							  imgUrl:"../../static/img/list1.jpg",
							  name:"毛巾"
						  }
					  ]
				  }
			  ]
		  },
		 {
		 			  id:2,
		 			  name:"女装",
		 			  data:[
		 				  {
		 					  id:1,
		 					  name:"T血",
		 					  data:[
		 						  {
		 							  id:1,
		 							  imgUrl:"../../static/img/list1.jpg",
		 							  name:"毛巾"
		 						  }
		 					  ]
		 				  },
		 				  {
		 					  id:2,
		 					  name:"高跟鞋",
		 					  data:[
		 						  {
		 							  id:1,
		 							  imgUrl:"../../static/img/list1.jpg",
		 							  name:"床套"
		 						  }
		 					  ]
		 				  }
		 			  ]
		 },
		{
			  id:3,
			  name:"男装",
			  data:[
				  {
					  id:1,
					  name:"风衣",
					  data:[
						  {
							  id:1,
							  imgUrl:"../../static/img/list1.jpg",
							  name:"毛巾"
						  }
					  ]
				  },
				  {
					  id:2,
					  name:"内裤",
					  data:[
						  {
							  id:1,
							  imgUrl:"../../static/img/list1.jpg",
							  name:"床套"
						  }
					  ]
				  }
			  ]
		  }
	  ]
  })
});

// 搜索
router.get("/api/goods/search",function(req,res,next){
	// http://192.168.236.1:3000/api/goods/search?name=%E8%8A%B1%E7%93%B6&pprice=desc
	let [goodsName,goodsorder,orderName]=Object.keys(req.query)
	connection.query(`select * from goods_search where name like '%${req.query[goodsName]}%' order by ${req.query[goodsorder]} ${req.query[orderName]}`,function(err,resu,fie){
		if(err)throw error()
		res.send({
			code:'0',
			data:resu
		})
	})
	
})
// 推荐页
router.get("/api/index_list/data",function(req,res,next){
	res.send({
		'code':0,
		'data':{
			topbar:[
				{id:1,name:'推荐'},
				{id:2,name:'户外运动'},
				{id:3,name:'美妆'},
				{id:4,name:'美食'},
				{id:5,name:'快乐一下'},
				{id:6,name:'乐高'},
				{id:7,name:'育儿'},
				{id:8,name:'学习'}
			],
			data:[
				{
					type:"swiperList",
					data:[
						{imgUrl:"../../static/img/swiper1.jpg"},
						{imgUrl:"../../static/img/swiper2.jpg"},
						{imgUrl:"../../static/img/swiper3.jpg"}
					]
				},
				{
					type:"recommendList",
					data:[
						{
							imgUrl:"../../static/img/Children.jpg",
							datd:[
								{imgUrl:"../../static/img/Children1.jpg"},
								{imgUrl:"../../static/img/Children2.jpg"},
								{imgUrl:"../../static/img/Children3.jpg"}
							]
						},
						{
							imgUrl:"../../static/img/Furnishing.jpg",
							datd:[
								{imgUrl:"../../static/img/Furnishing1.jpg"},
								{imgUrl:"../../static/img/Furnishing2.jpg"},
								{imgUrl:"../../static/img/Furnishing3.jpg"}
							]
						}
					]
				},
				{
					type:"commodityList",
					data:[
					{
						id:1,
						imgUrl:"../../static/img/commodity1.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:2,
						imgUrl:"../../static/img/commodity2.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:3,
						imgUrl:"../../static/img/commodity3.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:4,
						imgUrl:"../../static/img/commodity4.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					}
				]
				}
				
			]
		}
	})
})
// 运动户外
router.get('/api/index_list/2/data/1',function(res,res,next){
	res.json({
		code:'0',
		data:[
			{
				type:"bannerList",
				imgUrl:"../../static/img/banner1.jpg"
			},
			{
				type:"iconsList",
				data:[
					{
						imgUrl:"../../static/img/icons1.png",
						name:"运动户外"
						
					},
					{
						imgUrl:"../../static/img/icons2.png",
						name:"运动户外"
						
					},
					{
						imgUrl:"../../static/img/icons3.png",
						name:"运动户外"
						
					},
					{
						imgUrl:"../../static/img/icons4.png",
						name:"运动户外"
						
					},
					{
						imgUrl:"../../static/img/icons5.png",
						name:"运动户外"
						
					},
					{
						imgUrl:"../../static/img/icons6.png",
						name:"运动户外"
						
					},
					{
						imgUrl:"../../static/img/icons7.png",
						name:"运动户外"
						
					},
					{
						imgUrl:"../../static/img/icons8.png",
						name:"运动户外"
						
					}
				]
				
			},
			{
				type:"Hot",
				data:[
					{
						id:1,
						imgUrl:"../../static/img/hot1.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:2,
						imgUrl:"../../static/img/hot2.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:3,
						imgUrl:"../../static/img/hot3.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:4,
						imgUrl:"../../static/img/hot1.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},{
						id:5,
						imgUrl:"../../static/img/hot3.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:6,
						imgUrl:"../../static/img/hot1.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					}
				]
			},
			{
				type:'shopList',
				data:[
					{
						bigUrl:"../../static/img/shop.jpg",
						data:[
							{
								id:1,
								imgUrl:"../../static/img/shop1.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:2,
								imgUrl:"../../static/img/shop2.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:3,
								imgUrl:"../../static/img/shop3.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:4,
								imgUrl:"../../static/img/shop4.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:5,
								imgUrl:"../../static/img/shop3.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:6,
								imgUrl:"../../static/img/shop4.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							}
						]
					},
					{
						bigUrl:"../../static/img/shop.jpg",
						data:[
							{
								id:1,
								imgUrl:"../../static/img/shop1.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:2,
								imgUrl:"../../static/img/shop2.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:3,
								imgUrl:"../../static/img/shop3.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:4,
								imgUrl:"../../static/img/shop4.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:5,
								imgUrl:"../../static/img/shop3.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:6,
								imgUrl:"../../static/img/shop4.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							}
						]
					}
				]
			},
			{
				type:'commodityList',
				data:[
					{
						id:1,
						imgUrl:"../../static/img/commodity1.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:2,
						imgUrl:"../../static/img/commodity2.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:3,
						imgUrl:"../../static/img/commodity3.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:4,
						imgUrl:"../../static/img/commodity4.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					}
				]
			}
			
			
		]
	})
})
// 美妆
router.get('/api/index_list/3/data/1',function(res,res,next){
	res.json({
		code:'0',
		data:[
			{
				type:"bannerList",
				imgUrl:"../../static/img/banner1.jpg"
			},
			{
				type:"iconsList",
				data:[
					{
						imgUrl:"../../static/img/icons1.png",
						name:"运动户外"
						
					},
					{
						imgUrl:"../../static/img/icons2.png",
						name:"运动户外"
						
					},
					{
						imgUrl:"../../static/img/icons3.png",
						name:"运动户外"
						
					},
					{
						imgUrl:"../../static/img/icons4.png",
						name:"运动户外"
						
					},
					{
						imgUrl:"../../static/img/icons5.png",
						name:"运动户外"
						
					},
					{
						imgUrl:"../../static/img/icons6.png",
						name:"运动户外"
						
					},
					{
						imgUrl:"../../static/img/icons7.png",
						name:"运动户外"
						
					},
					{
						imgUrl:"../../static/img/icons8.png",
						name:"运动户外"
						
					}
				]
				
			},
			{
				type:"Hot",
				data:[
					{
						id:1,
						imgUrl:"../../static/img/hot1.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:2,
						imgUrl:"../../static/img/hot2.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:3,
						imgUrl:"../../static/img/hot3.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:4,
						imgUrl:"../../static/img/hot1.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},{
						id:5,
						imgUrl:"../../static/img/hot3.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:6,
						imgUrl:"../../static/img/hot1.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					}
				]
			},
			{
				type:'shopList',
				data:[
					{
						bigUrl:"../../static/img/shop.jpg",
						data:[
							{
								id:1,
								imgUrl:"../../static/img/shop1.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:2,
								imgUrl:"../../static/img/shop2.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:3,
								imgUrl:"../../static/img/shop3.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:4,
								imgUrl:"../../static/img/shop4.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:5,
								imgUrl:"../../static/img/shop3.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:6,
								imgUrl:"../../static/img/shop4.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							}
						]
					},
					{
						bigUrl:"../../static/img/shop.jpg",
						data:[
							{
								id:1,
								imgUrl:"../../static/img/shop1.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:2,
								imgUrl:"../../static/img/shop2.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:3,
								imgUrl:"../../static/img/shop3.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:4,
								imgUrl:"../../static/img/shop4.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:5,
								imgUrl:"../../static/img/shop3.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							},
							{
								id:6,
								imgUrl:"../../static/img/shop4.jpg",
								name:"好看的衣服，美丽的人生，爆款8456",
								pprice:"299",
								oprice:"659",
								discount:"5.6"
							}
						]
					}
				]
			},
			{
				type:'commodityList',
				data:[
					{
						id:1,
						imgUrl:"../../static/img/commodity1.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:2,
						imgUrl:"../../static/img/commodity2.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:3,
						imgUrl:"../../static/img/commodity3.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:4,
						imgUrl:"../../static/img/commodity4.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					}
				]
			}
			
			
		]
	})
})


// 加载更多
router.get('/api/index_list/2/data/2', function(req, res, next) {
  res.json({
	  code:'0',
	  data:[
		 {
		 	type:'commodityList',
		 	data:[
		 		{
		 			id:1,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		},
		 		{
		 			id:2,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		},
		 		{
		 			id:3,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		},
		 		{
		 			id:4,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		}
		 	]
		 }
	  ]
  })
});

router.get('/api/index_list/1/data/2', function(req, res, next) {
 
  res.json({
	  code:'0',
	  data:[
		 {
		 	type:'commodityList',
		 	data:[
		 		{
		 			id:1,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		},
		 		{
		 			id:2,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		},
		 		{
		 			id:3,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		},
		 		{
		 			id:4,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		}
		 	]
		 }
	  ]
  })
});

router.get('/api/index_list/3/data/2', function(req, res, next) {
 
  res.json({
	  code:'0',
	  data:[
		 {
		 	type:'commodityList',
		 	data:[
		 		{
		 			id:1,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		},
		 		{
		 			id:2,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		},
		 		{
		 			id:3,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		},
		 		{
		 			id:4,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		}
		 	]
		 }
	  ]
  })
});

router.get('/api/index_list/2/data/3', function(req, res, next) {
 
  res.json({
	  code:'0',
	  data:[
		 {
		 	type:'commodityList',
		 	data:[
		 		{
		 			id:1,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		},
		 		{
		 			id:2,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		},
		 		{
		 			id:3,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		},
		 		{
		 			id:4,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		}
		 	]
		 }
	  ]
  })
});

router.get('/api/index_list/1/data/3', function(req, res, next) {
  
  res.json({
	  code:'0',
	  data:[
		 {
		 	type:'commodityList',
		 	data:[
		 		{
		 			id:1,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		},
		 		{
		 			id:2,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		},
		 		{
		 			id:3,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		},
		 		{
		 			id:4,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		}
		 	]
		 }
	  ]
  })
});

router.get('/api/index_list/3/data/3', function(req, res, next) {
 
  res.json({
	  code:'0',
	  data:[
		 {
		 	type:'commodityList',
		 	data:[
		 		{
		 			id:1,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		},
		 		{
		 			id:2,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		},
		 		{
		 			id:3,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		},
		 		{
		 			id:4,
		 			imgUrl:"../../static/img/commodity1.jpg",
		 			name:"好看的衣服，美丽的人生，爆款8456",
		 			pprice:"299",
		 			oprice:"659",
		 			discount:"5.6"
		 		}
		 	]
		 }
	  ]
  })
});


// .....
router.get('/api/index_list/1/data/4', function(req, res, next) {
 
  res.render('index', { title: 'Express' });
});
router.get('/api/index_list/2/data/4', function(req, res, next) {
  
   res.render('index', { title: 'Express' });
});
router.get('/api/index_list/3/data/4', function(req, res, next) {
  
   res.render('index', { title: 'Express' });
});

// process.env.PORT = 2000;


module.exports = router;
