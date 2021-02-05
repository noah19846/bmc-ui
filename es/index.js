import Button from './components/button';
var bmc = {
  install: function install(Vue) {
    Vue.use(Button);
  }
};
export { Button };
export default bmc;