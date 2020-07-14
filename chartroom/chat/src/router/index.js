import Vue from "vue";
import VueRouter from "vue-router";

const user = ()=>import("@/views/user");
const page = ()=>import("@/views/page");

const login = ()=>import("@/components/user/login");
const regist = ()=>import("@/components/user/regist");
const reset = ()=>import("@/components/user/reset");
const chart = ()=>import("@/components/page/chart");
const info = ()=>import("@/components/page/info");

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: {
      path: "/user/login"
    },
  },
  {
    path: "/user",
    name: "user",
    redirect: {
      path: "/user/login"
    },
    component: user,
    children:[
      {
        path:"login",
        name:"login",
        component:login
      },
      {
        path:"regist",
        name:"regist",
        component:regist
      },
      {
        path:"reset",
        name:"reset",
        component:reset
      },
    ]
  },
  {
    path:"/page",
    name:"page",
    component:page,
    children:[
      {
        path:"info",
        name:"info",
        component:info
      },
      {
        path:"chart",
        name:"chart",
        component:chart
      }
    ]
  }
];

const router = new VueRouter({
  routes,
});

// 路由权限控制
router.beforeEach((to, from, next) => {
  if(to.name === "login" || to.name === "regist" || to.name === "reset"){
    next()
  }else if(sessionStorage.getItem('token')){
    next()
  }else{
    next({path:"/user/login"})
  }
})

export default router;
