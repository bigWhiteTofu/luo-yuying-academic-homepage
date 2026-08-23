const publications = [
  {
    page: 2, role: "第一作者", filters: ["lead", "ai"],
    journal: "Information Processing & Management", year: "2027",
    title: "Official or Influencer? An AI-Enhanced Analytical Framework for Decoding Multimodal Persuasion in Government Marketing Videos",
    tags: ["中科院 1 区", "TOP", "SSCI Q1", "IF 8.1", "FMS / CCF B"],
    summary: "基于 779 条官方抖音销售视频，结合人工与 AI 多模态内容分析，识别来源类型和内容价值对消费者互动的影响。"
  },
  {
    page: 26, role: "第一作者", filters: ["lead", "methods"],
    journal: "Humanities and Social Sciences Communications", year: "2026",
    title: "Smart city strategy, China’s urban innovation and policy effectiveness",
    tags: ["中科院 2 区", "SSCI Q1", "IF 4.8"],
    summary: "以中国 283 个城市的面板数据开展多期 DID、机制分析与空间检验，评估智慧城市政策的创新效应。"
  },
  {
    page: 42, role: "共同第一作者", filters: ["lead", "ai", "methods"],
    journal: "British Journal of Educational Technology", year: "2026",
    title: "AI support in self-regulated learning: A decade of technological evolution and meta-analysis",
    tags: ["中科院 1 区", "TOP", "SSCI Q1", "IF 13.0"],
    summary: "整合 35 项研究与 133 个效应量，系统评估人工智能支持自我调节学习的总体作用及边界条件。"
  },
  {
    page: 72, role: "共同第一作者", filters: ["lead", "ai"],
    journal: "Journal of Professional Capital and Community", year: "2026",
    title: "From access to adherence: Fostering professional capital and continued engagement in blended teacher workshops",
    tags: ["SSCI Q2", "IF 2.0"],
    summary: "融合技术接受、期望确认与社会支持视角，解释数字服务从初次使用到持续使用的行为机制。"
  },
  {
    page: 94, role: "通讯作者", filters: ["lead", "methods"],
    journal: "Business Process Management Journal", year: "2025",
    title: "Stage-specific impacts of digital technologies on supply chain resilience: Meta-analytic evidence for continuous process improvement",
    tags: ["SSCI Q1", "IF 5.2"],
    summary: "汇总 70 项研究与 218 个效应量，比较数字技术在供应链韧性不同阶段的差异化作用。"
  },
  {
    page: 116, role: "通讯作者", filters: ["lead", "ai", "methods"],
    journal: "Aslib Journal of Information Management", year: "2026",
    title: "Trust the messenger, then the message: Unpacking the cross-route logic of danmaku engagement",
    tags: ["SSCI Q1", "IF 3.5"],
    summary: "基于 B 站知识视频和 13 万余条弹幕，结合 PLS-SEM、MGA 与 BERTopic 分析来源线索、信任和知识采纳。"
  },
  {
    page: 142, role: "通讯作者", filters: ["lead", "methods"],
    journal: "建筑与文化", year: "已发表",
    title: "基于文献计量学的住房不平等研究",
    tags: ["省级期刊"],
    summary: "采用文献计量与知识图谱方法，梳理住房不平等研究的主题结构、热点演进与未来方向。"
  },
  {
    page: 151, role: "第一作者", filters: ["lead", "methods"],
    journal: "Journal of Innovation and Social Science Research", year: "2022",
    title: "Research Hotspot and Evolution Trend of REITs Since the New Century—from the Perspective of Bibliometrics",
    tags: ["同行评审期刊"],
    summary: "从知识基础、主题聚类和演进路径三个层面呈现 REITs 研究版图。"
  },
  {
    page: 152, role: "第二作者", filters: ["methods"],
    journal: "Water Environment Research", year: "2026",
    title: "Who Upgrades the Plant? A Tripartite Evolutionary Game Model for PPCPs Removal Technology Adoption",
    tags: ["SCI Q1", "IF 2.8"],
    summary: "通过演化博弈模型分析环境基础设施升级中多主体策略的演变与稳定条件。"
  },
  {
    page: 171, role: "第三作者", filters: ["ai"],
    journal: "Journal of Information Science", year: "2024",
    title: "The impact of mobile social media on knowledge sharing among vocational school teachers: A social cognitive career perspective",
    tags: ["FMS B", "SSCI Q2", "IF 2.6"],
    summary: "解释移动社交媒体情境下教师知识共享的心理与技术驱动机制。"
  },
  {
    page: 190, role: "第三作者", filters: ["methods"],
    journal: "International Journal of Mentoring and Coaching in Education", year: "2025",
    title: "The role of teachers’ direct and emotional mentoring in shaping undergraduates’ research aspirations: A social cognitive career theory perspective",
    tags: ["ESCI Q2", "IF 1.6"],
    summary: "考察导师支持如何影响研究生科研志向及其形成路径。"
  }
];

