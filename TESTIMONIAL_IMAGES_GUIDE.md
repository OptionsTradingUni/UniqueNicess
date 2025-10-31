# Testimonial Images Setup Guide

## 📸 Where to Add Your Images

Add all your images to the **`public/uploads/`** folder in your project.

## Required Images - ALL 10 FIRST TESTIMONIALS

Each of the first 10 testimonials will show BOTH a face photo AND a profit screenshot.

### Member Face Photos (10 photos - mainly male)
Upload these to `public/uploads/`:

- `member-1.jpg` → Testimonial #1
- `member-2.jpg` → Testimonial #2  
- `member-3.jpg` → Testimonial #3
- `member-4.jpg` → Testimonial #4
- `member-5.jpg` → Testimonial #5
- `member-6.jpg` → Testimonial #6
- `member-7.jpg` → Testimonial #7
- `member-8.jpg` → Testimonial #8
- `member-9.jpg` → Testimonial #9
- `member-10.jpg` → Testimonial #10

### Profit Screenshots (10 screenshots)
Upload these to `public/uploads/`:

- `profit-1.jpg` → Testimonial #1 profit screenshot
- `profit-2.jpg` → Testimonial #2 profit screenshot
- `profit-3.jpg` → Testimonial #3 profit screenshot
- `profit-4.jpg` → Testimonial #4 profit screenshot
- `profit-5.jpg` → Testimonial #5 profit screenshot
- `profit-6.jpg` → Testimonial #6 profit screenshot
- `profit-7.jpg` → Testimonial #7 profit screenshot
- `profit-8.jpg` → Testimonial #8 profit screenshot
- `profit-9.jpg` → Testimonial #9 profit screenshot
- `profit-10.jpg` → Testimonial #10 profit screenshot

## Current Distribution

**First 10 Testimonials:**
1. ✅ Member photo + Profit screenshot
2. ✅ Member photo + Profit screenshot
3. ✅ Member photo + Profit screenshot
4. ✅ Member photo + Profit screenshot
5. ✅ Member photo + Profit screenshot
6. ✅ Member photo + Profit screenshot
7. ✅ Member photo + Profit screenshot
8. ✅ Member photo + Profit screenshot
9. ✅ Member photo + Profit screenshot
10. ✅ Member photo + Profit screenshot

**Testimonials 11-100:** No images (text only)

## Steps to Add Images & Edit Details

### Step 1: Edit the Testimonial Details
Open **`server/seed-data.ts`** and find the `MANUAL_TESTIMONIALS` array (starting around line 97).

Edit each testimonial to match your profit screenshots:
- **name**: Change to the member's name
- **testimonial**: Edit the testimonial text
- **profit**: **IMPORTANT** - Change this to match what's shown in your profit screenshot
- **rating**: 3-5 stars
- **date**: YYYY-MM-DD format

Example:
```javascript
{
  name: "Marcus J.",
  testimonial: "Made $2,847 in my first month trading SPY calls!",
  profit: "$2,847",  // ← EDIT THIS TO MATCH YOUR SCREENSHOT
  rating: 5,
  date: "2024-01-15",
  photo: "/uploads/member-1.jpg",
  profitImage: "/uploads/profit-1.jpg",
}
```

### Step 2: Upload Your Images
Upload all 20 images to **`public/uploads/`** folder with these exact names:
- `member-1.jpg` through `member-10.jpg`
- `profit-1.jpg` through `profit-10.jpg`

### Step 3: Restart
After editing and uploading images, the changes will appear automatically.

## Image Recommendations

- **Face photos:** Square format, clear headshots, professional or casual (mainly male as you mentioned)
- **Profit screenshots:** Trading platform screenshots showing gains that **match the profit amount in the testimonial**
- **Format:** JPG or PNG
- **Size:** Recommend 500x500px for member photos, any size for profit screenshots
