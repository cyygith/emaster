<template>
    <div id="app" class="login-panel">
        <div class="login-center">
            <div class="l-title">
                后台管理系统
            </div>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <div class="l-content">
                    <el-row style="margin-bottom:1rem;">
                        <el-form-item label="用户名" prop="username">
                            <el-col>
                                <el-input v-model="form.username" placeholder="请输入登录名"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="密码" prop="passwd">
                            <el-col>
                                <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="记住我" prop="rememberMe">
                                <el-switch v-model="form.rememberMe"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                
            </div>
            <div class="l-button">
                <div @click="login">
                    <span class="el-icon-loading" v-if="loading"></span>登录
                </div>
            </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import {commonApi} from "@/service/sys-api";
export default {
    data(){
        return {
            form:{
                username: '',
                password: '',
                rememberMe:false
            },
            rules:{
                username:[
                    {required:true,message:'请输入用户名',trigger:blur}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:blur}
                ]
            },
            loading:false
        }
    },
    methods:{
        login(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    let param = this.form;
                    commonApi.login(param).then((res)=>{
                        try{
                            if(res.code == "0"){
                                sessionStorage.setItem('access-token',res.data.token);
                                sessionStorage.setItem('roles',JSON.stringify(res.data.roles));
                                sessionStorage.setItem('user',JSON.stringify(res.data.user));
                                this.$router.push('/home');
                            }else{
                                this.$message({
                                    message:res.msg,
                                    type:'error'
                                })
                            }
                        }catch(err){
                            console.dir(err);
                            this.$alert('程序出现异常，请联系管理员处理','提示信息');
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });  
        },
    }
};
</script>
<style lang="scss" scoped>
body{
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.login-panel{
    position: relative;
    margin: auto;
    width: 10rem;
    height: 20rem;
    background-image: linear-gradient(to right , rgb(12, 14, 13), rgb(96, 109, 223));
    .l-title{
        padding: 1rem;
        text-align: center;
        margin-bottom: 1rem;
    }
    .login-center{
        position: absolute;
        top: 25%;
        left: 30%;
        padding: 1rem 2.5rem 1rem 1rem;
        width: 25rem;
        background-color: rgba(206, 211, 206,0.2);
        color:white;
    }
    .l-button{
        background-color: #67C23A;
        color: white;
        margin-top: 1rem;
        padding: 0.7rem;
        text-align: center;
        letter-spacing: initial;
        border-radius: 8px;
        cursor: pointer;
    }
    /deep/ .el-form-item__label{
        color:white;
    }
}
</style>

