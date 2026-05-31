# 🔥 WINDSURF PROMPT — أجمد منيو مطعم في مصر

---

## المهمة العامة

اعمل redesign كامل لموقع منيو مطعم عربي/مصري. الموقع موجود بالفعل وعنده structure صح بس الألوان والتصميم مش متظبط. المطلوب هو **تجربة مستخدم استثنائية** بتخلي الزبون يحس إن المطعم ده premium ومحترم من أول لحظة يفتح فيها الموقع.

---

## 🎨 نظام الألوان — الأساس الجديد

### Palette رئيسي (لازم تطبقه بدقة):

```css
:root {
  /* Primary Brand */
  --color-brand-primary: #C9272D;       /* أحمر مصري عميق — اللون الأساسي */
  --color-brand-secondary: #1A1A1A;     /* أسود دافئ للنصوص */
  --color-brand-accent: #D4A853;        /* ذهبي للـ highlights والأسعار */

  /* Backgrounds */
  --color-bg-main: #FAFAF8;             /* أبيض مائل للكريم — مش أبيض صارخ */
  --color-bg-card: #FFFFFF;
  --color-bg-dark: #1A1A1A;             /* للـ footer والـ hero */
  --color-bg-section-alt: #F5F0E8;      /* سكشن بديل بلون عاجي */

  /* Text */
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #5A5A5A;
  --color-text-muted: #9A9A9A;
  --color-text-on-dark: #F5F0E8;

  /* Borders */
  --color-border: rgba(0,0,0,0.08);
  --color-border-accent: rgba(212, 168, 83, 0.3);

  /* Gradients */
  --gradient-hero: linear-gradient(160deg, #1A1A1A 0%, #2D1A1A 40%, #C9272D 100%);
  --gradient-card-hover: linear-gradient(135deg, #FFF8F0 0%, #FFF3E6 100%);
  --gradient-gold: linear-gradient(90deg, #D4A853, #F2CC7D, #D4A853);
}
```

---

## 🏗️ الـ Layout والـ Structure

### 1. الـ Header / Navbar

```
- خلفية: شفافة تماماً فوق الـ hero، بتتحول لـ #1A1A1A solid بعد scroll بـ 80px
- الشعار في الوسط على الموبايل، يسار على الديسكتوب
- أزرار: "القائمة" و"WhatsApp" بتصميم جديد:
  * "القائمة": border-radius: 6px، border: 1.5px solid var(--color-brand-accent)، لون النص ذهبي
  * "WhatsApp": background: #25D366، border-radius: 6px، لون النص أبيض
- height: 64px، padding: 0 24px
- transition: background 0.3s ease على الـ scroll
```

### 2. الـ Hero Section

```
- خلفية: var(--gradient-hero) مع صورة overlay بـ opacity: 0.15
- الارتفاع: 100vh على الديسكتوب، 70vh على الموبايل
- العنوان الرئيسي (اسم المطعم):
  * font-size: clamp(48px, 8vw, 96px)
  * font-weight: 700
  * لون: var(--color-text-on-dark)
  * letter-spacing: -0.02em
- tagline (بيتزا رقم واحد مذاق إيطالي... بروح مصرية):
  * font-size: 18px
  * لون: rgba(245,240,232,0.75)
  * margin-top: 12px
- شريط ذهبي رفيع (2px) بعرض 80px تحت الاسم كـ divider
- scroll indicator: سهم صغير بانيميشن نبض تحت كل حاجة
```

### 3. سكشن الصور (Carousel/Gallery)

```
- استبدل الـ carousel الحالي بـ Masonry Grid بـ 3 أعمدة على الديسكتوب، 2 على الموبايل
- كل صورة:
  * border-radius: 12px
  * overflow: hidden
  * aspect-ratio: متنوع (بعضها 4/3، بعضها 1/1)
  * على الـ hover: scale(1.03) مع overlay gradient من الأسفل بـ اسم الأكلة
  * transition: 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)
- عنوان السكشن: "من مطبخنا" بـ font-size: 32px، لون: var(--color-brand-secondary)
```

### 4. سكشن عرض المنيو

