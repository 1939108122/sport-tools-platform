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
                            <MyList :list="houseHoldList" :isMore="true" :categoryID="1"></MyList>
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
                            <MyList :list="aerobicList" :isMore="true" :categoryID="2"></MyList>
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
                        <MyList :list="powerList" :isMore="true" :categoryID="3"></MyList>
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
            powerList: [], //力量器械

        }
    },
    created() {
       this.getCarouselList();
       this.getProList('1','houseHoldList');
       this.getProList('2','aerobicList');
       this.getProList('3','powerList');
    },
    methods: {
        // 获取轮播图数据
        getCarouselList() {
            // debugger;
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
            let currentPage = 1;
            let pageSize = 15;
            this.$axios
            .post("http://127.0.0.1:7001/default/product/getProByCategory", 
            {
                category_id,
                currentPage,
                pageSize
            })
            .then(res => {
                let arr = JSON.parse(JSON.stringify(res.data.list));
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
