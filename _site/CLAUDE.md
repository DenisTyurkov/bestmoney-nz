# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Install dependencies
bundle install

# Start development server (http://localhost:4000)
bundle exec jekyll serve

# Build for production
bundle exec jekyll build

# Build with live reload
bundle exec jekyll serve --livereload
```

## Architecture

This is a Jekyll static site for BestMoney.co.nz, a financial comparison website targeting the New Zealand market. It compares personal loans, car loans, and car insurance.

### Data Flow

Provider data lives in YAML files under `_data/` and flows into pages via Liquid templates:

```
_data/{vertical}/lenders.yml → _layouts/comparison.html → _includes/components/lender-card.html
```

The data structure uses nested keys:
- `site.data.personal_loans.lenders.lenders` - array of personal loan providers
- `site.data.car_loans.lenders.lenders` - array of car loan providers
- `site.data.car_insurance.providers.providers` - array of insurance providers

### Key Layouts

- **`_layouts/comparison.html`** - Main comparison pages (Top 10 lists). Iterates over provider data, renders filter bar and lender/insurance cards.
- **`_layouts/home.html`** - Homepage with hero, category tiles, and preview of top providers.
- **`_layouts/provider.html`** - Individual provider review pages with pros/cons, features, and CTA.

### Core Components

- **`_includes/components/lender-card.html`** - Renders a single lender with rank badge, logo, features, BestMoney score, APR stats, and CTA. Used for loan verticals.
- **`_includes/components/insurance-card.html`** - Similar to lender-card but for insurance providers with coverage types.
- **`_includes/components/filter-bar.html`** - Client-side filtering UI. Conditionally shows different filters based on `include.vertical`.

### CSS Architecture

SCSS partials in `assets/css/_partials/`:
- `_variables.scss` - Brand colors (#225447 primary, #16CA92 accent), typography (Inter), spacing scale
- `_cards.scss` - Lender card, rating badge, category tile styles
- `_comparison.scss` - Comparison page layout, FAQ accordion, filter section

### JavaScript

- `assets/js/filters.js` - Client-side filtering by credit score, loan amount, income. Updates URL params and shows/hides cards.
- `assets/js/analytics.js` - Event tracking for CTA clicks and filter usage.

### Adding a New Vertical

1. Create data file: `_data/{vertical_slug}/lenders.yml` with `lenders:` array
2. Add vertical to `_config.yml` under `verticals:`
3. Create pages: `{vertical}/index.html` and `{vertical}/compare-{vertical}.html`
4. Set `vertical: "{vertical_slug}"` in comparison page front matter

### Provider Data Schema

Each lender entry requires:
```yaml
- id: "provider-id"
  name: "Provider Name"
  bestmoney_score: 9.5
  apr_display: "12.90% - 19.95%"
  loan_amount_min: 1000
  loan_amount_max: 50000
  credit_score_min: "good"  # poor|fair|good|excellent
  features: ["Feature 1", "Feature 2", "Feature 3"]
  pros: [...]
  cons: [...]
```

### Deployment

GitHub Actions workflow in `.github/workflows/deploy.yml` auto-deploys to GitHub Pages on push to `main`.
