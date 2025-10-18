# Wahed Burger Restaurant Website

## Overview

A fully responsive restaurant menu website clone inspired by Wahed Burger. The site features a bilingual (Arabic/English) interface with an interactive language toggle, carousel, menu categories, dedicated menu page with pricing, contact information with embedded Google Maps, and enhanced animations throughout. Built using pure HTML, CSS, JavaScript, and Bootstrap 5.

**Current State:** Complete and fully functional with language toggle and menu page. Ready for user review and deployment.

## Recent Changes (October 18, 2025)

### Initial Implementation
- ✅ Created complete restaurant website with hero section, carousel, menu categories, and contact sections
- ✅ Implemented bilingual support (Arabic/English) throughout all sections
- ✅ Added Google Maps integration with embedded iframes for both restaurant locations (Nasr City and Heliopolis)
- ✅ Configured responsive design using Bootstrap grid system
- ✅ Added interactive carousel with auto-rotation (3-second intervals)
- ✅ Implemented smooth scroll navigation and fade-in animations
- ✅ Set up web server workflow on port 5000

### New Features Added
- ✅ **Working EN/AR Language Toggle Button** - Fixed language switcher that dynamically changes all text and layout direction
- ✅ **Dedicated Menu Page** - Full menu page (menu.html) with categories, items, prices, and descriptions
- ✅ **Enhanced Transitions & Animations** - Multiple new animations including:
  - Button hover effects with ripple animations
  - Card hover overlays and 3D transforms
  - Floating price tags
  - Smooth fade-in animations for all elements
  - Scroll-triggered animations using Intersection Observer
  - Category header underline animations

## User Preferences

- **Communication Style:** Simple, everyday language
- **Design Preference:** Modern, vibrant restaurant theme with gradient backgrounds
- **Language Support:** Bilingual (Arabic as primary, English as secondary) with working toggle

## Project Architecture

### Technology Stack

**Frontend:**
- HTML5 with semantic structure
- CSS3 with custom properties, animations, and transitions
- Vanilla JavaScript for interactions and language switching
- Bootstrap 5 for responsive layout and carousel component
- Font Awesome 6 for icons
- Google Fonts (Cairo family) for Arabic/international typography

**Hosting:**
- Python HTTP server for development (port 5000)
- Static file serving (no backend required)

### Design Patterns

- **Event-driven architecture:** Vanilla JavaScript DOM manipulation
- **Progressive enhancement:** CSS transitions with JavaScript animations
- **Mobile-first responsive:** Bootstrap grid system with custom breakpoints
- **State management:** localStorage for language preference persistence

### Key Components

1. **Language Toggle System**
   - Fixed position toggle button (AR/EN)
   - Switches between Arabic (RTL) and English (LTR) layouts
   - Persists user preference in localStorage
   - Smooth transition animations between languages
   - Updates all text content dynamically using data attributes

2. **Hero Section**
   - Restaurant logo with circular styling
   - Bilingual name and tagline
   - Egyptian and US flag emojis
   - WhatsApp and Menu navigation buttons with hover effects

3. **Carousel System**
   - Bootstrap-based auto-rotating image carousel
   - 4 food images with smooth transitions
   - 3-second interval rotation
   - Previous/Next navigation controls
   - Slide indicators

4. **Menu Categories (Homepage)**
   - Responsive card grid layout (4 categories)
   - Categories: Beef Burger, Chicken Burger, Appetizers, Sauces
   - Enhanced hover animations with rotation and overlay effects
   - Click feedback animation
   - Links to full menu page

5. **Full Menu Page**
   - Separate page with complete menu
   - 4 main categories with section headers
   - Individual menu items with:
     - High-quality food images
     - Animated price tags
     - Item names and descriptions (bilingual)
     - Hover effects with image zoom
   - Back to home button
   - Call-to-action for ordering

6. **Contact Section**
   - Two restaurant locations (Nasr City & Heliopolis)
   - Phone numbers with tel: links
   - WhatsApp integration with wa.me links
   - Embedded Google Maps for each location
   - Bilingual address information
   - Animated contact cards

7. **Interactive Features & Animations**
   - Language toggle with smooth transitions
   - Smooth scroll to contact section
   - Intersection Observer for scroll-triggered fade-in animations
   - Enhanced button hover effects with ripple animations
   - Category card hover effects with 3D transforms
   - Menu item animations with scale and fade effects
   - Floating price tag animations
   - Gradient overlays on hover
   - Responsive animations for mobile devices

### Styling Architecture

**Color Scheme:**
- Primary gradient: #ff6b6b to #ff8e53 (header)
- Secondary gradient: #ffd89b to #19547b (menu/order CTAs)
- Tertiary gradient: #667eea to #764ba2 (contact section, language toggle)
- WhatsApp green: #25d366
- Background: #f8f9fa with gradient variations

**Typography:**
- Font family: Cairo (weights: 400, 600, 700)
- Primary heading: 2.5rem
- Secondary heading: 2rem
- Body text: 1.2rem - 1.5rem
- Small text: 1rem
- Bilingual support with proper RTL/LTR handling

