<template>
	<view class="index">
		<scroll-view scroll-x="true" class="scroll-index" :scroll-into-view="indexscrollinto">
			<view :id="'top'+index" class="scroll-item " v-for="(item ,index) in topbar" :key="index" @tap="clike_tap(index)">
				<text :class="istf==index?'f-active-color':''">{{item.name}}</text>
			</view>
		</scroll-view>

		<swiper @change="onChangTab" :current="istf" :style="'height:'+clentHeight+'px;'">
			<swiper-item v-for="(item,index) in newTopBar" :key="index" class="home-data">	
				<scroll-view @scrolltolower="loadMore(index)" scroll-y="true" :style="'height:'+clentHeight+'px;'" class="a">
					<block v-for="(k,i) in item.data" :key="i">
						
						<!-- 推荐 -->
						<index-swiper v-if="k.type==='swiperList'" :dataList='k.data'></index-swiper>
						
						<template v-if="k.type==='recommendList'" >
							<Recommend :recommendList="k.data"></Recommend>
							<Card cardTitle="猜你喜欢"></Card>
						</template>
	
						<!-- 运动户外 -->
						<Banner v-if="k.type==='bannerList'" :data="k.imgUrl"></Banner>
						
						<template v-if="k.type==='iconsList'">
							<Icons :datalist="k.data"></Icons>
							<Card cardTitle="热销爆品"></Card>
						</template>

						<template v-if="k.type==='Hot'">
							<Hot :datalist="k.data"></Hot>
							<Card cardTitle="超级推荐"></Card>
						</template>
						
						<template v-if="k.type==='shopList'">
							<Shop :datalist="k.data"></Shop>
							<Card cardTitle="为您推荐"></Card>
						</template>
						<!-- 推荐更多商品 公共部分 -->
						<CommodityList v-if="k.type=='commodityList'" :data="k.data"></CommodityList>			
					</block>
					<view class="edd f-color">
						{{item.loadText}}
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>	
			<Tabbar cureentPage="index"></Tabbar>
	</view>
</template>

<script>
	import Tabbar from "@/components/common/Tabbar.vue"
	import $http from "../../common/api/requset.js"
	
	import IndexSwiper from "../../components/index/indexSwiper.vue"
	import Recommend from "../../components/index/Recommend.vue"
	import Card from "../../components/common/Card.vue"
	import CommodityList from "./@/components/common/CommodityList.vue"
	
	import Banner from "../../components/index/Banner.vue"
	import Icons from "../../components/index/Icons.vue"
	import Hot from "../../components/index/Hot.vue"
	import Shop from "./@/components/index/Shop.vue"
	import Search from "../search/search.vue"
	export default {
		data() {
			return {
				istf:0,
				indexscrollinto:'top0',
				clentHeight:0,
				topbar:[],
				title: 'Hello',
				// 承载数据
				newTopBar:[]
			}
		},
		onLoad() {
			this._index()
		},
		methods: {
			_index(){
				$http.request({
					url:"/index_list/data"
				}).then((res)=>{
					this.topbar=res.topbar
					this.newTopBar=this.initDate(res)
					this.newTopBar[this.istf].load='no'
				}).catch(()=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				});
			},
			loadMore(){
				this.newTopBar[this.istf].loadText="正在加载..."
				this.addData(()=>{
					this.newTopBar[this.istf].loadText="下拉加载^-^"
				})
			},

			clike_tap(index){
				if(index==this.istf)return
				this.istf=index
				this.indexscrollinto='top'+index
				
				if( this.newTopBar[this.istf].load==='first'){
					this.addData()
				}
				
			},
			onChangTab(e){
				this.clike_tap(e.detail.current)
				this.istf=e.detail.current
			},
			// 获取数据
			initDate(res){
				let arr=[]
				for(let i=0;i<this.topbar.length;i++){
					let obj={
						data:[],
						load:'first',
						loadText:"上拉加载更多....",
						// count:'2'
					}
					if(i==0){
						obj.data=res.data
					}
					arr.push(obj)
				}
				return arr
			},
			//获取可视区域高度【兼容】
			getClientHeight(){
				const res = uni.getSystemInfoSync();
				const system = res.platform;
				if( system ==='ios' ){
					return 44+res.statusBarHeight;
				}else if( system==='android' ){
					return 48+res.statusBarHeight;
				}else{
					return 0;
				}
				
			},
			
		
			// 对应显示不同数据
			addData(callback){
				let index=this.istf
				let id =this.topbar[index].id
				let count=(Math.ceil(this.newTopBar[index].data.length/5)+1);
				$http.request({
					url:`/index_list/${id}/data/${count}`
				}).then((res)=>{
					this.newTopBar[index].data=[...this.newTopBar[index].data,...res]
					 this.newTopBar[this.istf].load='no'
				}).catch(()=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
				console.log(`http://192.168.236.1:3000/api/index_list/${id}/data/${count}`);
				if(typeof callback === 'function'){
					callback()
				}
			}
		},
		components:{
			IndexSwiper,
			Recommend,
			Card,
			CommodityList,
			Banner,
			Icons,
			Hot,
			Shop,
			Search,
			Tabbar
		},
		// 生命周期，渲染完成
		onReady(){
			uni.getSystemInfo({
				success:(res)=>{
					this.clentHeight=res.windowHeight- uni.upx2px(180)
				}
			})
		},
		onNavigationBarButtonTap(e){
			if(e.index==0){
				// 跳转
				uni.navigateTo({
					url:"../search/search"
				})
			}
		}
	}
</script>

<style>
	.index{
		position: relative;
	}
	.scroll-index{
		width: 100%;
		height: 80rpx;
		white-space: nowrap;
		background-color: #fff;
	}
	.scroll-item{
		padding: 10rpx 30rpx;
		display: inline-block;
		font-size: 36rpx;
	}
	.f-active-color{
		padding: 10rpx 0;
		border-bottom: 4rpx solid #49bdfb;
	}
	.edd{
		border-top: 2rpx solid #636263;
		
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
	}
</style>
