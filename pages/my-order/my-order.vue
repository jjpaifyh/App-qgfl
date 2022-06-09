<template>
	<view class="my-order" :style="'height:'+clentHeight+'px;'">
		<Lines></Lines>
		<view class="order-header">
			<view class="header-item" 
			v-for="(item,index) in list" :key="index"
			:style="isTF==index?'border-bottom: 4rpx solid #49bdfb;':''"
			@tap="actt(index)"
			>{{item.name}}</view>
		</view>
		
		<block v-for="(item,index) in list" :key="index">
		<view class="" v-show="isTF==index">
			<orderlist :datass="item" v-if="index==0?isTFs:list[index].list[0].goodsitem.length>0"></orderlist>
		
		<view class="on-order" :style="'height:'+clentHeight+'px;'" v-else>
			<view class="on-order-box">
				<image class="on-order-img" src="../../static/img/gouwuche.png" mode=""></image>
				<view class="text-on">囧！空空如也，去首页看看吧~</view>
				<view class="go" @tap="goindex">
					前往首页
				</view>
			</view>
		</view>
		</view>
		</block>
	
	
	</view>
</template>

<script>
	import orderlist from "@/components/order/order-list.vue"
	import Lines from "@/components/common/Line.vue"
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				isTF:0,
				clentHeight:0,
				isdata:false
			}
		},
		methods: {
			actt(index){
				this.isTF=index
			},
			goindex(){
				uni.navigateTo({
					url:"../index/index"
				})
			},

		},
		components:{
			Lines,
			orderlist
		},
		onReady(){
			uni.getSystemInfo({
				success:res=>{
					this.clentHeight=res.windowHeight
					console.log(this.clentHeight);
				}
			})
		},
		computed:{
			...mapState({
				list:state=>state.cart.cartlist
			}),
			isTFs(){
				if(this.list[0].list[0].goodsitem.length>0 || this.list[0].list[1].goodsitem.length>0 || this.list[0].list[2].goodsitem.length>0 || this.list[0].list[3].goodsitem.length>0){
					return true
				}else{
					return false
				}
			}
		}
	}
</script>

<style scoped>
	.on-order-box{
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 500rpx;
		height: 500rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.on-order-img{
		width: 400rpx;
		height: 400rpx;
	}
	.text-on{
		margin-bottom: 60rpx;
	}
	.go{
		width: 300rpx;
		height: 60rpx;
		background-color: #fff;
		text-align: center;
		line-height: 60rpx;
		border-radius: 30rpx;
		border: 2rpx solid #49bdfb;
	}

	.order-header{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100rpx;
		/* border-bottom: 2rpx solid #7f7f7f; */
	}
	.header-item{
		text-align: center;
		line-height: 100rpx;
		flex: 1;
		height: 100rpx;
	}
	.my-order{
		background-color: #f7f7f7;
		
	}


</style>
