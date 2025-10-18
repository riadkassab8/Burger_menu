# Wahed Burger Restaurant Website

## Overview

A fully responsive restaurant menu website clone inspired by Wahed Burger. The site features a bilingual (Arabic/English) interface with an interactive carousel, menu categories, contact information with embedded Google Maps, and smooth animations. Built using pure HTML, CSS, JavaScript, and Bootstrap 5.

**Current State:** Complete and fully functional. Ready for user review and deployment.

## Recent Changes (October 18, 2025)

- ✅ Created complete restaurant website with hero section, carousel, menu categories, and contact sections
- ✅ Implemented bilingual support (Arabic/English) throughout all sections
- ✅ Added Google Maps integration with embedded iframes for both restaurant locations (Nasr City and Heliopolis)
- ✅ Configured responsive design using Bootstrap grid system
- ✅ Added interactive carousel with auto-rotation (3-second intervals)
- ✅ Implemented smooth scroll navigation and fade-in animations
- ✅ Set up web server workflow on port 5000

## User Preferences

- **Communication Style:** Simple, everyday language
- **Design Preference:** Modern, vibrant restaurant theme with gradient backgrounds
- **Language Support:** Bilingual (Arabic as primary, English as secondary)

## Project Architecture

### Technology Stack

**Frontend:**
- HTML5 with semantic structure
- CSS3 with custom properties and animations
- Vanilla JavaScript for interactions
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

### Key Components

1. **Hero Section**
   - Restaurant logo with circular styling
   - Bilingual name and tagline (Arabic/English)
   - Egyptian and US flag emojis
   - WhatsApp call-to-action button

2. **Carousel System**
   - Bootstrap-based auto-rotating image carousel
   - 4 food images with smooth transitions
   - 3-second interval rotation
   - Previous/Next navigation controls
   - Slide indicators

3. **Menu Categories**
   - Responsive card grid layout (4 categories)
   - Categories: Beef Burger, Chicken Burger, Appetizers, Sauces
   - Bilingual category names
   - Hover effects with elevation animation
   - Click feedback animation

4. **Contact Section**
   - Two restaurant locations (Nasr City & Heliopolis)
   - Phone numbers with tel: links
   - WhatsApp integration with wa.me links
   - Embedded Google Maps for each location
   - Bilingual address information

5. **Interactive Features**
   - Smooth scroll to contact section
   - Intersection Observer for fade-in animations
   - Category card click animations
   - Hover effects throughout

### Styling Architecture

**Color Scheme:**
- Primary gradient: #ff6b6b to #ff8e53 (header)
- Secondary gradient: #ffd89b to #19547b (menu/order CTAs)
- Tertiary gradient: #667eea to #764ba2 (contact section)
- WhatsApp green: #25d366
- Background: #f8f9fa

**Typography:**
- Font family: Cairo (weights: 400, 600, 700)
- Primary heading: 2.5rem
- Secondary heading: 2rem
- Body text: 1.2rem - 1.5rem
- Small text: 1rem

**Animation Strategy:**
- CSS transitions for performance (opacity, transform)
- Intersection Observer for scroll-triggered animations
- 300ms click feedback animations
- Bounce animation for call-to-action elements

### File Structure

```
/
├── index.html          # Main HTML structure
├── styles.css          # Custom styling and responsive design
├── script.js           # JavaScript for carousel and interactions
├── .gitignore          # Git ignore configuration
└── replit.md           # Project documentation (this file)
```

## External Dependencies

### Third-Party Libraries (CDN)

1. **Bootstrap 5.3.0**
   - Purpose: Responsive grid system and carousel component
   - Source: cdn.jsdelivr.net

2. **Font Awesome 6.4.0**
   - Purpose: Icons (WhatsApp, etc.)
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

## Features

### Implemented
- ✅ Responsive hero section with branding
- ✅ Auto-rotating carousel with 4 food images
- ✅ Menu categories section with 4 card-based categories
- ✅ Contact section with 2 locations
- ✅ Embedded Google Maps for both locations
- ✅ WhatsApp integration
- ✅ Phone number links (tel: protocol)
- ✅ Smooth scrolling navigation
- ✅ Fade-in animations on scroll
- ✅ Category card hover effects
- ✅ Bilingual support (Arabic/English)
- ✅ Mobile-responsive design
- ✅ RTL layout support for Arabic

### Future Enhancements (Optional)
- Add detailed menu items with prices
- Implement order/cart functionality
- Add image lightbox for food photos
- Create separate pages for each category
- Add online ordering integration
- Implement language toggle button
- Add customer reviews section
- Social media integration

## Technical Notes

### Bilingual Implementation
- Primary language: Arabic (RTL)
- Secondary language: English (displayed alongside Arabic)
- All major text elements include both languages
- Layout remains RTL-focused with English as supplementary

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

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled
- Requires CSS Grid and Flexbox support

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
- Refresh menu categories when restaurant menu changes
