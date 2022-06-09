<template>
	<view class="shop">
		<view class="shop-item" v-for="(item,index) in datalist" :key="index">
		<image class="shop-img" :src="item.bigUrl" mode=""></image>
		<scroll-view scroll-x="true"  class="shop-scroll-z">
			<view class="shop-scroll">
				<Commodity :commodiyuList="item.data" :itenW="width" :bigH="height" :tfwrap="tfwrap" :fontsize='25'> </Commodity>
			</view>
		</scroll-view>
		</view>
	</view>
</template>

<script>
	import Commodity from "../common/Commodity.vue"
	export default{
		data(){
			return{
				width: 200,
				height: 200,
				tfwrap:"nowrap"
			}
		},
		props:{
			datalist:Array
		},
		components:{
			Commodity
		}
	}
</script>

<style scoped>
	.shop-img{
		width: 100%;
		height: 350rpx;
	}
	.shop-scroll{
		display: inline-block;
	}
	.shop-scroll-z{
		width: 100%;
		white-space: nowrap;
	}
</style>