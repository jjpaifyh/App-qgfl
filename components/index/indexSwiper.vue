<template>
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
		<swiper-item v-for="(item, index) in dataList" :key="index">
			<view class="swiper-item" >
				<image  class="img-lun" :src="item.imgUrl" alt="">
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
	export default{
		props:{
			dataList:Array
		}
	}
</script>

<style scoped>
	swiper{
		width: 100%;
		height: 400rpx;
	}
	.img-lun{
		width: 100%;
		height: 400rpx;
	}
</style>