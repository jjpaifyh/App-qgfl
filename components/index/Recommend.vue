<template>
	<view class="index bg-color">
		<view class="recommend-item" v-for="(item,index) in recommendList" :key="index">
			<image class="item-box" :src="item.imgUrl" mode=""></image>
			<view class="item-small">
				<block v-for="(k,i) in item.datd">
					<image :src="k.imgUrl" mode=""></image>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			recommendList:Array
		}
	}
</script>

<style scoped>
	.index{
		padding: 10px;
	}
	.recommend-item{
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		border: 2rpx solid #CCCCCC;
		overflow: hidden;
		margin: 20rpx 0;
	}
	.item-box{
		width: 100%;
		height: 300rpx;
	}
	.item-small{
		width: 100%;
		height: 240rpx;
	}
	.item-small image{
		width: 33.3%;
		height: 240rpx;
	}
	
</style>