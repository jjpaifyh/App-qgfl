export default{
	state:{
		// 购物车数据
		list:[],
		// 购物车选中数据id
		selectedList:[],
		// 去支付列表数据
		purchase:[],
		// 全部列表
		cartlist:[
					{
						name:"全部",
						totalPrice:"598",
						istf:1,
						list:[
							{
								status:"待付款",
								putin:"支付",
								goodsitem:[]
							},
							{
								status:"已支付",
								putin:"完成",
								goodsitem:[]
							},
							{
								status:"待收货",
								putin:"完成",
								goodsitem:[]
							},
							{
								status:"待评论",
								putin:"完成",
								goodsitem:[]
							}
						]
					},
					
					{
						name:"待支付",
						totalPrice:"598",
						istf:0,
						list:[
							{
								status:"待支付",
								putin:"支付",
								goodsitem:[]
							}
						]
						},
					{
						name:"已支付",
						totalPrice:"598",
						istf:0,
						list:[
						
							{
								status:"已支付",
								putin:"完成",
								goodsitem:[]
							}]
						},
					{
						name:"待收货",
						totalPrice:"598",
						istf:0,
						list:[
						
							{
								status:"待收货",
								putin:"完成",
								goodsitem:[]
							}]
						},
					{
						name:"待评论",
						totalPrice:"598",
						istf:0,
						list:[
						
							{
								status:"待评论",
								putin:"完成",
								goodsitem:[]
							}]
					},
				]
	},
	getters:{
		checkedAll(state){
			return state.list.length===state.selectedList.length
		},
		totbs(state){
			let total = {
					pprice:0,
					num:0
				}
				state.list.forEach(v=>{
					//是否选中
					if(state.selectedList.indexOf(v.id) > -1){
						//合计
						total.pprice += v.pprice*v.num;
						//结算数量
						total.num = state.selectedList.length;
					}
				})
				return total;
			}
	},
	mutations:{
		// 清空待支付商品
		reomdzf(state){
			state.cartlist[0].list[0].goodsitem=[]
			state.cartlist[1].list[0].goodsitem=[]
		},
		
		// 添加待支付商品
		goawaits(state){
			state.cartlist[0].list[0].goodsitem=[...state.cartlist[0].list[0].goodsitem,...state.purchase]
			
			state.cartlist[1].list[0].goodsitem=[...state.cartlist[1].list[0].goodsitem,...state.purchase]
			
			let list=[]
			state.purchase.forEach(v=>{
				list.push(v.id)
			})
			
			
			state.list=state.list.filter(v=>{
				return list.indexOf(v.id)==-1
			})
			state.selectedList=[]
		},
		// 支付成功清空购买商品
		rormv(state){
			let list=[]
			state.purchase.forEach(v=>{
				list.push(v.id)
			})
			
			
			state.list=state.list.filter(v=>{
				return list.indexOf(v.id)==-1
			})
			state.selectedList=[]
		},
		
		gocompletion(state){
			state.cartlist[0].list[1].goodsitem=[...state.cartlist[0].list[1].goodsitem,...state.purchase]
			
			state.cartlist[2].list[0].goodsitem=[...state.cartlist[2].list[0].goodsitem ,...state.purchase]
		},
		
		// 去支付
		goche(state){
			let listgo=[]
			state.list.forEach(v=>{
				if(state.selectedList.indexOf(v.id)!=-1){
					listgo.push(v)
				}
			})
			state.purchase=listgo
			console.log(state.purchase);
		}
		,
		// 全选
		checkAll(state){
			state.selectedList=[]
			state.list.forEach(v=>{
				v.checked=true,
				state.selectedList.push(v.id)
			})
			console.log(state.selectedList);
			console.log(state.list);
		},
		//全不选
		unCheckAll(state){
			console.log(state.list);
			state.list.forEach(v=>{
				v.checked=false
			})
			state.selectedList=[]
		},
		checked(state,index){
			console.log('index:'+index);
			state.list[index].checked=!state.list[index].checked
			state.list[index].checked ? state.selectedList.push(state.list[index].id):state.selectedList.splice(state.selectedList.indexOf(state.list[index].id),1)
		},
		// 删除
		clicksc(state){
			uni.showModal({
				title:"温馨提示",
				content:"确定要删除商品吗？亲",
				cancelText:"取消",
				confirmText:"确定",
				success:(res)=>{
					console.log(state.selectedList);
					console.log(state.list);
					state.list=state.list.filter(v=>{
						return state.selectedList.indexOf(v.id)==-1
					})
					state.selectedList=[]
				}
			})
		},
		addShopCart(state,goods){
			console.log(goods);
			state.list.push(goods)
			// 选
			// state.selectedList.push(goods.id)
		}
	},
	actions:{
		checkedAllFn({commit,getters}){
			getters.checkedAll ? commit("unCheckAll") : commit("checkAll")
		},
		delGoodsFn({commit}){
			commit('clicksc')
		}

	}
}