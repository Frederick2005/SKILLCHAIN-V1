document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  if (!app) {
    console.error("No element with id 'app' found.");
    return;
  }

  /* ===============================
      ROUTES FOR HTML PAGES
   ===============================*/
  const routes = {

  /* =====================
     MAIN
  ====================== */
  "/": "/src/public/templates/main/index.html",
  "/home": "/src/public/templates/main/home.html",
  "/main": "/src/public/templates/main/main.html",
  "/lesson": "/src/public/templates/main/lesson.html",
  "/create": "/src/public/templates/main/create.html",
  "/edit-lesson": "/src/public/templates/main/edit-lesson.html",
  "/delete-confirm": "/src/public/templates/main/delete-confirm.html",
  "/fork": "/src/public/templates/main/fork.html",

  /* =====================
     AUTH
  ====================== */
  "/login": "/src/public/templates/auth/login.html",
  "/signup": "/src/public/templates/auth/signup.html",
  "/logout": "/src/public/templates/auth/logout.html",
  "/forgot-password": "/src/public/templates/auth/forgot-password.html",
  "/verify-email": "/src/public/templates/auth/verify-email.html",
  "/reset-password": "/src/public/templates/auth/verify-email.html",
  
  /* =====================
     ADMIN
  ====================== */
  "/dashboard": "/src/public/templates/Admin/admin-dashboard.html",
  "/lessons": "/src/public/templates/Admin/admin-lessons.html",
  "/users": "/src/public/templates/Admin/admin-users.html",
  "/reports": "/src/public/templates/Admin/admin-reports.html",
  "/rewards": "/src/public/templates/Admin/admin-rewards.html",
  "/moderation": "/src/public/templates/Admin/admin-moderation.html",
  "/reported-content": "/src/public/templates/admin/admin-reported-content.html",

  /* =====================
     CHAT
  ====================== */
  "/chat": "/src/public/templates/chart /chat.html",
  "/private-chat": "/src/public/templates/chart/private-chat.html",
  "/chat-history": "/src/public/templates/chat-history.html",
  "/chat-moderation": "/src/public/templates/chat/chat-moderation.html",
  "/chat-settings": "/src/public/templates/chat/chat-settings.html",

  /* =====================
     DISCOVER
  ====================== */
  "/discover": "/src/public/templates/Discover/explorer.html",
  "/categories": "/src/public/templates/discover/categories.html",
  "/recommended": "/src/public/templates/Discover/recommended.html",
  "/trending": "/src/public/templates/Discover/trending.html",
  "/search": "/src/public/templates/Discover/search.html",
  "/tags": "/src/public/templates/Discover/tags.html",

  /* =====================
     REWARDS
  ====================== */
  "/rewards": "/src/public/templates/Rewards/rewards.html",
  "/wallet": "/src/public/templates/Rewards/wallet.html",
  "/earnings": "/src/public/templates/Rewards/earnings.html",
  "/withdraw": "/src/public/templates/Rewards/wallet.html",
  "/leaderboard": "/src/public/templates/Rewards/leaderboard.html",
  "/points-history": "/src/public/templates/rewards/points-history.html",

  /* =====================
     SOCIAL
  ====================== */
  "/profile": "/src/public/templates/social/profile.html",
  "/user-profile": "/src/public/templates/social/user-profile.html",
  "/followers": "/src/public/templates/social/followers.html",
  "/following": "/src/public/templates/social/following.html",
  "/activity": "/src/public/templates/social/activity-feed.html",

  /* =====================
     SETTINGS
  ====================== */
  "/settings": "/src/public/templates/settings/settings.html",
  "/theme": "/src/public/templates/settings/theme.html",
  "/language": "/src/public/templates/settings/language.html",
  "/preferences": "/src/public/templates/settings/preferences.html",
  "/security": "/src/public/templates/settings/security.html",
  "/privacy": "/src/public/templates/settings/privacy-policy.html",

  /* =====================
     SUPPORT
  ====================== */
  "/help": "/src/public/templates/support/help.html",
  "/faq": "/src/public/templates/support/FAQ.html",
  "/contact": "/src/public/templates/support/contact.html",
  "/feedback": "/src/public/templates/support/feedback.html",
  "/report": "/src/public/templates/support/report.html",
  "/community-guidelines": "/src/public/templates/support/community-guidelines.html",

  /* =====================
     MARKETING
  ====================== */
  "/about": "/src/public/templates/marketing /about.html",
  "/blog": "/src/public/templates/marketing/blog.html",
  "/pricing": "/src/public/templates/marketing/pricing.html",
  "/roadmap": "/src/public/templates/marketing/roadmap.html",
  "/press": "/src/public/templates/marketing/press.html",
  "/landing": "/src/public/templates/marketing/landing.html",

  /* =====================
     OFFLINE
  ====================== */
  "/offline": "/src/public/templates/offline/offline.html",
  "/library": "/src/public/templates/offline/offline-library.html",
  "/settings": "/src/public/templates/offline/offline-settings.html",
  "/queue": "/src/public/templates/offline/queue.html",
  "/sync": "/src/public/templates/offline/sync-status.html",
  "/downloads": "/src/public/templates/offline/download-manager.html",

  /* =====================
     LEGAL 
  ====================== */
  "/terms": "/src/public/templates/legal/terms.html",
  "/privacy": "/src/public/templates/legal/privacy.html",
  "/license": "/src/public/templates/legal/license.html",
  "/cookies": "/src/public/templates/legal/cookie-policy.html",

  /* =====================
     SYSTEM
  ====================== */
  "/404": "/src/public/templates/system/404.html",
  "/500": "/src/public/templates/system/500.html",
  "/maintenance": "/src/public/templates/system/maintenance.html",
  "/status": "/src/public/templates/system/status.html",
  "/changelog": "/src/public/templates/system/changelog.html"
};
  

  /* LOAD PAGE */
  async function loadPage(path) {
    const file = routes[path] || routes["/404"];
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error("Page not found");
      const html = await res.text();
      app.innerHTML = html;
    } catch (err) {
      app.innerHTML = "<h2>Page not found</h2>";
    }
  }

  /* ROUTER */
  function router() {
    const hash = location.hash.replace("#", "") || "/";
    loadPage(hash);
  }

  /* EVENTS */
  window.addEventListener("hashchange", router);
  window.addEventListener("load", router);
});

// Update copyright year for SPA pages
function updateYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.innerHTML = new Date().getFullYear();
  }
}

// Run on initial load
document.addEventListener("DOMContentLoaded", updateYear);

// Also run whenever SPA page changes
document.addEventListener("spa-page-changed", updateYear);