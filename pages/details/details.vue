<template>
	<view class="details">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in 5" :key="index">
				<view class="swiper-item">
					<image class="swiper-img" :src="goodsContent.imgUrl" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 价格与名称 -->
		<view class="details-goods">
			<view class="goods-pprice">￥{{goodsContent.oprice}}</view>
			<view class="goods-oprice">￥{{goodsContent.pprice}}</view>
			<view class="goods-name">{{goodsContent.name}}</view>
		</view>
		<!-- s商品详情图 -->
		<view class="aa">
			<view class="bb">
				<image class="details-img" src="../../static/img/detail1.jpg" mode=""></image>
			</view>
			<view class="bb">
				<image class="details-img" src="../../static/img/detail2.jpg" mode=""></image>
			</view>
			<view class="bb">
				<image class="details-img" src="../../static/img/detail3.jpg" mode=""></image>
			</view>
			<view class="bb">
				<image class="details-img" src="../../static/img/detail4.jpg" mode=""></image>
			</view>
			<view class="bb">
				<image class="details-img" src="../../static/img/detail5.jpg" mode=""></image>
			</view>
		</view>
		<Card cardTitle="看了又看"></Card>
		<CommodityList :data="commodiyuList"></CommodityList>
		<!--底部-->
		<view class='details-foot'>
			<view class="iconss">
				<view class='iconfont icon-xiaoxi'></view>
				<view class='iconfont icon-gouwuche' @tap="goShopCart"></view>
			</view>
			<view class='add-shopcart' @tap="showPop">加入购物车</view>
			<view class='purchase' @tap="showPop_is">立即购买</view>
		</view>
		
		<!-- 弹出层 -->
		<!-- @touchmove.stop.prevent="" 防止弹出还可以滑动 -->
		<view class="pop" v-show="istf" @touchmove.stop.prevent="">
			<!-- 蒙层 -->
			<view class="pop-mask" @tap="shows">
				
			</view>
			<view class="pop-box" :animation="animationData"> 
			<view class="img-box">
				<image class="pop-img" :src="goodsContent.imgUrl" mode=""></image>
			</view>
			<Lines></Lines>
			<view class="color-box" >
				<view class="color-item" v-for="(item,index) in color" :key="index" @tap="click_color(index)" :style="iscolor==index?'background-color: #49BDFB;':''">{{item.name}}</view>
			</view>
			<Lines></Lines>
			<view class="pop-num">
				<view>购买数量</view>
				<UniNumberBox
				:value="num"
				@change="changeNumber"
				></UniNumberBox>
			</view>
			<view class="pop-sub" @tap="addCart">确定</view>
			
				
			</view>
		</view>
	</view>
</template>

