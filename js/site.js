(function () {
  const appView = document.querySelector("[data-app-view]");
  const brandText = document.querySelector(".brand-text");
  const routeLinks = document.querySelectorAll("[data-route-link]");
  const siteHeader = document.querySelector(".site-header");
  const siteAudio = document.querySelector(".site-audio");
  const audioToggles = document.querySelectorAll(".audio-toggle");
  const canvas = document.querySelector("[data-wave-canvas]");

  if (!appView || !brandText || !canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let audioEnabled = false;
  let homeScene = "waves";
  let postsPage = 0;
  const homeScenes = ["waves", "fractal", "circles", "patterns", "code"];
  let patternField = {
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5
  };
  let codeWall = {
    lines: [],
    charsPerLine: 0,
    lineCount: 0
  };
  const codeTokens = [
    "const","let","var","function","return","if","else","for","while","switch","case","break","continue",
    "async","await","Promise","Object","Array","map","filter","reduce","slice","push","join","split","Math",
    "window","document","querySelector","addEventListener","requestAnimationFrame","className","dataset",
    "=== !== <= >= && || =>","null","undefined","true","false","try","catch","finally","new","Date.now()",
    "JSON.stringify","JSON.parse","setTimeout","clearTimeout","fetch","response","payload","config","options",
    "{","}","(",")","[","]",";","=>","++","--","?.","??","&&","||","!==","===","<",">","+","-","*","/"
  ];

  const posts = [
    {
      slug: "sand-hill-road",
      date: "7 March 2022",
      title: "Secrets of Sand Hill Road",
      excerpt: "Reading notes on pitching, market sizing, venture expectations, and what founders need to communicate clearly.",
      description: "Notes on pitching, venture capital, and communicating market size.",
      content: [
        "A strong pitch is rarely just information delivery. It is a combination of clarity, confidence, timing, and the ability to help someone else quickly see the shape of a market. Warm introductions help, but the deeper point is that founders need a way to earn attention.",
        "Market sizing sits at the center of that conversation. Investors are trying to understand not only whether a company can build a product, but whether the opportunity is large enough to support venture-scale outcomes. That means founders need to explain the market in a way that is legible, concrete, and credible.",
        "The notes also underline how much storytelling matters. Numbers are necessary, but conviction usually arrives through narrative: why this problem matters, why the timing is right, and why this team is the one that can navigate the uncertainty around it.",
        "What I like about these ideas is that they apply beyond fundraising. Any ambitious project benefits from the same discipline: know the audience, define the stakes, and communicate the opportunity with enough precision that people can join you in it."
      ]
    },
    {
      slug: "lessons-in-management",
      date: "23 May 2018",
      title: "Lessons in Management",
      excerpt: "Notes on customer obsession, long-term thinking, and the habits that help teams stay adaptable under pressure.",
      description: "Notes on customer obsession, invention, and long-term thinking.",
      content: [
        "One of the ideas that stuck with me most is that customer obsession is not the same thing as simply reacting to feedback. It is a deeper commitment to inventing on behalf of people, sometimes before they can clearly describe what they want.",
        "That framing naturally leads to long-term thinking. If the horizon is only the next quarter, the work tends to collapse into local optimization. Stretch the time frame to five or seven years and the choices become more foundational: what capabilities to build, what culture to reinforce, and where patience is actually a competitive advantage.",
        "Another useful reminder is that resilience is rarely theatrical. Great operators often just keep moving. They absorb setbacks, adjust, and continue. In practice that means management is less about perfect plans and more about maintaining clarity, momentum, and trust when conditions change.",
        "The notes also point back to something simple: good management is not only execution. It is judgment. Knowing when to listen, when to invent, when to commit, and when to keep the team anchored to the thing that matters most."
      ]
    }
  ];

  const pointer = {
    x: window.innerWidth * 0.65,
    y: window.innerHeight * 0.54,
    tx: window.innerWidth * 0.65,
    ty: window.innerHeight * 0.54,
    active: false,
    vx: 0,
    vy: 0,
    energy: 0
  };

  const circleField = {
    x: window.innerWidth * 0.65,
    y: window.innerHeight * 0.54,
    distance: 0,
    angle: 0
  };

  const keyRipple = {
    energy: 0,
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.54,
    phase: 0,
    direction: 1,
    radius: 0
  };

  const waves = [
    { amp: 92, freq: 0.0078, speed: 0.00092, offset: 0.0, influence: 210, shift: -72, lines: 24, spread: 96, depth: 40, ridge: 2.08, ridgeMix: 0.36, glowWidth: 10, palette: { low: [52, 138, 240], mid: [103, 68, 235], high: [235, 92, 198] } },
    { amp: 122, freq: 0.0068, speed: 0.00074, offset: 1.7, influence: 244, shift: -38, lines: 30, spread: 128, depth: 50, ridge: 2.28, ridgeMix: 0.48, glowWidth: 12, palette: { low: [42, 210, 198], mid: [114, 108, 240], high: [236, 152, 72] } },
    { amp: 102, freq: 0.0082, speed: 0.00102, offset: 2.6, influence: 218, shift: -16, lines: 22, spread: 86, depth: 36, ridge: 2.12, ridgeMix: 0.38, glowWidth: 9, palette: { low: [64, 182, 238], mid: [88, 210, 174], high: [236, 116, 194] } },
    { amp: 78, freq: 0.0093, speed: 0.00095, offset: 3.5, influence: 198, shift: 12, lines: 18, spread: 58, depth: 26, ridge: 1.86, ridgeMix: 0.28, glowWidth: 8, palette: { low: [56, 126, 236], mid: [115, 68, 236], high: [235, 84, 176] } },
    { amp: 94, freq: 0.0074, speed: 0.00082, offset: 4.4, influence: 226, shift: 36, lines: 20, spread: 76, depth: 30, ridge: 1.98, ridgeMix: 0.32, glowWidth: 9, palette: { low: [62, 196, 238], mid: [92, 184, 235], high: [236, 102, 184] } },
    { amp: 72, freq: 0.0103, speed: 0.00108, offset: 5.15, influence: 188, shift: 62, lines: 16, spread: 48, depth: 22, ridge: 1.74, ridgeMix: 0.24, glowWidth: 7, palette: { low: [74, 156, 236], mid: [110, 214, 190], high: [235, 140, 92] } },
    { amp: 110, freq: 0.0065, speed: 0.00068, offset: 5.9, influence: 252, shift: -98, lines: 24, spread: 104, depth: 42, ridge: 2.18, ridgeMix: 0.4, glowWidth: 10, palette: { low: [52, 176, 236], mid: [72, 222, 196], high: [188, 108, 236] } },
    { amp: 82, freq: 0.0088, speed: 0.0009, offset: 6.7, influence: 212, shift: 88, lines: 18, spread: 58, depth: 24, ridge: 1.82, ridgeMix: 0.26, glowWidth: 8, palette: { low: [46, 196, 238], mid: [90, 146, 236], high: [236, 128, 166] } },
    { amp: 100, freq: 0.0071, speed: 0.00079, offset: 7.45, influence: 234, shift: 0, lines: 22, spread: 88, depth: 32, ridge: 2.04, ridgeMix: 0.34, glowWidth: 9, palette: { low: [54, 160, 236], mid: [92, 220, 208], high: [216, 116, 236] } },
    { amp: 76, freq: 0.0097, speed: 0.00098, offset: 8.2, influence: 196, shift: 112, lines: 16, spread: 52, depth: 22, ridge: 1.78, ridgeMix: 0.24, glowWidth: 7, palette: { low: [44, 184, 220], mid: [86, 132, 236], high: [236, 138, 138] } }
  ];

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrame = 0;
  let currentRoute = null;
  let typewriterRun = 0;

  function seededValue(a, b) {
    const raw = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
    return raw - Math.floor(raw);
  }

  function buildCodeWall() {
    const clipTop = siteHeader ? siteHeader.getBoundingClientRect().bottom + 14 : 120;
    const left = width * 0.012;
    const right = width * 0.988;
    const top = clipTop + 4;
    const bottom = height * 0.992;
    const lineHeight = 15;
    const charWidth = 7.2;
    const lineCount = Math.max(12, Math.floor((bottom - top) / lineHeight));
    const charsPerLine = Math.max(80, Math.floor((right - left) / charWidth));
    const lines = [];

    for (let line = 0; line < lineCount; line += 1) {
      let text = "";
      let tokenIndex = 0;
      while (text.length < charsPerLine + 24) {
        const seed = seededValue(line + 1, tokenIndex + 1);
        const token = codeTokens[Math.floor(seed * codeTokens.length) % codeTokens.length];
        text += token;
        tokenIndex += 1;
      }
      lines.push(text.slice(0, charsPerLine));
    }

    codeWall = {
      lines,
      charsPerLine,
      lineCount
    };
  }

  function sleep(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  async function startTypewriter(text) {
    const runId = ++typewriterRun;
    const typeDelay = 240;
    const restartDelay = 520;

    while (runId === typewriterRun && currentRoute && currentRoute.name === "home") {
      brandText.classList.remove("is-blinking");
      brandText.textContent = "";

      for (let index = 0; index < text.length; index += 1) {
        if (runId !== typewriterRun) {
          return;
        }
        brandText.textContent = text.slice(0, index + 1);
        await sleep(typeDelay);
      }

      brandText.classList.add("is-blinking");
      await sleep(2000);
      if (runId !== typewriterRun) {
        return;
      }
      brandText.classList.remove("is-blinking");
      await sleep(restartDelay);
    }
  }

  function setBrand(route) {
    brandText.classList.remove("is-blinking");
    if (route.name === "home") {
      startTypewriter("CLAV.DEV");
    } else {
      typewriterRun += 1;
      brandText.textContent = "CLAV.DEV";
    }
  }

  function setAudioState(isPlaying) {
    audioToggles.forEach((toggle) => {
      toggle.classList.toggle("is-off", !isPlaying);
      toggle.setAttribute("aria-pressed", String(isPlaying));
    });
  }

  async function playAudio() {
    if (!siteAudio) {
      return false;
    }

    try {
      siteAudio.loop = true;
      siteAudio.volume = 1;
      siteAudio.muted = false;
      await siteAudio.play();
      audioEnabled = true;
      setAudioState(true);
      return true;
    } catch (_error) {
      audioEnabled = false;
      setAudioState(false);
      return false;
    }
  }

  function pauseAudio() {
    if (siteAudio) {
      siteAudio.pause();
    }
    audioEnabled = false;
    setAudioState(false);
  }

  function initAudio() {
    if (!siteAudio) {
      return;
    }

    setAudioState(false);

    audioToggles.forEach((toggle) => {
      toggle.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle.blur();
        if (!audioEnabled || siteAudio.paused) {
          await playAudio();
        } else {
          pauseAudio();
        }
      });
    });
  }

  function normalizePath(pathname) {
    if (!pathname || pathname === "/") {
      return "/";
    }

    return pathname.endsWith("/") ? pathname : pathname + "/";
  }

  function resolveRoute(pathname) {
    const path = normalizePath(pathname);
    if (path === "/") {
      return { name: "home", title: "Clavance Lim", description: "Software and sound in a cinematic single-page experience." };
    }
    if (path === "/posts/") {
      return { name: "posts", title: "Posts - Clavance Lim", description: "Writing and notes by Clavance Lim." };
    }

    const postMatch = path.match(/^\/posts\/([^/]+)\/$/);
    if (postMatch) {
      const post = posts.find((entry) => entry.slug === postMatch[1]);
      if (post) {
        return { name: "post", post, title: `${post.title} - Clavance Lim`, description: post.description };
      }
    }

    return { name: "not-found", title: "Not Found - Clavance Lim", description: "Page not found." };
  }

  function updateMeta(route) {
    document.title = route.title;
    const description = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');

    if (description) description.setAttribute("content", route.description);
    if (ogTitle) ogTitle.setAttribute("content", route.title.replace(" - Clavance Lim", ""));
    if (ogDescription) ogDescription.setAttribute("content", route.description);
    if (ogUrl) ogUrl.setAttribute("content", "https://clav.dev" + normalizePath(window.location.pathname));
    if (twitterTitle) twitterTitle.setAttribute("content", route.title.replace(" - Clavance Lim", ""));
    if (twitterDescription) twitterDescription.setAttribute("content", route.description);
  }

  function renderHome() {
    return `
      <section class="hero" aria-label="Landing">
        <div class="hero-inner hero-inner-minimal">
          <div class="home-carousel home-carousel-minimal" aria-label="Home scenes">
            <button class="carousel-arrow" type="button" data-scene-shift="-1" aria-label="Previous graphic">&lt;</button>
            <span class="sr-only carousel-scene-label" aria-live="polite">${homeScene}</span>
            <button class="carousel-arrow" type="button" data-scene-shift="1" aria-label="Next graphic">&gt;</button>
          </div>
        </div>
      </section>
    `;
  }

  function renderPosts() {
    return `
      <section class="page-hero surface">
        <p class="eyebrow">Posts</p>
        <h1>Notes worth keeping.</h1>
        <p>A small set of reading notes and ideas on management, startups, and building with more intention.</p>
      </section>
      <section class="grid posts-grid">
        ${posts.map((post) => `
          <article class="card surface">
            <p class="meta">${post.date}</p>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <a class="article-link" href="/posts/${post.slug}/" data-route-link>Read article</a>
          </article>
        `).join("")}
      </section>
    `;
  }


  function renderPost(post) {
    return `
      <div class="article-shell">
        <article class="article surface">
          <p class="meta">${post.date}</p>
          <h1>${post.title}</h1>
          ${post.content.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          <p class="footer-note"><a href="/posts/" data-route-link>Back to posts</a></p>
        </article>
      </div>
    `;
  }

  function renderNotFound() {
    return `
      <section class="page-hero surface">
        <p class="eyebrow">Not Found</p>
        <h1>That page drifted away.</h1>
        <p>The route you asked for does not exist in this version of the site.</p>
      </section>
      <div class="hero-actions">
        <a class="button button-primary" href="/" data-route-link>Home</a>
        <a class="button" href="/posts/" data-route-link>Posts</a>
      </div>
    `;
  }

  function updateNav(route) {
    routeLinks.forEach((link) => {
      const href = normalizePath(link.getAttribute("href"));
      const isCurrent =
        (route.name === "home" && href === "/") ||
        (route.name === "about" && href === "/about/") ||
        ((route.name === "posts" || route.name === "post") && href === "/posts/");
      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function attachRouteLinks() {
    appView.querySelectorAll("[data-route-link]").forEach((link) => {
      link.addEventListener("click", handleRouteClick);
    });

    function shiftScene(shift) {
      const currentIndex = homeScenes.indexOf(homeScene);
      const nextIndex = (currentIndex + shift + homeScenes.length) % homeScenes.length;
      homeScene = homeScenes[nextIndex];
      const label = appView.querySelector(".carousel-scene-label");
      if (label) {
        label.textContent = homeScene;
      }
    }

    appView.querySelectorAll("[data-scene-shift]").forEach((button) => {
      button.addEventListener("click", () => {
        const shift = Number(button.getAttribute("data-scene-shift")) || 0;
        shiftScene(shift);
      });
    });

    const hero = appView.querySelector(".hero");
    if (hero) {
      let swipeAccum = 0;
      let swipeCooling = false;
      hero.addEventListener("wheel", (e) => {
        e.preventDefault();
        if (swipeCooling) return;
        swipeAccum += e.deltaX;
        if (Math.abs(swipeAccum) >= 60) {
          shiftScene(swipeAccum > 0 ? 1 : -1);
          swipeAccum = 0;
          swipeCooling = true;
          setTimeout(() => { swipeCooling = false; swipeAccum = 0; }, 800);
        }
      }, { passive: false });
    }
  }

  function setRouteVisuals(route) {
    document.body.classList.toggle("route-home", route.name === "home");
  }

  function renderRoute(pathname, push) {
    const route = resolveRoute(pathname);
    currentRoute = route;

    if (push) {
      window.history.pushState({}, "", normalizePath(pathname));
    }

    if (route.name === "home") {
      appView.innerHTML = renderHome();
    } else if (route.name === "posts") {
      appView.innerHTML = renderPosts();
    } else if (route.name === "post") {
      appView.innerHTML = renderPost(route.post);
    } else {
      appView.innerHTML = renderNotFound();
    }

    setBrand(route);
    updateNav(route);
    updateMeta(route);
    setRouteVisuals(route);
    attachRouteLinks();
    window.scrollTo(0, 0);
  }

  function handleRouteClick(event) {
    const link = event.currentTarget;
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.target === "_blank"
    ) {
      return;
    }

    const href = link.getAttribute("href");
    if (!href || href.startsWith("http")) {
      return;
    }

    event.preventDefault();
    renderRoute(href, true);
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildCodeWall();
  }

  function updatePointer(x, y) {
    const dx = x - pointer.tx;
    const dy = y - pointer.ty;
    pointer.vx = dx;
    pointer.vy = dy;
    pointer.energy = Math.min(1.8, pointer.energy + (Math.hypot(dx, dy) / 140));
    pointer.tx = x;
    pointer.ty = y;
    pointer.active = true;
  }

  function handlePointerLeave() {
    pointer.active = false;
    pointer.tx = width * 0.68;
    pointer.ty = height * 0.54;
  }

  function triggerKeyRipple() {
    if (!currentRoute || currentRoute.name !== "home") {
      return;
    }

    keyRipple.energy = Math.min(1.05, keyRipple.energy + 0.26);
    keyRipple.phase = 0;
    keyRipple.radius = 0;
    keyRipple.direction *= -1;
    keyRipple.x = pointer.active ? pointer.x : width * 0.5;
    keyRipple.y = pointer.active ? pointer.y : height * 0.54;
  }

  function backgroundGlow() {
    const gradientA = ctx.createRadialGradient(width * 0.22, height * 0.28, 0, width * 0.22, height * 0.28, width * 0.28);
    gradientA.addColorStop(0, "rgba(96, 244, 255, 0.10)");
    gradientA.addColorStop(1, "rgba(96, 244, 255, 0)");
    ctx.fillStyle = gradientA;
    ctx.fillRect(0, 0, width, height);

    const gradientB = ctx.createRadialGradient(width * 0.82, height * 0.35, 0, width * 0.82, height * 0.35, width * 0.3);
    gradientB.addColorStop(0, "rgba(255, 95, 225, 0.10)");
    gradientB.addColorStop(1, "rgba(255, 95, 225, 0)");
    ctx.fillStyle = gradientB;
    ctx.fillRect(0, 0, width, height);
  }

  function mixColor(low, high, t) {
    const r = Math.round(low[0] + (high[0] - low[0]) * t);
    const g = Math.round(low[1] + (high[1] - low[1]) * t);
    const b = Math.round(low[2] + (high[2] - low[2]) * t);
    return [r, g, b];
  }

  function getWavePoint(x, wave, time, lineOffset) {
    const baseY = height * 0.54 + wave.shift + lineOffset;
    const dx = x - pointer.x;
    const gaussian = Math.exp(-(dx * dx) / (2 * (wave.influence * 1.12) * (wave.influence * 1.12)));
    const pointerSpeed = Math.min(1.6, Math.hypot(pointer.vx, pointer.vy) / 48);
    const cursorPull = (pointer.y - baseY) * gaussian * (0.42 + pointer.energy * 0.16);
    const cursorRipple = Math.sin(dx * 0.019 - time * 0.0018 + lineOffset * 0.018) * gaussian * (10 + pointer.energy * 11 + pointerSpeed * 9);
    const longRippleEnvelope = Math.exp(-Math.abs(dx) / (wave.influence * 2.9));
    const longRipple = Math.sin(dx * 0.008 - time * 0.0012 + lineOffset * 0.01) * longRippleEnvelope * (pointer.energy * 18 + pointerSpeed * 16);
    const primaryRaw = Math.sin(x * wave.freq + time * wave.speed + wave.offset);
    const primaryRidge = Math.sign(primaryRaw) * Math.pow(Math.abs(primaryRaw), wave.ridge);
    const primary = ((primaryRaw * (1 - wave.ridgeMix)) + (primaryRidge * wave.ridgeMix)) * wave.amp;
    const secondaryRaw = Math.sin(x * (wave.freq * 0.44) - time * (wave.speed * 0.58) + wave.offset * 1.8);
    const secondary = secondaryRaw * (wave.amp * 0.31);
    const tertiaryRaw = Math.cos(x * (wave.freq * 1.62) + time * (wave.speed * 0.36) + lineOffset * 0.04);
    const tertiary = tertiaryRaw * (wave.depth * 0.46);
    const peaks = Math.pow(Math.max(0, Math.sin(x * (wave.freq * 2.35) - time * (wave.speed * 0.27) + wave.offset * 0.7)), 3.6) * (wave.depth * 0.82);
    const valleys = -Math.pow(Math.max(0, Math.cos(x * (wave.freq * 1.92) + time * (wave.speed * 0.22) + wave.offset * 1.2)), 2.8) * (wave.depth * 0.36);
    const keyDx = x - keyRipple.x;
    const keyDy = baseY - keyRipple.y;
    const keyDistance = Math.hypot(keyDx, keyDy);
    const waveFront = keyDistance - keyRipple.radius;
    const keyGaussian = Math.exp(-(waveFront * waveFront) / (2 * 150 * 150));
    const keyTravel = Math.sin(waveFront * 0.038 - keyRipple.phase * keyRipple.direction + lineOffset * 0.004) * keyGaussian * keyRipple.energy * 34;
    return baseY + primary + secondary + tertiary + peaks + valleys + cursorPull + cursorRipple + longRipple + keyTravel;
  }

  function drawWaveGlow(wave, time) {
    const gradient = ctx.createLinearGradient(0, height * 0.35, 0, height * 0.72);
    gradient.addColorStop(0, "rgba(255, 140, 58, 0.05)");
    gradient.addColorStop(0.5, "rgba(213, 84, 255, 0.07)");
    gradient.addColorStop(1, "rgba(62, 171, 255, 0.06)");

    ctx.beginPath();
    for (let x = -20; x <= width + 20; x += 12) {
      const y = getWavePoint(x, wave, time, 0);
      if (x === -20) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.lineWidth = wave.glowWidth;
    ctx.strokeStyle = gradient;
    ctx.stroke();
  }

  function drawWaveLine(wave, time, lineIndex) {
    const lineRatio = wave.lines === 1 ? 0.5 : lineIndex / (wave.lines - 1);
    const centered = lineRatio - 0.5;
    const lineOffset = centered * wave.spread;
    const coolMix = mixColor(wave.palette.low, wave.palette.mid, Math.min(1, lineRatio * 1.15));
    const warmMix = mixColor(wave.palette.mid, wave.palette.high, Math.max(0, (lineRatio - 0.35) / 0.65));
    const color = lineRatio > 0.52 ? warmMix : coolMix;
    const alpha = 0.2 + (1 - Math.abs(centered) * 1.15) * 0.28;

    ctx.beginPath();
    for (let x = -20; x <= width + 20; x += 9) {
      const y = getWavePoint(x, wave, time, lineOffset);
      if (x === -20) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.lineWidth = 1.05;
    ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  function drawWave(wave, time) {
    const baseY = height * 0.54 + wave.shift;
    drawWaveGlow(wave, time);

    for (let index = 0; index < wave.lines; index += 1) {
      drawWaveLine(wave, time, index);
    }

    const accentGradient = ctx.createLinearGradient(0, baseY - wave.amp, 0, baseY + wave.amp);
    accentGradient.addColorStop(0, "rgba(255, 175, 64, 0.24)");
    accentGradient.addColorStop(0.45, "rgba(245, 112, 255, 0.18)");
    accentGradient.addColorStop(1, "rgba(74, 202, 255, 0.18)");

    ctx.beginPath();
    for (let x = -20; x <= width + 20; x += 10) {
      const y = getWavePoint(x, wave, time, 0);
      if (x === -20) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.lineWidth = 2.8;
    ctx.strokeStyle = accentGradient;
    ctx.stroke();
  }

  function drawPointerHalo() {
    if (!pointer.active && reducedMotion) {
      return;
    }

    const halo = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 130);
    halo.addColorStop(0, "rgba(255, 255, 255, 0.14)");
    halo.addColorStop(0.4, "rgba(96, 244, 255, 0.08)");
    halo.addColorStop(1, "rgba(96, 244, 255, 0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, 130, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawCircles(time) {
    const cx = width * 0.5;
    const cy = height * 0.5;
    circleField.x += (pointer.x - circleField.x) * 0.06;
    circleField.y += (pointer.y - circleField.y) * 0.06;

    const dx = circleField.x - cx;
    const dy = circleField.y - cy;
    const targetDistance = Math.min(1, Math.hypot(dx, dy) / Math.min(width, height));
    const targetAngle = Math.atan2(dy, dx);

    circleField.distance += (targetDistance - circleField.distance) * 0.08;
    let angleDelta = targetAngle - circleField.angle;
    angleDelta = Math.atan2(Math.sin(angleDelta), Math.cos(angleDelta));
    circleField.angle += angleDelta * 0.08;

    const distance = circleField.distance;
    const driftAngle = circleField.angle;
    const orbitScale = 0.92 + distance * 1.42;
    const baseRadius = Math.min(width, height) * 0.165;
    const rootRadius = baseRadius * (1.58 + distance * 1.02);

    function drawOrbitCircle(radius, depth, seed, hue) {
      if (depth <= 0 || radius < 5) {
        return;
      }

      const orbitCount = 5 + (seed % 5);
      const orbitRadius = radius * (0.7 + Math.sin(time * 0.0009 + seed) * 0.04);
      const childRadius = radius * (0.54 - depth * 0.03);
      const alpha = 0.08 + depth * 0.028;

      const ringGradient = ctx.createRadialGradient(0, 0, radius * 0.2, 0, 0, radius);
      ringGradient.addColorStop(0, `hsla(${hue} 88% 72% / 0.05)`);
      ringGradient.addColorStop(0.55, `hsla(${(hue + 55) % 360} 88% 64% / ${alpha})`);
      ringGradient.addColorStop(1, `hsla(${(hue + 130) % 360} 82% 56% / ${alpha * 1.4})`);

      ctx.beginPath();
      ctx.strokeStyle = ringGradient;
      ctx.lineWidth = 1.2 + depth * 0.18;
      ctx.arc(0, 0, orbitRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = `hsla(${(hue + 18) % 360} 92% 70% / ${alpha * 0.55})`;
      ctx.lineWidth = 0.8;
      ctx.arc(0, 0, orbitRadius * 0.72, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < orbitCount; i += 1) {
        const theta = (Math.PI * 2 * i) / orbitCount + time * 0.00022 * (seed % 2 === 0 ? 1 : -1) + driftAngle * 0.2;
        const ox = Math.cos(theta) * orbitRadius * orbitScale;
        const oy = Math.sin(theta) * orbitRadius * orbitScale;

        ctx.save();
        ctx.translate(ox, oy);

        ctx.beginPath();
        ctx.strokeStyle = `hsla(${(hue + 80) % 360} 86% 64% / ${alpha * 0.72})`;
        ctx.lineWidth = 0.95;
        ctx.arc(0, 0, childRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `hsla(${(hue + 140) % 360} 88% 66% / ${alpha * 0.36})`;
        ctx.arc(0, 0, childRadius * 0.18, 0, Math.PI * 2);
        ctx.fill();

        drawOrbitCircle(childRadius, depth - 1, seed + i + 1, hue + 22);
        ctx.restore();
      }
    }

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(time * 0.00006 + driftAngle * 0.06);

    drawOrbitCircle(rootRadius, 5, 1, 188);
    drawOrbitCircle(rootRadius * 0.8, 4, 7, 300);
    drawOrbitCircle(rootRadius * 0.58, 3, 11, 42);
    drawOrbitCircle(rootRadius * 0.36, 2, 17, 248);

    const centerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, rootRadius * 0.9);
    centerGradient.addColorStop(0, "hsla(45 95% 64% / 0.9)");
    centerGradient.addColorStop(0.35, "hsla(198 88% 58% / 0.45)");
    centerGradient.addColorStop(1, "hsla(198 88% 58% / 0)");
    ctx.beginPath();
    ctx.fillStyle = centerGradient;
    ctx.arc(0, 0, rootRadius * 0.9, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawPatternScene(time) {
    patternField.x += (pointer.x - patternField.x) * 0.08;
    patternField.y += (pointer.y - patternField.y) * 0.08;

    const cx = width * 0.5;
    const cy = height * 0.5;
    const dx = patternField.x - cx;
    const dy = patternField.y - cy;
    const distance = Math.min(1, Math.hypot(dx, dy) / Math.min(width, height));
    const drift = Math.atan2(dy, dx);
    const span = Math.min(width, height) * (0.3 + distance * 0.055);
    const arms = 12;
    const strandsPerArm = 42;
    const steps = 132;
    const stepLength = 7.35;
    const pulseCycle = 5200;
    const pulseProgress = (time % pulseCycle) / pulseCycle;
    const ringRadius = span * (0.1 + pulseProgress * 1.22);
    const ringFade = Math.max(0, 1 - pulseProgress);
    const coreBloomRadius = ringRadius;
    const coreBloomAlpha = 0.14 * (1 - pulseProgress * 0.74);

    function drawPulseRing(radius, alphaScale, lineScale, hueShift) {
      const ringGradient = ctx.createRadialGradient(cx, cy, Math.max(1, radius - span * 0.1), cx, cy, radius + span * 0.12);
      ringGradient.addColorStop(0, `hsla(${(196 + hueShift) % 360} 92% 68% / 0)`);
      ringGradient.addColorStop(0.42, `hsla(${(212 + hueShift) % 360} 96% 72% / ${alphaScale * 0.14})`);
      ringGradient.addColorStop(0.55, `hsla(${(286 + hueShift) % 360} 92% 68% / ${alphaScale * 0.28})`);
      ringGradient.addColorStop(0.72, `hsla(${(332 + hueShift) % 360} 88% 66% / ${alphaScale * 0.1})`);
      ringGradient.addColorStop(1, "hsla(220 90% 60% / 0)");

      ctx.beginPath();
      ctx.strokeStyle = ringGradient;
      ctx.lineWidth = 1.2 * lineScale;
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    function fieldAngle(x, y, armIndex, strandIndex, stepIndex) {
      const relX = x - cx;
      const relY = y - cy;
      const radius = Math.hypot(relX, relY);
      const theta = Math.atan2(relY, relX);
      const star = ((Math.PI * 2) / arms) * armIndex;
      const curl = Math.sin(radius * 0.011 - time * 0.0011 + armIndex * 0.7) * 0.94;
      const warp = Math.cos(theta * 3.8 + drift + strandIndex * 0.13) * 0.34;
      const pull = (distance * 1.05) * Math.sin(stepIndex * 0.15 + time * 0.0007 + armIndex);
      const turbulence = Math.sin(relX * 0.008 + relY * 0.006 + stepIndex * 0.18 + time * 0.0005) * 0.22;
      const spiralLift = (radius / Math.max(1, span * 3.4)) * 0.68;
      return star + curl + warp + pull + turbulence + spiralLift;
    }

    for (let arm = 0; arm < arms; arm += 1) {
      const armBase = ((Math.PI * 2) / arms) * arm + drift * 0.18;
      const hue = (arm * 58 + 188 + distance * 70) % 360;

      for (let strand = 0; strand < strandsPerArm; strand += 1) {
        const strandRatio = strandsPerArm === 1 ? 0.5 : strand / (strandsPerArm - 1);
        const spread = (strandRatio - 0.5) * span;
        let x = cx + Math.cos(armBase + Math.PI / 2) * spread * 0.4;
        let y = cy + Math.sin(armBase + Math.PI / 2) * spread * 0.4;

        ctx.beginPath();
        ctx.moveTo(x, y);

        for (let step = 0; step < steps; step += 1) {
          const angle = fieldAngle(x, y, arm, strand, step);
          const localLength = stepLength * (0.92 + strandRatio * 0.28 + Math.sin(step * 0.12 + strand * 0.2) * 0.04);
          x += Math.cos(angle) * localLength;
          y += Math.sin(angle) * localLength;
          ctx.lineTo(x, y);
        }

        const alpha = 0.018 + (1 - Math.abs(strandRatio - 0.5) * 2) * 0.056;
        ctx.strokeStyle = `hsla(${(hue + strandRatio * 36) % 360} 92% 64% / ${alpha})`;
        ctx.lineWidth = 0.68;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      const coreGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, span * 0.32);
      coreGradient.addColorStop(0, `hsla(${hue} 96% 66% / 0.14)`);
      coreGradient.addColorStop(0.45, `hsla(${(hue + 42) % 360} 88% 60% / 0.06)`);
      coreGradient.addColorStop(1, `hsla(${(hue + 90) % 360} 88% 60% / 0)`);
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, span * 0.32, 0, Math.PI * 2);
      ctx.fill();

      const haloGradient = ctx.createRadialGradient(cx, cy, span * 0.05, cx, cy, span * 1.34);
      haloGradient.addColorStop(0, `hsla(${(hue + 16) % 360} 94% 68% / 0.024)`);
      haloGradient.addColorStop(0.32, `hsla(${(hue + 72) % 360} 88% 62% / 0.024)`);
      haloGradient.addColorStop(0.68, `hsla(${(hue + 120) % 360} 86% 60% / 0.012)`);
      haloGradient.addColorStop(1, "hsla(220 90% 60% / 0)");
      ctx.fillStyle = haloGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, span * 1.34, 0, Math.PI * 2);
      ctx.fill();
    }

    const bloomGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreBloomRadius);
    bloomGradient.addColorStop(0, `hsla(${(208 + distance * 28) % 360} 96% 72% / ${coreBloomAlpha})`);
    bloomGradient.addColorStop(0.3, `hsla(${(274 + distance * 22) % 360} 90% 68% / ${coreBloomAlpha * 0.78})`);
    bloomGradient.addColorStop(0.72, `hsla(${(326 + distance * 18) % 360} 84% 66% / ${coreBloomAlpha * 0.2})`);
    bloomGradient.addColorStop(1, "hsla(220 90% 60% / 0)");
    ctx.fillStyle = bloomGradient;
    ctx.beginPath();
    ctx.arc(cx, cy, coreBloomRadius, 0, Math.PI * 2);
    ctx.fill();

    drawPulseRing(ringRadius, ringFade, 1, 0);
    drawPulseRing(Math.max(span * 0.08, ringRadius - span * 0.1), ringFade * 0.42, 0.66, 34);
  }

  function drawFractalScene(time) {
    patternField.x += (pointer.x - patternField.x) * 0.05;
    patternField.y += (pointer.y - patternField.y) * 0.05;

    const nx = (patternField.x / Math.max(1, width)) - 0.5;
    const ny = (patternField.y / Math.max(1, height)) - 0.5;
    const clipTop = siteHeader ? siteHeader.getBoundingClientRect().bottom + 12 : 120;
    const bands = 72;
    const samples = 132;
    const marginX = width * 0.06;
    const horizon = clipTop + 24;
    const firstLineOffset = 86;
    const usableWidth = width - marginX * 2;
    const scroll = time * 0.00014;
    const driftX = nx * 1.1 + Math.sin(time * 0.00016) * 0.12;
    const driftY = ny * 0.95 + Math.cos(time * 0.00014) * 0.1;
    const pointerNormX = Math.max(0, Math.min(1, pointer.x / Math.max(1, width)));
    const pointerNormY = Math.max(0, Math.min(1, (pointer.y - horizon) / Math.max(1, height - horizon)));
    const rippleEnergy = Math.min(1.6, pointer.energy + Math.hypot(pointer.vx, pointer.vy) / 165);
    const keyNormX = Math.max(0, Math.min(1, keyRipple.x / Math.max(1, width)));
    const keyNormY = Math.max(0, Math.min(1, (keyRipple.y - horizon) / Math.max(1, height - horizon)));
    const keySceneEnergy = keyRipple.energy * 1.35;
    const sceneHeight = Math.max(0, height - horizon - 8);

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, horizon, width, Math.max(0, height - horizon));
    ctx.clip();

    for (let band = 0; band < bands; band += 1) {
      const depth = band / (bands - 1);
      const yBase = horizon + firstLineOffset + depth * depth * sceneHeight;
      const amplitude = (1 - depth) * 48 + 7;
      const lineWidth = 2.2 - depth * 1.5;
      const alpha = 0.2 + (1 - depth) * 0.66;

      ctx.beginPath();

      for (let i = 0; i <= samples; i += 1) {
        const t = i / samples;
        const x = marginX + t * usableWidth;
        const px = (t - 0.5) * 4.6;
        const py = depth * 4.2 - 1.6;
        const ridgeA = Math.sin(px * 1.72 + driftX + scroll * 10);
        const ridgeB = Math.cos(py * 2.8 - driftY - scroll * 7);
        const ridgeC = Math.sin((px + py * 0.8) * 2.1 + scroll * 13);
        const ridgeD = Math.cos(Math.hypot(px * 1.1, py * 1.24) * 3.2 - scroll * 16);
        const envelope = Math.sin(t * Math.PI) * 0.5 + 0.5;
        const contour = ridgeA * 0.34 + ridgeB * 0.24 + ridgeC * 0.22 + ridgeD * 0.2;
        const travel = (depth - pointerNormY) * 12 - (t - pointerNormX) * 9.5;
        const rippleWave = Math.sin(travel - time * 0.0034) * rippleEnergy;
        const rippleEnvelope = Math.exp(-Math.abs(t - pointerNormX) * 1.2) * (0.78 + depth * 1.28);
        const fadeTail = Math.exp(-Math.max(0, t - pointerNormX) * 1.9) * (0.42 + depth * 0.92);
        const depthCarry = 0.28 + depth * 0.96;
        const rippleLift = rippleWave * amplitude * ((rippleEnvelope * 0.42 + fadeTail * 0.24) * depthCarry);
        const keyTravel = (depth - keyNormY) * 11.2 - (t - keyNormX) * 10.4;
        const keyWave = Math.sin(keyTravel - keyRipple.phase * 2.4) * keySceneEnergy;
        const keyEnvelope = Math.exp(-Math.abs(t - keyNormX) * 1.35) * (0.82 + depth * 1.18);
        const keyTail = Math.exp(-Math.max(0, t - keyNormX) * 2.1) * (0.38 + depth * 0.84);
        const keyLift = keyWave * amplitude * (keyEnvelope * 0.34 + keyTail * 0.18);
        const y = yBase - contour * amplitude * envelope - rippleLift - keyLift;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      const hue = (188 + depth * 112 + time * 0.02) % 360;
      const sat = 78 + Math.sin(depth * 5.2 + time * 0.001) * 8;
      const light = 90 - depth * 22;
      ctx.strokeStyle = `hsla(${hue} ${sat}% ${light}% / ${alpha})`;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = `hsla(${(hue + 24) % 360} 88% 72% / ${0.05 + (1 - depth) * 0.08})`;
      ctx.shadowBlur = 4 + (1 - depth) * 6;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  }

  function drawCodeScene(time) {
    patternField.x += (pointer.x - patternField.x) * 0.08;
    patternField.y += (pointer.y - patternField.y) * 0.08;

    const clipTop = siteHeader ? siteHeader.getBoundingClientRect().bottom + 14 : 120;
    const left = width * 0.012;
    const right = width * 0.988;
    const top = clipTop + 4;
    const bottom = height * 0.992;
    const lineHeight = 15;
    const charWidth = 7.2;
    const lines = codeWall.lineCount || Math.max(12, Math.floor((bottom - top) / lineHeight));
    const charsPerLine = codeWall.charsPerLine || Math.max(80, Math.floor((right - left) / charWidth));
    const pointerNormX = Math.max(0, Math.min(1, patternField.x / Math.max(1, width)));
    const pointerNormY = Math.max(0, Math.min(1, patternField.y / Math.max(1, height)));
    const motion = Math.min(1.6, Math.hypot(pointer.vx, pointer.vy) / 48 + pointer.energy * 0.35);
    const activeLine = Math.max(0, Math.min(lines - 1, Math.floor(((patternField.y - top) / Math.max(1, bottom - top)) * lines)));
    const activeChar = Math.max(0, Math.min(charsPerLine - 1, Math.floor(pointerNormX * charsPerLine)));

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, clipTop, width, Math.max(0, height - clipTop));
    ctx.clip();

    ctx.font = '12px "SFMono-Regular", Menlo, Consolas, monospace';
    ctx.textBaseline = "top";

    for (let line = 0; line < lines; line += 1) {
      let text = codeWall.lines[line] || "";
      const y = top + line * lineHeight;
      const hue = (212 + line * 2) % 360;
      const alpha = 0.18;

      if (line === activeLine && motion > 0.035) {
        const tokenSeed = seededValue(line + 1, Math.floor(time * 0.006) + activeChar + 1);
        const token = codeTokens[Math.floor(tokenSeed * codeTokens.length) % codeTokens.length];
        const start = Math.max(0, Math.min(charsPerLine - token.length, activeChar - Math.floor(token.length * 0.5)));
        const end = Math.min(charsPerLine, start + token.length);
        const tokenText = token.slice(0, end - start);
        const mutated = text.slice(0, start) + tokenText + text.slice(end);
        codeWall.lines[line] = mutated;
        const highlightX = left + start * charWidth;
        const highlightWidth = Math.max(charWidth * 2, (end - start) * charWidth);

        const highlight = ctx.createLinearGradient(highlightX, 0, highlightX + highlightWidth, 0);
        highlight.addColorStop(0, "rgba(96, 244, 255, 0.08)");
        highlight.addColorStop(0.5, "rgba(255, 255, 255, 0.12)");
        highlight.addColorStop(1, "rgba(255, 95, 225, 0.08)");
        ctx.fillStyle = highlight;
        ctx.fillRect(highlightX, y - 1, highlightWidth, lineHeight + 2);

        ctx.fillStyle = `hsla(${hue} 72% 78% / ${alpha})`;
        ctx.fillText(mutated.slice(0, start), left, y);
        ctx.fillStyle = `hsla(${(hue + 86) % 360} 96% 78% / 0.95)`;
        ctx.fillText(tokenText, highlightX, y);
        ctx.fillStyle = `hsla(${hue} 72% 78% / ${alpha})`;
        ctx.fillText(mutated.slice(end), left + end * charWidth, y);
      } else {
        ctx.fillStyle = `hsla(${hue} 72% 78% / ${alpha})`;
        ctx.fillText(text, left, y);
      }
    }

    ctx.restore();
  }

  function renderWaves(time) {
    pointer.x += (pointer.tx - pointer.x) * 0.09;
    pointer.y += (pointer.ty - pointer.y) * 0.09;
    pointer.energy *= 0.965;
    pointer.vx *= 0.76;
    pointer.vy *= 0.76;
    keyRipple.energy *= 0.972;
    keyRipple.phase += 0.1;
    keyRipple.radius += 10;

    ctx.clearRect(0, 0, width, height);
    backgroundGlow();

    const clipTop = siteHeader ? siteHeader.getBoundingClientRect().bottom + 10 : 120;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, clipTop, width, Math.max(0, height - clipTop));
    ctx.clip();

    for (const wave of waves) {
      drawWave(wave, time);
    }

    drawPointerHalo();
    ctx.restore();
  }

  function loop(time) {
    if (!reducedMotion && currentRoute && currentRoute.name === "home") {
      if (homeScene === "patterns") {
        pointer.x += (pointer.tx - pointer.x) * 0.08;
        pointer.y += (pointer.ty - pointer.y) * 0.08;
        ctx.clearRect(0, 0, width, height);
        backgroundGlow();
        drawPatternScene(time);
      } else if (homeScene === "fractal") {
        pointer.x += (pointer.tx - pointer.x) * 0.05;
        pointer.y += (pointer.ty - pointer.y) * 0.05;
        ctx.clearRect(0, 0, width, height);
        backgroundGlow();
        drawFractalScene(time);
        drawPointerHalo();
      } else if (homeScene === "circles") {
        pointer.x += (pointer.tx - pointer.x) * 0.08;
        pointer.y += (pointer.ty - pointer.y) * 0.08;
        ctx.clearRect(0, 0, width, height);
        backgroundGlow();
        drawCircles(time);
      } else if (homeScene === "code") {
        pointer.x += (pointer.tx - pointer.x) * 0.08;
        pointer.y += (pointer.ty - pointer.y) * 0.08;
        ctx.clearRect(0, 0, width, height);
        backgroundGlow();
        drawCodeScene(time);
      } else {
        renderWaves(time);
      }
    } else {
      ctx.clearRect(0, 0, width, height);
    }

    animationFrame = window.requestAnimationFrame(loop);
  }

  function initRouting() {
    routeLinks.forEach((link) => {
      link.addEventListener("click", handleRouteClick);
    });

    window.addEventListener("popstate", () => {
      renderRoute(window.location.pathname, false);
    });

    const redirectedPath = window.sessionStorage.getItem("clav-dev-spa-path");
    if (redirectedPath) {
      window.sessionStorage.removeItem("clav-dev-spa-path");
      window.history.replaceState({}, "", redirectedPath);
    }

    renderRoute(window.location.pathname, false);
  }

  resize();
  initAudio();

  initRouting();

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (event) => updatePointer(event.clientX, event.clientY));
  window.addEventListener("pointerleave", handlePointerLeave);
  window.addEventListener("keydown", triggerKeyRipple);
  window.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];
    if (touch) {
      updatePointer(touch.clientX, touch.clientY);
    }
  }, { passive: true });
  window.addEventListener("touchend", handlePointerLeave);

  animationFrame = window.requestAnimationFrame(loop);
  window.addEventListener("beforeunload", () => window.cancelAnimationFrame(animationFrame));
})();
