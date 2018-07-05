import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: require('@/components/SignIn').default
    },
    {
    	path:'/Main',
    	name:'Main',
    	redirect:'/LibraryManagement',
    	component: require('@/components/Main').default,
    	children:[
    	
    	    {
    	    	path:'/LibraryManagement',
    	    	name:'LibraryManagement',
    	    	component: require('@/components/LibraryManagement/page1').default,
    	    },
    	    {
		    		 path:'/LibraryManagement/VideoPlayback',
		    	   name:'VideoPlayback',
		    	   component: require('@/components/LibraryManagement/page2').default
			    },			    
    	    {
    	    	path:"/editPage",
    	    	name:'editPage',
    	    	component: require("@/components/LibraryManagement/page3").default
    	    },
    	    {
    	    	path:'/CustomManagement',
    	    	name:'CustomManagement',
    	    	component: require('@/components/CustomManagement/page1').default
    	    },
    	    {
    	    	path:'/SongsUploaded',
    	    	name:'SongsUploaded',
    	    	component: require('@/components/SongsUploaded/page1').default
    	    },
    	    {
    	    	path:'/Uploading',
    	    	name:'Uploading',
    	    	component: require('@/components/Uploading/page1').default
    	    },
    	    {
    	    	path:'/Refresh',
    	    	name:'Refresh',
    	    	component: require('@/components/Refresh').default
    	    }
    	]
    },
    {
      path: '*',
      redirect: '/'
    },
    {
    	 path: '/backGround',
       name: 'backGround',
		   component: require('@/components/backGround').default
    }
  ]
})
