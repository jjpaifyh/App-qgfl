<template>
	<view class="commodity-list">
		<Commodity :commodiyuList="data"></Commodity>
	</view>
</template>

<script>
	import Commodity from "./Commodity.vue"
	export default{
		data(){
			return{
			}
		},
		props:{
			data:Array
		},
		components:{
			Commodity
		}
	}
</script>

<style>
</style>