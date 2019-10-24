<template>
    <div class="tinymce">
        <div class="eidt-container">
            <editor class="editor" ref="ue1" :value="content1"  :setting="editorSetting" @input="contentUe"></editor>
        </div>
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
            content1:'abc'
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
}
</style>