document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/signin";
    return;
  }

  try {
    const res = await fetch("/api/auth/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Profile error:", data);
      // If token invalid or expired, remove token and redirect to sign in
      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/signin";
      }
      return;
    }

    // Backend sometimes returns the user directly (res.json() === user)
    // and sometimes wraps it as { user: user } (other endpoints). Support both.
    const user = data.user || data;

    console.log("profile user:", user);

    if (!user) {
      console.error("No user returned from profile endpoint:", data);
      localStorage.removeItem("token");
      window.location.href = "/signin";
      return;
    }

    // Fill profile header (guard DOM access in case element is missing)
    const profileNameEl = document.getElementById("profile-name");
    const profileUsernameEl = document.getElementById("profile-username");
    if (profileNameEl) profileNameEl.textContent = user.username || user.name || "User";
    if (profileUsernameEl) profileUsernameEl.textContent = "@" + (user.username || user.name || "user");
    // document.getElementById("profile-avatar").src = user.avatar || "/images/default.png";

    // // Stats
    // document.getElementById("stat-points").textContent = user.points || 0;
    // document.getElementById("stat-lessons").textContent = user.lessonsCompleted || 0;
    // document.getElementById("stat-rank").textContent = user.rank || "—";
    // document.getElementById("stat-followers").textContent = user.followers.length;
    // document.getElementById("stat-following").textContent = user.following.length;

    // Followers list
    // const followersList = document.getElementById("followers-ul");
    // followersList.innerHTML = "";
    // user.followers.forEach(f => {
    //   followersList.innerHTML += `
    //     <li style="padding:10px; background:rgba(99,102,241,0.1); margin-bottom:5px; border-radius:8px;">
    //       <div style="display:flex; align-items:center; gap:10px;">
    //         <img src="/images/avatar.jpeg" style="width:40px; height:40px; border-radius:50%;">
    //         <span>${f}</span>
    //       </div>
    //       <button class="btn">Follow</button>
    //     </li>
    //   `;
    // });

    // Following list
    // const followingList = document.getElementById("following-ul");
    // followingList.innerHTML = "";
    // user.following.forEach(f => {
    //   followingList.innerHTML += `
    //     <li style="padding:10px; background:rgba(99,102,241,0.1); margin-bottom:5px; border-radius:8px;">
    //       <div style="display:flex; align-items:center; gap:10px;">
    //         <img src="/images/avatar.jpeg" style="width:40px; height:40px; border-radius:50%;">
    //         <span>${f}</span>
    //       </div>
    //       <button class="btn">Unfollow</button>
    //     </li>
    //   `;
    // });

    // Badges
    // const badgeDiv = document.getElementById("user-badges");
    // badgeDiv.innerHTML = "";
    // user.badges.forEach(b => {
    //   badgeDiv.innerHTML += `<div class="badge">${b}</div>`;
    // });

    // Activity
    // const activityUl = document.getElementById("recent-activity");
    // activityUl.innerHTML = "";
    // user.recentActivity.forEach(a => {
    //   activityUl.innerHTML += `
    //     <li class="activity-item">${a}</li>
    //   `;
    // });

  } catch (err) {
    console.error("Error loading profile:", err);
  }
});
