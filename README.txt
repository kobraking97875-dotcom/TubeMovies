TubeMovies update package

1) Replace the public website index.html with this package index.html.
2) Upload owner.html to the same Render static-site root. Open it directly at https://tubemovies.onrender.com/owner.html . It is not linked from the public homepage.
3) Keep about.html, contact.html, disclaimer.html and worker.js unchanged unless separately instructed.

Important: owner.html uses the existing Appwrite Admin User ID check and Appwrite session. It does not make the page secret by filename: protect admin credentials, keep Appwrite row/bucket permissions restricted to the admin, and do not share the owner URL.

The new search replaces the previous duplicate search boxes with one advanced search (title/series/episode/description/category/language/quality + language/year/type filters).

This package does NOT yet implement every requested product feature (watchlist, ratings, notifications, recommendation engine, parental controls, analytics, maintenance switch, multilingual UI, subtitle tracks or player quality selector). Those require verified Appwrite schema, permissions and feature logic. Do not claim those are live until separately implemented and tested.
