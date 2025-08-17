// load-footer.js
class SiteFooter extends HTMLElement {
    async connectedCallback() {
        const tryPaths = [
            '/footers.html',           // works for user sites (root domain)
            './footers.html',          // same folder
            '../footers.html'          // one level up (e.g., /projects/page.html)
        ];
        for (const url of tryPaths) {
            try {
                const res = await fetch(url, { cache: 'no-cache' });
                if (!res.ok) continue;
                const html = await res.text();
                this.innerHTML = html;
                const y = this.querySelector('[data-year]');
                if (y) y.textContent = new Date().getFullYear();
                return;
            } catch (e) { /* try next */ }
        }
        // Fallback (optional)
        this.innerHTML = `<footer class="site-footer"><p>© <span>${new Date().getFullYear()}</span> Nicolas Barleon</p></footer>`;
    }
}
customElements.define('site-footer', SiteFooter);