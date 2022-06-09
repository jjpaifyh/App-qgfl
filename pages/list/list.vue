<template>
	<view >
		<Lines :H='2'></Lines>
		<view class="list">
			<scroll-view scroll-y="true" class="list-left" :style="'height:'+clentHeight+'px;'">
				<view v-for="(item,index) in leftData" :key="index" class="list-item" @tap="click_item(index,item.id)">
					<view class="list-name" :style="ClickIndex==index?'background-color: #fff;border-left: 8rpx solid #49bdfb;':''">{{item.name}}</view>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="list-right" :style="'height:'+clentHeight+'px;'">
				<view class="right-list" v-for="(item,index) in rightData" :key="index">
					<view class="list-title" v-for="(item_2,index_2) in item" :key="index_2">
						<view class="name">
							{{item_2.name}}
						</view>
						<view class="right-content" >
							<view class="right-item" v-for="(item_3,index_3) in item_2.data" :key="index_3">
								<image :src="item_3.imgUrl" mode=""></image>
								<view class="name-item">{{item_3.name}}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>	
		<Tabbar cureentPage="list"></Tabbar>
	</view>
	
</template>

<script>
	import Tabbar from "@/components/common/Tabbar.vue"
	import $http from "@/common/api/requset.js"
	import Lines from "../../components/common/Line.vue"
	export default{
		data(){
			return{
				clentHeight:0,
				ClickIndex:0,
				leftData:[],
				rightData:[]
			}
		},
		methods:{
			click_item(index,id){
				this._index(id)
				this.ClickIndex=index
				console.log(this.rightData);
				
			},
			_index(id){
				if(id==(this.ClickIndex+1))return
				$http.request({
					url:"/goods/list"
				}).then((res)=>{
					// console.log(res);
					let leftData=[]
					let rightData=[]
					console.log(res);
					res.forEach(v=>{
						leftData.push({
							id:v.id,
							name:v.name
						})
						if(v.id===(this.ClickIndex+1)){
							rightData.push(v.data)
						}
					})
					this.rightData=rightData
					this.leftData=leftData
					console.log(this.rightData);
				}).catch(()=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				});
			},
		},
		components:{
			Lines,
			Tabbar
		},
		onNavigationBarSearchInputClicked(){
			uni.navigateTo({
				url:"../search/search"
			})
		},
		onReady(){
			uni.getSystemInfo({
				success:(res)=>{
					this.clentHeight=res.windowHeight
				}
			})
			console.log(this.clentHeight);
		},
		onLoad() {
			this._index()
		}
	}
</script>

<style scoped>
	.list{
		display: flex;
	}
	.list-left{
		width: 200rpx;
	}
	.list-right{
		flex: 1;
	}
	.list-item{
		border-bottom: 2rpx solid #ffffff;
		font-size: 28rpx;
		background-color: #f7f7f7;
	}
	.list-name{
		padding: 30rpx 6rpx;
		line-height: 46rpx;
		text-align: center;
		background-color: #efeff0;
	}
	.list-title{
		width: 100%;
	}
	.name{
		width: 100%;
		height: 53px;
		line-height: 106rpx;
		padding-left: 10rpx;
		font-weight: 700;
		
	}
	.right-item image{
		margin: 5rpx;
		width: 92px;
		height: 92px;
		display: flex;
		flex-direction: column;
		justify-content: center;

	}
	.right-content{
		display: flex;
		flex-wrap: wrap;
	}
	.name-item{
		margin: 5rpx;
		text-align: center;
	}
</style>