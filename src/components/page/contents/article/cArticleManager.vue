<template>
    <div id="itemManager-container">
        <div class="form-container">
            <el-form ref="form" :rules="rules" :model="form" label-width="100px">
            	<el-row :gutter="24">
                    <el-col>
                        <el-form-item label="标题" prop="title">
                            <el-input v-model="form.title" size="small" placeholder="请输入标题" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
            	<el-row :gutter="24">
                    <el-col>
                        <el-form-item label="副标题" prop="subTitle">
                            <el-input v-model="form.subTitle" size="small" placeholder="请输入副标题" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>	
            	</el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="文章内容" prop="content">
                            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.content" size="small" :disabled="isDetail"></el-input>
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
import {articleApi} from "@/service/contents-api";
export default {
    data(){
        return {
            form:{
            	id:'',
            	title:'',
            	subTitle:'',
            	content:'',
            	author:'',
            	readCount:'',
            	zanCount:'',
            	createTime:'',
            	updateTime:'',
            },
        	type:'detail',//处理类型，新增add、修改update、查看详情detail
            isDetail:false,
            rules: {//校验表单
            	title:[{required:true,message:'标题不能为空',trigger: 'blur'}],
            	subTitle:[{required:true,message:'副标题不能为空',trigger: 'blur'}],
            	content:[{required:true,message:'文章内容不能为空',trigger: 'blur'}],
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
                articleApi.detail(param).then((res)=>{
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
		                articleApi.update(param).then((res)=>{
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
                        let user = sessionStorage.getItem("user");
                        this.form.author = user.userId;
                        console.log("value:"+user);
                        console.log(user.userId);
		                articleApi.save(param).then((res)=>{
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