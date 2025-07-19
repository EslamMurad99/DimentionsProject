# Splash Screen Fix

## Overview
The splash screen has been updated to show only on external visits to the home page, not when navigating internally using the navigation bar.

## New Behavior:

### Shows Splash Screen When:
- Direct URL access (typing the URL in browser)
- Coming from external websites
- Bookmark access
- Browser refresh/reload
- Opening in new tab/window

### Hides Splash Screen When:
- Navigating from other pages using navigation bar
- Using internal links within the site
- Coming from same domain
- Using browser back/forward buttons (within same session)

## What was implemented:

1. **Navigation Tracking:**
   - Uses `sessionStorage` to track internal navigation
   - Monitors all navigation links (desktop and mobile)
   - Detects same-domain referrers

2. **Smart Detection:**
   - Checks `document.referrer` for same-domain visits
   - Uses `sessionStorage` for internal navigation state
   - Handles both desktop and mobile navigation

3. **Animation Sequence:**
   - Logo fades in (0.7s)
   - Logo stays visible (3s)
   - Logo fades out (0.5s)
   - Splash screen slides up and disappears (1s)

## How to test:

### Method 1: Using the test page
1. Open `test-splash.html` in your browser
2. Use "Reset Splash Screen" to clear internal navigation state
3. Use "Simulate Internal Navigation" to test internal navigation behavior
4. Refresh the page to see the difference

### Method 2: Using browser console
1. Open the main `index.html` page
2. Open browser console (F12)
3. Run: `resetSplashScreen(); location.reload();`
4. The splash screen should appear

### Method 3: Test navigation flow
1. Start on any page (services.html, projects.html, etc.)
2. Click "Home" in navigation - splash screen should NOT appear
3. Open a new tab and go directly to index.html - splash screen SHOULD appear
4. Use browser back button - splash screen should NOT appear

## Troubleshooting:

### If splash screen appears when it shouldn't:
1. Check if navigation links are properly marked as internal
2. Verify sessionStorage is working
3. Check console for navigation detection logs

### If splash screen doesn't appear when it should:
1. Check browser console for errors
2. Verify you're accessing from external source
3. Clear sessionStorage: `sessionStorage.clear()`
4. Check if the logo image loads properly

### Debug information:
The console will show detailed information about:
- Navigation source detection
- Internal/external visit status
- Referrer information
- SessionStorage state

## Files modified:
- `assets/js/main.js` - Updated splash screen logic for navigation tracking
- `assets/js/mobile-nav.js` - Added internal navigation tracking
- `test-splash.html` - Updated test page with new functionality
- `index.html` - Cleaned up test elements

## Technical Details:
- Uses `sessionStorage` instead of `localStorage` (clears when browser closes)
- Tracks navigation through event listeners on all internal links
- Detects same-domain referrers automatically
- Works with both desktop and mobile navigation
- Maintains fallback animations for older browsers 