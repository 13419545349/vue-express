<template>
	 <div>
      <bread>
      	<a href="" slot="bread">Goods</a>
      	<a href="" slot="a">item</a>
      </bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">
            Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">All</a></dd>
                <dd v-for="(price,index) in priceFilter">
                  <a href="javascript:void(0)" :class="{'cur':priceChecked==index}" @click="setPriceFilter(index)">{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>
              </dl>
            </div>
            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in goodsList">
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/'+ item.prodcutImg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.prodcutPrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="load-more">
                  <img src="./../assets/loading-spinning-bubbles.svg" v-if='loading'>加载更多数据
                </div>
              </div>
            </div>
          </div>
        </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      </div>
      <div @click="add">{{this.$store.state.count}}</div>
    </div>
</template>

<script>
    import './../assets/css/base.css'
	import './../assets/css/product.css'
  import {mapMutations} from "vuex"
	/*import NavHeader from '@/components/Header.vue'
	//import NavFooter from '@/components/footer.vue'
	//import Bread from '@/components/bread.vue'*/
  const Bread = (resolve)=>{
    import ('@/components/bread').then((bread)=>{resolve(bread)})
  }
	export default{
		   data(){
		   	 return{
		   	 	goodsList:[],
          sortFlag:true,
          page:1,
          pageSize:8,
          busy:true,
          loading:false,
          priceFilter:[
          {
            startPrice:'0',
            endPrice:'2000'
          },
          {
            startPrice:'2000',
            endPrice:'4000'
          },
          {
            startPrice:'4000',
            endPrice:'6000'
          }],
          priceChecked:'all',
          filterBy:false,
          overLayFlag:false
		   	 }

		   },
		   created(){
               this.getGoodsList()
		   },
       methods:{
        ...mapMutations(['SET_DATA']),
        showFilterPop(){
             this.filterBy = true;
             this.overLayFlag = true;
        },
        closePop(){
             this.filterBy = false;
             this.overLayFlag = false;
        },
        setPriceFilter(index){
                  this.priceChecked = index; 
                  this.page = 1;
                  this.getGoodsList()
                  this.closePop();
        },
        sortGoods(){
          this.sortFlag = !this.sortFlag;
          this.page = 1;
          this.getGoodsList();
        },
        getGoodsList(flag){
          var param = {
            page:this.page,
            pageSize:this.pageSize,
            sort:this.sortFlag?1:-1,
            priceLevel:this.priceChecked
          }
          this.loading = true;
          this.$http.get("/goods",{params:param}).then((res)=>{
              this.loading = true;
              if(flag){
                this.goodsList = this.goodsList.concat(res.data.result);
                if(res.data.count == 0){
                  this.busy = true;
                }else{
                  this.busy = true;
                }
              }else{
                this.goodsList = res.data.result
                this.busy = false;
              }
          })
        },
        loadMore(){            
              this.busy = true;
              setTimeout(()=>{
                this.page ++;
                this.getGoodsList(true)
              },500) ;
        },
        addCart(productId){
          this.$http.post("/goods/addCart",{
            productId:productId
          }).then((res)=>{
              alert('加入成功')
              this.$store.commit("UPDATE_CART_COUNT",1)
              this.$router.push('/cart')
          })
        },
        add(){
           this.SET_DATA()
        }
       },
           components:{
             Bread
           }
	}
</script>

<style>
.navbar:after{visibility: hidden;
 clear: both;
 display: block;
 height: 0px;
 content: "."
}
 .navbar-left-container{
 	float:left;
 }
 .navbar-right-container{
 	float:right;
 	margin-right:10px;
 }
 .navbar-cart-logo{
 	width:40px;
 	height:40px;
 	margin-top:20px;
 }
 .load-more{
     height:100px;
     line-height:100px;
     text-align:center;
 }
</style>