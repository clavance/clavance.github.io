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
      date: "5 March 2022",
      title: "Secrets of Sand Hill Road",
      excerpt: "Reading notes on pitching, market sizing, venture expectations, and what founders need to communicate clearly.",
      description: "Notes on pitching, venture capital, and communicating market size.",
      content: `
        <h2>The Art of the Pitch</h2>
        <h3>Getting your foot in the door</h3>
        <p>Securing a warm introduction is essential. Sources include angels, seed investors, and law firms that work with startup founders and venture capitalists. These intermediaries benefit when their best startups connect with VCs. If you lack these connections, find alternative pathways.</p>
        <p>You'll need a combination of qualities: likability, networking ability, hustle, consistent showing up, follow-up persistence, salesmanship, confidence, relevant experience, storytelling skills, and luck.</p>
        <h3>1: Market Sizing</h3>
        <p>Founders must help VCs understand market size. When Lyft pitched, evaluators initially used the existing taxi market as a baseline. However, Lyft argued that GPS, smartphones, and apps fundamentally expanded the addressable market. They highlighted how driver economics changed—eliminating taxi medallion requirements increased driver supply, creating network effects where more drivers attracted customers and vice versa.</p>
        <p>Network effects apply beyond ride-sharing and social platforms. Freenome illustrated this by arguing that less invasive cancer screening techniques with better predictive value would increase screening rates, expanding the early detection market.</p>
        <p>For existing markets, explain the macro trends driving evolution and your unique opportunity. Okta exemplifies this approach. Microsoft's Active Directory dominated enterprise login management for internal applications. Okta identified that the rise of SaaS meant companies would deploy numerous external applications across departments, each requiring separate access management—creating a new market opportunity. Okta's market capitalisation reached $25 billion (previously $45 billion).</p>
        <p>For non-existent markets, imagine how new technologies create demand. Burbn recognised that iPhones would dominate and people would want photo-sharing capabilities. While photo-sharing existed previously, the market fundamentally changed. Burbn became Instagram.</p>
        <h3>2: Team</h3>
        <p>"Ideas are a dime a dozen, execution sets the winners apart" reflects VC thinking. Demonstrate founder-market fit—your unique qualifications for winning this market. Nicira's founder possessed a PhD in the relevant field, though deep expertise can take other forms like go-to-market strategy expertise.</p>
        <p>Discuss your wins and failures, explaining what they reveal about your likelihood of succeeding. Address how you'll build the right team around you and why talented people would leave their jobs to work for you.</p>
        <h3>3: Product</h3>
        <p>VCs don't expect accurate market predictions. Your pitched product likely won't match your final offering. They evaluate your thinking process: How does your mind work? What market data informed your initial product plan? How is your product 10x superior to incumbents?</p>
        <p>Demonstrate "strong beliefs, weakly held"—maintain conviction while remaining adaptable to market feedback.</p>
        <h3>4: Go-to-Market</h3>
        <p>Profitable customer acquisition determines long-term viability. Can your business model support your acquisition strategy? Whether through outside sales, brand marketing, or online channels, customer acquisition costs must align with customer lifetime value.</p>
        <p>You need a framework demonstrating your thinking, not robust financial models. Okta initially targeted SMEs, believing they were more open to new technologies and lacked large teams to manage systems. In reality, enterprise sales proved superior—large companies had numerous SaaS applications across departments, creating better value propositions.</p>
        <p>You'll likely pivot significantly. Tiny Speck's game evolved into Speck, then Slack. Master your domain, understand every important business detail, and show preparation. When VCs challenge your proposals, defend thoughtfully, listen, and adjust appropriately rather than immediately pivoting.</p>
        <h3>5: Next Financing Round</h3>
        <p>What milestones will this funding enable? Your VC projects ahead to the next round to gauge market risk. They need you achieving your aims; they can't be your sole capital provider later.</p>
        <p>Ensure your funding is sufficient to reach milestones enabling a higher-valuation next round. If not, discuss raising more capital at the current round, lowering current valuation, or finding other confidence-building approaches.</p>
        <p>Generally, target doubling your valuation at the next round.</p>
        <h2>Raising Capital</h2>
        <h3>Is VC the right option?</h3>
        <p>VCs prioritise market size—the opportunity must support a self-sustaining, standalone business. If your market isn't huge, smaller VC funds or non-VC options may suit you better.</p>
        <p>Remember VCs respond to their financial incentives: building diversified portfolios where most investments fail but a few generate disproportionate returns, then converting successes to cash for limited partners.</p>
        <h3>How much, and at what valuation?</h3>
        <p>Raise sufficient capital to safely achieve next-round milestones. Think about your subsequent round during current fundraising. Next-round valuation reflects your current business state and financing environment. If your last round valuation seems too high, you might fail generating next-round competition.</p>
        <p>Don't raise minimal capital at aggressive valuations—this establishes high watermarks without providing resources to achieve expectations. Market competition drives valuations; VCs may decline if previous rounds appear overvalued.</p>
        <p>Disappointing fundraising affects employee sentiment. Monzo circa 2020 demonstrated this. Valuations serve as visible external success benchmarks for employees.</p>
        <p>LoudCloud taught valuable lessons: employees judge business success by valuation; they benchmark against recent fundraising (sometimes irrelevantly); and maintaining upward momentum through successful rounds keeps your valuation trajectory positive.</p>
        <h2>Term Sheets</h2>
        <h3>Building your cap table</h3>
        <p>Raise sufficient current-round capital enabling next-round milestone achievement. If offered deals with more capital but more dilution, ask whether extra capital enables greater achievement than anticipated.</p>
        <p>Understand the tradeoff between known current dilution and forecasted next-round dilution under various business performance scenarios. Study your payout matrix showing how exit proceeds divide between common and preferred shareholders at different price points.</p>
        <p>Investors might condition offers on earlier investors waiving antidilution protections.</p>
        <h3>Evaluating governance terms</h3>
        <p>These notes reference U.S. terms. Consider preferred versus Series A voting structures and potential board composition. Will a common-controlled board exist? Who will control the board—who influences major corporate decisions?</p>
        <p>Look beyond valuation, considering full economic and governance term sets.</p>
        <h2>Board Members</h2>
        <h3>Dual fiduciaries</h3>
        <p>VCs are dual fiduciaries. As board members, they have fiduciary duties to company shareholders, but as GPs they're fiduciaries to their LPs. GP economic interests may diverge from common shareholders', particularly regarding different share classes.</p>
        <h3>The Board's role</h3>
        <p>Boards interact with CEOs—they hire and fire—but CEOs possess more company knowledge. VCs sometimes become entangled in day-to-day operations. As CEO, engage board members understanding why they're overstepping. Are they unwitting? Do they harbor deeper management concerns?</p>
        <p>Boards provide long-term strategic guidance and lessons learned, not dictated strategy. They advise on capital raising; they'll eventually approve actions.</p>
        <h3>Approval of corporate actions</h3>
        <p>U.S. law requires boards determining fair market value for stock option issuance. If exercise prices fall below fair market value, employees face immediate tax liability on the difference—don't create employee tax problems. Consider 409A opinions (valid 12 months without material changes) from outside firms.</p>
        <p>Review CEO and executive compensation ensuring critical people maintain sufficient economic incentive. Unvested stock options provide these incentives—key contributors need sufficient unvested equity.</p>
        <p>Boards maintain compliance and corporate governance, protecting themselves from personal liability through regular meetings. VCs should open their networks to CEOs' benefit, introducing customers, partners, candidates, advisors, lawyers.</p>
        <p>Boards should not run companies, dictate strategy, or dictate product direction. Address board overreach. CEOs must manage boards—set expectations, hold regular 1:1s, explain your expectations of them, clarify board meeting formats, sharing feedback both directions. Good board members notify CEOs when executive team members request separate meetings.</p>
        <h2>Legal Obligations</h2>
        <h3>General duties</h3>
        <p>Directors owe duties of care, loyalty (avoiding self-dealing, acting in company interests), confidentiality, and candor (disclosing requisite shareholder information).</p>
        <p>Confidentiality becomes complicated when VCs invest in competing companies, especially after portfolio company pivots creating competition. Implement Chinese walls.</p>
        <p>The business judgment rule protects boards acting on informed bases, in good faith, believing their actions served corporate interests.</p>
        <p>The entire fairness rule applies when claimants show loyalty duty violations. The burden shifts to boards proving they acted in company interests. Courts examine decision-making process fairness and whether common shareholders received fair treatment.</p>
        <p>Directors cannot indemnify against loyalty breaches—they face personal liability—though they can indemnify against care duty breaches.</p>
        <h3>In Re Trados</h3>
        <p>Trados faced liquidation with $57.9M investor liquidation preference against a $60M acquisition offer. The board instituted a $7.8M management incentive plan for senior executives.</p>
        <p>Initially: $57.9M for investors, $2.1M for common shareholders. After the plan: $7.8M for executives, $52.2M for investors, $0 for common shareholders.</p>
        <p>If you're a board member with liquidation preference and selling out-of-the-money, assume you're conflicted.</p>
        <h3>Things to note</h3>
        <p>Startup boards likely contain conflicted members through liquidation preferences and management incentive plan participation.</p>
        <p>Consider: hiring bankers soliciting multiple bids (if affordable); reaching out to several parties; obtaining fairness opinions; avoiding incentive plan changes immediately preceding deal votes; establishing special committees isolating conflicted members; implementing disinterested common shareholder votes; ensuring boards don't overstep acquisition roles; documenting discussions on record regarding fiduciary duties and common shareholder rights.</p>
        <h2>Difficult Financings</h2>
        <h3>Reducing liquidation preferences</h3>
        <p>Term sheets can include auto-converts, where preferred stock converts to common under certain circumstances, eliminating accumulated liquidation preferences. VCs might accept this recognising overhanging preferences may discourage current teams.</p>
        <p>Reverse splits convert existing preferred stock to common, reducing the investor's ownership percentage through a split. VCs might accept this to provide employees fresh starts by reducing fundraising dilution, or to attract new capital.</p>
        <p>Down rounds or recapitalisations are often led by existing investors. Discuss near-term exit valuation ranges with existing VCs, sizing remaining preferences appropriately.</p>
        <p>Increase option pools and grant new options to remaining employees. If departing employees' options expire, return those to the pool for staying employees. Increase the overall pool. Management incentive plans can include "no double dipping" clauses—if common shareholders ultimately receive acquisition proceeds, management share reduces pro rata, preventing double-benefits.</p>
        <h3>Carsanaro v Bloodhound</h3>
        <p>This company sold for $82M, but founders and common shareholders received almost nothing. Preferred shareholders took most money satisfying liquidation preferences, while a $15M management incentive plan consumed additional proceeds.</p>
        <p>Fair process and fair price standards applied. The board failed to canvass outside investors, gauge external interest before insider-led financing, provide complete common shareholder information, update financing terms when performance improved, or obtain disinterested member approval.</p>
        <p>Run market checks with outside investors. Even if believing no one will take the deal, solicit rejections before proceeding with insider rounds, proving lack of market interest.</p>
        <p>Don't entangle new option grants to employees closely with insider financing. Doing so after closing (versus before) eliminates suspicion that a board member's vote depended on receiving new grants.</p>
        <p>Offer rights offerings—everyone on the cap table gets pro rata participation rights on identical terms. Most will decline down rounds, but this protects against future litigation.</p>
        <p>Implement "go-shop" provisions allowing companies to shop term sheets to other potential investors—proactive market checks.</p>
        <p>Obtain disinterested shareholder approval if possible.</p>
        <h3>Winding down</h3>
        <p>U.S. law requires providing employees 60 days' notice before shutdown via the WARN Act, or paying 60 days' wages liability. The faltering company exception applies if actively pursuing financing and notice would jeopardise financing chances. Keep minutes documenting obligation compliance if exercising exceptions.</p>
        <p>Potential wage and accrued vacation liabilities exist. You can't sustain employees beyond affordable payroll—doing so creates personal liability. Accrued vacation represents earned employee money. Avoid high accrued vacation through use-it-or-lose-it annual provisions.</p>
        <p>In wind-downs, debt holders precede unsecured trade creditors and equity holders, though boards lack fiduciary duties to them.</p>
        <h2>Exits</h2>
        <h3>Acquisitions</h3>
        <p>Know eventual acquirers, engage with them. You need not expose trade secrets, IP, or road maps—just build relationships and disclose what you're comfortable sharing. Non-acquisition partners may provide business development value.</p>
        <p>"Companies get bought, not sold"—you can't unilaterally decide to sell expecting numerous suitors. Better to have acquirers solicit your interest. You want to be on their acquisition target lists.</p>
        <p>Consider: price obviously; consideration form (cash versus buyer stock?—consider "collars" setting reasonable price movement bounds between announcement and closing); buyer stock liquidity if private; employee option treatment.</p>
        <p>Unvested options get assumed by acquirers, continuing vest schedules under new employers. Alternatively, they get cancelled with new option terms. Rarely, they accelerate automatically—reserved for special cases like CFOs unable to transition to acquirer roles.</p>
        <p>Think about which acquired employees remain critical. Acquirers maintain key employee lists and incentivise accordingly. Critical employees may request additional incentives. Acquirers typically create closing conditions.</p>
        <p>Address voting approvals, usually requiring majority common and preferred shareholder votes as separate classes. Drag-along provisions typically apply.</p>
        <p>Consider escrow accounts covering post-acquisition surprises and indemnification claims. Which claims get covered beyond escrow? What recovery limits exist? What exclusivity periods are fair? Typically 60 days, gauged by remaining due diligence and documentation time.</p>
        <p>Board responsibilities include Revlon duties—while boards needn't sell, if they do, they must maximise common stock value in good faith, seeking best reasonably available prices. Run broad multiple-acquirer outreach using bankers if possible. Consider alternative paths. Employ go-shop provisions permitting competing bids. Document well-vetted processes showing consideration of all value-maximisation possibilities.</p>
        <p>Often you'll integrate into post-acquisition organisations, requiring thought about integration and new organisational roles.</p>
        <h3>IPOs</h3>
        <p>IPOs provide capital raising, branding, liquidity, and customer credibility—especially valuable in B2B selling.</p>
        <p>The process involves underwriters, prospectus drafting, roadshows, confidential filings, and required disclosures.</p>
      `
    },
    {
      slug: "lessons-in-management",
      date: "9 May 2018",
      title: "Lessons in Management",
      excerpt: "Notes on customer obsession, long-term thinking, and the habits that help teams stay adaptable under pressure.",
      description: "Notes on customer obsession, invention, and long-term thinking.",
      content: `
        <p><em>"Some people are just better at rolling with the punches."</em></p>
        <ol>
          <li>
            <p><strong>Customer obsession:</strong> there are many ways to centre a business, each can be successful — competitor obsession (close following, replicating quickly), technology obsession, product obsession, business model obsession. Amazon's choice: customer obsession.</p>
          </li>
          <li>
            <p><strong>Willingness to innovate and pioneer:</strong> customer obsession isn't just about listening to customers, it's <em>inventing on their behalf</em> — your customer may not even know what they want, it's your job to invent it.</p>
          </li>
          <li>
            <p><strong>Be long-term oriented:</strong> think in 5–7 year time frames (<em>"Today, I'm working on a financial quarter in 2020… not next quarter, that was fully-baked about three years ago"</em>) — this affects how you spend your time, energy, how you plan.</p>
            <ul><li>Long-term thinking has to be deliberate, we want quick results by nature — ever heard of a <em>get rich slow scheme</em>?</li></ul>
          </li>
          <li>
            <p><strong>Experiment more.</strong> What worries Jeff? That Amazon will lose the three above principles; failure and invention are inseparable.</p>
            <ul>
              <li><em>To invent you need to experiment. If you know in advance it's going to work, it's not an experiment!</em></li>
              <li><em>If you have a 10% chance of a 100x return, you should take that shot every time. You'll still be wrong 9 out of 10 times.</em></li>
              <li><em>If you swing for the fences, you'll hit more home runs, but you'll strike out more. But in baseball you're capped at four runs. In business, every once in a while, you hit so hard you get a thousand runs.</em></li>
            </ul>
          </li>
          <li>
            <p>One problem with young entrepreneurs: they like to talk about how <em>disruptive</em> their business plan is going to be. <em>Invention is not disruptive. Only customer adoption is disruptive.</em> We've invented a lot of things — that customers did not care about at all! They were not disruptive. Only when customers like the new way, can anything become disruptive. Hence: customer obsession.</p>
            <ul><li>So if someone says their idea is disruptive, the question to ask them is: <em>why are customers going to adopt this?</em></li></ul>
          </li>
          <li>
            <p><em>"I've noticed all overnight successes take about ten years."</em></p>
          </li>
          <li>
            <p><strong>Failure:</strong> there is a type of failure you don't want, where you have an operating history and you know what you're doing, and you just screw it up; that's just a screw up — e.g. fulfilment centre technology, by now, can't fail. Bad execution is not the right kind of failure. The right kind of failure is failure when trying to innovate.</p>
          </li>
          <li>
            <p><strong>Identify your big ideas</strong> — there should only be 2 or 3 of them. <em>Then enforce great execution against these big ideas.</em> Usually the big ideas are incredibly easy to identify.</p>
            <ul>
              <li>Amazon's 3 big ideas: (1) Low prices, (2) Fast delivery, (3) Vast selection.</li>
              <li>These should not change over time — at no point ever in the future will customers want higher prices, slower delivery, or less selection.</li>
              <li>But executing against these big ideas, that's the hard part — how do we always get costs a little lower? How do we always deliver more quickly?</li>
              <li>These principles apply to other sectors as well — find the big ideas that will always still be true, invest in them.</li>
            </ul>
          </li>
          <li>
            <p>AI, machine learning, natural language understanding, machine vision problems: these will help every business and every institution.</p>
          </li>
        </ol>
      `
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
    const POSTS_PER_PAGE = 10;
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const pagePosts = posts.slice(postsPage * POSTS_PER_PAGE, (postsPage + 1) * POSTS_PER_PAGE);

    const pagination = totalPages > 1 ? `
      <div class="posts-pagination">
        ${postsPage > 0 ? `<a class="posts-page-link" data-page-shift="-1" href="#">← Previous</a>` : ""}
        ${postsPage < totalPages - 1 ? `<a class="posts-page-link" data-page-shift="1" href="#">Next →</a>` : ""}
      </div>
    ` : "";

    return `
      <section class="posts-list">
        ${pagePosts.map((post) => `
          <article class="card surface">
            <p class="meta">${post.date}</p>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <a class="article-link" href="/posts/${post.slug}/" data-route-link>Read more →</a>
          </article>
        `).join("")}
      </section>
      ${pagination}
    `;
  }


  function renderPost(post) {
    return `
      <div class="article-shell">
        <article class="article surface">
          <p class="meta">${post.date}</p>
          <h1>${post.title}</h1>
          ${post.content}
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

    appView.querySelectorAll("[data-page-shift]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const shift = Number(link.getAttribute("data-page-shift")) || 0;
        postsPage += shift;
        appView.innerHTML = renderPosts();
        attachRouteLinks();
        window.scrollTo(0, 0);
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
      postsPage = 0;
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
