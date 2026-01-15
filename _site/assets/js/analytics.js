/**
 * BestMoney NZ - Analytics & Event Tracking
 * Tracks user interactions for conversion optimization
 */

(function() {
  'use strict';

  const Analytics = {
    init: function() {
      this.bindCTAClicks();
      this.bindFilterUsage();
      this.trackPageView();
    },

    bindCTAClicks: function() {
      document.querySelectorAll('[data-track-click]').forEach(el => {
        el.addEventListener('click', (e) => {
          const trackId = e.currentTarget.dataset.trackClick;
          this.trackEvent('cta_click', {
            provider_id: trackId,
            page: window.location.pathname,
            button_text: e.currentTarget.textContent.trim()
          });
        });
      });
    },

    bindFilterUsage: function() {
      const filterForm = document.getElementById('comparison-filters');
      if (filterForm) {
        filterForm.addEventListener('change', (e) => {
          this.trackEvent('filter_used', {
            filter_name: e.target.name,
            filter_value: e.target.value,
            page: window.location.pathname
          });
        });
      }
    },

    trackPageView: function() {
      this.trackEvent('page_view', {
        page: window.location.pathname,
        title: document.title,
        referrer: document.referrer
      });
    },

    trackEvent: function(eventName, eventData) {
      // Google Analytics 4
      if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
      }

      // Console log for development
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Analytics Event:', eventName, eventData);
      }
    }
  };

  document.addEventListener('DOMContentLoaded', () => Analytics.init());
})();
