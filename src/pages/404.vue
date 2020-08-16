<template>
    <div class="main">  
        <div class="container">
            <img src="../assets/imgs/404.png" alt="">
            <img src="../assets/imgs/404_msg.png" alt="">
            <router-link to = '/index/Default'>前往首页</router-link>
        </div>
        <div class="cloud"></div>
    </div>
    
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
    .main{
        width: 100%;
        height: 100%;
        background-color: #67ACE4;
        .container{
            margin: 0 auto;
            padding-top: 50px;
            text-align: center;
            width: 560px;
            img{
                margin-bottom: 50px;
            }
            a{
                display: block;
                font-size: 20px;
                text-align: center;
                text-decoration: none;
                color: #fff;
            }
        }
        .cloud{
            height: 170px;
            width: 100%;
            position: absolute;
            bottom: 0;
            background: url('../assets/imgs/error_cloud.png');
        }
    }
    
</style>