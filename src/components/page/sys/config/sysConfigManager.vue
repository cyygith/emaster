<template>
    <div id="itemManager-container">
        <div class="form-container">
            <el-form ref="form" :model="form" label-width="100px">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="键" prop="paramKey">
                            <el-input v-model="form.paramKey" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="值" prop="paramValue">
                            <el-input v-model="form.paramValue" size="small" :disabled="isDetail"></el-input>
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
import { configApi } from "@/service/sys-api";
export default {
    data() {
        return {
            form: {
                id: "",
                paramKey: "",
                paramValue: "",
                status: "",
                remark: ""
            },
            statusArr:[{label:'启用',value:'1'},{label:'禁用',value:'0'}],
            type: "detail", //处理类型，新增add、修改update、查看详情detail
            isDetail: false
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
                let id = selObj.id;
                let param = new URLSearchParams();
                param.append("id", id);

                //let param = {
                //    id:id
                //};
                configApi.detail(param).then(res => {
                    if (res.code == "0") {
                        this.form = res.data;
                    } else {
                        this.$alert(
                            "获取信息失败，请联系管理员处理",
                            "提示信息"
                        );
                    }
                });
            }
        },

        //新增或者更新
        saveOrUpdate() {
            let param = this.form;
            let loading = this.$loading({
                lock: true,
                text: "保存中....",
                background: "rgba(0,0,0,0.5)"
            });
            let url = "";
            if (this.type == "update") {
                configApi.update(param).then(res => {
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
                configApi.save(param).then(res => {
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
        }
    }
};
</script>
<style lang="scss" scoped>
@import "src/components/page/style/normal";
</style>