const list = document.querySelector("#publication-list");
const dialog = document.querySelector("#pdf-dialog");
const frame = document.querySelector("#pdf-frame");
const pdfTitle = document.querySelector("#pdf-title");

function renderPublications(filter = "all") {
  const visible = publications.filter((item) => filter === "all" || item.filters.includes(filter));
  list.innerHTML = visible.map((item, index) => `
    <article class="publication-item reveal" data-filters="${item.filters.join(" ")}">
      <span class="publication-index">${String(index + 1).padStart(2, "0")}</span>
      <div class="publication-main">
        <h3>${item.title}</h3>
        <p class="publication-meta"><em>${item.journal}</em> · ${item.year} · ${item.role}</p>
        <p class="publication-summary">${item.summary}</p>
      </div>
      <div class="publication-tags">${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
      <button class="read-publication" type="button" data-page="${item.page}" data-title="${item.journal}｜${item.title}">站内阅读 ↗</button>
    </article>
  `).join("");
  bindPdfButtons();
}

function openPdf(page, title) {
  pdfTitle.textContent = title;
  frame.src = `assets/luo-yuying-portfolio.pdf#page=${page}&view=FitH`;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else window.open(frame.src, "_blank", "noopener");
}

function bindPdfButtons() {
  document.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => openPdf(button.dataset.page, button.dataset.title));
  });
}

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderPublications(button.dataset.filter);
  });
});

document.querySelector("#close-pdf").addEventListener("click", () => {
  dialog.close();
  frame.src = "about:blank";
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
    frame.src = "about:blank";
  }
});

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}));

const apiBase = (window.SITE_CONFIG?.apiBase || "").replace(/\/$/, "");
const apiReady = !apiBase.includes("YOUR-WORKER");

async function trackVisit() {
  if (!apiReady) return;
  try {
    await fetch(`${apiBase}/api/visit`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path: location.pathname, referrer: document.referrer.slice(0, 500) }),
      keepalive: true
    });
  } catch (error) {
    console.info("Visit analytics unavailable.", error);
  }
}

const messageForm = document.querySelector("#message-form");
const messageText = document.querySelector("#message-text");
const messageCount = document.querySelector("#message-count");
const messageStatus = document.querySelector("#message-status");
messageText.addEventListener("input", () => { messageCount.textContent = `${messageText.value.length} / 1000`; });
messageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submit = messageForm.querySelector("button[type=submit]");
  if (!apiReady) {
    messageStatus.textContent = "留言服务尚未绑定。部署 Worker 后即可使用。";
    return;
  }
  submit.disabled = true;
  messageStatus.textContent = "正在私密发送……";
  const form = new FormData(messageForm);
  try {
    const response = await fetch(`${apiBase}/api/message`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: form.get("message"), website: form.get("website") })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "发送失败");
    messageForm.reset();
    messageCount.textContent = "0 / 1000";
    messageStatus.textContent = "已私密送达，谢谢您的留言。";
  } catch (error) {
    messageStatus.textContent = error.message || "暂时无法发送，请稍后再试。";
  } finally {
    submit.disabled = false;
  }
});

function initMotion() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.gsap) return;
  window.gsap.registerPlugin(window.ScrollTrigger);
  window.gsap.from(".hero-copy > *", { opacity: 0, y: 22, duration: .75, stagger: .09, ease: "power2.out" });
  window.gsap.from(".hero-portrait", { opacity: 0, x: 30, duration: .9, ease: "power2.out" });
  window.gsap.utils.toArray(".reveal:not(.hero-copy):not(.hero-portrait)").forEach((item) => {
    window.gsap.from(item, { opacity: 0, y: 24, duration: .7, ease: "power2.out", scrollTrigger: { trigger: item, start: "top 88%", once: true } });
  });
  window.gsap.to(".field-image img", { yPercent: -5, ease: "none", scrollTrigger: { trigger: ".field-note", start: "top bottom", end: "bottom top", scrub: .6 } });
}

renderPublications();
trackVisit();
window.addEventListener("load", initMotion);
