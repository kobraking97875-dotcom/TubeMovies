const corsHeaders = {
  "Access-Control-Allow-Origin": "https://tubemovies.onrender.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Appwrite-JWT",
};
function validUpload(key, uploadId) {
  return typeof key === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-[A-Za-z0-9._-]{1,150}$/i.test(key) &&
    typeof uploadId === "string" && uploadId.length >= 1 && uploadId.length <= 512;
}
function reply(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
async function isAdmin(request, env) {
  const jwt = request.headers.get("X-Appwrite-JWT");
  if (!jwt) return false;
  const r = await fetch(`${env.APPWRITE_ENDPOINT}/account`, { headers: { "X-Appwrite-Project": env.APPWRITE_PROJECT_ID, "X-Appwrite-JWT": jwt } });
  if (!r.ok) return false;
  const user = await r.json();
  return user.$id === env.ADMIN_USER_ID;
}
export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
    if (request.method !== "POST") return reply({ error: "POST required" }, 405);
    try {
      if (!(await isAdmin(request, env))) return reply({ error: "Admin login required" }, 401);
      const url = new URL(request.url), action = url.searchParams.get("action");
      if (action === "init") {
        const b = await request.json();
        if (!Number.isSafeInteger(b.size) || b.size < 1 || b.size > 100 * 1024 * 1024 * 1024) return reply({ error: "File must be between 1 byte and 100 GB" }, 400);
        const filename = String(b.filename || "video.mp4").replace(/[^a-zA-Z0-9._-]/g, "_").slice(-150);
        const key = `${crypto.randomUUID()}-${filename}`;
        const up = await env.MOVIE_BUCKET.createMultipartUpload(key, { httpMetadata: { contentType: b.contentType || "application/octet-stream" } });
        return reply({ key, uploadId: up.uploadId });
      }
      if (action === "part") {
        const uploadId = url.searchParams.get("uploadId"), key = url.searchParams.get("key"), partNumber = Number(url.searchParams.get("partNumber"));
        if (!validUpload(key, uploadId) || !Number.isInteger(partNumber) || partNumber < 1 || partNumber > 10000 || !request.body) return reply({ error: "Invalid part details" }, 400);
        const result = await env.MOVIE_BUCKET.resumeMultipartUpload(key, uploadId).uploadPart(partNumber, request.body);
        return reply({ partNumber, etag: result.etag });
      }
      if (action === "complete") {
        const b = await request.json();
        if (!validUpload(b.key, b.uploadId) || !Array.isArray(b.parts) || !b.parts.length || b.parts.length > 10000 ||
            b.parts.some(p => !Number.isInteger(p.partNumber) || p.partNumber < 1 || p.partNumber > 10000 || typeof p.etag !== "string" || !p.etag)) {
          return reply({ error: "Invalid completion details" }, 400);
        }
        const obj = await env.MOVIE_BUCKET.resumeMultipartUpload(b.key, b.uploadId).complete(b.parts);
        return reply({ success: true, key: b.key, size: obj.size, url: `${env.R2_PUBLIC_BASE_URL}/${b.key}` });
      }
      if (action === "abort") {
        const b = await request.json();
        if (!validUpload(b.key, b.uploadId)) return reply({ error: "Invalid abort details" }, 400);
        await env.MOVIE_BUCKET.resumeMultipartUpload(b.key, b.uploadId).abort();
        return reply({ success: true });
      }
      return reply({ error: "Unknown action" }, 400);
    } catch (e) { return reply({ error: e?.message || "Upload failed" }, 500); }
  }
};
