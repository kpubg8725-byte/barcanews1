const SUPABASE_URL = "https://wynectpjjflfeubcrten.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_vHZMS6tJ7bVf48cpuT6AYA_uA30u1CY";


async function addNews(title, content, category, image_url) {

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/news`,
    {
      method: "POST",

      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },

      body: JSON.stringify({
        title: title,
        content: content,
        category: category,
        image_url: image_url || null
      })
    }
  );

  if (!response.ok) {

    const error = await response.text();

    console.error(error);

    throw new Error(error);
  }

  return await response.json();
}


async function loadNews() {

  const list = document.getElementById("news-list");

  if (!list) return;

  try {

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/news?select=*&order=created_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("تعذر تحميل الأخبار");
    }

    const news = await response.json();

    if (!news.length) {

      list.innerHTML = `
        <p>لا توجد أخبار منشورة حتى الآن.</p>
      `;

      return;
    }

    list.innerHTML = news.map(article => `
      <div class="news-item">

        <h3>${escapeHTML(article.title)}</h3>

        <p>
          ${escapeHTML(article.category || "")}
        </p>

        <small>
          ${formatDate(article.created_at)}
        </small>

      </div>
    `).join("");

  } catch (error) {

    console.error(error);

    list.innerHTML = `
      <p>حدث خطأ أثناء تحميل الأخبار.</p>
    `;
  }
}


function formatDate(date) {

  if (!date) return "";

  return new Date(date).toLocaleDateString("ar-IQ", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}


function escapeHTML(text) {

  if (!text) return "";

  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("news-form");

  if (form) {

    form.addEventListener("submit", async (event) => {

      event.preventDefault();

      const title =
        document.getElementById("title").value.trim();

      const content =
        document.getElementById("content").value.trim();

      const category =
        document.getElementById("category").value;

      const image =
        document.getElementById("image").value.trim();

      const status =
        document.getElementById("status");

      try {

        status.style.display = "block";

        status.textContent = "جاري نشر الخبر...";

        await addNews(
          title,
          content,
          category,
          image
        );

        status.textContent =
          "✅ تم نشر الخبر بنجاح";

        form.reset();

        loadNews();

      } catch (error) {

        console.error(error);

        status.textContent =
          "❌ حدث خطأ أثناء نشر الخبر";
      }

    });

  }

  loadNews();

});