<script>
	// import wx from '@/common/wx/wx.js';
	
	import $http from "../../common/api/requset.js"
	import UniNumberBox from "../../components/uni/uni-number-box/uni-number-box.vue"
	import Card from "@/components/common/Card.vue"
	import CommodityList from '../../components/common/CommodityList.vue'
	import Lines from "../../components/common/Line.vue"
	import {mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
				isM:false,
				num:1,
				iscolor:0,
				color:[
					{
						id:0,
						name:"小码"
					},
					{
						id:1,
						name:"大码"
					}
				],
				commodiyuList:[
					{
						id:1,
						imgUrl:"../../static/img/commodity1.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:2,
						imgUrl:"../../static/img/commodity2.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:3,
						imgUrl:"../../static/img/commodity3.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					},
					{
						id:4,
						imgUrl:"../../static/img/commodity4.jpg",
						name:"好看的衣服，美丽的人生，爆款8456",
						pprice:"299",
						oprice:"659",
						discount:"5.6"
					}
				],
			istf:false,
			animationData:{},
			goodsContent:{},
			id:0
			}
			
		},
		computed:{
			...mapState({
				token:state=>state.user.token
			})
		},
		methods: {
			click_color(index){
				this.iscolor=index
			},
			_index(e){
				this.id=e.id
				$http.request({
					url:`/goods/id?id=${e.id}`
				}).then((res)=>{
					this.goodsContent=res[0]
					console.log(this.goodsContent);
				}).catch(()=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				});
			},
			// 动画收
			shows(){
				var animation=uni.createAnimation({
					duration:500,
					timingFunction:"ease"
				})
				animation.translateY(600).step()
				this.animationData=animation.export()
				setTimeout(()=>{
					this.istf=false
					animation.translateY(0).step()
				},200)
				this.isM=false
			},
			// 动画chu
			showPop(){
				var animation = uni.createAnimation({
				   duration: 200
				})
				animation.translateY(600).step();
				this.animationData = animation.export();
				
				setTimeout(()=>{
					this.istf=true
					animation.translateY(0).step();
					this.animationData = animation.export();
				},200)
			},
			showPop_is(){
				this.isM=true
				this.showPop()
			},
			changeNumber(value){
				this.num=value
			},
			// 跳购物车
			goShopCart(){
	// 			$http.request({
	// 				url:"/ceshi",
	// 				header:{
	
	// 					token:true
	// 				}
	// 			}).then(res=>{
	// 				console.log(res);
	// 			}).catch(()=>{
					
	// 			})
				//假token 
				if(this.token){
					uni.navigateTo({
						url:"../shopcart/shopcart"
					})
				}else{
					uni.navigateTo({
						url:'../login/login'
					})
				}

			},
			// 添加了token验证
			// 添加入购物车
			addCart(){
				if(this.token){
					let goods=this.goodsContent
					this.goodsContent['checked']=false
					this.goodsContent['num']=this.num
					this.goodsContent['color']='型号:'+this.color[this.iscolor].name
					this.addShopCart(goods)
					if(this.isM!=true){

						this.shows()
						uni.showToast({
							title:"添加成功",
							icon:"success"
						})
					}else{
						
						uni.navigateTo({
							url:"../shopcart/shopcart"
						})
					}
				}else{
					uni.navigateTo({
						url:'../login/login'
					})
				}

			},
			...mapMutations(['addShopCart'])
		},
		components:{
			Card,
			CommodityList,
			UniNumberBox,
			Lines
		},
		// x修改返回的默认行为
		// 监听返回键
		onBackPress(){
			if(this.istf){
				this.shows()
				return
			}
		},
		onLoad(e) {
			this._index(e)
		},
		// 监控上方按键  分享
		onNavigationBarButtonTap(e){
			
			if(e.index==1){
				uni.share({
					"provider":"qq",
					"type":0,
					"scene":"WXSceneSession",
					"title":this.goodsContent.name,
					"href":`http://192.168.236.1:8080/#/pages/details/details?id=${this.id}`,
					imageUrl:this.goodsContent.imgUrl,
					success:function(res){
						uni.showTabBar({
							title:"分享成功！"
						})
					},
					fail:function(){
						console.log("fail:" + JSON.stringify(err));
					}
				})
			}
		},
		
	}
</script>

<style scoped>
.details{
	padding-bottom: 90rpx;
}
swiper{
	width: 100%;
	height: 700rpx;
}
.swiper-img{
	width: 100%;
	height: 700rpx;
}
.details-goods{
	text-align: center;
	font-weight: 700;
	font-size: 36rpx;
	padding: 10rxp 0;
}
.details-img{
	display: inline-block;
	 width: 100%;
}
.details-foot{
	position: fixed;
	left:0;
	bottom: 0;
	width:100%;
	height: 90rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #FFFFFF;
}
.add-shopcart{
	
	height: 90rpx;
	background-color: #000000;
	text-align: center;
	color:#FFFFFF;
	line-height: 90rpx;
	flex: 30%;
	
}
.purchase{

	height: 90rpx;
	background-color: #49BDFB;
	color:#FFFFFF;
	text-align: center;
	line-height: 90rpx;

	flex: 30%;
}
.iconss{
	display: flex;
	flex: 40%;
}
.iconss view{
	flex: 1;
	text-align: center;
	line-height: 90rpx;
	width: 60rpx;
	height: 90rpx;
	font-size: 25px;
}
.pop{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 9999;
}
.pop-mask{
	position: absolute;
	left: 0%;
	top: 0%;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
}
.pop-box{
	position: absolute;
	left: 0%;
	bottom: 0%;
	width: 100%;
	height: 50%;
	background-color:#FFFFFF;
}
.pop-img{
	position: absolute;
	top: -20%;
	left: 5%;
	width: 260rpx;
	height: 260rpx;
}

.pop-sub{
	position: absolute;
	bottom: 0;
	left: 0%;
	right: 0;
	height: 80rpx;
	line-height: 80rpx;
	/* border-color: #49BDFB; */
	background-color: #49BDFB;
	/* color: #ffffff; */
	text-align: center;
}
.pop-num{
	padding: 20rpx;
	display: flex;
	justify-content: space-between;
}
.img-box{
	margin-bottom: 100px;
}
.color-box{
	display: flex;
	height: 80rpx;
	width: 100%;
	align-items: center;
}
.color-item{
	width: 100rpx;
	height: 50rpx;
	border-radius: 40rpx;
	background-color: #fff;
	text-align: center;
	line-height: 50rpx;
	margin-left: 30rpx;
	border: 1px solid #000000;
}
</style>
