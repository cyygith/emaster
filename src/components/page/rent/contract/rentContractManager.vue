<template>
    <div id="itemManager-container">
        <div class="form-container">
            <el-form ref="form" :rules="rules" :model="form" label-width="100px">
            	            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="合同编号" prop="contractCode">
                            <el-input v-model="form.contractCode" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
                    <el-col :span="12">
                        <el-form-item label="合同名称" prop="contractName">
                            <el-input v-model="form.contractName" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="房屋编号" prop="houseCode">
                            <el-input v-model="form.houseCode" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
                    <el-col :span="12">
                        <el-form-item label="租客编号" prop="personCode">
                            <el-input v-model="form.personCode" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
            		<el-col :span="12">
                        <el-form-item label="签约时间" prop="signTime">
			                <el-date-picker v-model="form.signTime" type="date" placeholder="选择日期" size="small" :disabled="isDetail"></el-date-picker>
			            </el-form-item>
                    </el-col>
            		<el-col :span="12">
                        <el-form-item label="开始时间" prop="startTime">
			                <el-date-picker v-model="form.startTime" type="date" placeholder="选择日期" size="small" :disabled="isDetail"></el-date-picker>
			            </el-form-item>
                    </el-col>
            	</el-row>
            	<el-row :gutter="24">
            		<el-col :span="12">
                        <el-form-item label="结束时间" prop="endTime">
			                <el-date-picker v-model="form.endTime" type="date" placeholder="选择日期" size="small" :disabled="isDetail"></el-date-picker>
			            </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="租金" prop="renter">
                            <el-input v-model="form.renter" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="押金" prop="deposit">
                            <el-input v-model="form.deposit" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
                    <el-col :span="12">
                        <el-form-item label="水费结算方式" prop="waterCloseType">
                            <el-input v-model="form.waterCloseType" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="付款方式" prop="payType">
                            <el-input v-model="form.payType" size="small" :disabled="isDetail"></el-input>
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
import {contractApi} from "@/service/rent-api";
export default {
    data(){
        return {
            form:{
            	id:'',
            	contractCode:'',
            	contractName:'',
            	houseCode:'',
            	personCode:'',
            	signTime:'',
            	startTime:'',
            	endTime:'',
            	renter:'',
            	deposit:'',
            	waterCloseType:'',
            	payType:'',
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
            	contractCode:[{required:true,message:'合同编号不能为空',trigger: 'blur'}],
            	contractName:[{required:true,message:'合同名称不能为空',trigger: 'blur'}],
            	houseCode:[{required:true,message:'房屋编号不能为空',trigger: 'blur'}],
            	personCode:[{required:true,message:'租客编号不能为空',trigger: 'blur'}],
            	signTime:[{required:true,message:'签约时间不能为空',trigger: 'blur'}],
            	startTime:[{required:true,message:'开始时间不能为空',trigger: 'blur'}],
            	endTime:[{required:true,message:'结束时间不能为空',trigger: 'blur'}],
            	renter:[{required:true,message:'租金不能为空',trigger: 'blur'}],
            	deposit:[{required:true,message:'押金不能为空',trigger: 'blur'}],
            	waterCloseType:[{required:true,message:'水费结算方式（1-按人10元/月  2-按月结算）不能为空',trigger: 'blur'}],
            	payType:[{required:true,message:'付款方式不能为空',trigger: 'blur'}],
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
                let id = selObj.id;
                let param = new URLSearchParams();
                param.append("id",id);
                
                //let param = {
                //    ID:id
                //};
                contractApi.detail(param).then((res)=>{
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
		                contractApi.update(param).then((res)=>{
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
		                contractApi.save(param).then((res)=>{
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