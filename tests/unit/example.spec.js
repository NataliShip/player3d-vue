import Vue from "vue";
import App from "../../src/App.vue";

it('renders without crashing', () => {
  const div = document.createElement('div');
  new Vue({
    render: h => h(App)
  }).$mount(div);
});

