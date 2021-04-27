<template>
  <div class="goods" id="goods" name="goods">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部商品</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">搜索</el-breadcrumb-item>
        <el-breadcrumb-item v-else>分类</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">{{search}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 面包屑END -->

    <!-- 分类标签 -->
    <div class="nav">
      <div class="product-nav">
        <div class="title">分类</div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane
            v-for="item in categoryList"
            :key="item.category_id"
            :label="item.category_name"
          />
        </el-tabs>
      </div>
    </div>
    <!-- 分类标签END -->

    <!-- 主要内容区 -->
    <div class="main">
      <div class="list">
        <MyList :list="product" v-if="product.length>0"></MyList>
        <div v-else class="none-product">抱歉没有找到相关的商品，请看看其他的商品</div>
      </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="currentChange"
        ></el-pagination>
      </div>
      <!-- 分页END -->
    </div>
    <!-- 主要内容区END -->
  </div>
</template>
<script>
export default {
    data() {
        return {
            categoryList: [], //分类列表
            categoryID: [], // 分类id
            product: [], // 商品列表
            total: 0, // 商品总量
            pageSize: 15, // 每页显示的商品数量
            currentPage: 1, //当前页码
            activeName: '0', // 分类列表当前选中的id
            search: "" // 搜索条件
        }
    },
    created() {
        this.getCategoryList();
        // 如果路由传递了search，则为搜索，显示对应的分类商品
        if (this.$route.query.search != undefined) {
            this.search = this.$route.query.search;
        }
    },
    watch: {
        activeName: {
            handler( newVal, oldVal)
            {
                this.$router.push({path: '/goods', query: {categoryID: newVal}});
                this.getData();
            },
            immediate: true
        },
        $route: {
            handler( newVal, oldVal)
            {
                if(this.$route.query.categoryID)
                {
                    this.activeName = newVal.query.categoryID;
                }
                if (newVal.query.search)
                {
                    this.search = newVal.query.search;
                    this.judgeTabName(this.search);
                }
            },
            immediate: true
        },
        search: function(val) {
            if (val != "") {
                this.getProductBySearch();
            }
        },
    },
    methods: {
        // 获取分类列表
        getCategoryList() {
            this.$axios({
                method: 'GET',
                url: 'http://127.0.0.1:7001/default/product/getCategory',
            }).then((res) =>{
                this.categoryList = res.data;
            })
        },
        // 
        getData() {
            this.$axios({
                method: 'POST',
                url: 'http://127.0.0.1:7001/default/product/getProByCategory',
                data: {
                    category_id: this.activeName,
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                }
            }).then(({data}) =>{
                this.product = data.list;
                this.total = data.total;
            })
        },
        // 当前页面改变时
        currentChange(val){
            this.currentPage = val;
            this.getData();
        },
        getProductBySearch() {
            this.$axios
            .post("http://127.0.0.1:7001/default/product/getProductBySearch", {
            search: this.search,
            currentPage: this.currentPage,
            pageSize: this.pageSize
            })
            .then(res => {
            this.product = res.data.Product;
            this.total = res.data.total;
            })
            .catch(err => {
            return Promise.reject(err);
            });
        },
        judgeTabName(name)
        {
            switch(name) {
                case '全部': 
                    this.activeName = '0';
                break;
                case '家用系列': 
                    this.activeName = '1';
                break;
                case '有氧系列': 
                    this.activeName = '2';
                break;
                case '力量系列': 
                    this.activeName = '3';
                break;
            }
        }
    }
}
</script>
<style scoped>
.goods {
  background-color: #f5f5f5;
}
/* 面包屑CSS */
.el-tabs--card .el-tabs__header {
  border-bottom: none;
}
.goods .breadcrumb {
  height: 50px;
  background-color: white;
}
.goods .breadcrumb .el-breadcrumb {
  width: 1225px;
  line-height: 30px;
  font-size: 16px;
  margin: 0 auto;
}
/* 面包屑CSS END */

/* 分类标签CSS */
.goods .nav {
  background-color: white;
}
.goods .nav .product-nav {
  width: 1225px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
}
.nav .product-nav .title {
  width: 50px;
  font-size: 16px;
  font-weight: 700;
  float: left;
}
/* 分类标签CSS END */

/* 主要内容区CSS */
.goods .main {
  margin: 0 auto;
  max-width: 1225px;
}
.goods .main .list {
  min-height: 650px;
  padding-top: 14.5px;
  margin-left: -13.7px;
  overflow: auto;
}
.goods .main .pagination {
  height: 50px;
  text-align: center;
}
.goods .main .none-product {
  color: #333;
  margin-left: 13.7px;
}
/* 主要内容区CSS END */
</style>