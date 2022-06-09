<template>
	<view>
		<view class="login-user">
			<text class="n">手机号:</text>
			<input type="number" focus="true" v-model="userphon" value="" placeholder="6~15字符">
		</view>
		<view class='tel' @tap="submit">下一步</view>
		<view class="xy">
			<view class="x">继续注册表示您阅读并同意</view>
			<view class="y">《千古风流网(含App)服务协议》</view>
		</view>
	</view>
</template>

<script>
	import $http from "@/common/api/requset.js"
	export default {
		data() {
			return {
				userphon:'',
				rules:{
					userphon:{
						rule:/^1[3456789]\d{9}$/,
						msg:"手机号错误"
					}
				}
			}
		},
		methods: {
			// 点击登录
			submit(){
				if(!this.validate("userphon"))return
				

				$http.request({
					url:"/registered",
					method:"POST",
					data:{
						phone:this.userphon
					}
				}).then((res)=>{
					if(res.success){
						uni.navigateTo({
							url:`../login-code/login-code?phone=${this.userphon}`
						})
					}else{
						uni.showLoading({
							title:res.mag
						})
					}
					
				}).catch(()=>{

						
				})
				setTimeout(()=>{
					uni.hideLoading();
	
				},1000)
			},
			// 验证规则
			validate(key){
				var bool=true
				if(!this.rules[key].rule.test(this[key])){
					uni.showToast({
						title:this.rules[key].msg,
						icon:'error'
					})
					bool=false
					return false
				}
				return bool
			},
		}
	}
</script>

<style scoped>
.xy{
	display: flex;
	width: 100%;
	height: 100rpx;
	font-size: 25rpx;
	justify-content: center;
	margin-top: 30rpx;
}
.y{
	color: #49BDFB;
}
.login-user{
	font-size: 32rpx;
	padding: 10rpx 0;
	display: flex;
	align-items: center;
	border-bottom: 2rpx solid #e6e6e6;
	margin-top: 60rpx;
	height: 80rpx;
	margin-bottom: 30rpx;
	line-height: 80rpx;
	
}
.n{
	padding-right: 18rpx;
	margin-left: 50rpx;
	font-size: 35rpx;
	font-weight: 700;
}
.tel{
	width:80%;
	margin: auto;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	color:#FFFFFF;
	background-color: #49BDFB;
	border-radius: 40rpx;
}

</style>
