<template>
  <div class="backend-layout">
    <el-container class="main-container">
        <Sidebar />
    <el-container>
        <el-header>
            <Navbar />
        </el-header>
        <el-main>
          <router-view class="content-container"/>
        </el-main>
    </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
</script>


    





<style lang="scss" scoped>
.backend-layout {
  height: 100vh;
  .el-header {
    height: 74px !important

  }
  .main-container {
    height: 100%;
    background-color: rgb(230, 230, 230);
  }
    .content-container {
      padding: 15px;
      background-color: #ffffff;
      min-height: calc(100% - 40px);
      
    }
}   
</style>
