TubeMovies — Cloudflare R2 Multipart Upload update

Files:
- index.html: updated frontend. Video uploads use the Cloudflare Worker in 64 MiB multipart chunks, with a hard 100 GB per-file ceiling. Posters remain in Appwrite Storage.
- worker.js: Worker source matching the frontend contract.
- about.html, contact.html, disclaimer.html: site pages.

IMPORTANT SETUP
1. In Cloudflare Worker tubemovies-upload, replace the entire Worker code with worker.js and Deploy.
2. Confirm bindings/variables: MOVIE_BUCKET (R2 binding); APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, ADMIN_USER_ID, R2_PUBLIC_BASE_URL. These must be runtime variables/secrets as appropriate. APPWRITE_API_KEY is not used by this JWT-verified Worker; never expose it in the frontend.
3. Worker CORS currently allows https://tubemovies.onrender.com. If your Render hostname differs, change Access-Control-Allow-Origin to the exact site origin.
4. Replace site files in GitHub and redeploy Render.
5. Verify Appwrite table has the columns used by the page, including content_type, series_title, season, episode_number, episode_title.

LIMITS / CAUTIONS
- 100 GB is the application-side maximum, not a guarantee of free storage, bandwidth, upload duration, or browser/device capability. R2 storage/operations/egress and network costs may apply.
- The R2 public development URL makes uploaded objects publicly readable. Use only content you own or are licensed to distribute.
- Browser upload currently sends parts sequentially. Keep the browser tab open until completion. A dropped connection may leave an incomplete multipart upload; lifecycle cleanup is recommended.
- Appwrite poster uploads still use Appwrite's own file-size limit.
