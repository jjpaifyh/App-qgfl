export default{
	state:{
		id:'',
		// 登录状态
		loginStatus:false,
		// token
		token:null,
		// 用户信息
		userInfo:{
			
		}
	},
	getters:{
		
	},
	mutations:{
		// 读取本地缓存
		initUser(state){
			let userInfo=uni.getStorageSync('userInfo')
			if(userInfo){
				userInfo=JSON.parse(userInfo)
				state.userInfo=userInfo
				state.loginStatus=true
				state.token=userInfo.token
			}
		},
		
		// 登录保存
		login(state,userInfo){
			state.userInfo=userInfo
			state.loginStatus=true
			state.token=userInfo.token
			// 持久化
			uni.setStorageSync('userInfo',JSON.stringify(userInfo))
		},
		
		// 退出登录
		loginOut(state){
			state.loginStatus=false;
			state.userInfo={};
			state.token=null
			uni.removeStorageSync('userInfo')
		}
	},
	actions:{

	}
}