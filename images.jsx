/* ============ UNSPLASH IMAGE LIBRARY ============ */
/* High-end interior photography. Free via Unsplash. */

const IMG = {
  // Hero
  heroReel: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2000&q=80', // luxury living room
  heroAlt:  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2000&q=80',

  // Sector showcase
  retail:        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=80',  // retail boutique
  hospitality:   'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1200&q=80',  // hotel lobby
  commercial:    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',  // modern office
  residential:   'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',  // luxury villa
  theme:         'https://images.unsplash.com/photo-1517639493569-5666a7b2f494?w=1200&q=80',  // themed space
  special:       'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80',  // pavilion

  // Studio / About
  studioPortrait: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80', // studio
  atelier:        'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1200&q=80', // drawing desk
  ceoBg:          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',

  // Services (one per)
  svc1: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',  // architecture
  svc2: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80',  // MEP pipes
  svc3: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',     // sustainable
  svc4: 'https://images.unsplash.com/photo-1529421308418-eab98863cee4?w=1200&q=80',     // aluminium glass facade
  svc5: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',  // wooden joinery
  svc6: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',  // turnkey

  // Projects
  proj1: 'https://images.unsplash.com/photo-1618219944342-824e40a13285?w=1200&q=80',
  proj2: 'https://images.unsplash.com/photo-1564540583246-934409427776?w=1200&q=80',
  proj3: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
  proj4: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
  proj5: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
  proj6: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80',
  proj7: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=80',
  proj8: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1200&q=80',
  proj9: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80',
  proj10:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
  proj11:'https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?w=1200&q=80',
  proj12:'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1200&q=80',

  // Recent work / reel
  reel: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=2000&q=80',

  // Expertise section
  expertise: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',

  // Final CTA bg
  ctaBg: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=2000&q=80',  // brass detail

  // Blog / News
  blog1: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
  blog2: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
  blog3: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
  blog4: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
  blog5: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
  blog6: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80',
};

function Photo({ src, alt = '', className = '', overlay = 0.35, children }) {
  return (
    <div className={`relative overflow-hidden bg-[var(--char2)] ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      {overlay > 0 && (
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(10,10,10,${overlay*0.5}), rgba(10,10,10,${overlay}))` }} />
      )}
      {children}
    </div>
  );
}

window.IMG = IMG;
window.Photo = Photo;
