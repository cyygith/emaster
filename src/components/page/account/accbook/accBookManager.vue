<template>
    <div id="itemManager-container">
        <div class="form-container">
            <el-form ref="form" :rules="rules" :model="form" label-width="100px">
            	            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="账本类型" prop="type">
                            <el-select v-model="form.type" placeholder="请选择" style="width:100%" size="small" :disabled="isDetail">
                                <el-option
                                    v-for="it in typeArr"
                                    :key="it.value"
                                    :label="it.label"
                                    :value="it.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>	
                    <el-col :span="12">
                        <el-form-item label="金额" prop="money">
                            <el-input v-model="form.money" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
            		<el-col :span="12">
                        <el-form-item label="记账时间" prop="time">
			                <el-date-picker v-model="form.time" value-format="yyyy-MM-DD" type="date" placeholder="选择日期" size="small" :disabled="isDetail"></el-date-picker>
			            </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注" prop="mark">
                            <el-input v-model="form.mark" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="类别" prop="category">
                            <el-select v-model="form.category" placeholder="请选择" style="width:100%" size="small" :disabled="isDetail">
                                <el-option
                                    v-for="it in categoryArr"
                                    :key="it.value"
                                    :label="it.label"
                                    :value="it.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            </el-form>
        </div>
        
        <div class="button-container">
            <el-row justify="center">
                <el-col :span="2" :offset="5">
                    <el-button type="primary" icon="el-icon-s-order" @click="saveOrUpdate" v-if="!isDetail">保存</el-button>
                </el-col>
                <el-col :span="2" :offset="2">
                    <el-button type="primary" icon="el-icon-delete-solid" @click="resetForm" v-if="!isDetail">重置</el-button>
                </el-col>
                <el-col :span="2" :offset="!isDetail?2:9">
                    <el-button type="primary" icon="el-icon-circle-close" @click="close">关闭</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import {accountApi} from "@/service/account-api";
export default {
    data(){
        return {
            form:{
            	id:'',
            	type:'',
            	money:'',
            	time:'',
            	mark:'',
            	category:'',
            	createTime:'',
                updateTime:'',
                userId:''
            },
            type:'detail',//处理类型，新增add、修改update、查看详情detail
            typeArr:[{label:'收入',value:'0'},{label:'支出',value:'1'}],
            categoryArr:[{label:'生活',value:'001'},{label:'出行',value:'002'},{label:'水果',value:'003'}],
            isDetail:false,
            rules: {//校验表单
            	type:[{required:true,message:'账本类型不能为空',trigger: 'blur'}],
            	money:[{required:true,message:'金额不能为空',trigger: 'blur'}],
            	time:[{required:true,message:'记账时间不能为空',trigger: 'blur'}],
            	mark:[{required:true,message:'备注不能为空',trigger: 'blur'}],
            	category:[{required:true,message:'类别不能为空',trigger: 'blur'}],
            }
        }
    },
    props:{
    	checkrow:{
    		default: ()=>{
    			return '';
    		}
    	}
    },
    components:{
    
    },
    mounted(){
 		this.queryById();
    },
    methods:{
        //重置
        resetForm() {
            this.$refs["form"].resetFields();
        },
        //关闭
        close() {
            this.$emit('closechild');
        },
        //根据ID查询记录
        queryById(){
            this.type= this.checkrow.type;
            let selObj = this.checkrow.selArr;
            if(this.type == 'detail'){
                this.isDetail = true;
            }

            if(this.type=='update'||this.type=='detail'){
                let id = selObj.id;
                let param = new URLSearchParams();
                param.append("id",id);
                
                //let param = {
                //    id:id
                //};
                accountApi.detail(param).then((res)=>{
                    if(res.code == "0"){
                        this.form = res.data;
                    }else{
                        this.$alert('获取信息失败，请联系管理员处理','提示信息');
                    }
                });
            }
            
        },

        //新增或者更新
        saveOrUpdate() {
        this.$refs['form'].validate((valid) =>{
                if(valid){
                    let user = JSON.parse(sessionStorage.getItem('user'));
                    this.form.userId = user.userId;
		        	let param = this.form;
		            let loading = this.$loading({lock:true,text:'保存中....',background:'rgba(0,0,0,0.5)'});
		            let url = '';
		            if(this.type == 'update'){
		                accountApi.update(param).then((res)=>{
			    			if(res.code == "0"){
			        			this.$alert('更新成功','提示信息',{
			        				confirmButtonText:'确定',
			        				callback: action => {
			        					this.$emit('closechild');
			        				}
			        			})
			        		}else{
			        			this.$alert('提交失败，请联系管理员处理','提示信息');
			        		}
			        		loading.close();
			        	});	
		            }else{
		                accountApi.save(param).then((res)=>{
			    			if(res.code == "0"){
			        			this.$alert('保存成功','提示信息',{
			        				confirmButtonText:'确定',
			        				callback: action => {
			        					this.$emit('closechild');
			        				}
			        			})
			        		}else{
			        			this.$alert('提交失败，请联系管理员处理','提示信息');
			        		}
			        		loading.close();
			        	});	
		            }
		        }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
@import 'src/components/page/style/normal'; 
</style>