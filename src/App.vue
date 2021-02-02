<template>
  <div style="padding: 20px">
    <BmcButton block plain type="primary" @click="onClick">你好呀</BmcButton>
  </div>
</template>

<script>
import BmcButton from './components/button'
import './components/button/index.less'

export default {
  components: {
    BmcButton
  },

  methods: {
    onClick() {
      console.log('clicked')
    }
  }
}
</script>

<style lang="less"></style>
