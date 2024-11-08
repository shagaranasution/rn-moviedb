# The Movie 🎬

The Movie is a mobile application built with Expo, React Native, and React that allows users to explore movies from The Movie Database (TMDb) API, view detailed movie descriptions, and watch trailers sourced from YouTube. This app also includes a search functionality for discovering movies by title.

## Features

- **Browse Movies by Category**: See lists of popular, top-rated, and upcoming movies.
- **View Movie Details**: Access detailed descriptions for each movie.
- **Watch Trailers**: Stream trailers using the YouTube Data API.
- **Search Movies**: Quickly find specific movies by title.

## Tech Stack

- **Frontend**: React Native 0.74.3 with Expo SDK 51.0.22
- **Backend APIs**:
  - [The Movie Database (TMDb)](https://developers.themoviedb.org/3) for movie data.
  - [YouTube Data API](https://developers.google.com/youtube/v3) for trailers.

## Installation and Setup

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [Expo CLI](https://docs.expo.dev/get-started/installation/) installed.

### Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/rn-moviedb.git
   cd rn-moviedb

   ```

2. **Install dependencies**:

   ```bash
   npm install

   ```

3. **Environment Variables**: Set up a .env file in the root directory to store your API keys. This file is not included in version control for security reasons.
   ```plaintext
   TMDB_API_KEY=your_tmdb_api_key
   YOUTUBE_DATA_CREDENTIAL=your_youtube_api_key
   ```

Replace your_tmdb_api_key and your_youtube_api_key with your own API keys. You can obtain them from [TMDb](https://developers.themoviedb.org/3) and [YouTube](https://developers.google.com/youtube/v3) respectively.

If you need access to demo the app, please contact me.

## Configuration

### `package.json` Overview

The primary dependencies include:

- **Expo Modules**: `expo`, `expo-router`, `expo-font, @expo/vector-icons`, etc.
- **Navigation**: `@react-navigation/native`
- **UI**: `nativewind` (Tailwind CSS for React Native)
- **API and Environment Management**: `react-native-dotenv` for managing sensitive API keys.

### `app.json` Overview

This file includes app settings for Expo:

- **Icons and Splash Screens**: Located under the `assets/images` folder.
- **Automatic UI Style**: Adjusts to user preference (dark/light mode).
- **Platform Support**: Supports Android, iOS, and web.

## Scripts

- **Start**: `npm start` to run Expo in development mode.
- **Testing**: `npm test` to run Jest tests.
- **Linting**: `npm run lint` to check for code style issues.

## App Preview

![The Movie App Preview](./screenshots/app-preview.gif)
