<template>
    <div id="itemManager-container">
        <div class="form-container">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="form.username" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="form.name" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="form.password" size="small" :disabled="isDetail"></el-input>
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
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="form.email" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="手机号码" prop="mobile">
                            <el-input v-model="form.mobile" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="用户代码" prop="userCode">
                            <el-input v-model="form.userCode" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="用户类型" prop="userType">
                            <el-select
                                v-model="form.userType"
                                placeholder="请选择"
                                style="width:100%"
                                size="small"
                                :disabled="isDetail"
                            >
                                <el-option
                                    v-for="it in userTypeArr"
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
                        <el-card class="box-card">
                            <div style="font-weight:border;color:skyblue;margin-bottom:1rem;">选择菜单</div>
                            <div style="height:7rem;overflow-y:scroll;">
                                <el-tree
                                    :data="deptTree"
                                    show-checkbox
                                    node-key="id"
                                    default-expand-all
                                    ref="tree"
                                    :props="defaultProps">
                                </el-tree>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card class="box-card">
                            <div style="font-weight:border;color:skyblue;margin-bottom:1rem;">选择角色</div>
                            <div style="height:7rem;overflow-y:scroll;">
                                <el-tree
                                    :data="roleTree"
                                    show-checkbox
                                    node-key="id"
                                    default-expand-all
                                    ref="roleTree"
                                    :props="roleProps">
                                </el-tree>
                            </div>
                        </el-card>
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
                    <el-button type="primary" icon="el-icon-circle-close" @click="close">关闭</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import { userApi,commonApi,roleApi } from "@/service/sys-api";
import sysDeptTree from "./sysDeptTree";
export default {
    data() {
        return {
            form: {
                userId: "",
                username: "",
                password: "",
                salt: "",
                email: "",
                mobile: "",
                status: 1,
                deptId: "",
                name: "",
                createTime: "",
                userCode: "",
                userType: ""
            },
            statusArr: [
                { label: "启用", value: 1 },
                { label: "禁用", value: 0 }
            ],
            userTypeArr:[{ label: "系统用户", value: 1 },{ label: "业务用户", value: 2},],
            type: "detail", //处理类型，新增add、修改update、查看详情detail
            isDetail: false,
            dialogVisible: false, //部门树弹出来
            deptTree:[],//部门树
            roleTree:[],//角色树
            defaultProps: { //部门树字段和el-tree对应解析
                children: 'children',
                label: 'name'
            },
            roleProps: {
                label: 'name'
            },
            rules: {
                username: [{ required:true,message:'用户名不能为空',trigger: 'blur' }],
                password: [{ required:true,message:'密码不能为空',trigger: 'blur' }],
                email: [{ required:true,message:'email不能为空',trigger: 'blur' }],
                mobile: [{ required:true,message:'mobile不能为空',trigger: 'blur' }],
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
    components: {
        "sys-dept-tree": sysDeptTree
    },
    mounted() {
        this.getRoleTreeData().then(()=>{
            this.getDeptTreeData().then((res)=>{
                this.queryById();
            });
        })
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
        //关闭子窗口
        closechild() {
            this.dialogVisible = false;
        },
        //根据ID查询记录
        queryById() {
            this.type = this.checkrow.type;
            let selObj = this.checkrow.selArr;
            if (this.type == "detail") {
                this.isDetail = true;
            }

            if (this.type == "update" || this.type == "detail") {
                let id = selObj.userId;
                let param = new URLSearchParams();
                param.append("id", id);

                //let param = {
                //    userId:id
                //};
                userApi.detail(param).then(res => {
                    if (res.code == "0") {
                        this.form = res.data;
                        this.$refs.tree.setCheckedNodes(res.data1);  //设置所选择的部门
                        this.$refs.roleTree.setCheckedNodes(res.data.roles);//设置所选角色
                    } else {
                        this.$alert(
                            "获取信息失败，请联系管理员处理",
                            "提示信息"
                        );
                    }
                });
            }
        },
        //加载部门树列表
        async getDeptTreeData(){
            let param = {
                parentId:'0'
            }
            await commonApi.getAllDeptData(param).then(res => {
                if (res.code == "0") {
                    this.deptTree = res.data;
                }
            });
        },
        async getRoleTreeData(){
            let param = {}
            roleApi.list(param).then((res)=>{
                if(res.code == 0){
                    let roles = res.data.list;
                    this.roleTree = roles.map((item,index)=>{
                        return {id:item.roleId,name:item.roleName}
                    });

                    console.dir(this.roleTree);
                }
            });
        },
        //新增或者更新
        saveOrUpdate() {
            this.$refs['form'].validate((valid) =>{
                if(valid){
                    let checkMenus = this.$refs.tree.getCheckedNodes();
                    this.form.depts = checkMenus.map((item,index)=>{
                        return {'dept_id':item.id,'user_id':this.form.userId};
                    });
                    let checkRoles = this.$refs.roleTree.getCheckedNodes();
                    this.form.roles = checkRoles.map((item,index)=>{
                        return {'user_id':this.form.userId,'role_id':item.id};
                    })
                    let param = this.form;
                    let loading = this.$loading({ lock: true, text: "保存中....",  background: "rgba(0,0,0,0.5)"});
                    let url = "";
                    if (this.type == "update") {
                        userApi.update(param).then(res => {
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
                        userApi.save(param).then(res => {
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
            })
        },
        //选择部门树
        chooseDept() {
            this.dialogVisible = true;
        }
    }
};
</script>
<style lang="scss" scoped>
@import "src/components/page/style/normal";
</style>