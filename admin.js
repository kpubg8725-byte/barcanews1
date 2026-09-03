const SUPABASE_URL = "https://wynectpjjflfeubcrten.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_vHZMS6tJ7bVf48cpuT6AYA_uA30u1CY";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


// =============================
// إظهار لوحة التحكم
// =============================

function showDashboard() {

  const loginSection = document.getElementById("login-section");
  const dashboard = document.getElementById("dashboard");

  if (loginSection) {
    loginSection.style.display = "none";
  }

  if (dashboard) {
    dashboard.style.display = "block";
  }
}


// =============================
// إظهار تسجيل الدخول
// =============================

function showLogin() {

  const loginSection = document.getElementById("login-section");
  const dashboard = document.getElementById("dashboard");

  if (loginSection) {
    loginSection.style.display = "block";
  }

  if (dashboard) {
    dashboard.style.display = "none";
  }
}


// =============================
// تسجيل الدخول
// =============================

async function login(email, password) {

  const { data, error } =
    await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

  if (error) {
    throw error;
  }

  return data;
}


// =============================
// إضافة خبر
// =============================

async function addNews(title, content, category, image_url) {

  const { data, error } =
    await supabaseClient
      .from("news")
      .insert([
        {
          title: title,
          content: content,
          category: category,
          image_url: image_url || null
        }
      ])
      .select();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}


// =============================
// تحميل الأخبار
// =============================

