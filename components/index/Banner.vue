<template>
	<view class="index">
		<image class="banner-img" :src="data" mode=""></image>
	</view>
</template>

<script>
	export default{
		props:{
			data:String
		}
	}
</script>

<style scoped>
	.index{
		width: 100%;
		height: 300rpx;
	}
	.banner-img{
		width: 100%;
		height: 300rpx;
	}
</style>