<template>
    <div id="tinymce" class="tinymce">
        <div class="form-container">
            <el-form ref="article"  :rules="rules" :model="article">
                <div class="button-container">
                    <el-row :gutter="24">
                        <el-col :span="2" :offset="9">
                            <el-button type="primary" icon="el-icon-s-order" @click="saveOrUpdate">保存</el-button>
                        </el-col>
                        <el-col :span="2" :offset="1">
                            <el-button type="primary" icon="el-icon-s-order" @click="clearData">新增</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="eidt-container">
                    <el-row :gutter="24">
                        <el-col>
                            <el-form-item prop="title">
                                <el-input placeholder="请输入标题" v-model="article.title" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col>
                            <el-form-item prop="subTitle">
                                <el-input placeholder="请输入副标题" v-model="article.subTitle" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col>
                            <editor v-if="isEditable" class="editor" ref="ue1" :value="article.content"  :setting="editorSetting" @input="contentUe"></editor>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import editor from './editor'
import {articleApi} from "@/service/contents-api";
export default {
    name:'gGoods',
    data(){
        return {
            isEditable:true,
            editorSetting:{
                language:"",
            },
            article:{
                id:'',
                title:'',
                subTitle:'',
                content:'',
                author:''
            },
            rules: {//校验表单
            	title:[{required:true,message:'标题不能为空',trigger: 'blur'}],
            	subTitle:[{required:true,message:'副标题不能为空',trigger: 'blur'}],
            	content:[{required:true,message:'文章内容不能为空',trigger: 'blur'}],
            }
        }
    },
    mounted(){
        tinymce.init({});
        this.queryById();
    },
    components:{
        editor
    },
    activated(){
        this.queryById();
        //tinymce.init({});
        this.isEditable = true;
    },
    deactivated(){
        //tinymce.remove();
        this.isEditable = false;
    },
    methods:{
        contentUe(value){         
             this.article.content = value; //富文本中的内容
        },
        //重置，相当于新增
        clearData(){
            this.$refs["article"].resetFields();
            this.article.contnet = "";
        },
        //初始化查询
        queryById(){
            let par = this.$route.params;
            if(par.id != undefined){
                //this.article = par;
                this.type = 'update';//如果有数据的话就是更新
                let param = new URLSearchParams();
                param.append("id",par.id);
                articleApi.detail(param).then((res)=>{
                    if(res.code == "0"){
                        this.article = res.data;
                    }else{
                        this.$alert('获取信息失败，请联系管理员处理','提示信息');
                    }
                });
            }
        },
        //新增编辑保存
        saveOrUpdate() {  
            this.$refs['article'].validate((valid) =>{
                if(valid){  
                    if(this.article.author == ''){
                        let user = JSON.parse(sessionStorage.getItem("user"));
                        this.article.author = user.name;
                    }
                    
                    let parm = this.article;      
                    let loading = this.$loading({lock: true,text: "保存中....", background: "rgba(0,0,0,0.5)"});
                    
                    if(this.type == "update"){
                        articleApi.update(parm).then(res => {
                            if (res.code == "0") {
                                this.$alert("更新成功", "提示信息", {
                                confirmButtonText: "确定",
                                callback: action => {
                                    this.$emit("closechild");
                                    loading.close();
                                }
                                });
                            }else{
                                this.$alert("更新失败", "提示信息");
                            }
                        });
                    }else{
                        articleApi.save(parm).then(res => {
                            if (res.code == "0") {
                                this.$alert("保存成功", "提示信息", {
                                confirmButtonText: "确定",
                                callback: action => {
                                    this.$emit("closechild");
                                    loading.close();
                                }
                                });
                            }else{
                                this.$alert("保存失败", "提示信息");
                            }
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
.tinymce{
    margin:0.5rem;
    
}
.eidt-container{
    padding: 1rem;
    background-color: white;
}
.button-container{
    padding-top: 0.8rem;
}
</style>