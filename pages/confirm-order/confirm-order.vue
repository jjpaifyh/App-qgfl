<template>
	<view class='confirm-order bg-active-color'>
		<Lines></Lines>
		
		<!--地址-->
		<block v-if="lists.length>0">
		<view class='order-map' v-for="(item,index) in lists" :key="index" @tap="godizhi">
			<block v-if="item.isDefault">
			<view class='map-title'>
				<view class='map-name'>收件人：{{item.name}}</view>
				<view>号码:{{item.tel}}</view>
			</view>
			<view class='map-city'>收货地址：{{item.city}}-{{item.details}}</view>
			</block>
		</view>
		</block>
		<view class="order-map-path" v-else @tap="addpthe">
			<view class="path-tetx">添加地址</view>
		</view>
		<Lines></Lines>
		<!--商品-->
		<view class='goods-list'>
			<!-- 循环本体 -->
			<view class='goods-content bg-active-color' v-for="(item,index) in purchase" :key="index">
				<image class='goods-img' :src='item.imgUrl' mode=""></image>
				<view class='goods-text'>
					<view class='goods-name'>{{item.name}}</view>
					<view class='goods-size f-color'>{{item.color}}</view>
					<view class='f-active-color' style='font-size:24rpx'>7天无理由</view>
				</view>
				<view>
					<view>¥{{item.oprice}}.00</view>
					<view class='f-color'>*{{item.num}}</view>
				</view>
			</view>

			<view class="text-confirm">
				<view class="text-confirm-yf">
					<view class="">运费:</view>
					<view class="">￥0.00</view>
				</view>
				<Lines></Lines>
				<view class="text-confirm-ly">
					<view class="text-confirm-ly-x">留言:</view>
					<input class="text-confirm-ly-y" type="text" value="" placeholder="给卖家的留言,140字以内">
				</view>
				<Lines></Lines>
				<view class="text-confirm-zj">
					<view class="">共{{count}}件商品 小计:</view>
					<view class="text-confirm-zj-y">￥{{numm}}</view>
				</view>
				<Lines></Lines>
			</view>
			
		</view>
		<!--底部 : 提交订单-->
		<view class='order-foot'>
			<view class='total-price'>合计：<text class='f-active-color'>¥{{numm}}.00</text></view>
			<view class="confirm" @tap="gopayment">提交订单</view>
		</view>
		
	</view>
</template>  

<script>
	import $http from "@/common/api/requset.js"
	import Lines from '@/components/common/Line.vue'
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				
			}
		},
		components:{
			Lines
		},
		methods: {
			...mapMutations(['_initAddressList']),
			godizhi(){
				uni.navigateTo({
					url:"../my-path-list/my-path-list?tf=0"
				})
			},
			addpthe(){
				uni.navigateTo({
					url:"/pages/my-add-path/my-add-path"
				})
			},
			gopayment(){
				uni.navigateTo({
					url:"../payment/payment"
				})
			},
			// 初始化地址列表获取数据
			_intiAddress(){
				$http.request({
					url:"/selectAddress",
					method:"POST",
					data:{
						token:this.token
					}
				}).then(res=>{
					this._initAddressList(res)
					console.log(res);
					
				}).catch(err=>{
					uni.redirectTo({
						title:"请求失败",
						icon:"error"
					})
				})
			}
		},
		computed:{
			...mapState({
				lists:state=>state.path.list,
				purchase:state=>state.cart.purchase,
				token:state=>state.user.token
			}),
			numm(){
				let num=0
				this.purchase.forEach(v=>{
					num=num+Number(v.oprice)
				})
				return num
			},
			count(){
				let num=0
				this.purchase.forEach(v=>{
					num=num+Number(v.num)
				})
				return num
			}
		},
		onLoad() {
			this._intiAddress()
		},
	}
</script>

<style scoped>
.order-map-path{
	position: relative;
	height: 120rpx;
	width: 100%;
}
.path-tetx{
	position: absolute;
	width: 300rpx;
	height: 60rpx;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	background-color: #49BDFB;
	color: #fff;
	border-radius: 40rpx;
	text-align: center;
	line-height: 60rpx;
}
.text-confirm{
	background-color: #FFFFFF;
}
.text-confirm-yf{
	width: 100%;
	display: flex;
	justify-content: space-between;
	height: 80rpx;
	align-items: center;
}
.text-confirm-yf view{
	margin: 0rpx 22rpx;
}
.text-confirm-ly{
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: 80rpx;
}
.text-confirm-ly-x{
	flex: 15%;
	text-align: center;
}
.text-confirm-ly-y{
	flex: 85%;
}
.text-confirm-zj{
	display: flex;
	justify-content: flex-end;
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
}
.text-confirm-zj-y{
	margin-right: 20rpx;
	color: #49BDFB;
}
.confirm-order{
	position: absolute;
	left:0;
	top:0;
	rigth:0;
	bottom:0;
	width:100%;
	height: 100%;
	
}
.order-map{
	padding:15rpx;
	background-color: #FFFFFF;
	line-height: 40rpx;
	 background-image: linear-gradient(to right,#a0f1ef,#fff); 
}
.map-title{
	display: flex;
	justify-content: space-between;
	margin-bottom: 20rpx;
}
.map-name{
	font-weight: bold;
}

.goods-list{
	margin-top:20rpx;
	background-color: #FFFFFF;
	padding:20rpx 0;
}
.goods-content{
	margin-top:4rpx;
	padding:10rpx 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #f6f3f8;
}
.goods-text{
	width:360rpx;
	padding:0 10rpx;
	font-size:26rpx;
}
.goods-img{
	width:160rpx;
	height:160rpx;
}
.goods-name{
	font-size:26rpx;
}
.goods-size{
	font-size:24rpx;
}
.order-foot{
	height: 100rpx;
	width:100%;
	position: fixed;
	bottom:0;
	left:0;
	background-color: #FFFFFF;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.total-price{
	padding:0 20rpx;
}
.confirm{
	color:#FFFFFF;
	background-color: #49BDFB;
	height: 100rpx;
	line-height: 100rpx;
	width: 200rpx;
	text-align: center;
}

</style>
