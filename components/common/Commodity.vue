<template>
	<view class="commodity" :style="'flex-wrap:' +tfwrap+';'">
		<!-- 单个商品 -->
		<view class="commodity-item" :style="'width:'+itenW+'rpx;'" v-for="(item,id) in commodiyuList" :key="id" @tap="goDetails(item.id)">
			<image class="commodity-img" :src="item.imgUrl" :style="'height:'+bigH+'rpx;'"></image>
			<view class="commodity-content">
				<text class="commodity-name" :style="'font-size:'+fontsize+'rpx;'">
					{{item.name}}
				</text>
				<view>
					<text class="pprice">￥{{item.pprice}}</text>
					<text class="oprice">￥{{item.oprice}}</text>
				</view>
				<text class="discount">{{item.discount}}折</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			commodiyuList:{
				type:Array,
				default (){
					return []
				}
			},
			itenW:{
				type:Number,
				default:375
			},
			bigH:{
				type:Number,
				default:375
			},
			tfwrap:{
				type:String,
				default:"wrap"
			},
			fontsize:{
				type:Number,
				default:30
			}
		},
		methods:{
			goDetails(id){
				uni.navigateTo({
					url:`../../pages/details/details?id=${id}`
				})
			}
		}
	}
</script>

<style scoped>
	.commodity{
		display: flex;
		/* flex-wrap: wrap; */
	}
	.commodity-item{
/* 		width: 375rpx; */
		padding-bottom: 20rpx;
	}
	.commodity-img{
		width: 100%;
		/* height: 375rpx; */
	}
	.commodity-content{
		text-align: center;
	}
	.commodity-name{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		color: #333333;
		word-break: break-all;
		padding: 6rpx 20rpx;
		
	}	
	.oprice{
		text-decoration: line-through;
		font-size: 24rpx;
		color: #999999;
		
	}
	.discount{
		border-radius: 4rpx;
		border: 1px solid #FF3333;
		padding:2rpx 10rpx ;
		font-size: 20rpx;
		color: #FF3333;
		
	}
</style>