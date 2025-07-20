document.addEventListener("DOMContentLoaded", function () {
    const shotsGrid = document.querySelector(".shots-grid");
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.getElementById("close-btn");
    const toggleButton = document.querySelector('.navbar__toggle');
    const navMenu = document.querySelector('.navbar__menu');
    const navLinks = document.querySelectorAll('.navbar__links');
    let highlightsCounter = 0;
    let highlightsActive = document.querySelector('.hero__highlights-no span');
    let highlightButtons = document.querySelectorAll('.hero__highlights-list-item');
    let resetButton = document.querySelector('.hero__highlights-reset');
    let highlightsCount = document.querySelector('.hero__highlights-count');
    

    if (toggleButton && navMenu) {
        toggleButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Hide the header when scrolling down and show it when scrolling up
    const header = document.querySelector("header");
    let lastScrollY = window.scrollY;
    const threshold = 10;
    const isLargeScreen = () => window.matchMedia("(min-width: 1024px)").matches;


  window.addEventListener("scroll", () => {
    if (!isLargeScreen()) return;
      if (window.scrollY > lastScrollY) {
          header.style.transform = "translateY(100%)"; // Hide header
      } else {
          header.style.transform = "translateY(0)"; // Show header
      }
      lastScrollY = window.scrollY;
  });

  

    // Image sets for two scrolling rows
    const imagesRow1 = [
        "https://res.cloudinary.com/dekvvbagz/image/upload/v1743897008/home-credit-card_dfvztx.png",
       "https://res.cloudinary.com/dekvvbagz/image/upload/v1743967130/safetoken-pages_fcfelj.gif",
       "https://res.cloudinary.com/dekvvbagz/image/upload/v1743967135/home-limit-set_fsiyij.png",
       "https://res.cloudinary.com/dekvvbagz/image/upload/v1743967139/qtr-web-dark_wy6fxv.gif",
       "https://res.cloudinary.com/dekvvbagz/image/upload/v1743942743/opscentral-cards_amugtk.gif",
       "https://res.cloudinary.com/dekvvbagz/image/upload/v1743967153/qtr-home-change_shdqmv.gif",
       "https://res.cloudinary.com/dekvvbagz/image/upload/v1743967160/qhome-mock_cgfb3i.png",
       "https://res.cloudinary.com/dekvvbagz/image/upload/v1743967176/qtr-jumbotron_i6jvof.gif",
       "https://res.cloudinary.com/dekvvbagz/image/upload/v1743967190/qtr-web_w9ds0h.gif"
    ];

    const imagesRow2 = [
        "https://res.cloudinary.com/dekvvbagz/image/upload/v1743967217/opscentral-table-pan_epfekh.gif",
       "https://res.cloudinary.com/dekvvbagz/image/upload/v1743967222/home-icons_loo7bm.svg",
       "https://res.cloudinary.com/dekvvbagz/image/upload/v1743967228/safetoken-home_sbs63r.gif",
       "https://res.cloudinary.com/dekvvbagz/image/upload/v1743967235/safetoken-code-use_lwefak.gif",
       "https://res.cloudinary.com/dekvvbagz/image/upload/v1743967244/home-upload_emmjob.png",
       "https://res.cloudinary.com/dekvvbagz/image/upload/v1743967276/safetoken-admin-3_dqnbls.png",
       "https://res.cloudinary.com/dekvvbagz/image/upload/v1743967281/home-dev-console_iwuepq.png",
       "https://res.cloudinary.com/dekvvbagz/image/upload/v1743967269/smarthealth-1_pdp2m0.png",
       "https://res.cloudinary.com/dekvvbagz/image/upload/v1743967288/ops-lpg_reb1gr.png"
    ];

    // Function to create a scrolling row
    function createRow(images, className) {
        const row = document.createElement("div");
        row.classList.add("shots-row", className);

        images.forEach((src) => {
            const shot = document.createElement("div");
            shot.classList.add("shot");

            const img = document.createElement("img");
            img.src = src;
            img.alt = "Portfolio Image";

            // Open modal on click
            img.addEventListener("click", function () {
                modalImg.src = this.src;
                modal.classList.add("active");
            });

            shot.appendChild(img);
            row.appendChild(shot);
        });

        return row;
    }

    // Append rows to the shots grid
    const row1 = createRow(imagesRow1, "row-1");
    const row2 = createRow(imagesRow2, "row-2");
    shotsGrid.appendChild(row1);
    shotsGrid.appendChild(row2);

    console.log(shotsGrid.children);

    // Function for smooth infinite scrolling
    function startScrolling(row, speed) {
        let isHovered = false; // Stops scrolling when user hovers

        row.addEventListener("mouseenter", () => (isHovered = true));
        row.addEventListener("mouseleave", () => (isHovered = false));

        function scroll() {
            if (!isHovered) {
                row.scrollLeft += speed;
                if (row.scrollLeft >= row.scrollWidth - row.clientWidth) {
                    row.scrollLeft = 1; // Loop back to start
                }
            }
            requestAnimationFrame(scroll);
        }

        setTimeout(() => scroll(), 100); // Delay for images to load
    }

    // Start smooth scrolling
    setTimeout(() => {
        startScrolling(row1, 1); // Scroll right slowly
        startScrolling(row2, 1); // Scroll left slowly
    }, 1000);

    // Close modal when clicking outside the image
    modal.addEventListener("click", function (event) {
        if (event.target !== modalImg) {
            modal.classList.remove("active");
        }
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener("click", function () {
        modal.classList.remove("active");
    });
});