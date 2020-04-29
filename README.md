# LIRI-Bot

This application will create a "Language Interpretation and Recognition Interface", aka LIRI, a command line node app that takes in parameters and returns data.

## LIRI Function:

- concert-this; node liri.js concert-this "concert or band name"
  - This will show the following:
    - Name of the venue
    - Location of the venue
    - Date of the venue
- spotify-this-song; node liri.js spotify-this-song "song name"
  - This will show the following:
    - Artist
    - Song name
    - Preview link from Spotify
    - Name of the album the song is from
- movie-this; node liri.js movie-this "movie name"
  - This will show the following:
    - Move title
    - Release year
    - IMDB Rating
    - Country of origin
    - Language
    - Plot
    - Actors
    - Rotten Tomatoes Rating
- do-what-it-says; node liri.js do-what-it-says
  - This will use the text inside random.text file
