# BestMoney.co.nz - Project Summary

## Overview
A Jekyll static site for the New Zealand market, replicating BestMoney.com's design and functionality. Hosted on GitHub Pages with manual content managed in YAML/Markdown files.

**Domain**: bestmoney.co.nz
**Tech Stack**: Jekyll, SCSS, Vanilla JS, GitHub Pages
**Created**: January 2026

---

## Project Structure
```
bestmoney-nz/
├── _config.yml          # Site configuration
├── Gemfile              # Ruby dependencies
├── _data/               # YAML data for all providers
│   ├── navigation.yml
│   ├── personal_loans/lenders.yml (10 NZ lenders)
│   ├── car_loans/lenders.yml (10 NZ lenders)
│   └── car_insurance/providers.yml (10 NZ insurers)
├── _layouts/            # Page templates
│   ├── default.html     # Base layout
│   ├── home.html        # Homepage
│   ├── comparison.html  # Top 10 comparison pages
│   └── provider.html    # Individual provider reviews
├── _includes/           # Reusable components
│   ├── head.html, header.html, footer.html, scripts.html
│   └── components/
│       ├── lender-card.html    # Main comparison card
│       ├── insurance-card.html # Insurance provider card
│       └── filter-bar.html     # Filter controls
├── assets/
│   ├── css/             # SCSS design system
│   │   ├── main.scss
│   │   └── _partials/   # Variables, cards, buttons, etc.
│   ├── js/              # JavaScript functionality
│   │   ├── filters.js   # Client-side filtering
│   │   └── analytics.js # Event tracking
│   └── images/          # Logos, icons, hero images
├── personal-loans/      # Personal loans vertical
├── car-loans/           # Car loans vertical
├── car-insurance/       # Car insurance vertical
└── .github/workflows/   # GitHub Pages deployment
```

---

## Verticals

### 1. Personal Loans
- **Comparison Page**: `/personal-loans/compare-personal-loans/`
- **Providers**: ANZ, ASB, Westpac, Kiwibank, Harmoney, BNZ, SBS, Nectar, Co-op, Heartland
- **Data File**: `_data/personal_loans/lenders.yml`

### 2. Car Loans
- **Comparison Page**: `/car-loans/compare-car-loans/`
- **Providers**: ANZ, ASB, Westpac, Kiwibank, Harmoney, BNZ, MTF, Oxford Finance, Gem, Turners
- **Data File**: `_data/car_loans/lenders.yml`

### 3. Car Insurance
- **Comparison Page**: `/car-insurance/compare-car-insurance/`
- **Providers**: State, AA Insurance, Tower, AMI, Trade Me, Youi, Cove, Vero, NZI, Warehouse Money
- **Data File**: `_data/car_insurance/providers.yml`

---

## Design System

### Brand Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Dark Teal) | `#225447` | Header, footer, headings |
| Accent (Green) | `#16CA92` | CTAs, highlights, scores |
| Accent Light | `#E8FAF4` | Backgrounds, badges |

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700

### Key Components
- **Lender Card**: Displays rank, logo, features, BestMoney score, APR, CTA
- **Filter Bar**: Dropdowns for loan amount, income, credit score
- **Rating Badge**: BestMoney score with color gradient

---

## Data Schema

### Lender (Personal/Car Loans)
```yaml
- id: "anz-personal-loan"
  name: "ANZ Personal Loan"
  logo: "/assets/images/logos/providers/anz.svg"
  website: "https://..."
  affiliate_url: "#"
  bestmoney_score: 9.6
  rank: 1
  is_top_pick: true
  apr_display: "12.90% - 19.95%"
  loan_amount_min: 1000
  loan_amount_max: 50000
  credit_score_min: "good"
  features: ["Feature 1", "Feature 2", "Feature 3"]
  pros: [...]
  cons: [...]
  trustpilot_rating: 4.2
  weekly_visitors: 2847
```

### Insurance Provider
```yaml
- id: "state-insurance"
  name: "State Insurance"
  logo: "/assets/images/logos/providers/state.svg"
  bestmoney_score: 9.4
  coverage_types:
    - type: "comprehensive"
      available: true
  price_range: "$$"
  claims_rating: 4.5
  features: [...]
```

---

## Running Locally

```bash
# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

Open http://localhost:4000

---

## Deployment to GitHub Pages

1. Create GitHub repo named `bestmoney-nz`
2. Push code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin git@github.com:YOUR_USERNAME/bestmoney-nz.git
   git push -u origin main
   ```
3. Enable GitHub Pages in repo Settings → Pages
4. The GitHub Actions workflow will auto-deploy on push
5. Configure custom domain `bestmoney.co.nz` in Settings → Pages

---

## Adding New Content

### Add a New Lender
1. Edit `_data/personal_loans/lenders.yml` (or relevant vertical)
2. Add new entry following the schema above
3. Rebuild site

### Add a New Provider Page
1. Create file in `_providers/personal-loans/provider-name.md`
2. Add front matter with provider details
3. Write content in Markdown

### Update Comparison Page FAQs
Edit the `faqs` array in the comparison page front matter (e.g., `personal-loans/compare-personal-loans.html`)

---

## Files to Update Regularly

- `_data/*/lenders.yml` - Interest rates, features, rankings
- `_config.yml` - Site settings, verticals
- Comparison pages - FAQs, weekly visitor counts
- `last_updated` dates in data files

---

## Future Enhancements

- [ ] Add provider logo images (currently using placeholders)
- [ ] Add more educational guide content
- [ ] Implement calculator tools
- [ ] Add more verticals (home loans, credit cards, etc.)
- [ ] Set up actual affiliate tracking URLs
- [ ] Add Google Analytics
