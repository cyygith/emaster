<template>
    <div class="tinymce">
        <Editor id="tinymce" v-model="tinymceHtml" :init="editorInit"></Editor>  
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'
export default Vue.extend({
    name:'gGoods',
    data(){

    },
    mounted(){
        tinymce.init({});
    },
    components:{
        Editor
    },
    methods:{
        editorInit: {
            language_url: '/static/tinymce/zh_CN.js',
            language: 'zh_CN',
            skin_url: '/static/tinymce/skins/lightgray',
            height: 300
        }
    }
})
</script>
<style lang="scss" scoped>
@import 'src/components/page/style/normal'; 
</style>