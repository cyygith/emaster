<template>
    <div id="itemManager-container">
        <div class="form-container">
            <el-form ref="item" :model="item" label-width="100px">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="商品名称">
                            <el-input v-model="item.cname" suffix-icon="el-icon-self" size="small"></el-input>
                        </el-form-item>
                    </el-col> 
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="上级父节点：">
                            <el-select v-model="item.pid" placeholder="请选择" style="width:100%" size="small">
                                <el-option
                                    v-for="it in pitem"
                                    :key="it.value"
                                    :label="it.label"
                                    :value="it.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="销售量">
                            <el-input v-model="item.sell_count" suffix-icon="el-icon-self" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="原价">
                            <el-input v-model="item.t_price" suffix-icon="el-icon-self" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="折扣价">
                            <el-input v-model="item.d_price" suffix-icon="el-icon-self" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="优惠券">
                            <el-input v-model="item.ticket" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="商品描述">
                            <el-input type="textarea" v-model="item.describe" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="upload-container">
            <div>请选择要上传的图片</div>
            <div>
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
        </div>
        <div class="button-container">
            <el-row justify="center">
                <el-col :span="2" :offset="7">
                    <el-button type="primary" icon="el-icon-search">保存</el-button>
                </el-col>
                <el-col :span="2" :offset="1">
                    <el-button type="primary" icon="el-icon-search">上传</el-button>
                </el-col>
                <el-col :span="2" :offset="1">
                    <el-button type="primary" icon="el-icon-search">重置</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import { catalogType,submitItem } from "@/service/getData"
export default {
    data(){
        return {
            item:{
                cname:'',
                ename:'',
                pid:'',
                c_url:'',
                t_price:0,
                d_price:0,
                sell_count:0,
                ticket:0.0,
                describe:'',
                ImgArr:[]
            },
            pitem:[{
                id:'',
                name:''
            }]
        }
    },
    components:{
    },
    mounted(){
        catalogType().then(res =>{
            this.pitem = res;
        });
    },
    methods:{
        async submitItem(){
            if(!this.item.cname){
                alert("请输入商品名称");
                return;
            }
            if(!this.item.c_url){
                alert("请输入商品地址");
                return;
            }
            
            let that = this;
            let res = await submitItem(this.item).then(res => {
        
                if(res.returnCode=="000"){
                    alert("保存成功");
                    this.item = {};
                    console.dir(this.item);
                    console.log("******");
                    console.dir(that.item);
                }else if(res.returnCode == "001"){
                    alert("信息保存成功，图片保存失败");
                } else {
                    alert("保存失败");
                }
            });
        

        },
        chooseImg(){    //选择图片
            let files = event.target.files;
            for(let i=0;i<files.length;i++){
                let ifile = files[i];
                let file = {};
                file.name = ifile.name;
                file.size = ifile.size;
                file.fileType = ifile.type;
                if(ifile.type.match('image.*')){
                    file.isImage = true;
                }
                
                let fileReader = new FileReader();
                fileReader.readAsDataURL(ifile);
                fileReader.onload = ((e) => {
                    return (e) => {
                        let imgResult = e.target.result;
                        file.fileContent = imgResult;
                        this.item.ImgArr.push(file);
                    }
                })(ifile);
            }
        },
        delImg(file){   //删除图片
            let filename = file.name;
            this.item.ImgArr = this.item.ImgArr.filter((item,index) => {
                if(item.name != filename) return true;
            });
        }

    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin'; 
.form-container{
    background-color: white;
    padding: 0.5rem;
}
.upload-container{
    position: relative;
    background-color: white;
    margin-top: 0.5rem;
    padding: 1rem;
    .upload-container div:nth-child(1){
        margin-bottom: 1rem;
    }
}
    

.button-container{
    background-color: white;
    /***上传附件样式****/
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
}
.right-content {
    .el-dialog .el-dialog__header{
        background-color: lightskyblue;
    } 
}
/**elementui 源生***/
#itemManager-container /deep/ .el-form-item{
    margin-bottom:0.7rem;
}
</style>

