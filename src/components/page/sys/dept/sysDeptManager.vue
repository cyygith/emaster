<template>
    <div id="itemManager-container">
        <div class="form-container">
            <el-form ref="form" :rules="rules" :model="form" label-width="100px">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="上级部门" prop="parentId" readonly>
                            <el-input v-show="false" v-model="form.parentName" size="small" :disabled="isDetail"></el-input>
                            <el-input readonly v-model="form.parentId" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态" prop="status">
                            <el-select
                                v-model="form.status"
                                placeholder="请选择"
                                style="width:100%"
                                size="small"
                                :disabled="isDetail"
                            >
                                <el-option
                                    v-for="it in statusArr"
                                    :key="it.value"
                                    :label="it.label"
                                    :value="it.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="部门名称" prop="name">
                            <el-input v-model="form.name" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="部门编号" prop="deptCode">
                            <el-input v-model="form.deptCode" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
                    
                </el-row>

                <el-row :gutter="24">
                
                    <el-col :span="12">
                        <el-form-item label="排序" prop="orderNum">
                            <el-input v-model="form.orderNum" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="form.remark" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="button-container">
            <el-row justify="center">
                <el-col :span="2" :offset="5">
                    <el-button
                        type="primary"
                        icon="el-icon-s-order"
                        @click="saveOrUpdate"
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
import { deptApi } from "@/service/sys-api";
export default {
    data() {
        return {
            form: {
                parentName:'',
                deptId: "",
                parentId: "",
                name: "",
                orderNum: "",
                delFlag: "",
                deptCode: "",
                status: "",
                remark: ""
            },
            statusArr:[{label:'启用',value:'1'},{label:'禁用',value:'0'}],
            delFlagArr:[{label:'是',value:0},{label:'否',value:1}],
            type: "detail", //处理类型，新增add、修改update、查看详情detail
            isDetail: false,
            rules: {
                name: [
                    { required:true,message:'部门名称不能为空',trigger: 'blur' }
                ],
                orderNum: [
                    { type: 'number', message: '年龄必须为数字值' }
                ]
            }
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
    mounted() {
        this.queryById();
    },
    methods: {
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
                let id = selObj.deptId;
                let param = new URLSearchParams();
                param.append("id", id);

                //let param = {
                //    deptId:id
                //};
                deptApi.detail(param).then(res => {
                    if (res.code == "0") {
                        this.form = res.data;
                    } else {
                        this.$alert(
                            "获取信息失败，请联系管理员处理",
                            "提示信息"
                        );
                    }
                });
            }else if(this.type == "add" ){
                if(selObj != null){
                    this.form.parentId = selObj[0].deptId;
                    this.form.parentName = "顶级部门";
                }else{
                    this.form.parentId = 0;
                }
            }
        },

        //新增或者更新
        saveOrUpdate() {
            this.$refs['form'].validate((valid) =>{
                if(valid){
                    let param = this.form;
                    let loading = this.$loading({
                        lock: true,
                        text: "保存中....",
                        background: "rgba(0,0,0,0.5)"
                    });
                    let url = "";
                    if (this.type == "update") {
                        deptApi.update(param).then(res => {
                            if (res.code == "0") {
                                this.$alert("更新成功", "提示信息", {
                                    confirmButtonText: "确定",
                                    callback: action => {
                                        this.$emit("closechild");
                                    }
                                });
                            } else {
                                this.$alert("提交失败，请联系管理员处理", "提示信息");
                            }
                            loading.close();
                        });
                    } else {
                        deptApi.save(param).then(res => {
                            if (res.code == "0") {
                                this.$alert("保存成功", "提示信息", {
                                    confirmButtonText: "确定",
                                    callback: action => {
                                        this.$emit("closechild");
                                    }
                                });
                            } else {
                                this.$alert("提交失败，请联系管理员处理", "提示信息");
                            }
                            loading.close();
                        });
                    }
                }else{
                    return false;
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "src/components/page/style/normal";
</style>