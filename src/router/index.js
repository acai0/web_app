import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Conversations',
        component: () =>
            import ('../views/Conversations.vue')
    },
    {
        path: '/SingnIn',
        name: 'SingnIn',
        component: () =>
            import ('../views/SingnIn.vue')
    },
    {
        path: '/Login',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/createEvent',
        name: '/createEvent',
        component: () =>
            import ('../views/createConversation.vue')
    },
    {
        path: '/Invitation',
        name: '/Invitation',
        component: () =>
            import ('../views/Invitation.vue')
    },
    {
        path: '/Conversation/:id',
        name: 'Conversation',
        component: () =>
            import ('../views/Conversation.vue')
    },
    {
        path: '/logOut',
        name: '/logOut',
        component: () =>
            import ('../views/logOut.vue')
    },
    {
        path: '/Profil',
        name: 'Profil',
        component: () =>
            import ('../views/Members')
    },
    {
        path: '/Member/:idMember',
        name: 'Member',
        component: () =>
            import ('../views/Member.vue')
    },
    {
        path: '/EditEvent/:id',
        name: 'EditEvent',
        component: () =>
            import ('../views/EditConversation.vue')
    },
]

const router = new VueRouter({
    routes
})

export default router