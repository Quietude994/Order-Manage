import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../pages/Login';
import {$token} from '@/api/apis';

Vue.use(VueRouter);

const router = new VueRouter({
        routes:[
            // 登录
            {
                path:'/',
                name:'Login',
                component: Login,
            },
            // 首页
            {
                path:'/index',
                name:'index',
                component: () => import('@/pages/Index'),
                children:[
                    // 二级首页
                    {
                        path:'/index/Default',
                        name:'Default',
                        component: () => import('../pages/index/Default'),
                        meta:{breadList:['首页']}
                    },
                    // 商品分类
                    {
                        path:'/index/GoodsClassify',
                        name:'GoodsClassify',
                        component: () => import('../pages/index/GoodsClassify'),
                        meta:{breadList:['商品管理','商品分类']}
                    },
                    // 订单管理
                    {
                        path:'/index/OrderManage',
                        name:'OrderManage',
                        component: () => import('../pages/index/OrderManage'),
                        meta:{breadList:['订单管理']}
                    },
                    // 订单统计
                    {
                        path:'/index/OrderSystem',
                        name:'OrderSystem',
                        component: () => import('../pages/index/OrderSystem'),
                        meta:{breadList:['销售统计','订单统计']}
                    },
                    // 店铺管理
                    {
                        path:'/index/ShopManage',
                        name:'ShopManage',
                        component: () => import('../pages/index/ShopManage'),
                        meta:{breadList:['店铺管理']}
                    },
                    // 商品添加
                    {
                        path:'/index/AddProduct',
                        name:'AddProduct',
                        component: () => import('../pages/index/AddProduct'),
                        meta:{breadList:['商品管理','商品添加']}
                    },
                    // 商品列表
                    {
                        path:'/index/ProductList',
                        name:'ProductList',
                        component: () => import('../pages/index/ProductList'),
                        meta:{breadList:['商品管理','商品列表']}
                    },
                    // 账号列表
                    {
                        path:'/index/AccountList',
                        name:'AccountList',
                        component: () => import('../pages/index/AccountList'),
                        meta:{breadList:['账号管理','账号列表']}
                    },
                    // 添加账号
                    {
                        path:'/index/AddAccount',
                        name:'AddAccount',
                        component: () => import('../pages/index/AddAccount'),
                        meta:{breadList:['账号管理','添加账号']}
                    },
                    // 修改密码
                    {
                        path:'/index/ChangePassword',
                        name:'ChangePassword',
                        component: () => import('../pages/index/ChangePassword'),
                        meta:{breadList:['账号管理','修改密码']}
                    },
                    // 商品统计
                    {
                        path:'/index/GoodsStatistics',
                        name:'GoodsStatistics',
                        component: () => import('../pages/index/GoodsStatistics'),
                        meta:{breadList:['销售统计','商品统计']}
                    },
                    // 个人中心
                    {
                        path:'/index/Personal',
                        name:'Personal',
                        component: () => import('../pages/index/Personal'),
                        meta:{breadList:['账号管理','个人中心']}
                    }
                ]
            },
            // 404
            {
                path:'*',
                name:'404',
                component: () => import('../pages/404'),
            }
        ]
    });
    
//  路由拦截
router.beforeEach((to,from,next) =>{
    if(to.path != '/'){
        $token(localStorage.token).then(res =>{
            if(res.data.code == 0)
                next()
            else
                next('/')
        })
    }else
        next()
})  
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
export default router