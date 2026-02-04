// Cloudinary configuration — cloud name and preset are safe to expose publicly
export const CLOUDINARY_CLOUD_NAME = 'ddr30jiax';
export const CLOUDINARY_UPLOAD_PRESET = 'wedding_ed2026';

export const CLOUDINARY_UPLOAD_URL =
  `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// List images via Netlify Function (authenticated server-side)
export const cloudinaryListUrl = (tag) =>
  `/.netlify/functions/cloudinary-list?tag=${encodeURIComponent(tag)}`;

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

// Helper to extract context metadata from Cloudinary resource
// Handles both Admin API format and public list format
export function getContext(resource) {
  const ctx = resource.context?.custom || resource.context || {};
  return {
    alt: ctx.alt || '',
    category: ctx.category || 'together',
    year: ctx.year || '',
    title: ctx.title || '',
    description: ctx.description || '',
  };
}
