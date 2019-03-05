<template>
  <div id="app">
    <el-container>
      <el-header>
           <el-menu default-active="0" class="el-menu-demo" mode="horizontal" @select="handleSelect"
             background-color="#333333"
            text-color="#fff"
            active-text-color="#ffd04b"
           >
            <el-submenu index="0">
              <template slot="title">TURTLE</template>
                <el-menu-item index="0"><router-link to="/holds">Holds</router-link></el-menu-item>
                <el-menu-item index="1"><router-link to="/preys">Preys</router-link></el-menu-item>
            </el-submenu>
            
            <div align="center">{{title}}</div>
          </el-menu>

      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
      return {
        title: 'Holds',
        items:['Holds','Preys']
      };
    },
  methods: {
      handleSelect(key, keyPath) {
        //console.log(this.items[1]);
        this.title = this.items[key];
      }
    }
}
</script>

<style>
  .el-header {
    background-color: #333333;
    color: #FFFFFF;
    text-align: left;
    line-height: 60px;
  }

    .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #CCCCCC;
    color: #333;
    text-align: left;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

a {
  text-decoration:none;
  color:#FFFFFF;
}
a:active{ color:#990033;}

</style>
