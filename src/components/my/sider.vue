<template>
  <div class="sider" @click="">
    <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
    >
      <el-menu-item index="1">
        <span>我的歌手</span>
      </el-menu-item>

      <el-menu-item index="2">
        <span>我的视频</span>
      </el-menu-item>

      <el-menu-item index="3">
        <span>我的电台</span>
      </el-menu-item>

      <el-sub-menu index="4">
        <template #title>
          <span>创建的歌单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">item one</el-menu-item>
          <el-menu-item index="4-2">item one</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-sub-menu index="5">
        <template #title>
          <span>收藏的歌单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">item one</el-menu-item>
          <el-menu-item index="5-2">item one</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "sider"
}
</script>

<style scoped>
.sider{
  float: left;
  width: 18%;
  background-color: #f6f6f6;
}
</style>