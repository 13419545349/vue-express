import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/Header'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import Address from '@/views/address'
import OrderConfirm from '@/views/orderConfirm'
import OrderSucess from "@/views/orderSucess"
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(VueLazyload,{
	loading:'static/loading-svg/loading-bars.svg'
})
Vue.use(infiniteScroll)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
    	path:'/cart',
    	name:'Cart',
    	component:Cart
    },
    {
      path:'/address',
      name:'address',
      component:Address
    },
    {
      path:'/orderconfirm',
      name:"orderconfirm",
      component:OrderConfirm
    },
    {
      path:'/orderSucess',
      name:'orderSucess',
      component:OrderSucess
    }
  ]
})
