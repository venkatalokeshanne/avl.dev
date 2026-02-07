/**
 * Lightweight Supabase REST helper for fetching blog data.
 * Uses the anon (public) key — safe for server-side static generation.
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const AUTHOR_ID = process.env.RUNTIMEMIND_AUTHOR_ID;

export async function supabaseFetch(endpoint) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return { data: null, error: 'Missing Supabase config' };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return { data: null, error: `Supabase error: ${res.status}` };
  }

  const data = await res.json();
  return { data, error: null };
}

const POST_LIST_FIELDS = 'slug,title,excerpt,cover_image_url,published_at,created_at,read_time_minutes,likes_count,comments_count,view_count,tags';

export async function getPublishedPosts(limit = 6) {
  if (!AUTHOR_ID) return [];
  const { data } = await supabaseFetch(
    `posts?select=${POST_LIST_FIELDS}&published=eq.true&author_id=eq.${AUTHOR_ID}&order=published_at.desc&limit=${limit}`
  );
  return data || [];
}

export async function getPostBySlug(slug) {
  if (!AUTHOR_ID) return null;
  const { data } = await supabaseFetch(
    `posts?select=*&slug=eq.${encodeURIComponent(slug)}&published=eq.true&author_id=eq.${AUTHOR_ID}&limit=1`
  );
  return data?.[0] || null;
}

export async function getAllPublishedSlugs() {
  if (!AUTHOR_ID) return [];
  const { data } = await supabaseFetch(
    `posts?select=slug&published=eq.true&author_id=eq.${AUTHOR_ID}&order=published_at.desc`
  );
  return (data || []).map((p) => p.slug);
}
