# Kiddo - Server-Driven UI (SDUI) Application

## Overview
This project is an advanced e-commerce mobile application built using React Native and Expo. It demonstrates a Server-Driven UI (SDUI) architecture, where the layout, components, and theming of the application are dictated dynamically by a backend data payload rather than being hardcoded into the mobile application itself. 

This architecture allows product managers and designers to update the mobile app's layout and themes instantly without requiring users to download an app update from the App Store or Google Play.

## Key Features
* Server-Driven UI: The home screen dynamically renders content blocks (like Hero Banners, 2x2 Product Grids, and Horizontal Scrolling Collections) based entirely on a structured JSON payload.
* Dynamic Theming: The application's color palette (such as buttons, badges, and headers) changes in real-time when switching between different marketing campaigns (e.g., Summer Essentials, Mystery Gift Carnival).
* Performance Optimized: Built with Shopify FlashList for highly optimized, 60FPS scrolling performance, even when rendering deeply nested horizontal carousels.
* Sophisticated Animations: Powered by React Native Reanimated and Lottie for high-quality, non-intrusive loading screens and micro-interactions.
* Global State Management: Utilizes Zustand for lightweight and fast global state management, specifically for managing the shopping cart quantity.

## Project Structure
The application is organized into a modular, highly scalable structure:

* /src/actions
  Contains the action dispatcher logic. This handles user interactions like deep-linking or adding items to the cart, cleanly decoupling the user interface from business logic.

* /src/assets
  Local static assets, including Lottie JSON animation files used for loading screens.

* /src/components
  Reusable React Native components divided into two categories:
  - /blocks: The core SDUI structural blocks (e.g., BannerHero, DynamicCollection, ProductGrid2x2) that map directly to the backend payload types.
  - /ui: Smaller, atomic interface elements like the ProductCard, CampaignSwitcher, and CartBadge.

* /src/context
  React Context providers, specifically the ThemeContext used for managing and injecting dynamic CSS variables for NativeWind styling.

* /src/data
  Mock JSON payloads and datasets used to simulate real backend API responses for the SDUI engine.

* /src/screens
  The primary full-screen views of the application (e.g., HomeScreen, IntroScreen).

* /src/store
  Global state management stores built with Zustand.

* /src/types
  TypeScript interfaces defining the strict type contracts between the frontend application and the backend SDUI payload.

* /src/utils
  Utility functions, including asynchronous asset caching logic for preloading animations to ensure smooth transitions.

## Technical Stack
* React Native & Expo (SDK 54)
* TypeScript
* NativeWind (Tailwind CSS for React Native)
* React Native Reanimated
* Shopify FlashList
* Zustand

## Setup Instructions

### Prerequisites
Ensure you have Node.js installed on your machine.

### Installation
1. Clone the repository to your local machine.
2. Open your terminal and navigate to the project root directory.
3. Install the required dependencies by running:
   npm install

### Running the Application
1. Start the Expo development server:
   npx expo start
2. Choose your testing environment:
   * Press 'a' in the terminal to launch the app on an Android emulator.
   * Press 'i' in the terminal to launch the app on an iOS simulator.
   * Scan the QR code provided in the terminal using the Expo Go application on your physical mobile device.
