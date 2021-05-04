<template>
    <div id="details">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="商品预览" name="first">
                    <div class="main">
                        <!-- 左侧轮播图 -->
                        <div class="block">
                            <el-carousel height="560px" v-if="productPicture.length>1">
                            <el-carousel-item v-for="item in productPicture" :key="item.id">
                                <img style="height:560px;" :src="item.product_picture" :alt="item.intro" />
                            </el-carousel-item>
                            </el-carousel>
                            <div v-if="productPicture.length==1">
                            <img
                                style="height:560px;width:560px"
                                :src="productPicture[0].product_picture"
                                :alt="productPicture[0].intro"
                            />
                            </div>
                        </div>
                        <!-- 右侧内容区 -->
                        <div class="content">
                            <h1 class="name">{{productDetails.product_name}}</h1>
                            <p class="intro">{{productDetails.product_intro}}</p>
                            <div class="price">
                            <span>{{productDetails.product_selling_price}}元/月</span>
                            <span
                                v-show="productDetails.product_price != productDetails.product_selling_price"
                                class="del"
                            >{{productDetails.product_price}}元/每月</span>
                            </div>
                            <div class="pro-list">
                            <span class="pro-name">{{productDetails.product_name}}</span>
                            <span class="pro-price">
                                <span>{{productDetails.product_selling_price}}元/每月</span>
                                <span
                                v-show="productDetails.product_price != productDetails.product_selling_price"
                                class="pro-del"
                                >{{productDetails.product_price}}元/每月</span>
                            </span>
                            <p class="price-sum">总计 : {{productDetails.product_selling_price}}元/每月</p>
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
                                <i class="el-icon-circle-check"></i> 正品保障
                                </li>
                                <li>
                                <i class="el-icon-circle-check"></i> 两天内发货
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
                <!-- <el-tab-pane label="商品描述" name="second">商品描述</el-tab-pane> -->
                <el-tab-pane label="用户评论" name="third">用户评论</el-tab-pane>
            </el-tabs>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            activeName: 'first', //tab选中项
            dis: false, // 控制“加入购物车按钮是否可用”
            productID: "", // 商品id
            productDetails: {}, // 商品详细信息
            productPicture: [] // 商品图片
        };
    },
     // 通过路由获取商品id
    created() {
        if (this.$route.query.productID != undefined) {
            this.productID = this.$route.query.productID;
        }
    },
    watch: {
        // 监听商品id的变化，请求后端获取商品数据
        productID: function(val) {
        this.getDetails(val);
        this.getDetailsPicture(val);
        }
    },
    methods: {
        ...mapActions(["unshiftShoppingCart", "addShoppingCartNum"]),
        getDetails(val) {
            this.$axios
                .post("http://127.0.0.1:7001/default/product/getDetails", {
                productID: val
                })
                .then(res => {
                    // console.log(res);
                this.productDetails = res.data.list[0];
                })
                .catch(err => {
                return Promise.reject(err);
            });
        },
        // 获取商品图片
        getDetailsPicture(val) {
            this.$axios
                .post("http://127.0.0.1:7001/default/product/getDetailsPicture", {
                productID: val
                })
                .then(res => {
                this.productPicture = res.data.list;
                })
                .catch(err => {
                return Promise.reject(err);
            });
        },
        handleClick () {

        },
         // 加入购物车
        addShoppingCart() {
        // 判断是否登录,没有登录则显示登录组件
            if (!this.$store.getters.getUser) {
                this.$store.dispatch("setShowLogin", true);
                return;
            }
            this.$axios
                .post("http://127.0.0.1:7001/default/shopping/addShoppingCart", {
                user_id: this.$store.getters.getUser.user_id,
                product_id: this.productID
                })
                .then(res => {
                switch (res.data.code) {
                    case "001":
                    // 新加入购物车成功
                    this.unshiftShoppingCart(res.data.shoppingCartData[0]);
                    this.notifySucceed(res.data.msg);
                    break;
                    case "002":
                    // 该商品已经在购物车，数量+1
                    this.addShoppingCartNum(this.productID);
                    this.notifySucceed(res.data.msg);
                    break;
                    case "003":
                    // 商品数量达到限购数量
                    this.dis = true;
                    this.notifyError(res.data.msg);
                    break;
                    default:
                    this.notifyError(res.data.msg);
                }
                })
                .catch(err => {
                return Promise.reject(err);
            });
        },
        addCollect() {
        // 判断是否登录,没有登录则显示登录组件
            if (!this.$store.getters.getUser) {
                this.$store.dispatch("setShowLogin", true);
                return;
            }
            this.$axios
                .post("http://127.0.0.1:7001/default/collect/addCollect", {
                user_id: this.$store.getters.getUser.user_id,
                product_id: this.productID
                })
                .then(res => {
                if (res.data.code == "001") {
                    // 添加收藏成功
                    this.notifySucceed(res.data.msg);
                } else {
                    // 添加收藏失败
                    this.notifyError(res.data.msg);
                }
                })
                .catch(err => {
                    return Promise.reject(err);
            });
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