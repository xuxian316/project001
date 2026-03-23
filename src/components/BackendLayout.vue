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
    background-color: rgb(241, 243, 236);
  }
    .content-container {
      padding: 20px;
      background-color: #f9f7f7;
      min-height: calc(100% - 74px);
      
    }
}   
</style>
