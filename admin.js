const apiBase = (window.SITE_CONFIG?.apiBase || "").replace(/\/$/, "");
const apiReady = !apiBase.includes("YOUR-WORKER");
const loginPanel = document.querySelector("#login-panel");
const dashboard = document.querySelector("#dashboard");
const loginForm = document.querySelector("#login-form");
const loginStatus = document.querySelector("#login-status");
let token = sessionStorage.getItem("lyy_admin_token") || "";

const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
const dateTime = (value) => value ? new Intl.DateTimeFormat("zh-CN", { dateStyle: "medium", timeStyle: "medium", hour12: false }).format(new Date(value)) : "—";
const locationText = (row) => [row.country, row.region, row.city].filter(Boolean).join(" · ") || "未知";

async function api(path, options = {}) {
  if (!apiReady) throw new Error("请先在 config.js 中填写 Worker 地址。");
  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers: { "content-type": "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "请求失败");
  return data;
}

async function loadDashboard() {
  const data = await api("/api/admin/overview");
  loginPanel.hidden = true;
  dashboard.hidden = false;
  document.querySelector("#metric-grid").innerHTML = [
    [data.summary.uniqueVisitors, "独立 IP"],
    [data.summary.totalVisits, "总访问次数"],
    [data.summary.totalMessages, "匿名留言"]
  ].map(([value, label]) => `<div class="metric"><strong>${value}</strong><span>${label}</span></div>`).join("");
  document.querySelector("#visitor-rows").innerHTML = data.visitors.map((row) => `<tr><td>${escapeHtml(row.ip)}</td><td>${escapeHtml(locationText(row))}</td><td>${row.visit_count}</td><td>${dateTime(row.first_visit)}</td><td>${dateTime(row.last_visit)}</td></tr>`).join("") || '<tr><td colspan="5">暂无访问</td></tr>';
  document.querySelector("#visit-rows").innerHTML = data.recentVisits.map((row) => `<tr><td>${dateTime(row.visited_at)}</td><td>${escapeHtml(row.ip)}</td><td>${escapeHtml(locationText(row))}</td><td>${escapeHtml(row.path)}</td><td>${escapeHtml(row.referrer || "直接访问")}</td></tr>`).join("") || '<tr><td colspan="5">暂无访问</td></tr>';
  document.querySelector("#admin-messages").innerHTML = data.messages.map((row) => `<article class="message-admin-item"><div><time>${dateTime(row.created_at)}</time><small>${escapeHtml(row.ip)} · ${escapeHtml(locationText(row))}</small></div><p>${escapeHtml(row.message)}</p></article>`).join("") || '<p>暂无留言。</p>';
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginStatus.textContent = "正在验证……";
  try {
    const data = await api("/api/admin/login", { method: "POST", body: JSON.stringify({ password: loginForm.password.value }) });
    token = data.token;
    sessionStorage.setItem("lyy_admin_token", token);
    loginForm.reset();
    await loadDashboard();
  } catch (error) { loginStatus.textContent = error.message; }
});

document.querySelector("#logout").addEventListener("click", () => {
  token = "";
  sessionStorage.removeItem("lyy_admin_token");
  dashboard.hidden = true;
  loginPanel.hidden = false;
  loginStatus.textContent = "";
});

if (token) loadDashboard().catch(() => sessionStorage.removeItem("lyy_admin_token"));
