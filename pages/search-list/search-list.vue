<template>
	<view>
		<ShopList :keyword="keyword" ref="shoplist"></ShopList>
		
	</view>
</template>

<script>
	import ShopList from "../../components/common/Shoplist.vue"
	export default {
		data() {
			return {
				keyword:''
				
			}
		},
		methods: {
			
		},
		onLoad(e){
			this.keyword=e.key
			// #ifdef APP-PLUS  
			var webView = this.$mp.page.$getAppWebview();  
			webView.setTitleNViewSearchInputFocus(true) 
			webView.setTitleNViewSearchInputText(this.keyword)  
			// #endif
		},
		onNavigationBarSearchInputChanged(e) {
			this.keyword=e.text
		},
		components:{
			ShopList
		},
		onNavigationBarButtonTap(e){
			if(e.index==0){
				this.$refs.shoplist._getdata()
			}
		},
	}
</script>

<style>

</style>
