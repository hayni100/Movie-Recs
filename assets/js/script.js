//Information Flow for Movie Recs
// 1. User selects some genres
//Using a form submit
// 2. A queryURL specifying those genres fetches titles from the ADVANCED MOVIE SEARCH API
// 3. A new queryURL specifying those titles fetches watchmode ID's from WATCHMODE API
// 4. A new queryURL specifying those movie ID's fetches "where to stream" info from WATCHMODE API