<template>
<div align="center">

    <div v-show="isloading">
      <i class="el-icon-loading"></i>
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
        prop="hlgap"
        label="gap" align="center" width="50">
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
      kchart_visible: false
    }
  },
  mounted: function() {
    this.getData();
    this.timer = setInterval(this.getData,60000);  //每1分钟刷新一次
  },
  destroyed: function(){
    clearInterval(this.timer);
  },
  methods:{
    getData:function(){      
      var vm = this;
      vm.isloading=true;
      var apiurl = 'http://localhost:8088/preys';
      this.$http.get(apiurl)
              .then(function(response){
                vm.list = response.data.content;
                vm.isloading = false;
                //console.log(vm.questions);
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
