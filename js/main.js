
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const wrapper = document.getElementById('wrapper');
        const closeSidebar = document.getElementById('closeSidebar');

        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            wrapper.classList.toggle('active');
        });

        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            wrapper.classList.remove('active');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            wrapper.classList.remove('active');
        });

        const navWrapper = document.querySelector(".nav-items-wrapper");
        const scrollLeftBtn = document.getElementById("scrollLeft");
        const scrollRightBtn = document.getElementById("scrollRight");
    
        scrollLeftBtn.addEventListener("click", () => {
            navWrapper.scrollBy({ left: -200, behavior: "smooth" });
        });
    
        scrollRightBtn.addEventListener("click", () => {
            navWrapper.scrollBy({ left: 200, behavior: "smooth" });
        });

        