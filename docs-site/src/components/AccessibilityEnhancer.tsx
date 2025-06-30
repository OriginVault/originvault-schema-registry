/* global MediaQueryListEvent, KeyboardEvent */
import React, { useEffect, useState } from 'react';

interface AccessibilityEnhancerProps {
  children: React.ReactNode;
}

const AccessibilityEnhancer: React.FC<AccessibilityEnhancerProps> = ({ children }) => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [fontSize] = useState(16);

  useEffect(() => {
    // Check for user preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    // Check for high contrast preference
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(highContrastQuery.matches);

    const handleContrastChange = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches);
    };

    highContrastQuery.addEventListener('change', handleContrastChange);

    // Apply accessibility styles
    const style = document.createElement('style');
    style.id = 'accessibility-styles';
    style.textContent = `
      /* High contrast mode */
      .high-contrast {
        --primary-color: #000000 !important;
        --secondary-color: #ffffff !important;
        --background-color: #ffffff !important;
        --text-color: #000000 !important;
        --border-color: #000000 !important;
      }

      /* Reduced motion */
      .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }

      /* Large text */
      .large-text {
        font-size: ${fontSize}px !important;
      }

      /* Focus indicators */
      *:focus {
        outline: 3px solid #5794b4 !important;
        outline-offset: 2px !important;
      }

      /* Screen reader only text */
      .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }

      /* Skip to content link */
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #5794b4;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
      }

      .skip-link:focus {
        top: 6px;
      }

      /* ARIA live regions */
      .aria-live {
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }

      /* Semantic landmarks */
      [role="main"] {
        outline: 2px dashed #5794b4;
        outline-offset: 2px;
      }

      [role="navigation"] {
        outline: 2px dashed #c9b36d;
        outline-offset: 2px;
      }

      [role="complementary"] {
        outline: 2px dashed #8bc34a;
        outline-offset: 2px;
      }
    `;

    document.head.appendChild(style);

    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add ARIA live region for dynamic content
    const liveRegion = document.createElement('div');
    liveRegion.className = 'aria-live';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    document.body.appendChild(liveRegion);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      highContrastQuery.removeEventListener('change', handleContrastChange);
      const existingStyle = document.getElementById('accessibility-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
      const existingSkipLink = document.querySelector('.skip-link');
      if (existingSkipLink) {
        existingSkipLink.remove();
      }
      const existingLiveRegion = document.querySelector('.aria-live');
      if (existingLiveRegion) {
        existingLiveRegion.remove();
      }
    };
  }, [fontSize]);

  useEffect(() => {
    // Apply accessibility classes to body
    const body = document.body;
    if (isHighContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }

    if (isReducedMotion) {
      body.classList.add('reduced-motion');
    } else {
      body.classList.remove('reduced-motion');
    }

    body.classList.add('large-text');
  }, [isHighContrast, isReducedMotion, fontSize]);

  // Keyboard navigation enhancement
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape key to close modals/dropdowns
      if (event.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.blur) {
          activeElement.blur();
        }
      }

      // Tab key navigation enhancement
      if (event.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Announce page changes to screen readers
  const announceToScreenReader = (message: string) => {
    const liveRegion = document.querySelector('.aria-live') as HTMLElement;
    if (liveRegion) {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  };

  // Expose announce function globally for use in other components
  useEffect(() => {
    (window as any).announceToScreenReader = announceToScreenReader;
    return () => {
      delete (window as any).announceToScreenReader;
    };
  }, []);

  return (
    <>
      {children}
      {/* Hidden content for screen readers */}
      <div className="sr-only" aria-hidden="true">
        <h1>OriginVault Schema Registry</h1>
        <p>Interactive JSON schema documentation with QuickType integration for verifiable credentials and decentralized identity</p>
        <nav aria-label="Main navigation">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/explorer">Schema Explorer</a></li>
            <li><a href="/quicktype">QuickType Guide</a></li>
            <li><a href="/docs">Documentation</a></li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AccessibilityEnhancer; 