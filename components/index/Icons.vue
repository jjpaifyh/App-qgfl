<template>
	<view class="Icons">
		<view class="icons-item" v-for="(item,index) in datalist" :key="index">
			<image class="icons-img" :src="item.imgUrl" mode=""></image>
			<text class="icons-name">{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			datalist:Array
		}
	}
</script>

<style scoped>
	.Icons{
		display: flex;
		flex-wrap: wrap;
	}
	.icons-item{
		flex: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 20rpx;
	}
	.icons-img{
		width: 100rpx;
		height: 100rpx;
	}
</style>