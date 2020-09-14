<template>
    <div class="preview">
        <div class="pre-head">
            <div class="p-title">{{article.title}}</div>
            <div class="p-time">
                <span>创建时间：{{article.createTime}}</span>
            </div>
            <p class="p-line"></p>
        </div>
        <div class="pre-body">
            <p v-html="article.content"></p>
        </div>
    </div>
</template>
<script>
import editor from './editor'
import {articleApi} from "@/service/contents-api";
export default {
    name:'preview',
    data(){
        return {
            article:{
                title:'',
                subTitle:'',
                content:'',
                createTime:'',
                readCount:1,
                author:''
            },
            isDetail:false,
        }
    },
    props: {
        checkrow: {
            default: () => {
                return "";
            }
        }
    },
    mounted(){
        this.queryById();
    },
    methods:{
        //重置
        resetForm() {
            this.$refs["form"].resetFields();
        },
        //关闭
        close() {
            this.$emit("closechild");
        },
        //根据ID查询记录
        queryById() {
            this.type = this.checkrow.type;
            let selObj = this.checkrow.selArr;
            if (this.type == "detail") {
                this.isDetail = true;
            }

            if (this.type == "update" || this.type == "detail") {
                let id = selObj.id;
                let param = new URLSearchParams();
                param.append("id",id);
                
                articleApi.detail(param).then(res => {
                    if (res.code == "0") {
                        this.article = res.data;
                    }
                });
            }
        },
    }
}
</script>
<style lang="scss" scoped>
@import 'src/components/page/style/normal'; 
.pre-head{
    text-align: center;
    margin-bottom: 1rem;
    .p-title{
        font-weight: bolder;
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }
    .p-time{
        
    }
    .p-line{
        margin-top: 1rem;
        border: 1px solid rgb(207, 205, 205);
    }

}
</style>