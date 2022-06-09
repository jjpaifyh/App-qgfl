<template>
	<view class="index">
		<Commodity :commodiyuList="datalist" :itenW="itenW" :bigH="bigH"></Commodity>
	</view>
</template>

<script>
	import Commodity from "../common/Commodity.vue"
	export default {
		data(){
			return{
				itenW:250,//375
				bigH:250
			}
		},
		props:{
			datalist:Array
		},
		components:{
			Commodity
		}
	}
</script>

<style>
</style>