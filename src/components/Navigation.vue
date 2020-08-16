<template>
  <el-menu
    router
    :default-active="hash"
    class="el-menu-vertical-demo"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#3B83CD"
    unique-opened
  >
    <div v-for="(item) in pwoer" :key="item.url">
        <el-menu-item :index="item.url" v-if="!item.child">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
        </el-menu-item>
        <el-submenu :index="item.url" v-else>
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="son.url" v-for="(son) in item.child " :key="son.url">{{ son.name }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </div>
  </el-menu>
</template>

<script>
  export default {
    data(){
      return{
        list:[
          {
             url: '/index/Default',
             icon:'el-icon-s-home',
             name:'后台首页',
             roles:['super','normal'],
          },
          {
             url: '/index/OrderManage',
             icon:'el-icon-s-order',
             name:'订单管理',
             roles:['super','normal'],
          },
          {
             url: '3',
             icon:'el-icon-shopping-bag-1',
             name:'商品管理',
             child:[
               {
                  url: '/index/ProductList',
                  name:'商品列表',
              },
              {
                  url: '/index/AddProduct',
                  name:'商品添加',
              },
              {
                  url: '/index/GoodsClassify',
                  name:'商品分类',
              },
             ],
             roles:['super','normal'],
          },
          {
             url: '/index/ShopManage',
             icon:'el-icon-user-solid',
             name:'店铺管理',
             roles:['super'],
          },
          {
             url: '5',
             icon:'el-icon-user-solid',
             name:'账号管理',
             child:[
               {
                 url: '/index/AccountList',
                name:'账号列表',
              },
              {
                 url: '/index/AddAccount',
                name:'添加账号',
              },
              {
                 url: '/index/ChangePassword',
                name:'修改密码',
              },
             ],
             roles:['super']
          },
          {
             url: '6',
             icon:'el-icon-time',
             name:'销售统计',
             child:[
               {
                 url: '/index/GoodsStatistics',
                name:'商品统计',
              },
              {
                 url: '/index/OrderSystem',
                name:'订单统计',
              },
             ],
             roles:['super']
          },
        ],
      }
    },
    props:['role','hash'],
    methods: {
    },
    computed:{
      pwoer(){
        return this.list.filter(item => item.roles.includes(this.role));
      }
    }
  };
</script>

<style lang="less" scoped>
  .el-menu{
    border-right: 0;
  }
</style>