**Animation Strategy:**
- CSS transitions for performance (opacity, transform)
- Cubic-bezier easing for smooth, bouncy effects
- Intersection Observer for scroll-triggered animations
- Keyframe animations for continuous effects (bounce, float, fade)
- 300ms-600ms timing for interactive elements
- Ripple effects on buttons
- 3D transforms on cards

### File Structure

```
/
├── index.html          # Main homepage
├── menu.html           # Full menu page with items and prices
├── styles.css          # Custom styling, animations, and responsive design
├── script.js           # JavaScript for carousel, language toggle, and interactions
├── .gitignore          # Git ignore configuration
└── replit.md           # Project documentation (this file)
```

## External Dependencies

### Third-Party Libraries (CDN)

1. **Bootstrap 5.3.0**
   - Purpose: Responsive grid system and carousel component
   - Source: cdn.jsdelivr.net

2. **Font Awesome 6.4.0**
   - Purpose: Icons (WhatsApp, hamburger, utensils, arrows, etc.)
   - Source: cdnjs.cloudflare.com

3. **Google Fonts API**
   - Font: Cairo (Arabic/international support)
   - Weights: 400, 600, 700
   - Source: fonts.googleapis.com

### External Assets

- Restaurant logo and food images hosted on menuoprohub.top
- Click animation GIF from original Wahed Burger site
- Google Maps embedded iframes for location maps

### Browser APIs

1. **Intersection Observer API** - Efficient scroll-based animations
2. **Bootstrap Carousel API** - Auto-rotating image carousel
3. **DOMContentLoaded Event** - Ensures DOM is ready before JS execution
4. **localStorage API** - Persists user language preference

## Features

### Implemented
- ✅ Responsive hero section with branding
- ✅ Auto-rotating carousel with 4 food images
- ✅ Menu categories section with 4 card-based categories
- ✅ **Working AR/EN language toggle button**
- ✅ **Complete menu page with prices and descriptions**
- ✅ Contact section with 2 locations
- ✅ Embedded Google Maps for both locations
- ✅ WhatsApp integration
- ✅ Phone number links (tel: protocol)
- ✅ Smooth scrolling navigation
- ✅ **Enhanced animations and transitions throughout**
- ✅ Category card hover effects with 3D transforms
- ✅ Bilingual support (Arabic/English) with dynamic switching
- ✅ Mobile-responsive design
- ✅ RTL/LTR layout support with automatic switching
- ✅ Language preference persistence (localStorage)
- ✅ Navigation between home and menu pages

### Future Enhancements (Optional)
- Add shopping cart functionality
- Implement online ordering system
- Add image lightbox/gallery for food photos
- Create admin panel for menu management
- Add customer reviews section
- Social media integration
- Implement real-time order tracking
- Add delivery time estimation
- Multiple payment methods integration

## Technical Notes

### Language Toggle Implementation
- Uses data-ar and data-en attributes on all translatable elements
- Switches HTML lang and dir attributes dynamically
- Persists preference in localStorage
- Smooth opacity transitions when changing languages
- Works on all pages (index.html and menu.html)

### Bilingual Implementation
- Primary language: Arabic (RTL)
- Secondary language: English (LTR)
- All text elements include both languages via data attributes
- Layout direction switches automatically with language
- Language toggle button position adjusts based on direction

### Enhanced Animations
- **Button Effects**: Ripple animations, scale transforms, shadow depth
- **Card Animations**: 3D rotation, gradient overlays, smooth transitions
- **Scroll Animations**: Intersection Observer for fade-in and scale effects
- **Continuous Animations**: Floating price tags, bouncing CTAs
- **Hover Effects**: Image zoom, color changes, elevation increases
- **Timing**: Cubic-bezier easing for natural motion

### Google Maps Integration
- Uses Google Maps Embed API
- Two location markers: Nasr City and Heliopolis
- Coordinates configured for Cairo, Egypt locations
- Responsive iframes with border-radius styling
- Loading: lazy for performance

### Performance Optimizations
- CDN-delivered libraries for caching
- Lazy loading for map iframes
- CSS-based animations (GPU accelerated)
- Efficient Intersection Observer usage
- Optimized image formats (WebP)
- localStorage for state persistence

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled
- Requires CSS Grid and Flexbox support
- Requires Intersection Observer support (or polyfill)

## Deployment

**Current Setup:**
- Development server: Python HTTP server on port 5000
- Static file serving (no build process required)
- Ready for deployment to any static hosting service

**Deployment Options:**
- Replit deployment (publish feature)
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## Maintenance Notes

- No backend or database required
- External images depend on menuoprohub.top availability
- Google Maps embeds require API availability
- Consider downloading and hosting images locally for production
- Update phone numbers and addresses as needed
- Refresh menu categories and items when restaurant menu changes
- Update prices in menu.html as needed
- Language toggle works automatically, no additional configuration needed
