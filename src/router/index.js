import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Comment from '@/components/Comment';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Comment',
      component: Comment,
    },
    {
      path: '/index',
      name: 'Hello',
      component: HelloWorld,
    },
  ],
});
