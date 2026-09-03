const SUPABASE_URL = "https://wynectpjjflfeubcrten.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_vHZMS6tJ7bVf48cpuT6AYA_uA30u1CY";

async function loadNews() {
  const container = document.getElementById("news-container");

  if (!container) return;

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/news?select=*&order=created_at.desc`,
      {
        method: "GET",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase Error:", errorText);
      throw new Error("فشل الاتصال بقاعدة البيانات");
    }

    const news = await response.json();

    if (!news || news.length === 0) {
      container.innerHTML = `
        <div class="empty">
          <h2>لا توجد أخبار حاليًا</h2>
          <p>ستظهر الأخبار هنا بعد نشرها من لوحة التحكم.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = news.map(article => {

      const image = article.image_url
        ? `
          <img
            class="news-image"
            src="${escapeHTML(article.image_url)}"
            alt="${escapeHTML(article.title)}"
            loading="lazy"
          >
        `
        : `
          <div class="news-image"></div>
        `;

      return `
        <article class="news-card">

          ${image}

          <div class="news-content">

            <span class="category">
              ${escapeHTML(article.category || "أخبار برشلونة")}
            </span>

            <h2 class="news-title">
              ${escapeHTML(article.title || "")}
            </h2>

            <p class="news-date">
              ${formatDate(article.created_at)}
            </p>

          </div>

        </article>
      `;

    }).join("");

  } catch (error) {

    console.error("Error:", error);

    container.innerHTML = `
      <div class="empty">
        <h2>⚠️ تعذر تحميل الأخبار</h2>
        <p>تحقق من اتصال Supabase وإعدادات قاعدة البيانات.</p>
      </div>
    `;
  }
}


function formatDate(date) {

  if (!date) return "";

  try {

    return new Date(date).toLocaleDateString("ar-IQ", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

  } catch {

    return "";
  }
}


function escapeHTML(text) {

  if (text === null || text === undefined) {
    return "";
  }

  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


document.addEventListener("DOMContentLoaded", () => {
  loadNews();
});
