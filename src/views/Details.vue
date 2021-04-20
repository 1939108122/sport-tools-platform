<template>
    <div id="details">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="商品预览" name="first">
                    <div class="main">
                        <!-- 左侧轮播图 -->
                        <div class="block">
                            <el-carousel height="560px" v-if="productPicture.length>1">
                            <el-carousel-item v-for="item in productPicture" :key="item.id">
                                <img style="height:560px;" :src="'http://106.15.179.105:3000/' + item.product_picture" :alt="item.intro" />
                            </el-carousel-item>
                            </el-carousel>
                            <div v-if="productPicture.length==1">
                            <img
                                style="height:560px;"
                                :src="'http://106.15.179.105:3000/' + productPicture[0].product_picture"
                                :alt="productPicture[0].intro"
                            />
                            </div>
                        </div>
                        <!-- 右侧内容区 -->
                        <div class="content">
                            <h1 class="name">{{productDetails.product_name}}</h1>
                            <p class="intro">{{productDetails.product_intro}}</p>
                            <p class="store">小米自营</p>
                            <div class="price">
                            <span>{{productDetails.product_selling_price}}元</span>
                            <span
                                v-show="productDetails.product_price != productDetails.product_selling_price"
                                class="del"
                            >{{productDetails.product_price}}元</span>
                            </div>
                            <div class="pro-list">
                            <span class="pro-name">{{productDetails.product_name}}</span>
                            <span class="pro-price">
                                <span>{{productDetails.product_selling_price}}元</span>
                                <span
                                v-show="productDetails.product_price != productDetails.product_selling_price"
                                class="pro-del"
                                >{{productDetails.product_price}}元</span>
                            </span>
                            <p class="price-sum">总计 : {{productDetails.product_selling_price}}元</p>
                            </div>
                            <!-- 内容区底部按钮 -->
                            <div class="button">
                            <el-button class="shop-cart" :disabled="dis" @click="addShoppingCart">加入购物车</el-button>
                            <el-button class="like" @click="addCollect">喜欢</el-button>
                            </div>
                            <!-- 内容区底部按钮END -->
                            <div class="pro-policy">
                            <ul>
                                <li>
                                <i class="el-icon-circle-check"></i> 小米自营
                                </li>
                                <li>
                                <i class="el-icon-circle-check"></i> 小米发货
                                </li>
                                <li>
                                <i class="el-icon-circle-check"></i> 7天无理由退货
                                </li>
                                <li>
                                <i class="el-icon-circle-check"></i> 7天价格保护
                                </li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="商品描述" name="second">商品描述</el-tab-pane>
                <el-tab-pane label="用户评论" name="third">用户评论</el-tab-pane>
            </el-tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'first', //tab选中项
            dis: false, // 控制“加入购物车按钮是否可用”
            productID: "", // 商品id
            productDetails: { category_id: 1, product_id: 1, product_intro: '120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.67 小孔径全面屏 / 最高可选8GB+256GB大存储 / 高通骁龙730G处理器 / 3D四曲面玻璃机身 / 4500mAh+27W快充 / 多功能NFC',product_picture: 'public/imgs/phone/Redmi-k30.png',product_price: 2000, product_selling_price: 1599, product_num: 10, product_sales: 0, product_title: '120Hz流速屏，全速热爱' }, // 商品详细信息
            productPicture: [
                {
                    "id":1,
                    "product_id":1,
                    "product_picture":"public/imgs/phone/picture/Redmi-k30-1.png",
                    "intro":null
                },
                {
                    "id":2,
                    "product_id":1,
                    "product_picture":"public/imgs/phone/picture/Redmi-k30-2.png",
                    "intro":null
                },
                {
                    "id":3,
                    "product_id":1,
                    "product_picture":"public/imgs/phone/picture/Redmi-k30-3.png",
                    "intro":null
                },
            ] // 商品图片
        };
    },
    methods: {
        handleClick () {

        },
        // 加入购物车
        addShoppingCart () {

        },
        // 添加收藏
        addCollect () {

        }
    }
}
</script>
<style lang="less">
#details {
    max-width: 1225px;
    margin: 0 auto;
    .main {
        width: 1225px;
        height: 560px;
        padding-top: 15px;
        margin: 0 auto;
        .block {
            float: left;
            width: 560px;
            height: 560px;
        }
    }
}
#details .el-carousel .el-carousel__indicator .el-carousel__button {
  background-color: rgba(163, 163, 163, 0.8);
}
#details .main .content {
  float: left;
  margin-left: 25px;
  width: 640px;
}
#details .main .content .name {
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  font-weight: normal;
  color: #212121;
}
#details .main .content .intro {
  color: #b0b0b0;
  padding-top: 10px;
}
#details .main .content .store {
  color: #ff6700;
  padding-top: 10px;
}
#details .main .content .price {
  display: block;
  font-size: 18px;
  color: #ff6700;
  border-bottom: 1px solid #e0e0e0;
  padding: 25px 0 25px;
}
#details .main .content .price .del {
  font-size: 14px;
  margin-left: 10px;
  color: #b0b0b0;
  text-decoration: line-through;
}
#details .main .content .pro-list {
  background: #f9f9fa;
  padding: 30px 60px;
  margin: 50px 0 50px;
}
#details .main .content .pro-list span {
  line-height: 30px;
  color: #616161;
}
#details .main .content .pro-list .pro-price {
  float: right;
}
#details .main .content .pro-list .pro-price .pro-del {
  margin-left: 10px;
  text-decoration: line-through;
}
#details .main .content .pro-list .price-sum {
  color: #ff6700;
  font-size: 24px;
  padding-top: 20px;
}
#details .main .content .button {
  height: 55px;
  margin: 10px 0 20px 0;
}
#details .main .content .button .el-button {
  float: left;
  height: 55px;
  font-size: 16px;
  color: #fff;
  border: none;
  text-align: center;
}
#details .main .content .button .shop-cart {
  width: 340px;
  background-color: #ff6700;
}
#details .main .content .button .shop-cart:hover {
  background-color: #f25807;
}

#details .main .content .button .like {
  width: 260px;
  margin-left: 40px;
  background-color: #b0b0b0;
}
#details .main .content .button .like:hover {
  background-color: #757575;
}
#details .main .content .pro-policy li {
  float: left;
  margin-right: 20px;
  color: #b0b0b0;
}
</style>