<template>
        <textarea :id="id" :value="value"></textarea>
</template>
<script>
    import {articleApi} from "@/service/contents-api";
    import { imgBaseUrl } from "@/config/env";
    import tinymce from 'tinymce/tinymce';
    import 'tinymce/themes/modern/theme';
    import 'tinymce/plugins/paste';
    import 'tinymce/plugins/link';
    import 'tinymce/plugins/image';
    const INIT = 0;
    const CHANGED = 2;
    var EDITOR = null;
    export default {
        props: {
            value: {
                type: String,
                required: true
            },
            //setting: {},
            // 文本编辑器工具栏
            toolbar: {
                type: Array,
                default () {
                    return [
                        'newdocument | undo redo | searchreplace print preview code cut copy paste | alignleft aligncenter alignright alignjustify numlist bullist indent outdent subscript superscript removeformat | fullscreen',
                        'h1 p charmap | fontselect fontsizeselect styleselect | forecolor backcolor bold italic underline strikethrough blockquote | image media table tabledelete emoticons anchor link unlink | formats insertdatetime insertfile help'
                    ];
                }
            },
            // 菜单栏
            menubar: {
                type: String,
                default: ''
            },
            // 插件栏，方便我们去调用一个内置的功能，如打印等
            plugins: {
                type: Array,
                default () {
                    return ['advlist autolink lists link image charmap print preview anchor textcolor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table contextmenu paste code help'];
                }
            },
            //高度
            height: {
                type: Number,
                default: 300
            },
        },
        watch: {
            value: function (val) {              
                if (this.status == INIT || tinymce.activeEditor.getContent() != val){
                    tinymce.activeEditor.setContent(val);
                }
                this.status = CHANGED
            }
        },
        data: function () {
            return {
                status: INIT,
                id: 'editor-'+new Date().getMilliseconds(),
            }
        },
        methods: {
            //上传图片处理函数
            handleImgUpload(blobInfo,success,failure){
                let formdata = new FormData();
                formdata.append('images', blobInfo.blob())
                articleApi.upload(formdata).then((res)=>{
                    if(res.code == 0){
                        success(imgBaseUrl+ '/' +res.data);
                    }else{
                        failure('upload failure')
                    }
                });
            }
        },
        mounted: function () {
            const _this = this;
            const setting =
                {
                    selector:'#'+_this.id,
                    height: this.height,
                    //language:"zh_CN",
                    //language_url: '../../../static/tinymce/zh_CN.js',
                    skin_url: '../../../static/tinymce/skins/lightgray',
                    init_instance_callback:function(editor) {
                        EDITOR = editor;
                        editor.on('input change undo redo', () => {
                            var content = editor.getContent()
                            _this.$emit('input', content);
                        });
                    },
                    branding: false, // 禁用tinymce插件的商标
                    toolbar: this.toolbar,
                    images_upload_handler:(blobInfo,success,failure)=>{
                        this.handleImgUpload(blobInfo,success,failure)
                    },
                    plugins: `link image`
                };
            Object.assign(setting,_this.setting)
            tinymce.init(setting);
        },
        beforeDestroy: function () {
            tinymce.get(this.id).destroy();
        }
    }
    
</script>