<template>
	<view class='login-other'>
		<view class='other-text'>
			<view>或者用以下方式登录</view>
		</view>
		<view class='other'>
			<view class='other-item'  @tap="logingo('weixin')">
				<image src="../../static/img/wx.png" mode=""></image>
				<view>微信登录</view>
			</view>
			<view class='other-item' @tap="logingo('sinaweibo')">
				<image src="../../static/img/wb.png" mode="" ></image>
				<view>微博登录</view>
			</view>
			<view class='other-item' @tap="logingo('qq')">
				<image src="../../static/img/qq.png" mode="" ></image>
				<view>QQ登录</view>
			</view>
		</view>
	</view>
	
	
</template>

<script>
	import $http from "@/common/api/requset.js"
	import {mapMutations} from "vuex"
	export default{
		methods:{
			...mapMutations(['login']),
			logingo(name){
				uni.login({
					provider:name,
					success: (res) => {
						// 最重要的数据
						let openid=res.authResult.openid
						uni.getUserInfo({
							provider:name,
							success: (res) => {
								console.log(res);
								let provider=name
								let openId=res.userInfo.openId || res.userInfo.openid
								let nickName=res.userInfo.nickName
								let avatarUrl=res.userInfo.avatarUrl
								$http.request({
									url:"/loginother",
									method:"POST",
									data:{
										provider:provider,
										openId:openId,
										nickName:nickName,
										avatarUrl:avatarUrl	
									}
								}).then(res=>{
									this.login(res)
									uni.navigateTo({
										url:"../index/index"
									})
	
								
								}).catch(err=>{
									uni.showToast({
										title:"请求失败",
										icon:"error"
									})
								})
								
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
/*  其他登录方式  */
.login-other{
	padding: 100rpx 0;
}
.other-text{
	display: flex;
	padding:50rpx 0;
}
.other-text view{
	line-height: 0rpx;
	padding:0 10rpx;
}
.other-text:after{
	flex:1;
	content: '';
	height: 2rpx;
	background-color: #CCCCCC;
}
.other-text::before{
	flex:1;
	content: '';
	height: 2rpx;
	background-color: #CCCCCC;
}
.other{
	display: flex;
	justify-content: space-around;
}
.other-item{
	display: flex;
	flex-direction: column;
	justify-content:center;
	align-items: center;
}
.other-item image{
	width:80rpx;
	height: 80rpx;
}
/*  其他登录方式  end  */
</style>
