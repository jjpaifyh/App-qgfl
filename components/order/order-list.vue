<template>
	<view class="">
		
		<view class="order-main"  v-for="(item_2,index_2) in datass.list" :key="index_2" v-show="item_2.goodsitem!=0">
			<!-- 商品 -->
			<view class="order-goos" >
				<view class="goods-status f-active-color">{{item_2.status}}</view>
				<view class="goods-content" v-for="(item_3,index_3) in item_2.goodsitem" :key="index_3">
					<image class="goods-img" :src="item_3.imgUrl" mode=""></image>
					<view class="box-text">
						<view class="goods-text">{{item_3.name}}</view>
						<view class="" class="goods-size f-color">颜色：蓝色</view>
						<view class="" style="font-size: 24rpx; color: aqua;">7天无理由退款</view>
					</view>
					<view class="price-box">
						<view class="">￥{{item_3.oprice}}</view>
						<view class="">*{{item_3.num}}</view>
					</view>
				</view>
			</view>
			
			<!-- 总价 -->
			<Lines></Lines>
			<view class="box-order-z">
				<view class="a">
					订单金额:
				</view>
				<view class="b">
					￥{{pprict}}
				</view>
				<view class="c">
					(包含运费￥0.00)
				</view>
			</view>
			<Lines></Lines>
			<!-- 支付 -->
			<view class="zf-box" v-show="item_2.putin=='支付'?true:false" @tap="zf">
				<view class="input">
					{{item_2.putin}}
				</view>
			</view>
			<Lines></Lines>
		</view>
	
	</view>
</template>

<script>
	import Lines from "@/components/common/Line.vue"
	import {mapMutations} from "vuex"
	export default{
		props:{
			datass:Object
		},
		components:{
			Lines
		},
		computed:{
			pprict(){
				let num =0
				this.datass.list.forEach(v=>{
					v.goodsitem.forEach(i=>{
						num=num+(Number(i.oprice)*Number(i.num))
					})
				})
				return num
			}
		},
		methods:{
			...mapMutations(['reomdzf']),
			zf(){
				this.reomdzf()
				uni.navigateTo({
					url:"/pages/payment/payment"
				})
			}
		}
	}
</script>

<style scoped>
	.goods-status{
		display: flex;
		justify-content: flex-end;
		background-color: #ffffff;
		padding: 20rpx;
	}
	.goods-content{
		width: 100%;
		background-color: #f7f7f7;
		height: 200rpx;
		padding: 10rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.goods-img{
		width: 160rpx;
		height: 160rpx;
	}
	.goods-size{
		font-size: 24rpx;
		margin: 30rpx 0;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.goods-text{
		font-size: 30rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.box-text{
		width: 400rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.price-box{
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.price-box view{
		margin: 30rpx 15rpx 0 30rpx;
	}
	.box-order-z{
		width: 100%;
		height: 80rpx;
		display: flex;
		line-height: 80rpx;
		background-color: #fff;
		justify-content: flex-end;
	}
	.a{
		margin-left: 20rpx;
	}
	.b{
		color: #49bdfb;
	}
	.zf-box{
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.input{
		width: 100rpx;
		height: 60rpx;
		background-color: #fff;
		line-height: 60rpx;
		text-align: center;
		margin-right: 30rpx;
		border-radius: 30rpx;
		border:2rpx solid #49bdfb;
	}
</style>
