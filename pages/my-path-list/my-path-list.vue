<template>
	<view class="my-path-list">
		<view class="path-list" v-for="(item,index) in list" :key="index" @tap="toAddPath(index)">
			<view class="path-item"></view>
				<view class="item-main">
					<view>{{item.name}}</view>
					<view>{{item.tel}}</view>
				</view>
				<view class="item-main">
					<view class="active_" v-if="item.isDefault==1">默认</view>
					<view class="item_name">{{item.city}}-{{item.address}}</view>
				</view>
		</view>
		
		<view class="add-path">
			<view class="add-path-btn" @tap="goadd">新增地址</view>
		</view>
	</view>
</template>

<script>
	import $http from "@/common/api/requset.js"
	import {mapState,mapActions,mapMutations} from "vuex"
	export default {
		data() {
			return {
				TF:1
			}
		},
		methods: {
			...mapMutations(['_initAddressList'])
			,
			// 初始化，请求收货地址的接口
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
			},
			
			// 新增
			goadd(){
				uni.navigateTo({
					url:"../my-add-path/my-add-path",
				})
			},
			// 修改地址
			toAddPath(index){
				if(this.TF!=0){
					let pathObj=JSON.stringify({
						index:index,
						item:this.list[index]
					})
					uni.navigateTo({
						url:`../my-add-path/my-add-path?data=${pathObj}`,
					})
				}else{
					this.istfisDefault(index)
				}

			},
			...mapActions(['istfisDefault'])
		},
		computed:{
			...mapState({
				list:state=>state.path.list,
				token:state=>state.user.token
			})
		},
		onLoad(e){
			this.TF=e.tf
			console.log(e.tf);
			
			
		},
		onShow() {
			this._intiAddress()
		}
	}
</script>

<style scoped>
	.add-path{
		margin: 20rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		
	}
	.add-path-btn{
		border: 2rpx solid #49bdfb;
		color: #49bdfb;
		border-radius: 30rpx;
		padding: 6rpx 30rpx;
	}
	.path-list{
		padding-left: 20rpx;
		border-bottom: 2rpx solid #cccccc;
	}
	.path-item{
		padding: 8rpx;
		
	}
	.item-main{
		margin: 20rpx 0rpx;
		display: flex;
		align-items: center;
		
	}
	.active_{
		padding: 6rpx 6rpx;
		background-color: #49bdfb;
		color: #ffffff;
		border-radius:15rpx ;
	}
	.item_name{
		padding-left: 10rpx;
		/* 文字省略 */
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.item-main view{
		margin-left: 10rpx;
	}
</style>
