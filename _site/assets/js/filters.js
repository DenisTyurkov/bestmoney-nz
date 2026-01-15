/**
 * BestMoney NZ - Comparison Filter Functionality
 * Handles client-side filtering of lender/provider cards
 */

(function() {
  'use strict';

  const FilterManager = {
    init: function() {
      this.filterForm = document.getElementById('comparison-filters');
      this.lenderCards = document.querySelectorAll('.lender-card');
      this.resultsCount = document.getElementById('results-count');

      console.log('FilterManager init:', {
        filterForm: !!this.filterForm,
        lenderCards: this.lenderCards.length,
        resultsCount: !!this.resultsCount
      });

      if (!this.filterForm || !this.lenderCards.length) {
        console.log('FilterManager: Missing elements, exiting');
        return;
      }

      this.bindEvents();
      this.initFromURL();
    },

    bindEvents: function() {
      // Listen for changes on all filter inputs
      this.filterForm.addEventListener('change', this.handleFilterChange.bind(this));

      // Handle form reset
      this.filterForm.addEventListener('reset', () => {
        setTimeout(() => {
          this.applyFilters();
          this.updateURL({});
        }, 0);
      });

      // Mobile filter toggle
      const mobileToggle = document.querySelector('.filter-toggle-mobile');
      if (mobileToggle) {
        mobileToggle.addEventListener('click', this.toggleMobileFilters.bind(this));
      }
    },

    initFromURL: function() {
      const params = new URLSearchParams(window.location.search);
      const filters = {};

      for (const [key, value] of params.entries()) {
        filters[key] = value;
        const select = this.filterForm.querySelector(`[name="${key}"]`);
        if (select) {
          select.value = value;
        }
      }

      if (Object.keys(filters).length > 0) {
        this.applyFilters();
      }
    },

    handleFilterChange: function() {
      this.applyFilters();
    },

    applyFilters: function() {
      const filters = this.getActiveFilters();
      let visibleCount = 0;

      console.log('Applying filters:', filters);

      this.lenderCards.forEach(card => {
        const isVisible = this.cardMatchesFilters(card, filters);
        console.log('Card:', card.dataset.lenderId || card.dataset.providerId, 'visible:', isVisible);
        card.hidden = !isVisible;
        if (isVisible) visibleCount++;
      });

      console.log('Visible count:', visibleCount);

      // Update results count
      if (this.resultsCount) {
        this.resultsCount.textContent = visibleCount;
      }

      // Update URL with filter params
      this.updateURL(filters);
    },

    getActiveFilters: function() {
      const formData = new FormData(this.filterForm);
      const filters = {};

      for (const [key, value] of formData.entries()) {
        if (value) {
          filters[key] = value;
        }
      }

      return filters;
    },

    cardMatchesFilters: function(card, filters) {
      // Coverage type filter (car insurance)
      if (filters.coverage) {
        const cardCoverages = this.getCardString(card, 'coverage-types')
          .split(',')
          .map(value => value.trim().toLowerCase())
          .filter(Boolean);
        if (!cardCoverages.length || !cardCoverages.includes(filters.coverage)) {
          return false;
        }
      }

      // Credit score filter
      if (filters.credit) {
        const cardCredit = this.getCardString(card, 'credit-score');
        if (!cardCredit || !this.creditScoreMatches(cardCredit, filters.credit)) {
          return false;
        }
      }

      // Loan amount filter
      if (filters.amount) {
        const cardMinAmount = this.getCardNumber(card, 'loan-amount-min');
        const cardMaxAmount = this.getCardNumber(card, 'loan-amount-max');
        if (cardMinAmount === null || cardMaxAmount === null) {
          return false;
        }
        if (!this.amountMatches(cardMinAmount, cardMaxAmount, filters.amount)) {
          return false;
        }
      }

      // Income filter
      if (filters.income) {
        const cardMinIncome = this.getCardNumber(card, 'min-income');
        if (cardMinIncome === null || !this.incomeMatches(cardMinIncome, filters.income)) {
          return false;
        }
      }

      return true;
    },

    creditScoreMatches: function(cardCredit, filterCredit) {
      const creditHierarchy = ['poor', 'fair', 'good', 'excellent'];
      const cardIndex = creditHierarchy.indexOf(cardCredit);
      const filterIndex = creditHierarchy.indexOf(filterCredit);

      // Card qualifies if its minimum requirement is at or below the user's credit
      return cardIndex <= filterIndex;
    },

    amountMatches: function(cardMin, cardMax, filterRange) {
      const ranges = {
        '0-5000': [0, 5000],
        '5000-10000': [5000, 10000],
        '10000-25000': [10000, 25000],
        '25000-50000': [25000, 50000],
        '50000+': [50000, Infinity]
      };

      const [filterMin, filterMax] = ranges[filterRange] || [0, Infinity];

      // Card qualifies if its range overlaps with the filter range
      return cardMin <= filterMax && cardMax >= filterMin;
    },

    incomeMatches: function(cardMinIncome, filterRange) {
      const ranges = {
        '0-30000': [0, 30000],
        '30000-50000': [30000, 50000],
        '50000-75000': [50000, 75000],
        '75000-100000': [75000, 100000],
        '100000+': [100000, Infinity]
      };

      const [, filterMax] = ranges[filterRange] || [0, Infinity];
      return cardMinIncome <= filterMax;
    },

    updateURL: function(filters) {
      const params = new URLSearchParams(filters);
      const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
      history.replaceState(null, '', newURL);
    },

    getCardNumber: function(card, attrName) {
      const raw = card.getAttribute(`data-${attrName}`);
      if (raw === null || raw === '') return null;
      const parsed = parseFloat(raw);
      return Number.isNaN(parsed) ? null : parsed;
    },

    getCardString: function(card, attrName) {
      const raw = card.getAttribute(`data-${attrName}`);
      return raw ? raw.trim().toLowerCase() : '';
    },

    toggleMobileFilters: function(e) {
      const toggle = e.currentTarget;
      const form = this.filterForm;
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

      toggle.setAttribute('aria-expanded', !isExpanded);
      form.classList.toggle('is-open');
    }
  };

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => FilterManager.init());
})();
