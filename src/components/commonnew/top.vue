<template>
    <div id="app">
        <div class="top-panel">
            <div class="sysname">后台管理系统</div>
            <div class="tips-content">
                <div class="tips-list">
                    <el-row>
                        <el-badge is-dot class="tipsspan" >
                            <span class="el-icon-bank-card" @click="collapseChage">展开</span>
                        </el-badge>
                        
                        <el-badge is-dot class="tipsspan">
                            <span class="el-icon-message"></span>
                        </el-badge>
                    
                        <el-badge is-dot class="tipsspan">
                            <span class="el-icon-message-solid"></span>
                        </el-badge>
                    </el-row>
                </div>
            </div>
            <div class="self-content">
                <div class="self-list">
                    <div style="margin-right: 1rem;">
                         <span class="el-icon-s-custom"></span>
                    </div>
                    <div>
                        <el-popover
                        placement="bottom"
                        width="200"
                        trigger="click">
                        <el-row>  
                            <el-col :span="7" :offset="1" >
                                <span class="el-icon-edit" placeholder="edit"></span>
                            </el-col>
                            <el-col :span="7" :offset="1">
                                <span class="el-icon-share"></span>
                            </el-col>
                            <el-col :span="7" :offset="1">
                                <span class="el-icon-delete"></span>
                            </el-col>
                        </el-row>  
                        <el-row>  
                            <el-col :span="8">
                                <span>profile</span>
                            </el-col>
                            <el-col :span="8">
                                <span>setting</span>
                            </el-col>
                            <el-col :span="8" >
                                <span @click="logout">logout</span>
                            </el-col>
                        </el-row>   
                        <span slot="reference">
                            西歪歪<i class="el-icon-arrow-down el-icon--right" slot="reference"></i>
                        </span>
                        </el-popover>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import bus from '../commonnew/bus';
    export default {
        data() {
            return {
                collapse:false
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏,监听
            // bus.$on('collapse', msg => {
            //     this.collapse = msg;
            // })
        },
        methods:{
            //退出登录
            logout(){
                this.$router.push('/login');
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
        }
    }
</script>

<style lang="scss" scoped>
/**头部样式**/
span{
    cursor: pointer;
}
.top-panel{
    background-color: rgb(238, 236, 236);
    position: absolute;
    height: 10%;
    top: 0;
    left: 0;
    right: 0;
    .sysname{
        position: absolute;
        font-size: 1.2rem;
        font-weight: bold;
        padding: 1rem;
    }
    .tips-content{
        position: absolute;
        left:23%;
        .tips-list{
            display: flex;
        }

        .tipsspan{
            padding:0.2rem 0.4rem;
            margin-top: 10%;
            border: 1px solid rgb(202, 202, 202);
        }
    }
        
    .self-content{
        position: absolute;
        top: 0;
        right: 3rem;
        clear: both;
        .self-list{
            display: flex;
            margin-top: 20%;
        }
    }
}

</style>
