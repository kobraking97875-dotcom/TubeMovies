TubeMovies — Appwrite Website

Files:
- index.html: main TubeMovies catalogue, admin login, movie and series-episode upload.
- about.html, contact.html, disclaimer.html: information pages.

Appwrite project settings already configured in index.html:
- Endpoint: https://sgp.cloud.appwrite.io/v1
- Project ID: 6b056a1d00068f2e87ba
- Database ID: 6b056c4100002013df8a
- Table ID: 6b056bd7002eeb65bc10
- Bucket ID: 6b056f9f003cbb25d977
- Admin User ID: 6b0575fe00266689ca80

IMPORTANT — Add these five optional columns to the Movies table before deploying this version:
1. content_type — Text
2. series_title — Text
3. season — Integer
4. episode_number — Integer
5. episode_title — Text
Set Required OFF and Array OFF for each. Existing columns remain as previously created.

Episode workflow:
- In Admin Login / Upload, choose “Web Series Episode”.
- Enter the series name, episode title, season number, episode number, and video.
- The episode appears in the catalogue as Series Name · S01E01 - Episode Title.
- Choose “Movie” for a standalone movie.

Deploy:
1. Extract this ZIP.
2. Replace the website files in the GitHub TubeMovies repository with these files.
3. Render will redeploy from GitHub.

Security:
- Never put an Appwrite API key in browser code.
- Keep Appwrite permissions restricted: guests read only; the designated admin can create/read/update/delete.
- Upload only content you own or are authorised to distribute.
- Appwrite Free bucket limit shown in this project is 50 MB per file; larger video files need a suitable authorised video host or upgraded storage.
