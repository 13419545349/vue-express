<template>
  <div id="app">
   <nav-header></nav-header>
   <keep-alive>
        <router-view/>
    </keep-alive>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
const NavHeader = (resolve)=>{
    import('@/components/Header').then((Header)=>{resolve(Header)})
  }
  const NavFooter = (resolve)=>{
    import('@/components/footer').then((footer)=>{resolve(footer)})
  }
export default {
  name: 'app',
  components:{
  	NavFooter,NavHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
