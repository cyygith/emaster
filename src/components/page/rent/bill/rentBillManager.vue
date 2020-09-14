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
                        <el-form-item label="房屋编号" prop="houseCode">
                            <el-input v-model="form.houseCode" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="租金" prop="money">
                            <el-input v-model="form.money" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            		<el-col :span="12">
                        <el-form-item label="开始时间" prop="startTime">
			                <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="form.startTime" type="date" placeholder="选择日期" size="small" :disabled="isDetail"></el-date-picker>
			            </el-form-item>
                    </el-col>
            	</el-row>
            	<el-row :gutter="24">
            		<el-col :span="12">
                        <el-form-item label="结束时间" prop="endTime">
			                <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="form.endTime" type="date" placeholder="选择日期" size="small" :disabled="isDetail"></el-date-picker>
			            </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="上月电费" prop="lastElectric">
                            <el-input v-model="form.lastElectric" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="本月电费" prop="currElectric">
                            <el-input v-model="form.currElectric" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
                    <el-col :span="12">
                        <el-form-item label="水费支付方式  1-按吨支付  2-按人数支付" prop="waterPayType">
                            <el-input v-model="form.waterPayType" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="租住人数" prop="rentNum">
                            <el-input v-model="form.rentNum" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
                    <el-col :span="12">
                        <el-form-item label="上月水费" prop="lastWater">
                            <el-input v-model="form.lastWater" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="本月水费" prop="currWater">
                            <el-input v-model="form.currWater" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
                    <el-col :span="12">
                        <el-form-item label="租金支付方式 1-支付宝  2-微信  3-现金" prop="payType">
                            <el-input v-model="form.payType" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
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
                    <el-col :span="12">
                        <el-form-item label="排序号" prop="orderNum">
                            <el-input v-model="form.orderNum" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
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
import {billApi} from "@/service/rent-api";
export default {
    data(){
        return {
            form:{
            	id:'',
            	contractCode:'',
            	houseCode:'',
            	money:'',
            	startTime:'',
            	endTime:'',
            	lastElectric:'',
            	currElectric:'',
            	waterPayType:'',
            	rentNum:'',
            	lastWater:'',
            	currWater:'',
            	payType:'',
            	status:'',
            	orderNum:'',
            	remark:'',
            	createTime:'',
            	updateTime:'',
            },
            statusArr:[{label:'启用',value:'1'},{label:'禁用',value:'0'}],
        	type:'detail',//处理类型，新增add、修改update、查看详情detail
            isDetail:false,
            rules: {//校验表单
            	contractCode:[{required:true,message:'合同编号不能为空',trigger: 'blur'}],
            	houseCode:[{required:true,message:'房屋编号不能为空',trigger: 'blur'}],
            	money:[{required:true,message:'租金不能为空',trigger: 'blur'}],
            	startTime:[{required:true,message:'开始时间不能为空',trigger: 'blur'}],
            	endTime:[{required:true,message:'结束时间不能为空',trigger: 'blur'}],
            	lastElectric:[{required:true,message:'上月电费不能为空',trigger: 'blur'}],
            	currElectric:[{required:true,message:'本月电费不能为空',trigger: 'blur'}],
            	waterPayType:[{required:true,message:'水费支付方式  1-按吨支付  2-按人数支付不能为空',trigger: 'blur'}],
            	rentNum:[{required:true,message:'租住人数不能为空',trigger: 'blur'}],
            	lastWater:[{required:true,message:'上月水费不能为空',trigger: 'blur'}],
            	currWater:[{required:true,message:'本月水费不能为空',trigger: 'blur'}],
            	payType:[{required:true,message:'租金支付方式 1-支付宝  2-微信  3-现金不能为空',trigger: 'blur'}],
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
                billApi.detail(param).then((res)=>{
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
		                billApi.update(param).then((res)=>{
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
		                billApi.save(param).then((res)=>{
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