# Marketing Metrics Calculator

A small, free, dependency-free web calculator for the four metrics marketers reach for most: **ROMI, MER, CAC and LTV**. Plain HTML, CSS and JavaScript. No build step, no sign-up, no data leaves the browser.

## Metrics

| Metric | Formula | What it tells you |
| --- | --- | --- |
| ROMI | (attributed revenue - spend) / spend | Return on marketing investment, as a percentage |
| MER | total revenue / spend | Overall marketing efficiency ratio |
| CAC | spend / new customers | What each new customer costs to acquire |
| LTV | average order value x gross margin x lifespan | Margin-adjusted lifetime value per customer |

The result panel also shows the **LTV:CAC ratio** with a short reading against the common 3:1 benchmark.

## Use it

Open `index.html` in any browser, or visit the hosted version on GitHub Pages:

**https://qafisheh7.github.io/marketing-calculator/**

## Self-host

It is a static site. Copy the files to any web server or fork the repo and enable GitHub Pages (Settings -> Pages -> deploy from the `main` branch, root folder).

## Files

- `index.html` - page structure and inputs
- `app.js` - metric calculations and rendering (pure functions, testable in Node)
- `style.css` - styling

## License

MIT. Use it, change it, share it.
