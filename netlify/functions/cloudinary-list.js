// Netlify serverless function to list Cloudinary images by tag
// Uses authenticated Admin API (no security settings changes needed)
// Requires env vars: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

export default async (req) => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return Response.json(
      { error: 'Cloudinary env vars not configured' },
      { status: 500 }
    );
  }

  const url = new URL(req.url);
  const tag = url.searchParams.get('tag');

  if (!tag) {
    return Response.json({ error: 'tag parameter required' }, { status: 400 });
  }

  try {
    const auth = btoa(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`);
    const apiUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image/tags/${encodeURIComponent(tag)}?max_results=500&context=true&tags=true`;

    const res = await fetch(apiUrl, {
      headers: { Authorization: `Basic ${auth}` },
    });

    if (!res.ok) {
      const text = await res.text();
      return Response.json(
        { error: `Cloudinary API error: ${res.status}`, detail: text },
        { status: res.status }
      );
    }

    const data = await res.json();

    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=30, s-maxage=30',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};
