
// Navigation script
// This sccript handles the visibility of navigation links
// for example hide the create link if user is not logged in and is not a creator

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-item");
    const authToken = localStorage.getItem("authToken");
    const user = localStorage.getItem("userId");

    if (authToken) {
        // If user exists, check role for create link
        if (user) {
            fetch(`/api/users/${user}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((res) => res.json())
            .then((data) => {
                // Hide create link if user is not an instructor
                if (data.role !== "instructor") {
                    navLinks.forEach((link) => {
                        if (link.getAttribute("href") === "/create") {
                            link.style.display = "none";
                        }
                    });
                }

            })
            .catch((err) => console.error("Error fetching user data:", err));
        }
        
        // If token exists, show all nav links
        navLinks.forEach((link) => (link.style.display = "flex"));
        if (href === "/signin" || href === "/signup") {
            link.style.display = "none";
        }
    } else {
        // If no token, hide create and profile links
        navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === "/create" || href === "/profile") {
                link.style.display = "none";
            }
        });
    }
});