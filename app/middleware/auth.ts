// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user');
  
  // if not logged in and not already on /login, go to login
  if (!user.value && to.path !== '/login') {
    return navigateTo('/login');
  }
});