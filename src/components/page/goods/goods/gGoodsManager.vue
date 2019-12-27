<template>
    <div id="itemManager-container">
        <div class="form-container">
            <el-form ref="form" :rules="rules" :model="form" label-width="100px">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="商品中文名" prop="cname">
                            <el-input v-model="form.cname" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品英文名" prop="ename">
                            <el-input v-model="form.ename" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-popover  placement="right" width="200" trigger="click">
                            <el-tree
                                :props="defaultProps"
                                :load="loadNode"
                                ref="treeForm"
                                node-key="id"
                                @node-click="handleNodeClick"
                                lazy>
                            </el-tree>
                            <!-- <el-tree
                                :data="treeData"
                                :props="defaultProps"
                                node-key="id"
                                ref="treeForm"
                                show-checkbox
                                check-strictly
                                @check-change="handleNodeClick">
                            </el-tree>       -->
                            <el-form-item slot="reference" label="父节点" prop="pname">
                                <el-input v-model="form.pname" size="small" :disabled="isDetail"></el-input>
                            </el-form-item>
                        </el-popover>   
                    </el-col>
                </el-row>

                <el-row :gutter="24" v-if="isDetail">
                    <el-col :span="12">
                        <el-form-item label="创建时间" prop="createTime">
                            <el-input v-model="form.createTime" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="修改时间" prop="updateTime">
                            <el-input v-model="form.updateTime" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="原价" prop="tPrice">
                            <el-input v-model="form.tPrice" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="折扣价" prop="dPrice">
                            <el-input v-model="form.dPrice" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="优惠价" prop="ticket">
                            <el-input readonly v-model="form.ticket" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="销售数量" prop="sellCount">
                            <el-input v-model="form.sellCount" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="优惠券地址" prop="cUrl">
                            <el-input v-model="form.cUrl" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="描述" prop="descr">
                            <el-input type="textarea" :rows="2" placeholder="请输入商品描述" v-model="form.descr" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item prop="image" label="图片附件上传">
                        <el-upload
                            ref="uploadImage"
                            :action="uploadAction"
                            :beforeUpload="beforeUploadPicture"
                            :on-change="imageChange"
                            list-type="picture-card"
                            name="files"
                            :limit="3"
                            multiple
                            :auto-upload="false"
                            :file-list="imageList"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemovePicture">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>

        <div class="button-container">
            <el-row justify="center">
                <el-col :span="2" :offset="5">
                    <el-button
                        type="primary"
                        icon="el-icon-s-order"
                        @click="submitGoods"
                        v-if="!isDetail"
                    >保存</el-button>
                </el-col>

                <el-col :span="2" :offset="2">
                    <el-button
                        type="primary"
                        icon="el-icon-delete-solid"
                        @click="resetForm"
                        v-if="!isDetail"
                    >重置</el-button>
                </el-col>
                <el-col :span="2" :offset="!isDetail?2:9">
                    <el-button
                        type="primary"
                        icon="el-icon-circle-close"
                        @click="close"
                    >关闭</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import { goodsApi } from "@/service/goods-api";
