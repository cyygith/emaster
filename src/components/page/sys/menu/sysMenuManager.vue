<template>
  <div id="itemManager-container">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-select v-model="form.type" placeholder="请选择" style="width:100%" size="small" :disabled="isDetail">
                <el-option
                  v-for="it in typeArr"
                  :key="it.value"
                  :label="it.label"
                  :value="it.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="12">
            <el-form-item label="父菜单名称" prop="parentName">
              <el-input v-model="form.parentName" size="small" :disabled="true"></el-input>
              <el-input v-model="form.parentId" size="small" v-show="false" :disabled="isDetail"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
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
                <el-form-item slot="reference" label="父菜单名称" prop="parentName">
                    <el-input v-model="form.parentName" size="small" :disabled="isDetail"></el-input>
                </el-form-item>
            </el-popover> 
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="name">
              <el-input v-model="form.name" size="small" :disabled="isDetail"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="菜单url" prop="url">
              <el-input v-model="form.url" size="small" :disabled="isDetail"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="菜单图标" prop="icon">
              <el-input v-model="form.icon" size="small" :disabled="isDetail"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="排序" prop="orderNum">
              <el-input v-model="form.orderNum" size="small" :disabled="isDetail"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-switch  :disabled="isDetail" v-model="form.status" active-color="#13ce66" inactive-color="grey" active-value="1" inactive-value="0">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        
      </el-form>
    </div>

    <div class="button-container">
      <el-row justify="center">
        <el-col :span="2" :offset="5" v-if="!isDetail">
          <el-button type="primary" icon="el-icon-s-order" @click="saveOrUpdate">保存</el-button>
        </el-col>
        <el-col :span="2" :offset="2" v-if="!isDetail">
          <el-button type="primary" icon="el-icon-delete-solid" @click="resetForm">重置</el-button>
        </el-col>
        <el-col :span="2" :offset="!isDetail?2:9">
          <el-button type="primary" icon="el-icon-circle-close" @click="close">关闭</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import {menuApi} from "@/service/sys-api";
export default {
  data() {
    return {
      form: {
        menuId: "",
        parentId: "",
        parentName:"顶级菜单",
        name: "",
        url: "",
        perms: "",
        type: 1,
        icon: "",
        orderNum: "",
        status: "1"
      },
      statusArr:[{label:'启用',value:'1'},{label:'禁用',value:'0'}],
      typeArr:[{label: '目录',value : 0},{label: '菜单',value:1},{label:'按钮',value:2}],
      type: "detail", //处理类型，新增add、修改update、查看详情detail
      isDetail: false,
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
  mounted() {
    if(this.checkrow.type == 'add'){
      this.setParent();
    }else{
      this.queryById();
    }
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
    //加载父节点数据
    loadNode(node, resolve) {
        let param = new URLSearchParams();
        if(node.level === 0){
            param.append("parentId", 0);
            // resolve({'icon': "el-icon-menu",
            //   'id': "0",
            //   'isLeaf': "FALSE",
            //   'name': "顶级菜单",
            //   'pid': "000",
            //   'url': "top"});
        }else{
            param.append("parentId", node.data.id);
        }
        menuApi.getMenuTree(param).then((res)=>{
            if(res.code == 0){
                resolve(res.data);
            }
        });
    },
    //选择父节点
    handleNodeClick(data) {
        this.checkedId = data.id;
        this.form.parentId = data.id;
        this.form.parentName = data.name;
    },
    //设置父ID的相关参数
    setParent(){
      let selObj = this.checkrow.selArr;
      if(selObj.length == 0){
        this.form.parentId = "0"; 
        this.form.parentName = "顶级菜单";
      }else{
        let parent = selObj[0];
        this.form.parentId = parent.menuId;
        this.form.parentName = parent.name;
      }
    },
    //根据ID查询记录
    queryById() {
      this.type = this.checkrow.type;
      let selObj = this.checkrow.selArr;
      if (this.type == "detail") {
        this.isDetail = true;
      }

      if (this.type == "update" || this.type == "detail") {
        let menuId = selObj.menuId;
        let param = new URLSearchParams();
        param.append("menuId",menuId);
        // let param = {
        //   menuId: id
        // };
        menuApi.getByCondition(param).then(res => {
        // menuApi.detail(param).then(res => {
            if (res.code == "0") {
              this.form = res.data;
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
        menuApi.update(param).then(res => {
          if (res.code == "0") {
            this.$alert("更新成功", "提示信息", {
              confirmButtonText: "确定",
              callback: action => {
                this.$emit("closechild");
                loading.close();
              }
            });
          }
        });
      } else {
        menuApi.save(param).then(res => {
          if (res.code == "0") {
            this.$alert("保存成功", "提示信息", {
              confirmButtonText: "确定",
              callback: action => {
                this.$emit("closechild");
                loading.close();
              }
            });
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/components/page/style/normal";
</style>