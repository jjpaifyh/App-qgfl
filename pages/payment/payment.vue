<template>
	<view>
		<uniNavBar
		title="购物车"
		left-text='关闭'
		:status-bar='istop'
		@clickLeft="click"
		></uniNavBar>
<view class='pay-main'>
			<label for="" @tap="clicks">
				<view class="pay-item">
					<image class='pay-img' src='../../static/img/zfb.png' mode=""></image>
					<view>
						<view>支付宝支付</view>
						<view class='pay-txt'>推荐支付宝用户使用</view>
					</view>
					<label class="radio">
						<radio value="" color='#FF3333' :checked="isindex" /><text></text>
					</label>
				</view>
			</label>
			<label for="" @tap="clicks">
				<view class="pay-item">
					<image class='pay-img' src="../../static/img/wxf.png" mode=""></image>
					<view>
						<view>微信支付</view>
						<view class='pay-txt'>推荐微信用户使用</view>
					</view>
					<label class="radio">
						<radio value="" color='#FF3333' :checked="!isindex"  /><text></text>
					</label>
				</view>
			</label>
		</view>
		<!--去支付-->
		<view class='pay-foot'>
			<view class='total'>
				<text style="color: #fff;">合计:</text>
				<text class='total-price'>¥259.00</text>
			</view>
			<view class="go-pay" @tap="goPayment">去支付</view>
		</view>
		
	</view>
	
</template>

<script>
	import {mapState,mapMutations} from "vuex"
	import uniNavBar from "@/components/uni/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				// #ifndef MP
				istop:true,
				isbutt:true,
				// #endif
				isindex:false
			}
		},
		methods: {
			...mapMutations(['rormv',"gocompletion","goawaits"]),
			click(){
				this.goawaits()
				uni.navigateTo({
					url:"../shopcart/shopcart"
				})
			},
			goPayment(){
				this.gocompletion()
				this.rormv()
				uni.navigateTo({
					url:"../payment-success/payment-success"
				})
			},
			clicks(){
				this.isindex=!this.isindex
			}
		},
		components:{
			uniNavBar
		},
		onLoad(){
			// #ifdef MP
			this.istop = false
			// #endif
		},
		computed:{
		}
	}
</script>

<style scoped>
.pay-item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:20rpx;
	border-bottom: 2rpx solid #CCCCCC;
}
.pay-img{
	width: 100rpx;
	height: 100rpx;
}
.pay-txt{
	color:#CCCCCC;
}
.pay-foot{
	width:100%;
	position: fixed;
	left:0;
	bottom:0;
	height: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.total{
	padding-left:100rpx;
	flex:1;
	background-color:#000000;
	line-height: 100rpx;
}
.go-pay{
	color:#FFFFFF;
	background-color: #49BDFB;
	line-height: 100rpx;
	text-align: center;
	width:220rpx;
}
.total-price{
	color:#FFFFFF;
}
</style>
