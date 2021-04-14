<template>
    <div class="home" id="home" name="home">
        <!-- 轮播图 -->
        <div class="block">
            <el-carousel height="460px">
                <el-carousel-item v-for="item in carousel" :key="item.carousel_id">
                <img style="height:460px;" :src="item.imgPath" :alt="item.describes" />
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>
<script>
import img from '../assets/imgs/carousel/1.jpg';
export default {
    data() {
        return {
            carousel: [
                // { carousel_id: 1, imgPath: 'http://www.chinajianshenqicai.com/file/upload/201912/11/214610991.jpg', describes: '12321' },
                { carousel_id: 2, imgPath:'http://www.chinajianshenqicai.com/file/upload/201912/11/214610991.jpg', describes: '3123' },
                // { carousel_id: 2, imgPath: 'http://www.chinajianshenqicai.com/file/upload/201912/11/214621481.jpg', describes: '3123' },
            ],
        }
    },
    created() {

    },
}
</script>
<style scoped>
@import "../assets/css/index.css";
</style>
