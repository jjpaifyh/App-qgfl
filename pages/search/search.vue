<template>
	<view class="search">
		<Lines :H="4"></Lines>
		<view class="search-item" v-if="searchData.length>0">
			<view class="search-title">
				<view>最近搜索</view>
				<view class="iconfont icon-iconset0213" @tap="clearHistory"></view>
			</view>
			
			<view >
				<view class="search-name f-color" v-for="(item,index) in searchData" :key="index">{{item}}</view>
			</view>	

		</view>
		<view v-else class="zshu f-color">
			暂无数据
		</view>
		<Lines></Lines>
		<view class="search-item">
			<view>
				<view>热门搜索</view>
			</view>
			
			<view>
				<view class="search-name f-color" v-for="(item,index) in searchData_tj" :key="index">{{item}}</view>
			</view>	
		</view>
	</view>
</template>

<script>
	import Lines from "../../components/common/Line.vue"
	export default {
		data() {
			return {
				keyword:'',
				// 搜索
				searchData:[],
				// 推荐
				searchData_tj:['飞机','杯子']
			}
		},
		methods: {
			// 防止搜索为空 ，与跳转
			search(){
				if(this.keyword===''){
					return uni.showToast({
						title:"关键词不能为空！",
						icon:"none"
					})
				}else{
					uni.navigateTo({
						url:`../search-list/search-list?key=${this.keyword}`
					})
				}
				// 关闭手机软键盘
				uni.hideKeyboard()
				this.addSearch(this.keyword)
			},
			// 记录最近搜索词
			addSearch(text){
				let idx=this.searchData.indexOf(text)
				if(idx<0){
					this.searchData.unshift(text)
				}else{
					this.searchData.splice(idx,1)
					this.searchData.unshift(text)
				}
				uni.setStorage({
					key:"searchData",
					// 序列化对象
					data:JSON.stringify(this.searchData)
				})
				
			},
			clearHistory(){
				uni.showModal({
					title:"重要提示",
					content:"确定要清楚搜索记录吗？亲",
					cancelText:"取消",
					confirmText:"确定",
					success:(res)=>{
						if(res.confirm){
							uni.removeStorage({
								key:"searchData"
							})
							this.searchData=''
						}
					}
				})
				
			}
			
		},
		components:{
			Lines
		},
		// 监听输入
		onNavigationBarSearchInputChanged(e) {
			this.keyword=e.text
		},
		// 点击搜索
		onNavigationBarButtonTap(e){
			if(e.index==0){
				this.search()
			}
		},
		// 监听软键盘搜索按钮
		onNavigationBarSearchInputConfirmed(){
			this.search()
		},
		onload() {
			uni.getStorage({
				key:"searchData",
				success:(res)=>{
					this.searchData=JSON.parse(res.data)
				}
			})
		}
	}
</script>

<style>
	.search-item{
		padding: 20rpx;
	}
	.search-title{
		display: flex;
		justify-content: space-between;
	}
	.search-name{
		display: inline-block;
		/* width:100rpx; */
		padding: 8rpx;
		height: 40rpx;
		border-radius: 20rpx;
		line-height: 40rpx;
		margin: 10rpx;
		padding: 10rpx,24rpx;
		background-color: #e1e1e1;
	}
	.zshu{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
	}

</style>
