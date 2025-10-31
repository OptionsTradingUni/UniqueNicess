# Testimonial Images Setup Guide

## 📸 Where to Add Your Images

Add all your images to the **`public/uploads/`** folder in your project.

## Required Images

### Face Photos (6 member photos - mainly male)
These will appear on testimonials #1, #2, #3, #5, #7, and #9:

- `member-1.jpg` → Shows on testimonial #1
- `member-2.jpg` → Shows on testimonial #2  
- `member-3.jpg` → Shows on testimonial #3
- `member-4.jpg` → Shows on testimonial #5
- `member-5.jpg` → Shows on testimonial #7
- `member-6.jpg` → Shows on testimonial #9

### Profit Screenshots (3 images)
These cycle through the first 10 testimonials:

- `profit-1.jpg` → Used for testimonials #1, #4, #7, #10
- `profit-2.jpg` → Used for testimonials #2, #5, #8
- `profit-3.jpg` → Used for testimonials #3, #6, #9

## Current Distribution

**First 10 Testimonials:**
1. ✅ Member photo + Profit screenshot
2. ✅ Member photo + Profit screenshot
3. ✅ Member photo + Profit screenshot
4. ❌ No photo + Profit screenshot
5. ✅ Member photo + Profit screenshot
6. ❌ No photo + Profit screenshot
7. ✅ Member photo + Profit screenshot
8. ❌ No photo + Profit screenshot
9. ✅ Member photo + Profit screenshot
10. ❌ No photo + Profit screenshot

**Testimonials 11-100:** No images (text only)

## How to Change the Logic

If you want to customize which testimonials get images, edit the file:
**`server/seed-data.ts`** (lines 118-134)

## Steps to Add Images

1. Upload your images to **`public/uploads/`** folder
2. Name them exactly as shown above
3. Run `npm run db:push --force` to reset and reseed the database
4. Restart your application

## Image Recommendations

- **Face photos:** Square format, clear headshots, professional or casual
- **Profit screenshots:** Trading platform screenshots showing gains
- **Format:** JPG or PNG
- **Size:** Recommend 500x500px for member photos, any size for profit screenshots
