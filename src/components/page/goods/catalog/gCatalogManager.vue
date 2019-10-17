<template>
    <div id="itemManager-container">
        <div class="form-container">
            <el-form ref="form" :rules="rules" :model="form" label-width="120px">
            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="品类中文名" prop="cname">
                            <el-input v-model="form.cname" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
                    <el-col :span="12">
                        <el-form-item label="图标" prop="icon">
                            <el-input v-model="form.icon" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="品类英文名" prop="ename">
                            <el-input v-model="form.ename" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
                    <el-col :span="12">
                        <el-form-item label="类型" prop="cType">
                            <el-input v-model="form.cType" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="父ID" prop="pid">
                            <el-input v-model="form.pid" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
                    <el-col :span="12">
                        <el-form-item label="排序" prop="cOrder">
                            <el-input v-model="form.cOrder" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="URL地址" prop="cUrl">
                            <el-input v-model="form.cUrl" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
                    <el-col :span="12">
                        <el-form-item label="等级" prop="cLevel">
                            <el-input type="number" v-model="form.cLevel" size="small" :disabled="isDetail"></el-input>
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
                <el-col :span="2" :offset="2">
                    <el-button type="primary" icon="el-icon-circle-close" @click="close" :offset="!isDetail?2:9">关闭</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import {catalogApi} from "@/service/goods-api";
export default {
    data(){
        return {
            form:{
            	id:'',
            	cname:'',
            	ename:'',
            	cType:'',
            	pid:'',
            	cOrder:'',
            	cUrl:'',
            	cLevel:'',
            },
        	type:'detail',//处理类型，新增add、修改update、查看详情detail
            isDetail:false,
            rules: {//校验表单
            	cname:[{ 
                	required:true,message:'商品中文名称不能为空',trigger: 'blur'}
                ],
            	ename:[{ 
                	required:true,message:'商品英文名称不能为空',trigger: 'blur'}
                ],
            	cType:[{ 
                	required:true,message:'类型不能为空',trigger: 'blur'}
                ],
            	pid:[{ 
                	required:true,message:'父ID不能为空',trigger: 'blur'}
                ],
            	cOrder:[{ 
                	required:true,message:'排序不能为空',trigger: 'blur'}
                ],
            	cUrl:[{ 
                    required:true,message:'URL地址不能为空',trigger: 'blur'},
                    {pattern:/^http[s]{0,1}:\/\/[\s\S]+$/,message: 'url格式不正确',trigger: 'blur'}
                ],
            	cLevel:[{ 
                	required:true,message:'等级不能为空',trigger: 'blur'}
                ],
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
                catalogApi.detail(param).then((res)=>{
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
		                catalogApi.update(param).then((res)=>{
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
		                catalogApi.save(param).then((res)=>{
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