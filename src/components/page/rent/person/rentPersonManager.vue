<template>
    <div id="itemManager-container">
        <div class="form-container">
            <el-form ref="form" :rules="rules" :model="form" label-width="100px">
            	            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="租客编号" prop="personCode">
                            <el-input v-model="form.personCode" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
                    <el-col :span="12">
                        <el-form-item label="租客名称" prop="personName">
                            <el-input v-model="form.personName" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="身份证号码" prop="identCard">
                            <el-input v-model="form.identCard" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
                    <el-col :span="12">
                        <el-form-item label="身份证地址" prop="identAddr">
                            <el-input v-model="form.identAddr" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="电话" prop="tel">
                            <el-input v-model="form.tel" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
                    <el-col :span="12">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="form.email" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="紧急联系人" prop="emergencyPerson">
                            <el-input v-model="form.emergencyPerson" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
                    <el-col :span="12">
                        <el-form-item label="紧急联系人电话" prop="emergencyTel">
                            <el-input v-model="form.emergencyTel" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="性别" prop="gender">
                            <el-input v-model="form.gender" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
                    <el-col :span="12">
                    	<el-form-item label="状态" prop="status">
                            <el-select v-model="form.status" placeholder="请选择" style="width:100%" size="small" :disabled="isDetail">
                                <el-option
                                    v-for="it in statusArr"
                                    :key="it.value"
                                    :label="it.label"
                                    :value="it.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
            	</el-row>
            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="排序号" prop="orderNum">
                            <el-input v-model="form.orderNum" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
                    <el-col :span="12">
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="form.remark" size="small" :disabled="isDetail"></el-input>
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
import {personApi} from "@/service/rent-api";
export default {
    data(){
        return {
            form:{
            	id:'',
            	personCode:'',
            	personName:'',
            	identCard:'',
            	identAddr:'',
            	tel:'',
            	email:'',
            	emergencyPerson:'',
            	emergencyTel:'',
            	gender:'',
            	status:'',
            	orderNum:'',
            	remark:'',
            	createTime:'',
            	updateTime:'',
            },
            statusArr:[],
        	type:'detail',//处理类型，新增add、修改update、查看详情detail
            isDetail:false,
            rules: {//校验表单
            	personCode:[{required:true,message:'租客编号不能为空',trigger: 'blur'}],
            	personName:[{required:true,message:'租客名称不能为空',trigger: 'blur'}],
            	identCard:[{required:true,message:'身份证号码不能为空',trigger: 'blur'}],
            	identAddr:[{required:true,message:'身份证地址不能为空',trigger: 'blur'}],
            	tel:[{required:true,message:'电话不能为空',trigger: 'blur'}],
            	email:[{required:true,message:'邮箱不能为空',trigger: 'blur'}],
            	emergencyPerson:[{required:true,message:'紧急联系人不能为空',trigger: 'blur'}],
            	emergencyTel:[{required:true,message:'紧急联系人电话不能为空',trigger: 'blur'}],
            	gender:[{required:true,message:'性别不能为空',trigger: 'blur'}],
            	status:[{required:true,message:'状态不能为空',trigger: 'blur'}],
            	orderNum:[{required:true,message:'排序号不能为空',trigger: 'blur'}],
            	remark:[{required:true,message:'备注不能为空',trigger: 'blur'}],
            	createTime:[{required:true,message:'创建时间不能为空',trigger: 'blur'}],
            	updateTime:[{required:true,message:'更新时间不能为空',trigger: 'blur'}],
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
                let id = selObj.ID;
                let param = new URLSearchParams();
                param.append("id",id);
                
                //let param = {
                //    ID:id
                //};
                personApi.detail(param).then((res)=>{
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
		        	let param = this.form;
		            let loading = this.$loading({lock:true,text:'保存中....',background:'rgba(0,0,0,0.5)'});
		            let url = '';
		            if(this.type == 'update'){
		                personApi.update(param).then((res)=>{
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
		                personApi.save(param).then((res)=>{
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