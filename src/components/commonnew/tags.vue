<template>
    <div class="tags">
        <div class="tab-container" v-for="(item,index) in tagsList" :class="{'isTagActive': isActive(item.path)}" :key="index">
            <span class="tags-content">
                <router-link :to="item.path">
                    {{item.title}}
                </router-link>
                <span class="tags-tips" @click="closeTags(index)">x</span>
            </span>
        </div>
        <div class="close-container" v-if="tagsList.length>0">
            <el-dropdown @command="handleTags">
                <span class="tags-content">
                    标签选项 <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import bus from "../commonnew/bus";
export default {
    data() {
        return {
            tagsList: []
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace("/", "");
        }
    },
    watch: {
        $route(newValue, oldValue){
            this.setTags(newValue);
            
        }
    },
    created() {
        
    },
    methods: {
        handleTags(command){
            console.log("command:"+command);
            command === 'other' ? this.closeOther() : this.closeAll();
        },
        isActive(path) {
            return path === this.$route.fullPath;
        },
        // 设置标签
        setTags(route){
            const isExist = this.tagsList.some(item => {
                return item.path === route.fullPath;
            })
            if(!isExist){
                if(this.tagsList.length >= 8){
                    this.tagsList.shift();
                }
                this.tagsList.push({
                    title: route.meta.title,
                    path: route.fullPath,
                    name: route.matched[1].components.default.name
                })
                console.log("fullPath"+route.fullPath);
            }
            bus.$emit('tags', this.tagsList);
        },
        // 关闭单个标签
        closeTags(index) {
            const delItem = this.tagsList.splice(index, 1)[0];
            const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
            if (item) {
                delItem.path === this.$route.fullPath && this.$router.push(item.path);
            }else{
                this.$router.push('/home');
            }
        },
        // 关闭全部标签
        closeAll(){
            console.log('close all..');
            this.tagsList = [];
            this.$router.push('/home');
        },
        // 关闭其他标签
        closeOther(){
            console.log('close other..');
            const curItem = this.tagsList.filter(item => {
                return item.path === this.$route.fullPath;
            })
            this.tagsList = curItem;
        },
    }
};
</script>

<style lang="scss" scoped>
span{
    cursor: pointer;
}
.tags {
    position: absolute;
    top: 10%;
    left:20%;
    background-color: white;
    height: 2rem;
    padding: 0.2rem;
    .tab-container {
        &:hover{
            background-color: rgb(169, 174, 177);
            color: white;
        }
        margin-right: 0.2rem;
        float: left;
        position: relative;
        border: 1px solid rgb(170, 166, 166);
        padding-right: 0.8rem;
        .tags-content {
            padding: 0.3rem 0.8rem 0.3rem 0.3rem;
            float: left;
            color: black;
        }
        .tags-tips {
            font-size: 0.9rem;
            position: absolute;
            top: 0;
            right: 0.1rem;
            margin-top: -0.1rem;
            padding: 0.1rem 0.3rem;
            &:hover{
                color: black;
                background-color: white;
                border-radius: 50%;
            }
        }
    }
    .close-container {
        margin-right: 0.2rem;
        float: left;
        position: relative;
        border: 1px solid rgb(170, 166, 166);
        background-color: #409EFF;
        .tags-content {
            padding: 0.3rem 0.3rem 0.2rem 0.3rem;
            float: left;
            color: white;
        }
    }
}
.isTagActive{
    background-color: rgb(169, 174, 177);
    color: white;
}
a:link,a:active,a:visited,a:hover{
    text-decoration: none;
}
</style>
