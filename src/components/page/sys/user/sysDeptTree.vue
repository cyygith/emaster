<template>
    <div id="deptTree">
        <el-tree
            :props="props"
            :load="loadNode"
            lazy
            show-checkbox
            @check-change="handleCheckChange"
        ></el-tree>
    </div>
</template>
<script>
import { userApi } from "@/service/sys-api";
export default {
    data() {
        return {
            props: {
                label: "name",
                children: "zones"
            },
            count: 1
        };
    },
    created(){
        initDeptTree();
    },
    methods: {
        handleCheckChange(data, checked, indeterminate) {
            console.log(data, checked, indeterminate);
        },
        handleNodeClick(data) {
            console.log(data);
        },
        loadNode(node, resolve) { 
            let param = {
                parentId: tree.deptId
            }
            userApi.getDeptTreeLazy(param).then((res)=>{
                if (res.code == "0") {
                    resolve(res.data);
                } else {
                    this.$alert("程序出现异常，请联系管理员处理", "提示信息");
                }
            });
        },
        //初始化dept数据
        initDeptTree() {
            let param = {
                parentId:'0'
            }
            userApi.getDeptTreeLazy(param).then(res => {
                if (res.code == "0") {
                    this.tableData = res.data;
                }
            });
        },
    }
};
</script>