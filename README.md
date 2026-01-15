# BestMoney.co.nz

A financial comparison website for the New Zealand market, built with Jekyll and hosted on GitHub Pages. Compare personal loans, car loans, and car insurance from top NZ providers.

## Features

- **Personal Loans** - Compare 10 NZ lenders including ANZ, ASB, Westpac, Kiwibank, Harmoney
- **Car Loans** - Compare 10 NZ lenders including major banks and finance companies
- **Car Insurance** - Compare 10 NZ insurers including State, AA Insurance, Tower, AMI
- **Client-side Filtering** - Filter by loan amount, income, and credit score
- **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

- **Static Site Generator**: Jekyll
- **Styling**: SCSS with custom design system
- **JavaScript**: Vanilla JS for filtering and analytics
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Ruby 2.7+
- Bundler

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/bestmoney-nz.git
cd bestmoney-nz

# Install dependencies
bundle install
```

### Development

```bash
# Start development server with live reload
bundle exec jekyll serve --livereload
```

Open http://localhost:4000

### Production Build

```bash
bundle exec jekyll build
```

Output is generated in the `_site/` directory.

## Project Structure

```
bestmoney-nz/
├── _config.yml              # Site configuration
├── _data/                   # Provider data (YAML)
│   ├── personal_loans/
│   ├── car_loans/
│   └── car_insurance/
├── _layouts/                # Page templates
│   ├── home.html
│   ├── comparison.html
│   └── provider.html
├── _includes/components/    # Reusable UI components
├── assets/
│   ├── css/                 # SCSS design system
│   ├── js/                  # Filtering and analytics
│   └── images/              # Logos and icons
├── personal-loans/          # Personal loans pages
├── car-loans/               # Car loans pages
└── car-insurance/           # Car insurance pages
```

## Managing Content

### Update Provider Data

Edit the YAML files in `_data/`:
- `_data/personal_loans/lenders.yml`
- `_data/car_loans/lenders.yml`
- `_data/car_insurance/providers.yml`

### Add a New Provider

Add an entry to the relevant YAML file:

```yaml
- id: "provider-id"
  name: "Provider Name"
  bestmoney_score: 9.5
  apr_display: "12.90% - 19.95%"
  loan_amount_min: 1000
  loan_amount_max: 50000
  credit_score_min: "good"  # poor|fair|good|excellent
  features:
    - "Feature 1"
    - "Feature 2"
```

### Add a New Vertical

1. Create data file: `_data/{vertical}/lenders.yml`
2. Add vertical to `_config.yml`
3. Create pages in `{vertical}/` directory
4. Set `vertical: "{vertical}"` in page front matter

## Deployment

The site auto-deploys to GitHub Pages via GitHub Actions on push to `main`.

### Manual Deployment

1. Enable GitHub Pages in repository Settings
2. Set source to GitHub Actions
3. Configure custom domain if needed

## Design System

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#225447` | Header, footer, headings |
| Accent | `#16CA92` | CTAs, highlights, scores |
| Accent Light | `#E8FAF4` | Backgrounds, badges |

**Typography**: Inter (Google Fonts)

## License

All rights reserved.
