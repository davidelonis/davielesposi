// Netlify serverless function for deleting Cloudinary images
// Requires environment variables: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return Response.json(
      { error: 'Cloudinary env vars not configured' },
      { status: 500 }
    );
  }

  try {
    const { public_id } = await req.json();

    if (!public_id) {
      return Response.json({ error: 'public_id required' }, { status: 400 });
    }

    // Generate signature for the destroy API
    const timestamp = Math.floor(Date.now() / 1000);
    const signatureString = `public_id=${public_id}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;

    // SHA-1 hash
    const encoder = new TextEncoder();
    const data = encoder.encode(signatureString);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    // Call Cloudinary destroy API
    const formData = new URLSearchParams();
    formData.append('public_id', public_id);
    formData.append('timestamp', timestamp.toString());
    formData.append('api_key', CLOUDINARY_API_KEY);
    formData.append('signature', signature);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`,
      { method: 'POST', body: formData }
    );

    const result = await res.json();

    if (result.result === 'ok') {
      return Response.json({ ok: true });
    } else {
      return Response.json({ error: result.result || 'Delete failed' }, { status: 400 });
    }
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};
