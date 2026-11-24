MOVIES4U-STYLE WEBSITE STARTER
==============================

What this project does
- Recreates the dark, mobile-first two-column catalogue style from your screenshots.
- Shows movie/series cards with poster, title, category and a WATCH button.
- Search and category filters.
- Admin login and upload form.
- Uploaded videos and posters are stored in Supabase Storage.
- Published catalogue entries are read by all visitors. Clicking WATCH opens an in-page HTML5 player.

IMPORTANT LEGAL NOTE
Only upload videos you created, own, or have explicit distribution/streaming permission for. Do not upload pirated/copyrighted movies without permission. This starter is for a lawful video catalogue.

SETUP
1. Create a Supabase project at https://supabase.com.
2. In Supabase > SQL Editor, run the complete setup.sql file.
3. In Supabase > Authentication > Users, create your admin user (email + password).
4. In SQL Editor, run this command with the same admin email:
   insert into public.admins(user_id)
   select id from auth.users where email = 'YOUR_ADMIN_EMAIL';
5. In Supabase > Project Settings > API, copy:
   - Project URL
   - anon/public key
6. Open index.html in a text editor. Replace:
   YOUR_SUPABASE_URL
   YOUR_SUPABASE_ANON_KEY
   with your project values. Never put the service_role key in website code.
7. Upload index.html to Netlify (or deploy the folder through GitHub/Netlify).
8. Open your website, menu > Admin Login / Upload. Sign in using the admin account.
9. Enter title, category, year, choose poster and video, then Upload & Publish.
10. Refresh the public website. The new movie should appear and WATCH plays it in the page.

NOTES / LIMITATIONS
- This starter uses public video URLs so visitors can stream uploaded files. Anyone with the public file URL can access that file.
- Supabase Storage has quotas, file size limits and bandwidth limits. Large films can be expensive and may exceed project limits. For large-scale video delivery, use a dedicated video hosting/transcoding service with signed playback URLs.
- The current upload uses a normal browser upload. For very large files, implement resumable uploads.
- Do not use the Supabase service_role key in browser code.
- The HTML demo cannot persist uploads across visitors without completing the Supabase setup.
