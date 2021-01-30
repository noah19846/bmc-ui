<template>
  <div style="padding: 20px">
    <BmcButton plain type="secondary">你好呀</BmcButton>
  </div>
</template>

<script>
import BmcButton from './components/button'
import './components/button/style.less'

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
