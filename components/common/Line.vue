<template>
	<view class="line" :style="'height:'+H+'rpx;'">
		
	</view>
</template>

<script>
	export default{
		props:{
			H:{
				type:Number,
				default(){
					return 2
				}
			}
		}
	}
</script>

<style scoped>
	.line{
		width: 100%;
		/* height: 4rpx; */
		background-color: #E1E1E1;
	}
</style>