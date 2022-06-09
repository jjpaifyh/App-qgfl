<template>
	<view class="my">
		<!-- 头 -->
		<view class="my-header">
			<view class="system" @tap="gomy_config">
				<image class="system-loggo" src="../../static/img/config.png" mode=""></image>
			</view>
			<view class="my_logo" >
				<image :src="img" mode=""></image>
				
				<view class="">{{name}}</view>
			</view>
		</view>
		<!-- 订单 -->
		<view class="order">
			<view class="order-title">
				<view class="my-order" @tap="goOrder">我的订单</view>
				<view class="f-color">全部订单 ></view>
			</view>
			<view class="order-list">
				<view class="order-item">
					<image src="../../static/img/dfk.png" mode=""></image>
					<view class="">待付款</view>
				</view>
				<view class="order-item">
					<image src="../../static/img/dfh.png" mode=""></image>
					<view class="">待发货</view>
				</view>
				<view class="order-item">
					<image src="../../static/img/dsh.png" mode=""></image>
					<view class="">待收货</view>
				</view>
				<view class="order-item">
					<image src="../../static/img/dpj.png" mode=""></image>
					<view class="">待评论</view>
				</view>
				<view class="order-item">
					<image src="../../static/img/tkgl.png" mode=""></image>
					<view class="">退款管理</view>
				</view>
			</view>
		</view>
		<!-- 内容列表 -->
		<view class="my-content">
			<view class="my-content-item">
				<image class="my-content-item-img" src="../../static/img/z3.png" mode=""></image>
				<view class="my-content-item-text">
					<view class="text-min">我的收藏</view>
					<view class="righ"> > </view>
				</view>
			</view>
			<view class="my-content-item">
				<image class="my-content-item-img" src="../../static/img/z6.png" mode=""></image>
				<view class="my-content-item-text">
					<view class="my-content-item-text">
						<view class="text-min">我的优惠券</view>
						<view class="righ"> > </view>
					</view>
				</view>
			</view>
			<view class="my-content-item">
				<image class="my-content-item-img" src="../../static/img/z2.png" mode=""></image>
				<view class="my-content-item-text">
					<view class="my-content-item-text">
						<view class="text-min">我的积分</view>
						<view class="righ"> > </view>
					</view>
				</view>
			</view>
		</view>
		<view class="my-content-2">
			<view class="my-content-item">
				<image class="my-content-item-img" src="../../static/img/z1.png" mode=""></image>
				<view class="my-content-item-text">
					<view class="my-content-item-text">
						<view class="text-min">帮助中心</view>
						<view class="righ"> > </view>
					</view>
				</view>
			</view>
			<view class="my-content-item">
				<image class="my-content-item-img" src="../../static/img/zz.png" mode=""></image>
				<view class="my-content-item-text">
					<view class="my-content-item-text">
						<view class="text-min">注销账号</view>
						<view class="righ"> > </view>
					</view>
				</view>
			</view>
			<view class="my-content-item">
				<image class="my-content-item-img" src="../../static/img/z4.png" mode=""></image>
				<view class="my-content-item-text">
					<view class="my-content-item-text">
						<view class="text-min">联系客服</view>
						<view class="righ"> > </view>
					</view>
				</view>
			</view>
			<view class="my-content-item">
				<image class="my-content-item-img" src="../../static/img/z5.png" mode=""></image>
				<view class="my-content-item-text">
					<view class="my-content-item-text">
						<view class="text-min">商家入住</view>
						<view class="righ"> > </view>
					</view>
				</view>
			</view>
		</view>
		<Tabbar cureentPage="my"></Tabbar>
	</view>
</template>

<script scoped>
	import Tabbar from "@/components/common/Tabbar.vue"
	import {mapState} from "vuex"
	export default{
		data(){
			return{

			}
		},
		components:{
			Tabbar
		},
		onLoad(){

		},
		methods:{
			gomy_config(){
				uni.navigateTo({
					url:"../my-config/my-config"
				})
			},
			goOrder(){
				uni.navigateTo({
					url:'/pages/my-order/my-order'
				})
			},
		},
		computed:{
			...mapState({
				userInfo:state=>state.user.userInfo
			}),
			name(){
				return this.userInfo.nickName!=undefined ? this.userInfo.nickName :"用户昵称"
			},
			img(){
				return this.userInfo.imgUrl!=undefined ? this.userInfo.imgUrl :"../../static/img/qgfl.png"
			}
		}
		
	}
</script>

<style scoped>
	.my-header{
		position: relative;
		background: url(@/static/img/mybg.png);
		width: 100%;
		height: 400rpx;
	}
	.my_logo{
		position: absolute;
		top: 60%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 180rpx;
		height: 180rpx;
		
	}
	.my_logo>image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2px solid #bdbdbd;
		
	}
	.my_logo>view{
		margin: 0rpx 8rpx;
		text-align: center;
		font-weight: 700;
	}
	
	.system{
		position: absolute;
		top: 20rpx;
		left: 20rpx;
		width: 60rpx;
		height: 60rpx;
	}
	.system-loggo{
		width: 100%;
		height: 100%;
	}
	.order{
		width: 100%;
		height: 200rpx;
	}
	.order-title{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.order-title view{
		margin: 15rpx 15rpx;
	}
	.my-order{
		font-weight: 700;
	}
	.order-list{
		width: 100%;
		height: 130rpx;
		display: flex;
		justify-content: center;
	}
	.order-item{
		flex: 20%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.order-item>image{
		width: 70rpx;
		height: 70rpx;
	}
	.order-item>view{
		margin-top: 10rpx;
		text-align: center;
	}
	.my-content{
		margin-top: 15rpx;
		border-top: 25rpx solid #eeeeee;
		width: 100%;
	}
	.my-content-item-img{
		width: 40rpx;
		height: 40rpx;
		margin: 0 20rpx;
	}
	.my-content-item{
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eeeeee;
		
	}
	.my-content-2{
		border-top: 25rpx solid #eeeeee;
		width: 100%;
	}	
	.my-content-item-text{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.righ{
		margin-right: 25rpx;
		font-size: 20px;
		font-weight: 100;
	}
	.text-min{
		line-height: 80rpx;
	}
</style>