import { imgBaseUrl } from "@/config/env";
export default {
    data() {
        return {
            form: {
                id: "",
                cname: "",
                ename: "",
                cUrl: "",
                createTime: "",
                updateTime: "",
                pid: "",
                pname:"",
                tPrice: 0,
                dPrice: 0,
                sellCount: 0,
                ticket: 0,
                descr: "",
                imgUrl: ""
            },
            type: "detail", //处理类型，新增add、修改update、查看详情detail
            isDetail: false,
            selectedCategorySpe: this.selectedCategory,
            images: {},
            dialogImageUrl: '',
            dialogVisible: false,
            uploadAction: "/gGoods/saveIncludeImage",
            imageList:[],//图片回显列表
            rules: {//校验表单
            	cname:[{required:true,message:'商品中文名称不能为空',trigger: 'blur'}],
            	ename:[{required:true,message:'商品英文名称不能为空',trigger: 'blur'}],
                cUrl:[
                    {required:true,message:'类型不能为空',trigger: 'blur'},
                    {pattern:/^http[s]{0,1}:\/\/[\s\S]+$/,message: 'url格式不正确',trigger: 'blur'}
                ],
            	pid:[{required:true,message:'父id不能为空',trigger: 'blur'}],
                tPrice:[
                    {required:true,message:'原价不能为空',trigger: 'blur'},
                    {pattern:/^[\d.]+$/,message:'请输入数值',trigger:'blur'}
                    ],
            	dPrice:[{required:true,message:'折扣价不能为空',trigger: 'blur'},{pattern:/^[\d.]+$/,message:'请输入数值',trigger:'blur'}],
            	sellCount:[{required:true,message:'销售数量不能为空',trigger: 'blur'},{pattern:/^[\d.]+$/,message:'请输入数值',trigger:'blur'}],
            	ticket:[{required:true,message:'优惠价不能为空',trigger: 'blur'}],
            	descr:[{required:true,message:'描述不能为空',trigger: 'blur'}],
            },
            //父节点相关属性
            checkedId: '',
            defaultProps: {
                label: 'name',
                isLeaf: 'isLeaf'
            },
        };
    },
    props: {
        checkrow: {
            default: () => {
                return "";
            }
        }
    },
    components: {},
    computed:{
        ticketChange(){
            return this.form.tPrice - this.form.dPrice;
        }
    },
    watch:{
        ticketChange(val){
            this.form.ticket = val;
        }
    },
    mounted() {
        this.queryById();
    },
    methods: {
        loadNode(node, resolve) {
            let param = new URLSearchParams();
            if(node.level === 0){
                param.append("pid", "0");
            }else{
                param.append("pid", node.data.id);
            }
            goodsApi.getCatalogTree(param).then((res)=>{
                if(res.code == 0){
                    resolve(res.data);
                }
            });
        },

        //选择父节点
        handleNodeClick(data) {
            this.checkedId = data.id;
            this.form.pid = data.id;
            console.log("data...");
            console.dir(data);
            this.form.pname = data.name;

            // if(checked === true) {
            //     this.checkedId = data.id;
            //     this.$refs.treeForm.setCheckedKeys([data.id]);
            // } else {
            //     if (this.checkedId == data.id) {
            //         this.$refs.treeForm.setCheckedKeys([data.id]);
            //     }
            // }
        },
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
                param.append("id", id);

                //let param = {
                //    id:id
                //};
                goodsApi.detail(param).then(res => {
                    if (res.code == "0") {
                        this.form = res.data;
                        let imgUrl = res.data.imgUrl.split(",");
                        let baseUrl = this.form.imgDir;
                        imgUrl.forEach((item)=>{
                            let urlObj = {
                                name:'',
                                url:imgBaseUrl+baseUrl+item
                            }
                            this.imageList.push(urlObj);
                        })
                    } else {
                        this.$alert(
                            "获取信息失败，请联系管理员处理",
                            "提示信息"
                        );
                    }
                });
            }
        },
        submitGoods() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    let wfForm = new FormData();
                    for(let key in this.form){
                        wfForm.append(key,this.form[key]);
                    }
                    wfForm.append("opType",this.type);
                    // Object.entries(this.images).forEach(file => {
                    //     file[1].forEach(item => {
                    //         wfForm.append('images', item.raw)
                    //     })
                    // })
                    this.imageList = this.$refs.uploadImage.fileList;
                    this.imageList.forEach((item)=>{
                        console.log(item.raw);
                        console.dir(item);
                        wfForm.append('images', item.raw)
                    });


                    let loading = this.$loading({ lock: true, text: "保存中....", background: "rgba(0,0,0,0.5)"});
                    let url = "";
                    if (this.type == "update") {
                        goodsApi.submit(wfForm).then(res => {
                            if (res.code == "0") {
                                this.$alert("更新成功", "提示信息", {
                                    confirmButtonText: "确定",
                                    callback: action => {
                                        this.$emit("closechild");
                                    }
                                });
                            } else {
                                this.$alert(
                                    "提交失败，请联系管理员处理",
                                    "提示信息"
                                );
                            }
                            loading.close();
                        });
                    } else {
                        goodsApi.submit(wfForm).then(res => {
                            if (res.code == "0") {
                                this.$alert("保存成功", "提示信息", {
                                    confirmButtonText: "确定",
                                    callback: action => {
                                        this.$emit("closechild");
                                    }
                                });
                            } else {
                                this.$alert(
                                    "提交失败，请联系管理员处理",
                                    "提示信息"
                                );
                            }
                            loading.close();
                        });
                    }
                }
            });
        },
        //上传图片之前做校验
        beforeUploadPicture(file){
            const isImage = file.type == 'image/png' || file.type == 'image/jpg' ||  file.type == 'image/jpeg' || file.type == 'image/bmp' || file.type == 'image/gif' || file.type == 'image/webp';
            const isLt2M = file.size <  1024 * 1024 * 2;
            if (!isImage) {
                this.$message.error('上传只能是png,jpg,jpeg,bmp,gif,webp格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isImage && isLt2M;
        },
        //图片放大查看
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //删除图片
        handleRemovePicture(file, fileList) {
            console.log(file, fileList);
        },
        imageChange(file, fileList, name) {
            this.imageList = fileList;
            this.images['images'] = fileList;
        },
        
    }
};
</script>
<style lang="scss" scoped>
@import "src/components/page/style/normal";
</style>