import { createRouter, createWebHistory } from "vue-router";
import DcHeros from "./pages/DcHeros";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import Markdown from "./pages/Markdown"
import Slider from "./pages/Slider"
import Calculator from "./pages/Calculator"
import ReuseableModal from "./pages/ReuseableModal"
import Chat from "./pages/Chat"
import store from "./store/index"
import UserCrud from './pages/UserCrud'

const routes = [
    { path: '/', component: Home },
    { path: '/dc-heros', component: DcHeros },
    { path: '/calendar', component: Calendar },
    { path: '/markdown', component: Markdown },
    { path: '/slider-carousel', component: Slider },
    { path: '/calculator', component: Calculator, meta: { middleware: 'auth' }, },
    { path: '/reuseable-modal', component: ReuseableModal },
    {
        path: '/chat', component: Chat,
        meta: { middleware: 'auth' },
        // beforeEnter: (_, __, next) => {

        //     //console.log(store.state.isLoggedIn);
        // }
    },
    { path: '/user-crud', component: UserCrud },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, _, next) => {
    if (to.meta.middleware) {
        const middleware = require(`./middleware/${to.meta.middleware}`);
        if (middleware) {
            middleware.default(next, store);
        } else {
            next();
        }
        //console.log(middleware);

    } else {
        next();
    }
});

export default router;
