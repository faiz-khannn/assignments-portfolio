window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        document.getElementById("scrollIndicator").style.width =
          scrollPercent + "%";
      });

      // Navbar scroll effect
      window.addEventListener("scroll", () => {
        const navbar = document.getElementById("navbar");
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      });

      // Mobile menu toggle
      document.getElementById("menuToggle").addEventListener("click", () => {
        const navLinks = document.getElementById("navLinks");
        navLinks.classList.toggle("active");
      });

      // Scroll reveal animation
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      }, observerOptions);

      document.querySelectorAll(".scroll-reveal").forEach((el) => {
        observer.observe(el);
      });

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
          // Close mobile menu if open
          document.getElementById("navLinks").classList.remove("active");
        });
      });

      // Form submission
      document
        .querySelector(".contact-form")
        .addEventListener("submit", (e) => {
          e.preventDefault();
          const submitBtn = document.querySelector(".submit-btn");
          const originalText = submitBtn.textContent;
          submitBtn.textContent = "Sending...";
          submitBtn.disabled = true;

          // Simulate form submission
          setTimeout(() => {
            submitBtn.textContent = "Message Sent! ✓";
            setTimeout(() => {
              submitBtn.textContent = originalText;
              submitBtn.disabled = false;
              document.querySelector(".contact-form").reset();
            }, 2000);
          }, 1500);
        });

      // Parallax effect for hero section
      window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector(".hero-content");
        const heroImage = document.querySelector(".hero-image");

        if (heroContent && heroImage) {
          heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
          heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
      });

      // interactive hover effects
      document.querySelectorAll(".skill-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          card.style.transform = "translateY(-5px) scale(1.05)";
        });
        card.addEventListener("mouseleave", () => {
          card.style.transform = "translateY(0) scale(1)";
        });
      });

      // Typing effect for hero title 
      function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = "";
        function type() {
          if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
          }
        }
        type();
      }

      // typing effect after page load
      window.addEventListener("load", () => {
        setTimeout(() => {
          const heroTitle = document.querySelector(".hero-title");
          if (heroTitle) {
            typeWriter(heroTitle, "Mohammad Faiz Khan", 120);
          }
        }, 1000);
      });

      // dynamic background particles
      function createParticle() {
        const particle = document.createElement("div");
        particle.style.position = "fixed";
        particle.style.width = Math.random() * 5 + "px";
        particle.style.height = particle.style.width;
        particle.style.background = `linear-gradient(45deg, var(--primary-color), var(--secondary-color))`;
        particle.style.borderRadius = "50%";
        particle.style.left = Math.random() * window.innerWidth + "px";
        particle.style.top = window.innerHeight + "px";
        particle.style.opacity = "0.1";
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "-1";
        particle.style.transition = "transform 10s linear, opacity 10s linear";

        document.body.appendChild(particle);

        setTimeout(() => {
          particle.style.transform = `translateY(-${
            window.innerHeight + 100
          }px) rotate(720deg)`;
          particle.style.opacity = "0";
        }, 100);

        setTimeout(() => {
          document.body.removeChild(particle);
        }, 10000);
      }

      // Create particles periodically
      setInterval(createParticle, 2000);

      // scroll-triggered animations for project cards
      const projectCards = document.querySelectorAll(".project-card");
      const projectObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
              }, index * 200);
            }
          });
        },
        { threshold: 0.1 }
      );

      projectCards.forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        projectObserver.observe(card);
      });

      // loading screen animation
      // function showLoadingScreen() {
      //   const loadingScreen = document.createElement("div");
      //   loadingScreen.style.cssText = `
      //           position: fixed;
      //           top: 0;
      //           left: 0;
      //           width: 100%;
      //           height: 100%;
      //           background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      //           display: flex;
      //           align-items: center;
      //           justify-content: center;
      //           z-index: 10000;
      //           transition: opacity 0.5s ease;
      //       `;

      //   const loader = document.createElement("div");
      //   loader.style.cssText = `
      //           width: 60px;
      //           height: 60px;
      //           border: 4px solid rgba(255, 255, 255, 0.3);
      //           border-top: 4px solid white;
      //           border-radius: 50%;
      //           animation: spin 1s linear infinite;
      //       `;

      //   const style = document.createElement("style");
      //   style.textContent = `
      //           @keyframes spin {
      //               0% { transform: rotate(0deg); }
      //               100% { transform: rotate(360deg); }
      //           }
      //       `;
      //   document.head.appendChild(style);

      //   loadingScreen.appendChild(loader);
      //   document.body.appendChild(loadingScreen);

      //   setTimeout(() => {
      //     loadingScreen.style.opacity = "0";
      //     setTimeout(() => {
      //       document.body.removeChild(loadingScreen);
      //       document.head.removeChild(style);
      //     }, 500);
      //   }, 2000);
      // }

      // loading screen on page load
      //document.addEventListener("DOMContentLoaded", showLoadingScreen);

      // mouse follower effect
      let mouseFollower = null;

      function createMouseFollower() {
        mouseFollower = document.createElement("div");
        mouseFollower.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: 0.3;
                transition: all 0.1s ease;
                transform: translate(-50%, -50%);
            `;
        document.body.appendChild(mouseFollower);
      }

      document.addEventListener("mousemove", (e) => {
        if (!mouseFollower) createMouseFollower();
        mouseFollower.style.left = e.clientX + "px";
        mouseFollower.style.top = e.clientY + "px";
      });

      // Hide mouse follower on mobile
      if (window.innerWidth <= 768) {
        document.addEventListener("mousemove", () => {
          if (mouseFollower) {
            mouseFollower.style.display = "none";
          }
        });
      }

      // easter egg - Konami code
      let konamiCode = [];
      const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

      document.addEventListener("keydown", (e) => {
        konamiCode.push(e.keyCode);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(",") === konamiSequence.join(",")) {
          document.body.style.animation = "rainbow 2s ease-in-out";

          const style = document.createElement("style");
          style.textContent = `
                    @keyframes rainbow {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(360deg); }
                    }
                `;
          document.head.appendChild(style);

          setTimeout(() => {
            document.body.style.animation = "";
            document.head.removeChild(style);
          }, 2000);

          konamiCode = [];
        }
      });