// theme.js
(function () {
    const KEY = "theme"; // "light" | "dark" | null -> system
    const root = document.documentElement;
    const body = document.body;
    const osDark = () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    function setTheme(val) {
        [root, body].forEach(el => {
            if (!el) return;
            if (val) el.setAttribute("data-theme", val);
            else el.removeAttribute("data-theme");
        });
        const btn = document.getElementById("theme-toggle");
        if (btn) {
            const label = val === "dark" ? "Switch to light mode"
                : val === "light" ? "Switch to dark mode"
                    : osDark() ? "Switch to light mode" : "Switch to dark mode";
            btn.setAttribute("aria-label", label);
            btn.title = label;
        }
    }

    const saved = localStorage.getItem(KEY);
    const initial = (saved === "light" || saved === "dark") ? saved : null;
    setTheme(initial);

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        if (!localStorage.getItem(KEY)) setTheme(null);
    });

    // Click = toggle light/dark; Alt/Option+Click = reset to System
    window.__toggleTheme = function (ev) {
        const current =
            root.getAttribute("data-theme") ||
            body.getAttribute("data-theme") ||
            (saved || (osDark() ? "dark" : "light"));
        const next = ev && (ev.altKey || ev.metaKey) ? null : (current === "dark" ? "light" : "dark");
        if (next) localStorage.setItem(KEY, next); else localStorage.removeItem(KEY);
        setTheme(next);
    };
})();