```
Header:
- عنوان "عرض المنيو" بخط عريض: font-size: 36px
- شريط ذهبي تحته
- خلفية: var(--color-bg-section-alt)

Tabs/Categories:
- pill buttons أفقية (scroll على الموبايل)
- الـ active tab:
  * background: var(--color-brand-primary)
  * color: white
  * box-shadow: 0 4px 15px rgba(201,39,45,0.3)
- الـ inactive tab:
  * background: white
  * border: 1.5px solid var(--color-border)
  * color: var(--color-text-secondary)
- transition على الاختيار بـ 0.2s ease

Menu Cards:
- Grid: repeat(auto-fill, minmax(240px, 1fr)) على الديسكتوب
- كل كارد:
  * background: var(--color-bg-card)
  * border-radius: 16px
  * border: 1px solid var(--color-border)
  * overflow: hidden
  * box-shadow: 0 2px 8px rgba(0,0,0,0.06)
  * transition: transform 0.3s ease, box-shadow 0.3s ease
  * على الـ hover: translateY(-6px) + box-shadow: 0 12px 30px rgba(0,0,0,0.12)
  
  صورة الأكلة:
  * height: 200px
  * object-fit: cover
  * width: 100%
  
  محتوى الكارد (padding: 16px):
  * اسم الأكلة: font-size: 18px, font-weight: 700, color: var(--color-text-primary)
  * وصف قصير: font-size: 13px, color: var(--color-text-muted), margin: 4px 0 12px
  * السعر: font-size: 22px, font-weight: 700, color: var(--color-brand-accent)
  * بجانب السعر: "جنيه" بـ font-size: 13px, color: var(--color-text-muted)
  
  زر "أضف للسلة":
  * width: 100%
  * height: 44px
  * background: var(--color-brand-primary)
  * color: white
  * border-radius: 8px
  * font-size: 15px, font-weight: 600
  * border: none
  * cursor: pointer
  * transition: background 0.2s, transform 0.15s
  * على الـ hover: background أغمق (darken 10%)
  * على الـ click: scale(0.97) لمدة 0.1s
  * + أيقونة سلة على الشمال
```

### 5. البانر الإعلاني (Promo Banner)

```
- مش مجرد صورة، اعمله section كامل:
- خلفية: var(--color-bg-dark)
- في الوسط: صورة الأكلة بـ drop-shadow حمرا فاتحة
- العنوان: "يسد معاك" بـ font-size: clamp(56px, 10vw, 120px), font-weight: 900
  * gradient text: var(--gradient-gold)
  * -webkit-background-clip: text
  * -webkit-text-fill-color: transparent
- تحته CTA button: "اطلب دلوقتي" 
  * background: var(--color-brand-primary)
  * padding: 16px 48px
  * border-radius: 50px (pill shape)
  * font-size: 18px, font-weight: 700
  * box-shadow: 0 8px 25px rgba(201,39,45,0.4)
  * hover: translateY(-2px) + shadow أكبر
```

### 6. سكشن المعلومات (Brand Identity Section)

```
- بدل الـ layout الحالي، اعمل Centered layout نظيف:
- الشعار أكبر (80px × 80px)
- اسم المطعم: font-size: 28px, font-weight: 700
- tagline بلون var(--color-text-muted)
- 3 أيقونات أفقية مع نصوص: الجودة | السرعة | الطعم
```

### 7. الـ Footer (تواصل معنا)

```
- خلفية: var(--color-bg-dark)
- نص: var(--color-text-on-dark)
- "تواصل معنا" heading: font-size: 28px, لون: var(--color-brand-accent)
  
بطاقة كل فرع:
- background: rgba(255,255,255,0.05)
- border: 1px solid rgba(255,255,255,0.1)
- border-radius: 16px
- padding: 24px
- اسم الفرع: font-size: 20px, font-weight: 700, لون: white
- التفاصيل (تليفون، واتساب، العنوان):
  * أيقونة ملونة + نص
  * التليفون: لون var(--color-brand-accent)
  * العنوان: لون rgba(245,240,232,0.7)
- الخريطة: border-radius: 12px, overflow: hidden, height: 150px
```

---

## ✍️ التايبوغرافي

```css
/* استورد من Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Tajawal:wght@400;500;700;900&display=swap');

body {
  font-family: 'Cairo', 'Tajawal', sans-serif;
  direction: rtl;
  text-align: right;
}

h1, h2, h3 { font-family: 'Cairo', sans-serif; }
```

---

## ⚡ الأنيميشنز والـ Interactions

### عند الـ Load:
```css
/* Fade up لكل سكشن */
.section-fade {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.section-fade.in-view {
  opacity: 1;
  transform: translateY(0);
}
```
استخدم IntersectionObserver بـ threshold: 0.15

### الـ Menu Cards:
```javascript
// Stagger delay للكروت عند الظهور
cards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});
```

### زر "أضف للسلة":
```javascript
// حركة bounce صغيرة + غير النص مؤقتاً لـ "✓ تمت الإضافة"
btn.textContent = '✓ تمت الإضافة';
btn.style.background = '#2D8A4E';
setTimeout(() => {
  btn.textContent = 'أضف للسلة';
  btn.style.background = 'var(--color-brand-primary)';
}, 1500);
```

