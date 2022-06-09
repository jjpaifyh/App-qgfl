export default{
	state:{
		list:[
			// {
			// 	name:"小李子",
			// 	tel:'1200646156',
			// 	city:"北京海淀",
			// 	details:"2号楼",
			// 	isDefault:true
			// },
			// {
			// 	name:"小牛子",
			// 	tel:'1153046156',
			// 	city:"北京海淀",
			// 	details:"2号楼",
			// 	isDefault:false
			// }
		],
		userId:''
	},
	getters:{
		
	},
	mutations:{
		_initAddressList(state,list){
			state.list=list
			state.userId=list[0].userId
		}
		,
		createPath(state,obj){
			state.list.unshift(obj)
		},
		updataPath(state,{index,item}){
			for(let key in item){
				state.list[index][key]=item[key]
			}
		},
		romeisDefault(state){
			state.list.forEach(c=>{
				c.isDefault=false
			})
		},
		istfisDefault(state,index){
			state.list.forEach(v=>{
				v.isDefault=false
			})
			state.list[index].isDefault=true
		}
	},
	actions:{
		createPathFn({commit},obj){
			commit('createPath',obj)
		},
		updataPathFn({commit},obj){
			commit('updataPath',obj)
		},
		istfisDefault({commit},index){
			commit('istfisDefault',index)
		}
	}
}