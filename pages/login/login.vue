<template>
	<view class='login'>
		<swiper vertical="true" style="height: 100vh;">
			<swiper-item>
				<scroll-view>
					<view class='login-tel'>
						<view class='tel-main'>
							<view class='close' @tap="goBack">
								<image class='close-img' src="../../static/img/close.png" mode=""></image>
							</view>
							<view class='logo'>
								<image class='logo-img' src="../../static/img/qgfl.png" mode=""></image>
							</view>
							<view class='tel' @tap="gotel">手机号注册</view>
							<LoginOther></LoginOther>
							<view class='login-go'>
								<view>已有账号，去登录</view>
								<image src="../../static/img/down.png" mode=""></image>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view>
					<view class='login-tel'>
						<view class='tel-main'>
							<view class='close close-center'>
								<view class="" @tap="goBack">
									<image class='close-img' src="../../static/img/close.png" mode=""></image>
								</view>
								<view class="login-go">
									<image class='close-img' src="../../static/img/up.png" mode=""></image>
									<view class="">没有账号?去注册</view>
								</view>
								<view class=""></view>
							</view>
							<view class="login-from">
								<view class="login-user">
									<text class="n">账号</text>
									<input type="text" v-model="userName" value="" placeholder="请输入手机/昵称">
								</view>
								<view class="login-user">
									<text class="n">密码</text>
									<input type="text" v-model="userPwd" value="" placeholder="6~15字符">
								</view>
							</view>
							<view class="login-quick">
								<view class="">忘记密码</view>
								<view class="">免密登录</view>
							</view>
							<view class='tel' @tap="submit">登录</view>
							
							<view class="reminder">温馨提示:暂只支持账号登录,其他登录正在开发中</view>
							<LoginOther></LoginOther>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>

		

		
	</view>
</template>

<script>
	import $http from "@/common/api/requset.js"
	import LoginOther from '@/components/login/login-other.vue'
	import {mapMutations} from "vuex"
	export default {
		data() {
			return {
				// 用户输入内容
				userName:'',
				userPwd:'',
				// 验证规则
				rules:{
					userName:{
						rule:/\S/,
						msg:"账号不能为空"
					},
					userPwd:{
						rule:/^[0-9a-zA-Z]{6,16}$/,
						msg:"密码格式错误（6-16字符）"
					}
				},
				
			}
		},
		components:{
			LoginOther
		},
		methods: {
			...mapMutations(['login']),
			// 退出
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			// 点击登录
			submit(){
				if(!this.validate("userName"))return
				if(!this.validate("userPwd"))return
				
				$http.request({
					url:"/login",
					method:"POST",
					data:{
						userName:this.userName,
						userPwd:this.userPwd
					}
				}).then(res=>{
					if(res.success){
						this.login(res.data)
							uni.showToast({
								title:res.msg,
								icon:"loading"
							})
						
						setTimeout(()=>{
							uni.hideLoading();
							uni.navigateTo({
								url:"../index/index"
							})
						},2000)
					}else{
						uni.showToast({
							title:res.msg,
							icon:"loading"
						})
					}

				}).catch(err=>{
					uni.showToast({
						title:"请求失败",
						icon:"error"
					})
				})
			},
			// 验证规则
			validate(key){
				var bool=true
				if(!this.rules[key].rule.test(this[key])){
					uni.showToast({
						title:this.rules[key].msg,
						icon:'error'
					})
					bool=false
					return false
				}
				return bool
			},
			// 手机祖册
			gotel(){
				uni.navigateTo({
					url:"../login-tel/login-tel"
				})
			}
		}
	}
</script>

<style scoped>
.close-center{
	display: flex;
	
}
.close-center>view{
	flex: 1;
}
.login-tel{
	width: 100vw;
	height: 100vh;
}
.tel-main{
	padding:0 20rpx;
}
.close{
	padding:70rpx 0;
}
.close-img{
	width:60rpx;
	height: 60rpx;
}
.logo{
	padding-bottom: 100rpx;
	display: flex;
	justify-content: center;
}
.tel{
	width:100%;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	color:#FFFFFF;
	background-color: #49BDFB;
	border-radius: 40rpx;
}
.login-go{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.login-go image{
	width:60rpx;
	height: 60rpx;
}
.logo-img{
	width: 70%;
}
.login-from{
	padding-top: 100rpx;
}
.login-user{
	font-size: 32rpx;
	padding: 10rpx 0;
	display: flex;
	align-items: center;
	border-bottom: 2rpx solid #f7f7f7;
}
.n{
	padding-right: 18rpx;
}
.login-quick{
	display: flex;
	justify-content: space-between;
	padding: 20rpx 0;
}
.reminder{
	color: #cccccc;
	padding: 20rpx 0;
	text-align: center;
}
</style>
