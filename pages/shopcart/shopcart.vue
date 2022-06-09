<template>
	<view v-if="lists.length>0">
		<view class="">
			<uniNavBar 
			title="购物车"
			:right-text="isNavBar?'完成':'编辑'"
			:status-bar='istop'
			@clickRight="click"
			></uniNavBar>
			<!-- 商品类容 -->
			<view class="shop-list">
				<view class="shop-item" v-for="(item,index) in lists" :key="index">
					<label class="radio" @tap="checked(index)" >
						<radio value="" color="#ff3333" :checked="item.checked"/><text></text>
					</label>
					<image class="shop-img" :src="item.imgUrl" mode=""></image>
					<view class="shop-text">
						<view class="shop-name">{{item.name}}</view>
						<view class="shop-color f-color">{{item.color}}</view>
						<view class="shop-price">
							<view >￥{{item.pprice}}</view>
							<view  v-if="!isNavBar">
								<view class="item-fq">*{{item.num}}</view>
							</view>
							<view class="" v-else>
								<uniBerbox
								:value="item.num"
								:min="1"
								@change="changenum($event,index)"
								></uniBerbox>
							</view>
							
							
							
						</view>
					</view>
				</view>
			</view>
			<!-- 底部 -->
			<view class="shop-foot" style="bottom: 90rpx;">
				<label class="radio radio_q" @tap="checkedAllFn">
					<radio value="" color="#ff3333" :checked="checkedAll"/>全选<text></text>
				</label>
				<view class="qiehuan" v-if="!isNavBar">
					<view class="shop-get">
						<view class="hj">合计：</view>
						<view class="count">￥{{totbs.pprice}}</view>
						<view class="mai" @tap="gogogo">结算({{totbs.num}})</view>
					</view>
				</view>
				<view class="box-show" v-else>
					<view class="box-show-add">添加收藏夹</view>
					<view class="box-show-sc" @tap="clicksc">删除</view>
				</view>
				
			</view>
		</view>
		<Tabbar cureentPage="shopcart"></Tabbar>
	</view>
	<view class="kong" v-else>
		<uniNavBar
		title="购物车"
		:status-bar='istop'
		></uniNavBar>
		<view class="img-box_kk">
			<image  src="../../static/img/gouwuche.png" alt="">
			<view class="gouwu_text f-color">
				囧！空空如也~~
			</view>
		</view>
		<Tabbar cureentPage="shopcart"></Tabbar>
	</view>
	

</template>

<script>
	import $http from "@/common/api/requset.js"
	
	import Tabbar from "@/components/common/Tabbar.vue"
	import uniBerbox from "../../components/uni/uni-number-box/uni-number-box.vue"
	import uniNavBar from "@/components/uni/uni-nav-bar/uni-nav-bar.vue"
	import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
	export default{
		data(){
			return{
				isNavBar:false,
				// #ifndef MP
				istop:true,
				isbutt:true
				// #endif
				
			}
		},
		methods:{
			_initlist(){
				$http.request({
					url:"/goodscart",
					method:"POST",
					data:{
						phone:this.userInfo.phone
					},
				}).then(res=>{
					
					console.log(res);
					
				}).catch(err=>{
					uni.redirectTo({
						title:"请求失败",
						icon:"error"
					})
				})
			},
			click(){
				this.unCheckAll()
				this.isNavBar=!this.isNavBar
				
			},
			...mapActions(['checkedAllFn']),
			...mapMutations(["checked",'clicksc',"unCheckAll","goche"]),
			 
			changenum(value,id){
				this.lists[id].num=value
				console.log(value);
			},
			gogogo(){
				if(this.selectedList.length>0){
					this.goche()
					uni.navigateTo({
						url:"../confirm-order/confirm-order"
					})
				}else{
					uni.showToast({
						title:"请选择商品",
						icon:"none"
					})
				}

				
			}
		},
		components:{
			uniNavBar,
			uniBerbox,
			Tabbar
		},
		computed:{
			...mapState({
				lists:state=>state.cart.list,
				userInfo:state=>state.user.userInfo,
				selectedList:state=>state.cart.selectedList
			}),
			...mapGetters(['checkedAll',"totbs"])
		},
		onLoad(){
			// #ifdef MP
			this.istop = false
			// #endif
			
			// #ifdef APP-PLUS
			this.isbutt=false
			// #endif
		},
		onShow() {
			// this._initlist()

		}
	}
</script>

<style scoped>
	.shop-item{
		display: flex;
		padding: 20rpx;
		align-items: center;
		background-color: #f7f7f7;
		margin-bottom: 10rpx;
	}
	.shop-img{
		width: 200rpx;
		height: 200rpx;
	}
	.shop-color{
		
	}
	.shop-price{
		height: 60rpx;
		display: flex;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		justify-content: space-between;
	}
	.shop-text{
		flex: 1;
		padding-left: 20rpx;
	}
	.shop-foot{
		display: flex;
		position: fixed;
		/* 判断 */
		/* bottom: 90rpx; */
		left: 0%;
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid #e3e3e3;
	}
	.shop-get{
		display: flex;
		width: 200px;
		background-color: #fff;
		height: 100rpx;
		line-height: 100rpx;
		/* align-items: center; */
		justify-content: flex-end; 
	}
	.hj{
		width: 30%;
		background-color: #fff;
	}
	.count{
		width: 30%;
		background-color: #fff;
		color: #5eccff;
		margin-right: 10rpx;
	}
	.mai{
		width: 50%;
		background-color: #5eccff;
		padding-left: 10rpx;
		padding-right: 10rpx;
		align-items: center;
		text-align: center;
	}
	.img-box_kk{
		position: absolute;
		top: 30%;
		left: 28%;
		width: 360rpx;
		height:800rpx;
	}
	.img-box_kk image{
		width: 100% ;
	}
	.gouwu_text{
		text-align: center;
	}
	.radio_q{
		margin-left: 20rpx;
	}
	.box-show{
		display: flex;
		line-height: 100rpx;
		background-color: #fc0d0d;
		width: 60%;
		height: 100rpx;
		color: #fff;
	}
	.box-show-add{
		flex: 1;
		text-align: center;
		background-color: #393939;
	}
	.box-show-sc{
		flex: 1;
		text-align: center;
	}
	.item-fq{
		margin-right: 30rpx;
	}
</style>