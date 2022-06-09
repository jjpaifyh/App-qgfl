<template>
	<view class="shop-list">
		<view class="shop-title  f-color">
			<view class="shop-item" v-for="(item,index) in shopList.data" :key="index" @tap="changTab(index)">
				<view :class="shopList.currentIndex==index?'f-active-color':''">{{item.name}}</view>
				<view>
					<view :class="item.status==0&&shopList.currentIndex==index?'iconfont icon-shangjiantou up f-active-color':'iconfont icon-shangjiantou up'"></view>
					<view :class="item.status==1&&shopList.currentIndex==index?'iconfont icon-xiajiantou up f-active-color':'iconfont icon-xiajiantou up'"></view>
				</view>
			</view>
		</view>
		<Lines :H="4"></Lines>
		<CommodityList :data="datalist"></CommodityList>
	
	</view>
</template>

<script>
	import $http from "../../common/api/requset.js"
	import CommodityList from "../../components/common/CommodityList.vue"
	import Lines from "../../components/common/Line.vue"
	export default{
		data(){
			return{
				shopList:{
					currentIndex:0,
					data:[
						{name:"价格",status:0},
						{name:"折扣",status:0},
						{name:"品牌",status:0}
					]
				},
				datalist:[]
			}
		},
		components:{
			CommodityList,
			Lines
		},
		props:{
			keyword:String
		},
		mounted(){
			this._getdata()
		},
		computed:{
			goodsName(){
				return this.keyword
			},
			goodsorder(){
				return this.shopList.currentIndex==0?'pprice':this.shopList.currentIndex==1?'oprice':'discount'
			},
			orderName(){
				return this.shopList.data[this.shopList.currentIndex].status==0?'':'desc'
			}
		},
		methods:{
			changTab(index){
				let id=this.shopList.currentIndex
				if(id==index){
					this.shopList.data[index].status=this.shopList.data[index].status==0?1:0
				}else{
					for(let i=0;i<this.shopList.data.length;i++){
						this.shopList.data[i].status=0
					}
				}	
				this.shopList.currentIndex=index
				this._getdata()
				
			},
			_getdata(){
				let goodsName=this.goodsName
				let goodsorder=this.goodsorder
				let orderName=this.orderName
				$http.request({
					url:`/goods/search?name=${goodsName}&ordername=${goodsorder}&orderName=${orderName}`
				}).then((res)=>{
					this.datalist=res
				}).catch(()=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
			}
		},
		
	}
</script>

<style scoped>
	.shop-item{
		display: flex;
		align-items: center;
		flex: 1;
		justify-content: center;
		line-height:18rpx ;
	}
	.shop-list{
		width: 100%;
		height: 50rpx;
		font-size: 30rpx;
	}
	.shop-title{
		display: flex;
		margin-bottom: 10rpx;
	}
</style>