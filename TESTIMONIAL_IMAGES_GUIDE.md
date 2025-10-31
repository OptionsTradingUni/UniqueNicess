# Testimonial Images Setup Guide

## 📸 Where to Add Your Images

Add all your images to the **`public/uploads/`** folder in your project.

## Required Images - ALL 10 FIRST TESTIMONIALS

Each of the first 10 testimonials will show BOTH a face photo AND a profit screenshot.

### Member Face Photos (10 photos - mainly male)
Upload these to `public/uploads/`:

- `mem1.jpeg` → Testimonial #1
- `mem2.jpeg` → Testimonial #2  
- `mem3.jpeg` → Testimonial #3
- `mem4.jpeg` → Testimonial #4
- `mem5.jpeg` → Testimonial #5
- `mem6.jpeg` → Testimonial #6
- `mem7.jpeg` → Testimonial #7
- `mem8.jpeg` → Testimonial #8
- `mem9.jpeg` → Testimonial #9
- `mem10.jpeg` → Testimonial #10

### Profit Screenshots (10 screenshots)
Upload these to `public/uploads/`:

- `pro1.jpeg` → Testimonial #1 profit screenshot
- `pro2.jpeg` → Testimonial #2 profit screenshot
- `pro3.jpeg` → Testimonial #3 profit screenshot
- `pro4.jpeg` → Testimonial #4 profit screenshot
- `pro5.jpeg` → Testimonial #5 profit screenshot
- `pro6.jpeg` → Testimonial #6 profit screenshot
- `pro7.jpeg` → Testimonial #7 profit screenshot
- `pro8.jpeg` → Testimonial #8 profit screenshot
- `pro9.jpeg` → Testimonial #9 profit screenshot
- `pro10.jpeg` → Testimonial #10 profit screenshot

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
  photo: "/uploads/mem1.jpeg",
  profitImage: "/uploads/pro1.jpeg",
}
```

### Step 2: Upload Your Images
Upload all 20 images to **`public/uploads/`** folder with these exact names:
- `mem1.jpeg` through `mem10.jpeg`
- `pro1.jpeg` through `pro10.jpeg`

### Step 3: Restart
After editing and uploading images, the changes will appear automatically.

## Image Recommendations

- **Face photos:** Square format, clear headshots, professional or casual (mainly male as you mentioned)
- **Profit screenshots:** Trading platform screenshots showing gains that **match the profit amount in the testimonial**
- **Format:** JPG or PNG
- **Size:** Recommend 500x500px for member photos, any size for profit screenshots
