<template>
  <div id="itemlist-panel" class="itemlist-panel">

  </div>
</template>
<script>
import sysMenu from "@/components/page/sys/menu/sysMenuManager";
import { baseUrl } from "@/config/env";
export default {
  data() {
    return {
      dialogVisible: false,
      visible: false,
      form: {
        parentId: "",
        name: "",
        url: "",
        perms: "",
        type: "",
        icon: "",
        orderNum: "",
        status: ""
      },
      statusArr:[{label:'启用',value:'1'},{label:'禁用',value:'0'}],
      typeArr:[{label:'目录',value:'0'},{label:'菜单',value:'1'},{label:'按钮',value:'2'}],
      page: {
        pageSize: 5,
        currPage: 1,
        totalPage: 0
      },
      tableData: [],
      checkRow: {}, //选择的条数
      queryMore: false, //查询更多
      dialogTitle: "新增",
      parentId:'0'
    };
  },
  components: {
    "sys-menu": sysMenu
  },
  mounted() {},
  methods: {
    //改变每页条数
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.queryList();
    },
    //改变当前页面
    handleCurrentChange(val) {
      this.page.currPage = val;
      this.queryList();
    },
    //关闭弹出窗口
    handleClose(done) {
      this.dialogVisible = false;
    },
    //关闭子窗口
    closechild() {
      this.dialogVisible = false;
      //this.queryList();
    },
    //重置
    resetForm() {
      this.$refs["form"].resetFields();
    },
    //加载数据
    load(tree, treeNode, resolve) {
        let url = baseUrl + "/sysMenu/getMenuLevel";
        let param = {
          parentId:tree.menuId
        }
        let resp = this.axios.post(url, param).then(res => {
          try {
            if (res.data.code == "0") {
              resolve(res.data.data);
            }
          } catch (err) {
            this.$alert("程序出现异常，请联系管理员处理", "提示信息");
          } 
        });
    },
    //查询list数据
    queryList() {
      let url = baseUrl + "/sysMenu/getMenuLevel";
      let param = {
        parentId:'0'
      }
      let resp = this.axios.post(url, param).then(res => {
        try {
          console.log("aaa"+res);
          console.dir(res);
          if (res.data.code == "0") {
            this.tableData = res.data.data;
          }
        } catch (err) {
          this.$alert("程序出现异常，请联系管理员处理", "提示信息");
        }
      });
    },
    //新增
    add() {
      this.checkRow.selArr = this.$refs.multipleTable.selection;
      this.dialogVisible = true;
      this.checkRow.type = "add";
      this.dialogTitle = "新增";
    },
    //修改
    update(row) {
      this.checkRow.selArr = row;
      this.checkRow.type = "update";
      this.dialogVisible = true;
      this.dialogTitle = "修改";
    },
    //查看详情
    detail(row) {
      this.checkRow.selArr = row;
      this.checkRow.type = "detail";
      this.dialogVisible = true;
      this.dialogTitle = "查看详情";
    },
    //删除
    del() {
      this.checkRow.type = "del";
      let ll = this.$refs.multipleTable.selection;
      if (ll.length < 1) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "请选择删除的行！",
          duration: 2000
        });
      }
      let idArr = ll.map((e, i) => {
        return e.menuId;
      });
      let param = {
        ids: idArr.join(",")
      };

      let url = baseUrl + "/sysMenu/deleteByIds";
      let resp = this.axios.post(url, param).then(res => {
        try {
          let data = res.data;
          if (data.code == "0") {
            this.$message({
              showClose: true,
              message: "删除成功！",
              duration: 2000
            });
            this.queryList(); //关闭后刷新界面
          }
        } catch (err) {
          this.$message({
            showClose: true,
            message: "删除失败，程序出现异常，请联系管理员处理"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/components/page/style/normal";
</style>