async function loadNews() {

  const list = document.getElementById("news-list");

  if (!list) return;

  try {

    const { data: news, error } =
      await supabaseClient
        .from("news")
        .select("*")
        .order("created_at", {
          ascending: false
        });

    if (error) {
      throw error;
    }

    if (!news || !news.length) {

      list.innerHTML = `
        <p>لا توجد أخبار منشورة حتى الآن.</p>
      `;

      return;
    }

    list.innerHTML = news.map(article => `

      <div class="news-item">

        <h3>
          ${escapeHTML(article.title)}
        </h3>

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


// =============================
// تسجيل الخروج
// =============================

async function logout() {

  const { error } =
    await supabaseClient.auth.signOut();

  if (error) {
    console.error(error);
  }

  showLogin();
}


// =============================
// التاريخ
// =============================

function formatDate(date) {

  if (!date) return "";

  return new Date(date).toLocaleDateString(
    "ar-IQ",
    {
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  );
}


// =============================
// حماية HTML
// =============================

function escapeHTML(text) {

  if (!text) return "";

  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// =============================
// تشغيل الصفحة
// =============================

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    const {
      data: { session }
    } = await supabaseClient.auth.getSession();


    // إذا كان المدير مسجل الدخول
    if (session) {

      showDashboard();

      loadNews();

    } else {

      showLogin();

    }


    // =========================
    // نموذج تسجيل الدخول
    // =========================

    const loginForm =
      document.getElementById("login-form");

    if (loginForm) {

      loginForm.addEventListener(
        "submit",
        async (event) => {

          event.preventDefault();

          const email =
            document
              .getElementById("login-email")
              .value
              .trim();

          const password =
            document
              .getElementById("login-password")
              .value;

          const status =
            document.getElementById("login-status");

          try {

            status.style.display = "block";

            status.textContent =
              "جاري تسجيل الدخول...";

            await login(
              email,
              password
            );

            status.textContent =
              "✅ تم تسجيل الدخول";

            showDashboard();

            loadNews();

          } catch (error) {

            console.error(error);

            status.textContent =
              "❌ البريد الإلكتروني أو كلمة المرور غير صحيحة";

          }

        }
      );
const SUPABASE_URL = "https://wynectpjjflfeubcrten.supabase.co";

const SUPABASE_ANON_KEY = "ضع_مفتاحك_العام_هنا";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


// =============================
// إظهار لوحة التحكم
// =============================

function showDashboard() {

  const loginSection = document.getElementById("login-section");
  const dashboard = document.getElementById("dashboard");

  if (loginSection) {
    loginSection.style.display = "none";
  }

  if (dashboard) {
    dashboard.style.display = "block";
  }
}


// =============================
// إظهار تسجيل الدخول
// =============================

function showLogin() {

  const loginSection = document.getElementById("login-section");
  const dashboard = document.getElementById("dashboard");

  if (loginSection) {
    loginSection.style.display = "block";
  }

  if (dashboard) {
    dashboard.style.display = "none";
  }
}


// =============================
// تسجيل الدخول
// =============================

async function login(email, password) {

  const { data, error } =
    await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

  if (error) {
    throw error;
  }

  return data;
}


// =============================
// إضافة خبر
// =============================

async function addNews(title, content, category, image_url) {

  const { data, error } =
    await supabaseClient
      .from("news")
      .insert([
        {
          title: title,
          content: content,
          category: category,
          image_url: image_url || null
        }
      ])
      .select();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}


// =============================
// تحميل الأخبار
// =============================

async function loadNews() {

  const list = document.getElementById("news-list");

  if (!list) return;

  try {

    const { data: news, error } =
      await supabaseClient
        .from("news")
        .select("*")
        .order("created_at", {
          ascending: false
        });

    if (error) {
      throw error;
    }

    if (!news || !news.length) {

      list.innerHTML = `
        <p>لا توجد أخبار منشورة حتى الآن.</p>
      `;

      return;
    }

    list.innerHTML = news.map(article => `

      <div class="news-item">

        <h3>
          ${escapeHTML(article.title)}
        </h3>

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


// =============================
// تسجيل الخروج
// =============================

async function logout() {

  const { error } =
    await supabaseClient.auth.signOut();

  if (error) {
    console.error(error);
  }

  showLogin();
}


// =============================
// التاريخ
// =============================

function formatDate(date) {

  if (!date) return "";

  return new Date(date).toLocaleDateString(
    "ar-IQ",
    {
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  );
}


// =============================
// حماية HTML
// =============================

function escapeHTML(text) {

  if (!text) return "";

  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// =============================
// تشغيل الصفحة
// =============================

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    const {
      data: { session }
    } = await supabaseClient.auth.getSession();


    // إذا كان المدير مسجل الدخول
    if (session) {

      showDashboard();

      loadNews();

    } else {

      showLogin();

    }


    // =========================
    // نموذج تسجيل الدخول
    // =========================

    const loginForm =
      document.getElementById("login-form");

    if (loginForm) {

      loginForm.addEventListener(
        "submit",
        async (event) => {

          event.preventDefault();

          const email =
            document
              .getElementById("login-email")
              .value
              .trim();

          const password =
            document
              .getElementById("login-password")
              .value;

          const status =
            document.getElementById("login-status");

          try {

            status.style.display = "block";

            status.textContent =
              "جاري تسجيل الدخول...";

            await login(
              email,
              password
            );

            status.textContent =
              "✅ تم تسجيل الدخول";

            showDashboard();

            loadNews();

          } catch (error) {

            console.error(error);

            status.textContent =
              "❌ البريد الإلكتروني أو كلمة المرور غير صحيحة";

          }

        }
      );

    }


    // =========================
    // نموذج إضافة الخبر
    // =========================

    const newsForm =
      document.getElementById("news-form");

    if (newsForm) {

      newsForm.addEventListener(
        "submit",
        async (event) => {

          event.preventDefault();

          const title =
            document
              .getElementById("title")
              .value
              .trim();

          const content =
            document
              .getElementById("content")
              .value
              .trim();

          const category =
            document
              .getElementById("category")
              .value;

          const image =
            document
              .getElementById("image")
              .value
              .trim();

          const status =
            document.getElementById("status");

          try {

            status.style.display = "block";

            status.textContent =
              "جاري نشر الخبر...";

            await addNews(
              title,
              content,
              category,
              image
            );

            status.textContent =
              "✅ تم نشر الخبر بنجاح";

            newsForm.reset();

            loadNews();

          } catch (error) {

            console.error(error);

            status.textContent =
              "❌ تعذر نشر الخبر. سنتحقق من صلاحيات قاعدة البيانات في الخطوة التالية.";

          }

        }
      );

    }


    // =========================
    // زر تسجيل الخروج
    // =========================

    const logoutButton =
      document.getElementById("logout");

    if (logoutButton) {

      logoutButton.addEventListener(
        "click",
        logout
      );

    }

  }
);
