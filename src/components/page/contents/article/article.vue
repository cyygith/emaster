<template>
    <div class="tinymce">
        <el-form ref="article" :model="article">
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
                        <editor class="editor" ref="ue1" :value="content1"  :setting="editorSetting" @input="contentUe"></editor>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col>
                        <editor1 class="editor" ref="ue1" :value="content1"  :setting="editorSetting" @input="contentUe"></editor1>
                    </el-col>
                </el-row>
            </div>
        </el-form>
    </div>
</template>
<script>
import editor from './editor'
export default {
    name:'gGoods',
    data(){
        return {
            editorSetting:{
                language:"",
            },
            article:{
                title:'',
                subTitle:'',
                content:''
            },
            content1:''
        }
    },
    mounted(){
        tinymce.init({});
    },
    components:{
        editor
    },
    methods:{
        contentUe(value){         
             this.content1 = value; //富文本中的内容
        },
        //新增编辑保存
        submitbulletin() {                 
            var params = {                       
                content: Base64.encode(this.content1),//公告内容              
            }           
            if (this.editid == "" || this.editid == undefined) {
                var url = this.GLOBAL.API_ACCOUNT_ADD
            } else {         
                params.id = this.editid
                var url = this.GLOBAL.API_ACCOUNT_EDIT
            }
            Vue.axios.post(url, params).then(res => {
                if (res.data.retCode == 200) {
                    this.$Message.success("操作成功")
                    this.$router.go(-1)
                } else {
                    this.$Message.error(res.data.message);
                }
            })
        },
        //编辑 详情       
        editbulletin() {        
            var params = {
                id: this.editid           
            }
            var url = this.GLOBAL.API_ACCOUNT_EDITSEE
            Vue.axios.get(url, { params }).then(res => {
                if (res.data.retCode == 200) {              
                    this.content1 = Base64.decode(res.data.data.content)                                                                                                                  
                } else {
                    this.$Message.error(res.data.message);
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
@import 'src/components/page/style/normal'; 
.eidt-container{
    padding: 1rem;
    background-color: white;
}
</style>