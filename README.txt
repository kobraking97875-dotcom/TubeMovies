TubeMovies update: live upload progress + persistent admin session

1. Replace the existing index.html in your GitHub TubeMovies repository with this index.html.
2. Do not change your deployed Cloudflare Worker for this update; its existing multipart endpoints are reused.
3. Live progress now tracks bytes actually sent for the active multipart chunk and completed chunks, showing percentage and GB uploaded / total.
4. Admin session restore: when the page loads or Admin is opened, the site checks the existing Appwrite session and restores the admin panel if the authorised admin is still signed in. Use Logout only when you want to end the session.
5. Pause/resume state remains in this browser's localStorage. After refresh, select the exact same file again and press Resume saved upload.
6. Keep the page open during upload. This is not background upload and does not guarantee 100 GB upload on every device/network.
7. Only upload content you own or are authorized to distribute.
