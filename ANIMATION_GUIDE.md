# دليل انميشن بداية تشغيل الموقع (Preloader Guide)

هذا الملف يشرح كيفية عمل شاشة التحميل أو "الانميشن" الذي يظهر أولاً عند فتح الموقع، وكيفية التحكم به برمجياً.

---

## 1. الهيكل (HTML)
يجب أن يكون عنصر انميشن البداية هو أول عنصر في صفحة الـ `<body>` لضمان ظهوره فوراً.

```html
<div id="preloader">
    <div class="loader-logo">AURA</div>
</div>
```
*   `id="preloader"`: المعرف الذي سنستخدمه في CSS و JS للتحكم في هذه الشاشة.
*   `loader-logo`: العنصر (نص أو لوجو) الذي سيتحرك داخل الشاشة.

---

## 2. التصميم (CSS)
هنا نجعل الشاشة تغطي كامل الصفحة وتظهر فوق كل العناصر الأخرى.

```css
#preloader {
    position: fixed;        /* لجعلها ثابتة فوق كل شيء */
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: #000;      /* لون الخلفية (الأسود فخم جداً) */
    z-index: 9999;         /* لضمان أنها فوق أي عنصر آخر في الموقع */
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 1s ease; /* سرعة اختفاء الشاشة */
}

.loader-logo {
    animation: glow 1.5s infinite alternate; /* ربط الانميشن باللوجو */
}

@keyframes glow {
    from { opacity: 0.3; }
    to { opacity: 1; }
}
```

---

## 3. البرمجة (JavaScript)
هذا هو الجزء المسؤول عن إخفاء الشاشة بعد اكتمال تحميل الموقع.

```javascript
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // ننتظر قليلاً (مثلاً ثانية واحدة) لضمان رؤية الانميشن
    setTimeout(() => {
        // نغير مكان الشاشة للأعلى لإخفائها
        preloader.style.transform = 'translateY(-100%)';
    }, 1000);
});
```
**شرح السطور:**
*   `window.addEventListener('load')`: ينتظر حتى يتم تحميل كل الصور والملفات تماماً.
*   `setTimeout`: وظيفة تأخير لإعطاء المستخدم فرصة للاستمتاع بالانميشن.
*   `translateY(-100%)`: يحرك الشاشة بالكامل للأعلى خارج حدود الرؤية.

---

---
==============================================================

## 5. أمثلة عملية (Modern Animation Code)
===============================================================

### مثال 1: انميشن الستارة (Curtain Reveal)
هذا التصميم يقسم الشاشة لنصفين يفتحان لليسار واليمين.

**HTML:**
```html
<div id="curtain-loader">
    <div class="left-panel"></div>
    <div class="right-panel"></div>
    <div class="loader-content">AURA</div>
</div>
```

**CSS:**
```css
#curtain-loader {
    position: fixed; inset: 0; z-index: 9999;
    display: flex; justify-content: center; align-items: center;
}
.left-panel, .right-panel {
    position: absolute; top: 0; height: 100%; width: 50%;
    background: #000; transition: transform 1.2s cubic-bezier(0.8, 0, 0.2, 1);
}
.left-panel { left: 0; }
.right-panel { right: 0; }
.loader-content { color: #fff; z-index: 1; font-size: 3rem; letter-spacing: 10px; }

/* عند الانتهاء */
#curtain-loader.loaded .left-panel { transform: translateX(-100%); }
#curtain-loader.loaded .right-panel { transform: translateX(100%); }
#curtain-loader.loaded .loader-content { opacity: 0; transition: 0.5s; }
```

**JS:**
```javascript
window.addEventListener('load', () => {
    const loader = document.getElementById('curtain-loader');
    setTimeout(() => {
        loader.classList.add('loaded');
        setTimeout(() => loader.style.display = 'none', 1200);
    }, 1500);
});
```

---

### مثال 2: التلاشي مع التكبير (Zoom & Fade Out)
يعطي شعوراً بالعمق كأنك تدخل داخل الموقع.

**HTML:**
```html
<div id="zoom-loader">
    <div class="zoom-circle">AURA</div>
</div>
```

**CSS:**
```css
#zoom-loader {
    position: fixed; inset: 0; background: #fff; z-index: 9999;
    display: flex; justify-content: center; align-items: center;
    transition: opacity 1s, transform 1s;
}
.zoom-circle {
    font-size: 2rem; font-weight: bold;
    animation: pulseZoom 2s infinite ease-in-out;
}
@keyframes pulseZoom {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.5); opacity: 1; }
}

/* حالة الخروج */
#zoom-loader.hide {
    opacity: 0;
    transform: scale(3); /* تكبير الشاشة بالكامل للخارج */
    pointer-events: none;
}
```

---

### مثال 3: النص المقطع (Staggered Text)
ظهور الحروف واحداً تلو الآخر بشكل احترافي.

**HTML:**
```html
<div id="stagger-loader">
    <div class="text-wrapper">
        <span class="letter">A</span>
        <span class="letter">U</span>
        <span class="letter">R</span>
        <span class="letter">A</span>
    </div>
</div>
```

**CSS:**
```css
.letter {
    display: inline-block; opacity: 0; transform: translateY(30px);
    animation: revealLetter 0.5s forwards;
}
.letter:nth-child(1) { animation-delay: 0.1s; }
.letter:nth-child(2) { animation-delay: 0.2s; }
.letter:nth-child(3) { animation-delay: 0.3s; }
.letter:nth-child(4) { animation-delay: 0.4s; }

@keyframes revealLetter {
    to { opacity: 1; transform: translateY(0); }
}
```
