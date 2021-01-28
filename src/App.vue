<template>
  <div style="padding: 20px">
    <BmcButton block>你好呀</BmcButton>
  </div>
</template>

<script>
import BmcButton from './components/bmc-button'
import './components/bmc-button/style.less'

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
