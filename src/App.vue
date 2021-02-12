<template>
  <div id="app" style="padding: 20px">
    <BmcButton block plain type="primary" @click="onClick">你好呀</BmcButton>
    <BmcDialog
      show
      cancelButtonShow
      title="提示"
      content="醉后不知天在水，满船清梦压星河。"
    ></BmcDialog>
  </div>
</template>

<script>
import BmcButton from './components/button'
import './components/button/index.less'
import BmcDialog from './components/dialog'
import './components/dialog/index.less'

export default {
  components: {
    BmcButton,
    BmcDialog
  },

  methods: {
    onClick() {
      console.log('clicked')
    }
  }
}
</script>

<style lang="less">
#app {
  background-color: #ccc;
}
</style>
