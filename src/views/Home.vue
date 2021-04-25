<template>
    <div class="home" id="home" name="home">
        <!-- 轮播图 -->
        <div class="block">
            <el-carousel height="460px">
                <el-carousel-item v-for="item in carousel" :key="item.carousel_id">
                <img style="height:460px;width:100%" :src="item.imgPath" :alt="item.describes" />
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="main-box">
            <div class="main">
                <!-- 家用体育器材展示区域 -->
                <div class="phone">
                    <div class="box-hd">
                        <div class="title">家用设备</div>
                    </div>
                    <div class="box-bd">
                        <div class="list">
                            <MyList :list="houseHoldList" :isMore="true"></MyList>
                        </div>
                    </div>
                </div>
                <!-- 有氧器材展示区域 -->
                <div class="appliance" id="promo-menu">
                    <div class="box-hd">
                        <div class="title">有氧系列</div>
                    </div>
                    <div class="box-bd">
                        <div class="list">
                            <MyList :list="aerobicList" :isMore="true"></MyList>
                        </div>
                    </div>
                </div>

                <!-- 力量器材展示区域 -->
                <div class="accessory" id="promo-menu">
                    <div class="box-hd">
                        <div class="title">力量系列</div>
                    </div>
                    <div class="box-bd">
                        <div class="list">
                        <MyList :list="powerList" :isMore="true"></MyList>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            carousel: [], //轮播图
            houseHoldList: [], //家用设备
            aerobicList: [], //有氧系列
            powerList: [
                { category_id: 1, product_id: 1, product_intro: '120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.67 小孔径全面屏 / 最高可选8GB+256GB大存储 / 高通骁龙730G处理器 / 3D四曲面玻璃机身 / 4500mAh+27W快充 / 多功能NFC',product_picture: 'http://www.star-sports.cn/uploadfile/2020/1216/20201216033138742.jpg',product_price: 2000, product_selling_price: 1599, product_num: 10, product_sales: 0, product_title: '120Hz流速屏，全速热爱' },
                { category_id: 2, product_id: 2, product_intro: '120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.67 小孔径全面屏 / 最高可选8GB+256GB大存储 / 高通骁龙730G处理器 / 3D四曲面玻璃机身 / 4500mAh+27W快充 / 多功能NFC',product_picture: 'http://www.star-sports.cn/uploadfile/2020/1216/20201216033138742.jpg',product_price: 2000, product_selling_price: 1699, product_num: 10, product_sales: 0, product_title: '120Hz流速屏，全速热爱' },
                { category_id: 3, product_id: 3, product_intro: '120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.67 小孔径全面屏 / 最高可选8GB+256GB大存储 / 高通骁龙730G处理器 / 3D四曲面玻璃机身 / 4500mAh+27W快充 / 多功能NFC',product_picture: 'http://www.star-sports.cn/uploadfile/2020/1216/20201216033138742.jpg',product_price: 2000, product_selling_price: 1799, product_num: 10, product_sales: 0, product_title: '120Hz流速屏，全速热爱' },
                { category_id: 4, product_id: 4, product_intro: '120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.67 小孔径全面屏 / 最高可选8GB+256GB大存储 / 高通骁龙730G处理器 / 3D四曲面玻璃机身 / 4500mAh+27W快充 / 多功能NFC',product_picture: 'http://www.star-sports.cn/uploadfile/2020/1216/20201216033138742.jpg',product_price: 2000, product_selling_price: 1899, product_num: 10, product_sales: 0, product_title: '120Hz流速屏，全速热爱' },
                { category_id: 5, product_id: 5, product_intro: '120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.67 小孔径全面屏 / 最高可选8GB+256GB大存储 / 高通骁龙730G处理器 / 3D四曲面玻璃机身 / 4500mAh+27W快充 / 多功能NFC',product_picture: 'http://www.star-sports.cn/uploadfile/2020/1216/20201216033138742.jpg',product_price: 2000, product_selling_price: 1999, product_num: 10, product_sales: 0, product_title: '120Hz流速屏，全速热爱' },
                { category_id: 6, product_id: 6, product_intro: '120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.67 小孔径全面屏 / 最高可选8GB+256GB大存储 / 高通骁龙730G处理器 / 3D四曲面玻璃机身 / 4500mAh+27W快充 / 多功能NFC',product_picture: 'http://www.star-sports.cn/uploadfile/2020/1216/20201216033138742.jpg',product_price: 2000, product_selling_price: 2099, product_num: 10, product_sales: 0, product_title: '120Hz流速屏，全速热爱' },
                { category_id: 7, product_id: 7, product_intro: '120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.67 小孔径全面屏 / 最高可选8GB+256GB大存储 / 高通骁龙730G处理器 / 3D四曲面玻璃机身 / 4500mAh+27W快充 / 多功能NFC',product_picture: 'http://www.star-sports.cn/uploadfile/2020/1216/20201216033138742.jpg',product_price: 2000, product_selling_price: 2199, product_num: 10, product_sales: 0, product_title: '120Hz流速屏，全速热爱' },
                { category_id: 8, product_id: 8, product_intro: '120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.67 小孔径全面屏 / 最高可选8GB+256GB大存储 / 高通骁龙730G处理器 / 3D四曲面玻璃机身 / 4500mAh+27W快充 / 多功能NFC',product_picture: 'http://www.star-sports.cn/uploadfile/2020/1216/20201216033138742.jpg',product_price: 2000, product_selling_price: 2199, product_num: 10, product_sales: 0, product_title: '120Hz流速屏，全速热爱' },
                { category_id: 9, product_id: 9, product_intro: '120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.67 小孔径全面屏 / 最高可选8GB+256GB大存储 / 高通骁龙730G处理器 / 3D四曲面玻璃机身 / 4500mAh+27W快充 / 多功能NFC',product_picture: 'http://www.star-sports.cn/uploadfile/2020/1216/20201216033138742.jpg',product_price: 2000, product_selling_price: 2199, product_num: 10, product_sales: 0, product_title: '120Hz流速屏，全速热爱' },
            ],

        }
    },
    created() {
       this.getCarouselList();
       this.getProList(1,'houseHoldList');
       this.getProList(2,'aerobicList');
    },
    methods: {
        // 获取轮播图数据
        getCarouselList() {
            this.$axios
            .get("http://127.0.0.1:7001/default/resource/carousel")
            .then(res => {
                this.carousel = res.data.carousel;
            })
            .catch(err => {
                return Promise.reject(err);
            });
        },
        // 获取不同类别的商品列表
        getProList(category_id, list) {
            this.$axios
            .get("http://127.0.0.1:7001/default/product/getProByCategory/" + category_id)
            .then(res => {
                let arr = JSON.parse(JSON.stringify(res.data));
                arr.pop();
                this[list] = arr;
            })
            .catch(err => {
                return Promise.reject(err);
            });
        },
        getChildMsg(val) {
            this.applianceActive = val;
        },
    }
}
</script>
<style scoped>
@import "../assets/css/index.css";
</style>
