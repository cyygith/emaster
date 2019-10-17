<template>
    <div id="itemManager-container">
        <div class="form-container">
            <el-form ref="form" :model="form" label-width="100px">
            	<el-row :gutter="24">
            		<el-col :span="12">
                        <el-form-item label="角色名" prop="roleName" >
                            <el-input v-model="form.roleName" suffix-icon="el-icon-self" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
            	</el-row>
            	<el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="角色类型" prop="roleType">
                            <el-select v-model="form.roleType" placeholder="请选择" style="width:100%" size="small" :disabled="isDetail">
                                <el-option
                                    v-for="it in roleTypeArr"
                                    :key="it.value"
                                    :label="it.label"
                                    :value="it.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
            		<el-col :span="12">
                        <el-form-item label="角色代码" prop="roleCode">
                            <el-input v-model="form.roleCode" suffix-icon="el-icon-self" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
            	</el-row>        	
            	<el-row :gutter="24">
            		<el-col :span="12">
                        <el-form-item label="状态："  prop="status">
                            <el-select v-model="form.status" placeholder="请选择" style="width:100%" size="small" :disabled="isDetail">
                                <el-option
                                    v-for="it in statusArr"
                                    :key="it.value"
                                    :label="it.label"
                                    :value="it.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="form.remark" suffix-icon="el-icon-self" size="small" :disabled="isDetail"></el-input>
                        </el-form-item>
                    </el-col>
            	</el-row>
            	<el-row :gutter="24">
                    <el-card class="box-card">
                        <div style="font-weight:border;color:skyblue;margin-bottom:1rem;">选择菜单</div>
                        <el-tree
                            :data="menudata"
                            show-checkbox
                            node-key="id"
                            default-expand-all
                            ref="tree"
                            :props="defaultProps">
                        </el-tree>
                    </el-card>
                    
                </el-row>
            	
            </el-form>
        </div>
        
        <div class="button-container">
            <el-row :gutter="24">
                <el-col :span="2" :offset="5" v-if="!isDetail">
                    <el-button type="primary"  @click="saveOrUpdate" icon="el-icon-search" size="small">保存</el-button>
                </el-col>
                <el-col :span="2" :offset="2"  v-if="!isDetail" >
                    <el-button type="primary" icon="el-icon-search" @click="resetForm" size="small">重置</el-button>
                </el-col>
                <el-col :span="2" :offset="!isDetail?2:9">
                    <el-button type="primary" icon="el-icon-search" @click="close" size="small">关闭</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import {roleApi,commonApi} from "@/service/sys-api";
export default {
    data(){
        return {
            form: {
                roleId: "",
                roleName: "",
                remark: "",
                createTime: "",
                status: "",
                roleType: "",
                roleCode: "",
                menus:[]
            },
            type:'detail',//处理类型，新增add、修改update、查看详情detail
            isDetail:false,
            statusArr:[{label:'启用',value:'1'},{label:'禁用',value:'0'}],
            roleTypeArr:[{label:'业务角色',value:'1'},{label:'系统角色',value:'0'}],
            menudata:[],  //菜单节点
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            checkMenuData:[]
        }
    },
    props:{
    	checkrow:{
    		default: ()=>{
    			return '';
    		}
    	}
    },
    components:{
    
    },
    mounted(){
        //需要先获取所有的树节点，然后再根据数据设置check
        this.getMenuData().then((resolve,reject)=>{
            this.queryById();
        });
        
    },
    methods:{
        //重置
        resetForm() {
            this.$refs["form"].resetFields();
        },
        //关闭
        close() {
            this.$emit('closechild');
        },
        //根据ID查询记录
        queryById(){
            this.type= this.checkrow.type;
            let selObj = this.checkrow.selArr;
            if(this.type == 'detail'){
                this.isDetail = true;
            }

            if(this.type=='update'||this.type=='detail'){
                let id = selObj.roleId;
                let param = new URLSearchParams();
                param.append("id",id);
                
                roleApi.detail(param).then((res)=>{
                    if(res.code == "0"){
                        this.form = res.data;
                        this.$refs.tree.setCheckedNodes(res.data1);  //设置所选择的菜单
                        console.dir(res.data1);
                    }else{
                        this.$alert('获取信息失败，请联系管理员处理','提示信息');
                    }
                });
            }
        },

        //新增或者更新
        saveOrUpdate() {
            let checkMenus = this.$refs.tree.getCheckedNodes();
            this.form.menus = checkMenus.map((item,index)=>{
                return {'menu_id':item.id,'role_id':this.form.roleId};
            })

            let param = this.form;
            let loading = this.$loading({lock:true,text:'保存中....',background:'rgba(0,0,0,0.5)'});
            let url = '';
            if(this.type == 'update'){
                roleApi.update(param).then((res)=>{
        			if(res.code == "0"){
	        			this.$alert('更新成功','提示信息',{
	        				confirmButtonText:'确定',
	        				callback: action => {
                                this.$emit('closechild');
                                loading.close();
	        				}
	        			})
	        		}
                })
            }else{
                roleApi.save(param).then((res)=>{
        			if(res.code == "0"){
	        			this.$alert('保存成功','提示信息',{
	        				confirmButtonText:'确定',
	        				callback: action => {
                                this.$emit('closechild');
                                loading.close();
	        				}
	        			})
	        		}
                })
            }
        },
        //获取菜单列表
        async getMenuData(){
            let param = {
                parentId:'0'
            }
            await commonApi.getAllMenuData(param).then(res => {
                if (res.code == "0") {
                    this.menudata = res.data;
                }
            });
        },
        
    }
}
</script>
<style lang="scss" scoped>
@import 'src/components/page/style/normal'; 
</style>