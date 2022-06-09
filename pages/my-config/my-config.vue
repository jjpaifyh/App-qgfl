<template>
	<view class="config">
		<view class="config-list">
			<view class="main">账号设置</view>
			<view class="config-item">
				<view class="">修改密码</view>
				<view class=""> > </view>
			</view>
			<view class="config-item">
				<view class="">绑定手机号码</view>
				<view class=""> > </view>
			</view>
			<view class="config-item" @tap="goMypathlist">
				<view class="">地址管理</view>
				<view class=""> > </view>
			</view>
			<view class="config-item">
				<view class="">绑定第三方账号</view>
				<view class=""> > </view>
			</view>
		</view>
		<view class="config-list">
			<view class="main">系统设置</view>
			<view class="config-item">
				<view class="">信息推送</view>
				<view class=""> > </view>
			</view>
			<view class="config-item">
				<view class="">短信提醒</view>
				<view class=""> > </view>
			</view>
			<view class="config-item">
				<view class="">图片显示</view>
				<view class=""> > </view>
			</view>
			<view class="config-item">
				<view class="">清理缓存</view>
				<view class=""> > </view>
			</view>
		</view>
		<view class="config-list">
			<view class="main">支持</view>
			<view class="config-item">
				<view class="">给千古风流好评</view>
				<view class=""> > </view>
			</view>
			<view class="config-item">
				<view class="">意见反馈</view>
				<view class=""> > </view>
			</view>
			<view class="config-item">
				<view class="">关于千古风流</view>
				<view class=""> > </view>
			</view>
		</view>
		
		
		
		<view class="my-exit" @tap="tuichu">退出</view>
	</view>
</template>

<script>
	import { mapMutations } from "vuex"
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			...mapMutations(['loginOut']),
			goMypathlist(){
				uni.navigateTo({
					url:"/pages/my-path-list/my-path-list"
				})
			},
			tuichu(){
				uni.showModal({
					title:"确定退出吗",
					success: (res) => {
						if(res.confirm){
							this.loginOut()
							uni.navigateTo({
								url:'../index/index'
							})
						} 
					},
					fail:()=>{
						
					}
				})
			}
		}
	}
</script >

<style scoped>
.config-item{
	display: flex;
	padding: 20rpx ;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2rpx solid #cccccc;
	height: 70rpx;
}
.my-exit{
	background-color: #49bdfb;
	width: 100%;
	line-height: 82rpx;
	color: #fff;
	text-align: center;
	
}
.main{
	width: 100%;
	text-align: center;
	height: 60rpx;
	line-height: 60rpx;
	border-bottom: 2rpx solid #cccccc;
}
</style>
