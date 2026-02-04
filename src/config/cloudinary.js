// Cloudinary configuration — cloud name and preset are safe to expose publicly
export const CLOUDINARY_CLOUD_NAME = 'ddr30jiax';
export const CLOUDINARY_UPLOAD_PRESET = 'wedding_ed2026';

export const CLOUDINARY_UPLOAD_URL =
  `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// Client-side list endpoint (no auth needed, cached ~60s on CDN)
export const cloudinaryListUrl = (tag) =>
  `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/${tag}.json`;

// Build an optimized delivery URL from a public_id
export const cloudinaryImageUrl = (publicId, transforms = 'f_auto,q_auto,w_1600,c_limit') =>
  `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transforms}/${publicId}`;

// Thumbnail variant
export const cloudinaryThumbUrl = (publicId) =>
  cloudinaryImageUrl(publicId, 'f_auto,q_auto,w_300,h_300,c_fill');

// Tags used to categorize uploads
export const TAGS = {
  GALLERY: 'wedding-gallery',
  STORY: 'wedding-story',
};
