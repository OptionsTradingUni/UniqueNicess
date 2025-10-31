# How to Upload Your Own Mentor Pictures

## Quick Overview
Your "Meet Your Expert Mentors" section has 10 mentor profiles. You can easily replace their pictures with your own mentor photos.

---

## Step-by-Step Instructions

### Method 1: Replace Stock Images (Easiest)

1. **Navigate to the images folder:**
   ```
   attached_assets/stock_images/
   ```

2. **Upload your 10 mentor photos** with these EXACT filenames:
   - `professional_male_fi_e2ae8a42.jpg` - The Wealth Prince (Lead Mentor)
   - `professional_female__e611750c.jpg` - Alexandra Morgan
   - `professional_male_fi_2591beb9.jpg` - Marcus Chen
   - `professional_female__e596eb2f.jpg` - Sarah Rodriguez
   - `professional_male_fi_197c2f6c.jpg` - David Thompson
   - `professional_female__b23883a5.jpg` - Jennifer Park
   - `professional_male_fi_f4877057.jpg` - Robert Johnson
   - `professional_female__97e913a3.jpg` - Emily Watson
   - `professional_male_fi_313df32c.jpg` - James Wilson
   - `professional_female__80c14521.jpg` - Lisa Anderson

3. **Image Requirements:**
   - Format: JPG or PNG
   - Size: 800x1000 pixels (portrait orientation works best)
   - Professional headshots or trading desk photos
   - Clear, well-lit images

4. **Done!** Your pictures will automatically appear on the website.

---

### Method 2: Use Your Own Filenames (Advanced)

If you want to use your own image filenames:

1. Upload your mentor pictures to: `attached_assets/stock_images/`
2. Name them anything you want (e.g., `mentor1.jpg`, `john-smith.jpg`, etc.)
3. Edit the file: `client/src/components/team-profiles.tsx`
4. Update lines 9-18 to import your new images:

```typescript
import mentor1 from "@assets/stock_images/your-image-name-1.jpg";
import mentor2 from "@assets/stock_images/your-image-name-2.jpg";
// ... and so on
```

---

## Current Mentor List

Here are the 10 mentors displayed on your website:

1. **The Wealth Prince** - Lead Mentor & Founder
2. **Alexandra Morgan** - Options Strategy Expert
3. **Marcus Chen** - Portfolio Strategy Mentor
4. **Sarah Rodriguez** - Day Trading Specialist
5. **David Thompson** - Technical Analysis Coach
6. **Jennifer Park** - Swing Trading Expert
7. **Robert Johnson** - Income Strategy Mentor
8. **Emily Watson** - Volatility Trading Coach
9. **James Wilson** - Spreads & Multi-Leg Expert
10. **Lisa Anderson** - Fundamental Analysis Coach

---

## Tips for Best Results

✅ **Good Mentor Photos:**
- Professional headshots with solid backgrounds
- Trading desk photos showing monitors and charts
- Business casual or professional attire
- Good lighting with clear facial features
- Confident, approachable expressions

❌ **Avoid:**
- Blurry or low-resolution images
- Casual selfies or vacation photos
- Images with distracting backgrounds
- Dark or poorly lit photos
- Multiple people in one photo

---

## Need Help?

If you need to:
- **Change mentor names/roles**: Edit `client/src/components/team-profiles.tsx` (lines 20-221)
- **Add more mentors**: Add new entries to the `mentors` array in the same file
- **Remove mentors**: Delete entries from the `mentors` array

---

## Where Mentor Pictures Appear

Your mentor pictures are displayed on:
- **Homepage** - "Meet Your Expert Mentors" section
- Shows all 10 mentors in a carousel/slider
- Mobile-responsive with touch swipe support
- Professional card layout with stats and achievements

---

That's it! Upload your 10 mentor pictures to `attached_assets/stock_images/` with the exact filenames listed above, and they'll automatically appear on your website.
