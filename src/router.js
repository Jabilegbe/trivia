import Vue from "vue"
import Router from "vue-router"
import SignIn from "./views/SignIn.vue"
import store from './store/store'


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      alias: '/sign-in',
      component: SignIn
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: () =>
        import(/* webpackChunkName: "leaderboard" */ "./views/LeaderBoard.vue")
    },
    {
      path: "/game",
      name: "game",
      beforeEnter: (to, from, next) => {
       if(!store.getters.currentUser){
         console.log('failed navigation, no user')
         return next('/')
       }
        next()
      },
      component: () =>
        import(/* webpackChunkName: "leaderboard" */ "./views/Game.vue")
    }
  ]
});