### الـ Tabs:
```javascript
// Smooth scroll للـ section المقابل عند الضغط على tab
tab.addEventListener('click', () => {
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
```

---

## 📱 الـ Responsive Design

```
Mobile (< 768px):
- الـ Hero: 70vh، نص أصغر
- الـ Grid: عمود واحد
- الـ Tabs: horizontal scroll مع -webkit-overflow-scrolling: touch
- الـ Footer بطاقات الفروع: stack عمودياً
- الأزرار: 100% width

Tablet (768px - 1024px):
- الـ Grid: عمودين
- الـ Hero: 80vh

Desktop (> 1024px):
- الـ Grid: 3-4 أعمدة حسب الـ section
- max-width: 1280px مع margin: auto
- padding أفقي: 48px
```

---

## 🗂️ Page 2 — صفحة المنيو التفصيلية (الصورة الثانية)

### الـ Navbar العلوي:
```
- زر Language toggle (عربي/English):
  * الـ active: background: var(--color-brand-secondary), color: white, border-radius: 6px
  * الـ inactive: مجرد نص
- "قائمة الطعام" رابط + Hamburger icon على اليمين
- height: 56px، border-bottom: 1px solid var(--color-border)
```

### صورة الـ Hero للصفحة:
```
- height: 280px على الديسكتوب، 200px على الموبايل
- object-fit: cover
- overlay gradient من الأسفل للأعلى: من rgba(0,0,0,0.6) إلى شفاف
- اسم المطعم فوق الصورة على الـ overlay
```

### Filter Tabs:
```
- "الكل" + الأقسام
- position: sticky; top: 56px (تحت الـ navbar)
- background: var(--color-bg-main) مع blur: 12px (glass effect)
- border-bottom: 2px solid var(--color-border)
- الـ active:
  * color: var(--color-brand-primary)
  * border-bottom: 2px solid var(--color-brand-primary)
  * margin-bottom: -2px
```

### تفاصيل الـ Menu Items Page:
```
كل item:
- Layout أفقي (صورة يمين + محتوى يسار على الموبايل)
- الصورة: 120px × 120px، border-radius: 10px
- اسم الأكلة: font-size: 17px, font-weight: 700
- الوصف: font-size: 13px, color: var(--color-text-muted), line-height: 1.5
- السعر: font-size: 20px, font-weight: 700, color: var(--color-brand-accent)
- زر "+": دائري، 36px × 36px، background: var(--color-brand-primary)، لون أبيض

فاصل بين الأقسام:
- section header: font-size: 24px, font-weight: 900
- خط ذهبي رفيع تحته (3px، عرض 48px)
- margin: 32px 0 16px
```

---

## 🔧 تفاصيل تقنية مهمة

```
1. اعمل CSS Variables في :root وطبقها في كل مكان — لا ألوان hardcoded

2. اعمل smooth scroll للصفحة كلها:
   html { scroll-behavior: smooth; }

3. الخطوط: preload الـ fonts الأساسية:
   <link rel="preload" as="style" href="...cairo...">

4. الصور: استخدم loading="lazy" على كل الصور اللي تحت fold

5. حط box-sizing: border-box على كل العناصر

6. الـ hover effects لازم تستخدم transform مش top/left عشان GPU acceleration

7. في الـ RTL: الأيقونات اللي بتشير (سهم مثلاً) ادورها بـ:
   [dir="rtl"] .arrow-icon { transform: scaleX(-1); }

8. الـ z-index scale منظمة:
   --z-base: 1
   --z-card: 10
   --z-sticky: 100
   --z-navbar: 200
   --z-modal: 300

9. الـ Cart Counter (لو موجود):
   position: absolute; على الـ cart icon
   background: var(--color-brand-primary)
   border-radius: 50%
   min-width: 20px; height: 20px
   font-size: 11px; font-weight: 700

10. خلي الـ WhatsApp button يعمل رابط مباشر:
    https://wa.me/[رقم] مع رسالة جاهزة encoded
```

---

## 🎯 الهدف النهائي

الموقع بعد التعديل لازم:
- يحمّل بـ < 2 ثانية
- يبدو **premium** — مش generic
- الزبون لما يفتحه يحس إنه في مطعم محترم مش مجرد منيو رخيص
- الألوان متناسقة 100% — الأحمر والذهبي والأسود الدافئ هم السيد
- كل تفاعل (hover, click, scroll) فيه حركة ناعمة
- على الموبايل يبدو أجمل من التطبيق نفسه

---

> **ملاحظة للـ Windsurf:** ابدأ من الـ CSS Variables الأول، بعدين الـ Typography، بعدين كل سكشن على حدة. لو في أي conflict مع الكود الموجود، الـ Design System الجديد ده هو المرجع.
