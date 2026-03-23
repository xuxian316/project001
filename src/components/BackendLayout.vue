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
    background-color: cadetblue;
  }
    .content-container {
      padding: 20px;
      background-color: #9b2f2f;
      min-height: calc(100% - 74px);
      
    }
}   
</style>
