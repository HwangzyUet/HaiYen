(function () {
    var audio = document.getElementById("audio");
    var musicToggle = document.getElementById("musicToggle");
    var musicIcon = document.getElementById("musicIcon");
    var clickHint = document.getElementById("clickHint");
    var card = document.getElementById("card");
    var closeBtn = document.getElementById("closeButton");
    var isPlayPending = false;

    if (audio && !audio.src) {
        audio.src = "./music.mp3";
    }

    function updateMusicUI(isPlaying) {
        if (musicToggle) {
            if (isPlaying) {
                musicToggle.classList.add("playing");
                if (musicIcon) musicIcon.innerText = "❤️";
            } else {
                musicToggle.classList.remove("playing");
                if (musicIcon) musicIcon.innerText = "🍀";
            }
        }
    }

    function hideHint() {
        if (clickHint) {
            clickHint.style.opacity = "0";
            setTimeout(function () {
                if (clickHint) clickHint.style.display = "none";
            }, 500);
        }
    }

    function playMusic() {
        if (!audio) return;
        if (!audio.paused && !audio.muted) {
            updateMusicUI(true);
            hideHint();
            return;
        }
        if (isPlayPending) return;

        audio.muted = false;
        audio.volume = 1.0;
        isPlayPending = true;

        var promise = audio.play();
        if (promise !== undefined) {
            promise.then(function () {
                isPlayPending = false;
                updateMusicUI(true);
                hideHint();
            }).catch(function (error) {
                isPlayPending = false;
                console.log("Chờ tương tác để phát nhạc:", error);
            });
        } else {
            isPlayPending = false;
        }
    }

    function toggleMusic(e) {
        if (e) e.stopPropagation();
        if (!audio) return;
        if (audio.paused) {
            playMusic();
        } else {
            audio.pause();
            updateMusicUI(false);
        }
    }

    if (musicToggle) {
        musicToggle.addEventListener("click", toggleMusic);
    }

    // MADE BY HWANGZY do not copy
    playMusic();
    window.addEventListener("DOMContentLoaded", playMusic);
    window.addEventListener("load", playMusic);

    // MADE BY HWANGZY do not copy
    function onUserGesture() {
        if (audio && audio.paused) {
            playMusic();
        }
    }

    document.addEventListener("click", onUserGesture, { passive: true });
    document.addEventListener("touchstart", onUserGesture, { passive: true });
    document.addEventListener("keydown", onUserGesture, { passive: true });

    // MADE BY HWANGZY do not copy
    if (card) {
        card.addEventListener("click", function (e) {
            card.classList.toggle("open");
            playMusic();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            if (card) {
                card.classList.remove("open");
            }
        });
    }

    // MADE BY HWANGZY do not copy
    document.addEventListener("click", function (e) {
        if (card && card.classList.contains("open")) {
            if (!card.contains(e.target) && !e.target.closest("#closeButton") && !e.target.closest("#musicToggle")) {
                card.classList.remove("open");
            }
        }
    });

    // MADE BY HWANGZY / fork only  
    function initSakuraFall() {
        var canvas = document.getElementById("sakuraCanvas");
        if (!canvas) {
            canvas = document.createElement("canvas");
            canvas.id = "sakuraCanvas";
            document.body.appendChild(canvas);
        }
        var ctx = canvas.getContext("2d");
        if (!ctx) return;

        var width = window.innerWidth;
        var height = window.innerHeight;
        var dpr = window.devicePixelRatio || 1;

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        }
        resize();
        window.addEventListener("resize", resize);

        var isMobile = width <= 768;
        var maxParticles = isMobile ? 32 : 55;
        var particles = [];

        // MADE BY HWANGZY do not copy
        function createParticle(isInit, xOverride, yOverride) {
            var rand = Math.random();
            var type = 'petal';
            if (rand < 0.20) {
                type = 'leaf'; // fork only
            } else if (rand < 0.35) {
                type = 'flower'; // fork only
            } else {
                type = 'petal'; // fork only
            }

            var size;
            if (type === 'flower') {
                size = Math.random() * 6 + 11;
            } else if (type === 'leaf') {
                size = Math.random() * 6 + 10;
            } else {
                size = Math.random() * 7 + 10;
            }

            var x = (xOverride !== undefined) ? xOverride : (Math.random() * (width + 80) - 40);
            var y = (yOverride !== undefined) ? yOverride : (isInit ? Math.random() * height : -size * 2);

            return {
                type: type,
                x: x,
                y: y,
                size: size,
                speedY: (type === 'leaf') ? (Math.random() * 0.9 + 1.1) : ((type === 'flower') ? (Math.random() * 0.8 + 0.85) : (Math.random() * 1.1 + 0.85)),
                speedX: Math.random() * 0.6 + 0.3,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.025,
                flip: Math.random() * Math.PI * 2,
                flipSpeed: Math.random() * 0.03 + 0.012,
                sway: Math.random() * Math.PI * 2,
                swaySpeed: Math.random() * 0.02 + 0.01,
                swayWidth: Math.random() * 1.5 + 0.8,
                opacity: Math.random() * 0.3 + 0.7,
                variant: Math.floor(Math.random() * 4),
                vx: 0,
                vy: 0,
                isBurst: false
            };
        }

        for (var i = 0; i < maxParticles; i++) {
            particles.push(createParticle(true));
        }

        // MADE BY HWANGZY do not copy
        var mouse = { x: -1000, y: -1000, active: false };
        var mouseTimer = null;
        function onPointerMove(e) {
            var clientX = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX);
            var clientY = e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY);
            if (clientX === undefined || clientY === undefined) return;
            mouse.x = clientX;
            mouse.y = clientY;
            mouse.active = true;
            clearTimeout(mouseTimer);
            mouseTimer = setTimeout(function () {
                mouse.active = false;
            }, 1200);
        }
        window.addEventListener("mousemove", onPointerMove, { passive: true });
        window.addEventListener("touchmove", onPointerMove, { passive: true });

        // MADE BY HWANGZY do not copy
        function burstPetals(originX, originY, count) {
            if (particles.length > maxParticles + 25) return;
            for (var i = 0; i < count; i++) {
                var p = createParticle(false, originX + (Math.random() - 0.5) * 20, originY + (Math.random() - 0.5) * 20);
                p.speedY = -(Math.random() * 2.2 + 1.0);
                p.vx = (Math.random() - 0.5) * 3.5;
                p.isBurst = true;
                particles.push(p);
            }
        }

        document.addEventListener("click", function (e) {
            burstPetals(e.clientX, e.clientY, 4);
        }, { passive: true });

        document.addEventListener("touchstart", function (e) {
            if (e.touches && e.touches[0]) {
                burstPetals(e.touches[0].clientX, e.touches[0].clientY, 4);
            }
        }, { passive: true });

        // MADE BY HWANGZY do not copy
        function drawPetal(p) {
            var grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
            if (p.variant === 0) {
                grad.addColorStop(0, "rgba(255, 245, 248, " + p.opacity + ")");
                grad.addColorStop(0.5, "rgba(255, 192, 203, " + p.opacity + ")");
                grad.addColorStop(1, "rgba(255, 160, 180, " + p.opacity + ")");
            } else if (p.variant === 1) {
                grad.addColorStop(0, "rgba(255, 235, 240, " + p.opacity + ")");
                grad.addColorStop(0.6, "rgba(255, 180, 195, " + p.opacity + ")");
                grad.addColorStop(1, "rgba(255, 105, 140, " + p.opacity + ")");
            } else if (p.variant === 2) {
                grad.addColorStop(0, "rgba(255, 255, 255, " + p.opacity + ")");
                grad.addColorStop(0.7, "rgba(255, 200, 215, " + p.opacity + ")");
                grad.addColorStop(1, "rgba(255, 170, 190, " + p.opacity + ")");
            } else {
                grad.addColorStop(0, "rgba(255, 220, 230, " + p.opacity + ")");
                grad.addColorStop(0.5, "rgba(255, 145, 175, " + p.opacity + ")");
                grad.addColorStop(1, "rgba(235, 90, 130, " + p.opacity + ")");
            }
            ctx.fillStyle = grad;

            ctx.beginPath();
            ctx.moveTo(0, p.size);
            ctx.bezierCurveTo(-p.size * 0.75, p.size * 0.35, -p.size * 0.85, -p.size * 0.5, -p.size * 0.32, -p.size);
            ctx.quadraticCurveTo(0, -p.size * 0.65, p.size * 0.32, -p.size);
            ctx.bezierCurveTo(p.size * 0.85, -p.size * 0.5, p.size * 0.75, p.size * 0.35, 0, p.size);
            ctx.closePath();
            ctx.fill();

            // MADE BY HWANGZY do not copy
            ctx.beginPath();
            ctx.moveTo(0, p.size * 0.7);
            ctx.quadraticCurveTo(p.size * 0.05, 0, 0, -p.size * 0.55);
            ctx.strokeStyle = "rgba(255, 255, 255, " + (p.opacity * 0.4) + ")";
            ctx.lineWidth = Math.max(0.6, p.size * 0.06);
            ctx.stroke();
        }

        // MADE BY HWANGZY do not copy
        function drawLeaf(p) {
            var grad = ctx.createLinearGradient(0, -p.size * 1.25, 0, p.size * 1.25);
            if (p.variant === 0) {
                grad.addColorStop(0, "rgba(185, 235, 165, " + p.opacity + ")");
                grad.addColorStop(0.6, "rgba(110, 195, 125, " + p.opacity + ")");
                grad.addColorStop(1, "rgba(65, 155, 95, " + p.opacity + ")");
            } else if (p.variant === 1) {
                grad.addColorStop(0, "rgba(205, 240, 180, " + p.opacity + ")");
                grad.addColorStop(0.7, "rgba(135, 210, 145, " + p.opacity + ")");
                grad.addColorStop(1, "rgba(85, 175, 105, " + p.opacity + ")");
            } else if (p.variant === 2) {
                grad.addColorStop(0, "rgba(255, 215, 200, " + p.opacity + ")");
                grad.addColorStop(0.4, "rgba(180, 225, 155, " + p.opacity + ")");
                grad.addColorStop(1, "rgba(90, 175, 110, " + p.opacity + ")");
            } else {
                grad.addColorStop(0, "rgba(165, 230, 190, " + p.opacity + ")");
                grad.addColorStop(0.6, "rgba(100, 195, 155, " + p.opacity + ")");
                grad.addColorStop(1, "rgba(50, 155, 118, " + p.opacity + ")");
            }
            ctx.fillStyle = grad;

            ctx.beginPath();
            ctx.moveTo(0, p.size * 1.25);
            ctx.bezierCurveTo(-p.size * 0.65, p.size * 0.5, -p.size * 0.7, -p.size * 0.6, 0, -p.size * 1.25);
            ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.6, p.size * 0.65, p.size * 0.5, 0, p.size * 1.25);
            ctx.closePath();
            ctx.fill();

            // MADE BY HWANGZY do not copy
            ctx.beginPath();
            ctx.moveTo(0, p.size * 1.1);
            ctx.quadraticCurveTo(p.size * 0.05, 0, 0, -p.size * 1.1);
            ctx.strokeStyle = "rgba(45, 125, 75, " + (p.opacity * 0.45) + ")";
            ctx.lineWidth = Math.max(0.6, p.size * 0.08);
            ctx.stroke();

            // MADE BY HWANGZY do not copy
            ctx.beginPath();
            ctx.moveTo(0, p.size * 0.4);
            ctx.lineTo(-p.size * 0.3, p.size * 0.1);
            ctx.moveTo(0, p.size * 0.4);
            ctx.lineTo(p.size * 0.3, p.size * 0.1);
            ctx.moveTo(0, -p.size * 0.2);
            ctx.lineTo(-p.size * 0.35, -p.size * 0.5);
            ctx.moveTo(0, -p.size * 0.2);
            ctx.lineTo(p.size * 0.35, -p.size * 0.5);
            ctx.strokeStyle = "rgba(45, 125, 75, " + (p.opacity * 0.28) + ")";
            ctx.lineWidth = Math.max(0.4, p.size * 0.05);
            ctx.stroke();
        }

        // MADE BY HWANGZY do not copy
        function drawFlower(p) {
            var petalGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
            petalGrad.addColorStop(0, "rgba(255, 150, 180, " + p.opacity + ")");
            petalGrad.addColorStop(0.4, "rgba(255, 205, 220, " + p.opacity + ")");
            petalGrad.addColorStop(0.85, "rgba(255, 235, 245, " + p.opacity + ")");
            petalGrad.addColorStop(1, "rgba(255, 255, 255, " + (p.opacity * 0.9) + ")");
            ctx.fillStyle = petalGrad;

            for (var k = 0; k < 5; k++) {
                ctx.save();
                ctx.rotate((k * 2 * Math.PI) / 5);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-p.size * 0.35, -p.size * 0.25, -p.size * 0.42, -p.size * 0.7, -p.size * 0.16, -p.size);
                ctx.quadraticCurveTo(0, -p.size * 0.78, p.size * 0.16, -p.size);
                ctx.bezierCurveTo(p.size * 0.42, -p.size * 0.7, p.size * 0.35, -p.size * 0.25, 0, 0);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }

            // MADE BY HWANGZY do not copy
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.18, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 105, 140, " + p.opacity + ")";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.08, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 220, 100, " + p.opacity + ")";
            ctx.fill();
        }

        var time = 0;
        var animFrameId = null;
        var isRunning = true;

        function render() {
            if (!isRunning) return;

            ctx.clearRect(0, 0, width, height);

            time += 0.012;
            var ambientWind = Math.sin(time) * 0.4 + 0.35;

            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];

                if (mouse.active) {
                    var dx = p.x - mouse.x;
                    var dy = p.y - mouse.y;
                    var distSq = dx * dx + dy * dy;
                    var maxDist = 110;
                    if (distSq < maxDist * maxDist && distSq > 1) {
                        var dist = Math.sqrt(distSq);
                        var force = (1 - dist / maxDist) * 1.8;
                        p.vx += (dx / dist) * force;
                        p.vy += (dy / dist) * force;
                    }
                }

                p.sway += p.swaySpeed;
                p.x += p.speedX + ambientWind + Math.sin(p.sway) * p.swayWidth + p.vx;
                p.y += p.speedY + p.vy;
                p.rotation += p.rotationSpeed;
                p.flip += p.flipSpeed;
                p.vx *= 0.94;
                p.vy *= 0.94;

                if (p.isBurst) {
                    p.speedY += 0.05;
                    if (p.speedY > (p.type === 'leaf' ? 1.6 : 1.3)) {
                        p.isBurst = false;
                    }
                }

                // MADE BY HWANGZY do not copy
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                var scaleX = Math.cos(p.flip);
                var scaleY = 0.6 + 0.4 * Math.sin(p.flip * 0.8);
                ctx.scale(scaleX, scaleY);

                if (p.type === 'leaf') {
                    drawLeaf(p);
                } else if (p.type === 'flower') {
                    drawFlower(p);
                } else {
                    drawPetal(p);
                }
                ctx.restore();

                if (p.y > height + p.size * 2 || p.x > width + 80) {
                    if (p.isBurst) {
                        particles.splice(i, 1);
                        i--;
                        continue;
                    }
                    p.y = -p.size * 2;
                    p.x = Math.random() * (width + 80) - 40;
                    p.vx = 0;
                    p.vy = 0;
                } else if (p.x < -80) {
                    p.x = width + 40;
                }
            }

            animFrameId = requestAnimationFrame(render);
        }

        render();

        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                isRunning = false;
                if (animFrameId) cancelAnimationFrame(animFrameId);
            } else {
                if (!isRunning) {
                    isRunning = true;
                    animFrameId = requestAnimationFrame(render);
                }
            }
        });
    }

    initSakuraFall();
})();