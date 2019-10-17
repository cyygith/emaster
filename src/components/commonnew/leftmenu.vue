<template>
    <div id="left-panel" class="left-panel">
    <el-row class="tac">
        <el-col>
                <el-menu  default-active="2"  class="el-menu-vertical-demo"  @open="handleOpen"  @close="handleClose"
                    background-color="#545c64" text-color="#fff"  active-text-color="#ffd04b" :collapse="collapse">
                    <template v-for="item in menudata">
                        <template v-if="item.children">
                                <el-submenu :index="item.url" :key="item.url">
                                    <template slot="title">
                                        <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
                                    </template>
                                    <template v-for="subItem in item.children">
                                        <el-submenu v-if="subItem.children.length>0" :index="subItem.url" :key="subItem.url">
                                            <template slot="title">{{ subItem.name }}</template>
                                            <el-menu-item v-for="(threeItem,i) in subItem.children" :key="i" :index="threeItem.url" @click="choosemenu(threeItem.url)">
                                                {{ threeItem.name }}
                                            </el-menu-item>
                                        </el-submenu>
                                        <el-menu-item v-else :index="subItem.url" :key="subItem.url" @click="choosemenu(subItem.url)">
                                            {{ subItem.name }}
                                        </el-menu-item>
                                    </template>
                                </el-submenu>
                        </template>
                        <template v-else>
                            <el-menu-item :url="item.url" :key="item.url" @click="choosemenu(item.url)">
                                <i :class="item.icon"></i>
                                <span slot="title">{{item.name}}</span>
                            </el-menu-item>
                        </template>
                    </template>
                </el-menu>
        </el-col>
    </el-row>
    </div>
</template>

<script>
    import bus from '../commonnew/bus';
    import {commonApi} from "@/service/sys-api";
    export default {
        data() {
            return {
                visible:false,
                menudata:[],
                collapse: false //是否折叠
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                console.log("emit..."+msg);
                this.collapse = msg;
            })
        },
        mounted(){
            this.getMenuData();
        },
        methods: {
            choosemenu (path) {
                console.log("path:"+path);
                this.$router.push('/' + path)
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            //获取菜单列表
            getMenuData(){
                let roles = JSON.parse(sessionStorage.getItem("roles"));//从登录的用户获取对应的角色ID（或存在与sessionStorage中，或存在与vuex中）
                let currRoleId = '';
                if(roles){
                    currRoleId = roles[0].roleId;//默认一个用户一次只能以一个角色名登录
                }
                let param = {
                    roleId: currRoleId
                }
                commonApi.getMenuData(param).then(res => {
                    if (res.code == "0") {
                        this.menudata = res.data;
                    }
                });
            },
        }
    }
</script>

<style scoped>
/**左边菜单样式*/
.left-panel{
    position: absolute;
    top: 10%;
    left: 0;
    height: 90%;
    width: 20%;
    overflow: auto;
    background-color: #545c64;
}
.left-panel /deep/ .el-menu{
    border-right: 0px;
}
</style>
