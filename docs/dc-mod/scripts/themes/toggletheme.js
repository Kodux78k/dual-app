function toggleTheme(){ const o=['dark','light','medium','vibe'], c=localStorage.getItem(THEME_KEY)||'dark', n=o[(o.indexOf(c)+1)%o.length]; applyTheme(n); localStorage.setItem(THEME_KEY,n); }

    