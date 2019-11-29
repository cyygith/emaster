<template>
    <div id="goodsLineChart">
        <div class="black-panel">&nbsp;</div>
        <div class="condition-panel">
            <el-form ref="form" :model="form" label-width="100px">
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="创建时间起" prop="createTime">
                            <el-date-picker v-model="form.createTime" value-format="yyyy-MM-DD" type="daterange" range-separator="To" start-placeholder="Start date" end-placeholder="End date" size="small"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row justify="center">
                    <el-col :span="1" :offset="9">
                        <el-button type="primary" icon="el-icon-search"  @click="queryCharts" size="small">查 询</el-button>
                    </el-col>
                    <el-col :span="1" :offset="1">
                        <el-button plain icon="el-icon-switch-button" size="small" @click="resetForm">重 置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="c-container">
            <el-row :gutter="24">
    			<el-col :span="12">
    				<ve-line :data="chartData" :settings="chartSettings" height="300px" width="300px"></ve-line>
    			</el-col>
    			<el-col :span="12">
    				<ve-bar :data="chartData" :settings="chartSettings" height="300px" width="300px"></ve-bar>
    			</el-col>
    		</el-row>
        </div>

    </div>
</template>
<script>
import VeLine from 'v-charts/lib/line'
import VeBar from 'v-charts/lib/bar'
import {chartsApi} from "@/service/charts-api";
export default {
    name:'goodsLineChart',
    data(){
        return {
            form:{
                createTime:''
            },
            chartSettings:{
                metrics:['COUNT'],
                labelMap:{
					COUNT:'数量'
				}
			},
            chartData:{
                columns:['CREATE_TIME','COUNT'],
                rows:[]
            }
        }
    },
    components:{
        VeLine,
        VeBar
    },
    mounted(){
        this.queryCharts();
    },
    methods:{
        //重置
        resetForm() {
            this.$refs["form"].resetFields();
        },
        //查询
        queryCharts(){
            let param = {
                startTime:this.form.createTime[0],
                endTime:this.form.createTime[1]
            }
            chartsApi.getCLineCharts(param).then((res)=>{
                if(res.code == "0"){
                    this.chartData.rows = res.data;
                }else{
                    this.$alert('获取信息失败，请联系管理员处理','提示信息');
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'src/components/page/style/normal'; 
.c-container{
    margin:0.5rem; 
    background-color: white;
}

</style>