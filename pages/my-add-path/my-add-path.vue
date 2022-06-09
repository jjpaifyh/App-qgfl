<template>
	<view class="my-add-path">
		<view class="path-item">
			<view class="">收件人：</view>
			<input type="text" value="" v-model="name" placeholder="输入收件人姓名">
		</view>
		<view class="path-item">
			<view class="">手机号：</view>
			<input type="text" value="" v-model="tel" placeholder="输入有效手机号">
		</view>
		<view class="path-item">
			<view class="">所在地区：</view>
			<view class="" @tap="add"> {{data}} </view>
		</view>
		<view class="path-item">
			<view class="">详细地址：</view>
			<input type="text" value="" v-model="address" placeholder="5~60个字符">
		</view>
		<view class="path-item">
			<view class="">设为默认地址</view>
			<label class="radio" @tap="istf">
				<radio value="" color="#ff3333" :checked="newOjb.isDefault"/><text></text>
			</label>
		</view>
		<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm">
		</mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from "../../components/uni/mpvue-citypicker/mpvueCityPicker.vue"
	import $http from "@/common/api/requset.js"
	import {mapState,mapMutations,mapActions} from "vuex"
	export default {
		data() {
			return {
				i:'',
				datapath:'',
				newOjb:{isDefault:false},
				name:"",
				tel:'',
				address:"",//详细地址
				// 是否修改
				isStartus:false
			}
		},
		methods: {
			...mapActions(['createPathFn','updataPathFn']),
			...mapMutations(['romeisDefault','_initAddressList']),
			showCityPicker(){
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e){
				this.datapath=e.label
				console.log(e);
			},
			add(){
				this.showCityPicker()
			},
			istf(){
				this.newOjb.isDefault=!this.newOjb.isDefault
			}
		},
		components:{
			mpvueCityPicker
		},
		computed:{
			data(){
				return this.datapath!=''?this.datapath:'请选择 >'
			},
			...mapState({
				list:state=>state.path.list,
				userId:state=>state.path.userId,
				userInfo:state=>state.user.userInfo
			})
		},
		onNavigationBarButtonTap(e) {
			// this.createPathFn()
			console.log(this.userId);
			if(e.float=="right" && this.name!='' && this.datapath!='' && this.tel!='' && this.address!=''){
				if(this.newOjb.isDefault){this.romeisDefault()}
				this.newOjb['city']=this.datapath
				this.newOjb['name']=this.name
				this.newOjb['tel']=this.tel
				this.newOjb['address']=this.address
				this.newOjb['userId']=this.userId
				this.newOjb['phone']=this.userInfo.phone
				console.log(this.userId);
				if(this.isStartus){
					$http.request({
						url:'/addpath',
						method:"POST",
						data:this.newOjb
					}).then((res)=>{
						location.reload()
					}).catch(()=>{
						
					})
					
					
					this.updataPathFn({
						index:this.i,
						item:this.newOjb
					})
					
					uni.navigateBack({})
				}else{
					// 修改
					console.log(this.newOjb);
					$http.request({
						url:'/addpath',
						method:"POST",
						data:this.newOjb
						
					}).then((res)=>{
						
					}).catch(()=>{
						
					})
					
					uni.navigateBack({})
				}

			}else{
				uni.showToast({
					title:"请完善信息",
					icon:'error'
				})
			}
			
			
		},
		onLoad(e){
			if(e.data){
				uni.setNavigationBarTitle({
					title:"修改地址"
				})
				this.isStartus=true
				let result =JSON.parse(e.data)
				this.i=result.index
				this.city=result.item.city
				this.name=result.item.name
				this.tel=result.item.tel
				this.address=result.item.address
				this.newOjb.isDefault=result.item.isDefault
			}else{
				
			}
			
		}
	}
</script>

<style scoped>
	.my-add-path{
		padding-left: 20rpx;
	}
	.path-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16rpx 0;
		width: 100%;
		border-bottom: 2rpx solid #cccccc;
	}
	.path-item input{
		flex: 1;
		text-align: left;
		padding-left: 10rpx;
	}
</style>
