<template>
	<view class="payment-success" :style="'height: '+clentHeight+'px;'">
		<view class="abc">
			<view class="imgg">
				<image src="../../static/img/zf_scu.png" mode=""></image>
			</view>
			<view class="payment-text" @tap="go">
				返回首页
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				clentHeight:0
			}
		},
		methods: {
			go(){
				uni.navigateTo({
					url:'../index/index'
				})
			}
		},
		onReady(){
			uni.getSystemInfo({
				success:(res)=>{
					this.clentHeight=res.windowHeight
				}
			})
		},
	}
</script>

<style scoped>
.payment-success{
	position: relative;
	background-color: #fff;
	width: 100%;
	
}
.abc{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%,-50%);
	width:400rpx ;
	height: 600rpx;
}
.payment-text{
	width: 300rpx;
	height: 100rpx;
	text-align: center;
	line-height: 100rpx;
	border: 2rpx solid aqua;
	border-radius: 60rpx;
	
}
.imgg{
	width: 600rpx;
	height: 600rpx;
}
.imgg image{
	width: 600rpx;
	height: 600rpx;
}
</style>
