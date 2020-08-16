import axios from 'axios';

// 默认地址
axios.defaults.baseURL = 'http://127.0.0.1:5000'

// 商品默认地址
export const shopImg = axios.defaults.baseURL+'/upload/imgs/goods_img/';

// 商品上传接口
export const goods_Upload = axios.defaults.baseURL+'/goods/goods_img_upload';

//头像上传接口
export const avatar_upload = axios.defaults.baseURL+'/users/avatar_upload';

//--------------------------------------------- 账号管理 ------------------------------------------------------------------//
// 登录
// account:用户名
// password:密码
export const $login = (account,password) => axios.post('/users/checkLogin',{account,password,});

// 添加账号
// account:用户名
// password:密码
// userGroup:用户组
export const $addUsers = (account,password,userGroup)=> axios.post('/users/add',{account,password,userGroup,});

// 获取账号列表
// currentPage:当前页码
// pageSize:每页条数
export const $getList = (currentPage,pageSize) => axios.get('/users/list',{params:{currentPage,pageSize,}});

// 删除账号
export const $removeAcc = id => axios.get('/users/del',{params:{id,}});

// 批量删除账号
// ids:id数组
export const $removeId = ids => axios.get('/users/batchdel',{params:{ids,}});

// 修改账号
// account:账号
// userGroup:用户组
export const $revise = (id,account,userGroup)=> axios.post('/users/edit',{id,account,userGroup,});

// 检查旧密码是否正确
// oldPwd:旧密码
export const $oldPwd = (oldPwd,id) => axios.get('/users/checkoldpwd',{params:{oldPwd,id,}});

// 修改密码
// newPwd:新密码
export const $editpwd = (newPwd,id)=> axios.post('/users/editpwd',{newPwd,id,});

// 个人中心
export const $accountinfo = id=> axios.get('/users/accountinfo',{params:{id,}});

// 头像上传
export const $avatar_upload = id=> axios.get('/users/avatar_upload',{id,});

// 验证token
export const $token = token => axios.get('/users/checktoken',{params:{token,}});

//--------------------------------------------- 商品管理 ------------------------------------------------------------------//
// 添加分类
// cateName:分类名称
// state:是否启用
export const $addcate = (cateName,state)=> axios.post('/goods/addcate',{cateName,state,});
// 获取分类
// currentPage:当前页
// pageSize:每页条数
export const $catelist = (currentPage,pageSize)=> axios.get('/goods/catelist',{params:{currentPage,pageSize,}});

// 删除分类
export const $delcate = id=> axios.get('/goods/delcate',{params:{id,}});

// 修改分类
// cateName:分类名称
export const $editcate = (id,cateName,state)=> axios.post('/goods/editcate',{id,cateName,state,});

// 查询所有分类名称
export const $categories = ()=> axios.get('/goods/categories');

// 商品图片上传
export const $goods_upload = ()=> axios.post('/goods/goods_img_upload');

// 添加商品
// name:商品名称
// category:商品分类
// price:商品价格
// imgUrl:商品图片
// goodsDesc:商品描述
export const $addGoods = (params)=> axios.post('/goods/add',params);

// 获取商品
// currentPage:当前页
// pageSize:每页条数
export const $goodsList = (currentPage,pageSize)=> axios.get('/goods/list',{params:{currentPage,pageSize,}});

// 删除商品
export const $delGoods = id=> axios.get('/goods/del',{params:{id,}});

// 修改商品
// name:商品名称
// category:商品分类
// price:商品价格
// imgUrl:商品图片
// goodsDesc:商品描述
export const $editGoods = (params)=> axios.post('/goods/edit',params);
//-------------------------------------------------------------- 订单管理 --------------------------------------------------------------------------------//
// 获取订单列表
// currentPage:当前页码 (必填)
// pageSize:每页条数 (必填)
// orderNo:订单号 （选填）
// consignee:收货人 （选填）
// phone:手机号 （选填）
// orderState：订单状态 （选填）
// date：时间范围 （字符串） （选填）
export const $orderList = (params)=> axios.get('/order/list',{params,});

// 查询订单
// currentPage:当前页码 (必填)
// pageSize:每页条数 (必填)
// orderNo:订单号 (必填)
// consignee:收货人 (必填)
// phone:手机号 (必填)
// orderState：订单状态 (必填)
// date：时间范围 （字符串） (必填)
export const $orderSearch = (currentPage,pageSize,orderNo,consignee,phone,orderState,date)=> axios.get('/order/search',{params:{currentPage,pageSize,orderNo,consignee,phone,orderState,date,}});

// 获取订单详情
export const $orderDetail = id=> axios.get('/order/detail',{params:{id,}});

// 修改订单
// orderNo:订单号
// orderTime:下单时间
// consignee:收货人
// phone:手机号
// deliverAddress:送货地址
export const $orderEdit = params => axios.post('/order/edit',params);

//--------------------------------------------------------------------------------------------------- 店铺管理 ------------------------------------------------------------------//
// 获取店铺详情
export const $shopInfo = ()=> axios.get('/shop/info');

// 店铺图片上传
export const $shop_upload = ()=> axios.post('/shop/upload');

// 店铺内容修改
// name:店铺名称
// bulletin:店铺公告
// avatar:店铺头像
// deliveryPrice:起送价格
// deliveryTime:送达时间
// description:店铺描述
// score:店铺好评率
// sellCount:店铺销量
// supports:活动支持
// date:营业时间
// pics:图片
export const $shopEdit = (params)=> axios.post('/shop/edit',params);
//------------------------------------------------------------------------------------------------- 报表统计 ------------------------------------------------------------------------//
// 首页报表接口
export const $totaldata = ()=> axios.get('/order/totaldata');

// 订单报表接口
// date:日期 (字符串格式数组，如["2019-10-01 00:00:00", "2019-10-10 00:00:00"])
export const $ordertotal = date => axios.get('/order/ordertotal',{params:{date,}});