<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar> 
        <v-tags></v-tags>
        <div class="right-panel" :class="{'content-collapse':collapse}">
            <div class="right-content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './top.vue';
    import vSidebar from './leftmenu.vue';
    import vTags from './tags.vue';
    import bus from './bus';
    export default {
        name: 'home',
        data(){
            return {
                tagsList: [],
                collapse: false
            }
        },
        components:{
            vHead, vSidebar, vTags
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        }
    }
</script>
<style scoped>
/***右边内容样式**/
.right-panel{
    position: absolute;
    left: 20%;
    top: 16%;
    right: 0;
    height: 90%;
    overflow: auto;
    background-color: rgb(202, 199, 199);
}
</style>