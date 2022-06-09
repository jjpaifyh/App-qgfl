<template>
	<view>
		<view class="login-user">
			<text class="n">验证码:</text>
			<input type="text" focus="true" v-model="useryzm" value="" placeholder="请输入验证码">
			<button plain="true" :disabled="isTf" class="yzm" @tap="login_fs">{{cpdeMsg}}</button>
		</view>
		<view class='tel' @tap="submit">下一步</view>
		<view class="xy">
			<view class="x">继续注册表示您阅读并同意</view>
			<view class="y">《千古风流网(含App)服务协议》</view>
		</view>
		<view class="xy">
			开发者暂无设置sdk,验证码为4986
		</view>
	</view>
</template>

<script>
	import { mapState,mapMutations } from "vuex"
	import $http from "@/common/api/requset.js"
	export default {
		data() {
			return {
				// 用户输入验证吗
				useryzm:'',
				cpdeNum:60,
				cpdeMsg:'',
				isTf:false,
				phone:'',
				code:''
				
			}
		},
		methods: {
			...mapMutations(['login']),
			// 点击下一步
			submit(){
				if(this.code==this.useryzm){
					$http.request({
						url:'/addUser',
						method:"POST",
						data:{
							userName:this.phone,
							code:this.useryzm
						}
					}).then(res=>{
						console.log(res.date);
						if(res.success){
							uni.showToast({
								title:res.msg,
								icon:"success"
							})
							uni.redirectTo({
								url:"../index/index"
							})
							
							this.login(res.date)


						}
					}).catch(()=>{
						uni.showToast({
							title:"请求失败"
						})
					})
					
					
				}else{
					uni.showToast({
						title:"验证码错误",
						icon:"error"
					})
				}
				setTimeout(()=>{
					uni.hideLoading();
				},2000)
			},
			// 倒计时
			sendCode(){
				this.isTf=true
				let timr=setInterval(()=>{
					--this.cpdeNum
					this.cpdeMsg="重新发送("+this.cpdeNum+")"
				},1000)
				
				setTimeout(()=>{
					clearInterval(timr)
					this.cpdeNum=60
					this.isTf=false
					this.cpdeMsg="重新发送"
				},60000)
			},
			// 点击发送
			login_fs(){
				this.cpdeMsg="重新发送("+this.cpdeNum+")"
				this.sendCode()
			},
			// 请求验证码
			qcode(){
				$http.request({
					url:"/code",
					method:"POST",
					data:{
						userName:this.phone
					}
				}).then((res)=>{
					this.code=res.code
					console.log(this.code);
				}).catch(()=>{
				
						
				})
				setTimeout(()=>{
					uni.hideLoading();
					
				},1000)
			}
		},
		onReady() {
			this.cpdeMsg="重新发送("+this.cpdeNum+")"
			this.sendCode()
		},
		onLoad(e) {
			this.phone=e.phone
			this.qcode()

		},
		computed:{

		}
	}
</script>

<style scoped>
.yzm{
	width: 200rpx;
	height: 60rpx;
	line-height: 60rpx;
	border-radius: 50rpx;
	border: 2rpx solid #49BDFB;
	text-align: center;
	font-size: 24rpx;
}
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
