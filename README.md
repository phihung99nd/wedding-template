# Wedding Website Template

A beautiful, modern wedding website built with React, TypeScript, shadcn/ui components, and Framer Motion animations.

## Features

### 🏠 Home Section
- Full viewport image slider with auto-rotation (every 3 seconds)
- Floating thumbnail navigation at the bottom
- Smooth scale transitions when images change
- Click on thumbnails to navigate

### 💑 Couple Section
- Live countdown timer to the wedding day
- Split layout with bride and groom information
- Beautiful center image with scale-in animation
- Slide-out animations for couple info cards

### 💝 Divider Section
- Call-to-action buttons for:
  - Confirming participation
  - Jumping to guestbook
  - Jumping to QR section

### 📖 Love Story Section
- Full-width video player
- Interactive timeline treeview showing relationship milestones
- Alternating left/right layout for milestones
- Smooth scroll-triggered animations

### 📸 Album Section
- Responsive grid layout of wedding photos
- Click any photo to view in full-screen modal
- Smooth zoom animation from grid position to center
- Staggered entrance animations

### ⏰ Wedding Timeline Section
- Event cards with:
  - Event name and description
  - Time and location
  - Dress code information
  - Thumbnail images
- Alternating entrance animations

### 📝 Guestbook Section
- Form for guests to leave messages
- Name and message fields
- Beautiful card-based design
- Success feedback on submission

### 💳 QR Section
- Banking QR code display
- Account information display
- Clean, centered layout
- Easy-to-scan design

## Navigation

- Fixed navigation bar at the top
- Smooth scroll to sections
- Active section highlighting
- Responsive design

## Animations

All sections feature:
- Scroll-triggered entrance animations
- Smooth transitions using Framer Motion
- Responsive and performant

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Customization

### Update Content

Each section accepts props for customization:

- **HomeSection**: `images` - Array of image URLs
- **CoupleSection**: `weddingDate`, `bride`, `groom`, `centerImage`
- **LoveStorySection**: `videoUrl`, `milestones`
- **AlbumSection**: `photos` - Array of photo URLs
- **TimelineSection**: `events` - Array of event objects
- **QRSection**: `qrCodeImage`, `bankName`, `accountNumber`, `accountHolder`

### Example Customization

```tsx
<CoupleSection
  weddingDate={new Date("2025-06-15")}
  bride={{
    name: "Jane Doe",
    parent: "John and Mary Doe",
    birthday: "January 1, 1995",
    description: "A wonderful person...",
    avatar: "/images/bride.jpg"
  }}
  groom={{
    name: "John Smith",
    parent: "Robert and Susan Smith",
    birthday: "February 2, 1994",
    description: "An amazing person...",
    avatar: "/images/groom.jpg"
  }}
  centerImage="/images/wedding.jpg"
/>
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── sections/        # Section components
│   └── Navigation.tsx   # Navigation bar
├── lib/
│   └── utils.ts        # Utility functions
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## License

MIT
