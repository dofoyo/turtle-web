<template>
<div align="center">
    <div v-show="isloading">
      <i class="el-icon-loading"></i>
    </div>
    <div>
        <el-radio v-model="status" label="1">蓄势</el-radio>
        <el-radio v-model="status" label="2">突破</el-radio>
    </div>
    <el-table
      :data="list"
      style="width:100%"
      border
      :show-header="true"
      @current-change="showKchart">
      <el-table-column
        type="index" align="center" width="50">
      </el-table-column>
      <el-table-column
        prop="code"
        label="代码" align="center"  width="70">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称" align="center" width="80">
      </el-table-column>
      <el-table-column
        prop="nhgap"
        label="now-high" align="center" width="60" sortable>
      </el-table-column>
      <el-table-column
        prop="hlgap"
        label="high_low" align="center" width="60" sortable>
      </el-table-column>
       <el-table-column
        prop="atr"
        label="atr" align="center" width="50">
      </el-table-column>
      <el-table-column
        prop="line"
        label="line" align="left">
      </el-table-column>
    </el-table>

    <el-dialog width="80%" :visible.sync="kchart_visible">
      <kchart></kchart> 
    </el-dialog>
  
  </div>
</template>

<script>
import kchart from '@/components/kchart'
export default {
  name: 'preys',
  components: {
      kchart
  },
  data () {
    return {
      list:[],
      isloading:true,      
      kchart_visible: false,
      status:'2'
    }
  },
  watch:{
      'status':{
        handler: function(val, oldval){
          //console.log("old: " + oldval)
          //console.log("new: " + val)
          this.getData();
        }
      }
  },
  mounted: function() {
    this.getData();
    this.timer = setInterval(this.getData,60000);  //每1分钟刷新一次
    //console.log(this.$route.query.status);
  },
  destroyed: function(){
    clearInterval(this.timer);
  },
  methods:{
    getData:function(){      
      var vm = this;
      vm.isloading=true;
      var apiurl = 'http://localhost:8088/favors';
      vm.$http.get(apiurl,{params:{'status':vm.status}})
              .then(function(response){
                vm.list = response.data.content;
                vm.isloading = false;

                var ids = new Array();
                for (let i=0; i<vm.list.length; i++) {
                  ids.push(vm.list[i].itemID);
                }
                vm.$store.commit('setItemIDs',ids);


             })
              .catch(function(response) {
                vm.isloading = false;
                console.log("getData: there are something wrong!!!");
                console.log(apiurl)
                console.log(response);
              })

    },
    showKchart: function(object) {
        //console.log(this.kchart_visible)
        this.$store.commit('setItemID',object.itemID);
        this.kchart_visible = true 
        //console.log(this.kchart_visible)

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
