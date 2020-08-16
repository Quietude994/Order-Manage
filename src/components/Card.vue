<template>
    <div id="card">
        <i :class="msg.class" :style="{color:msg.color}"></i>
        <div>
            <span>{{ msg.title }}</span>
            <p>{{ msg.num }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        props:['msg']
    }
</script>

<style lang="less" scoped>
    #card{
        height: 100px;
        width: 23%;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
       align-items: center;
        i{
            font-size: 60px;
        }
        div{
            text-align: center;
            span{
                color: #ccc;
                font-size: 24px;
            }
            p{
                font-weight: bold;
                font-size: 18px;
            }
        }
    }
</style>