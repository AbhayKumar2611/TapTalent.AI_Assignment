# Weather Analytics Dashboard

A modern, feature-rich weather analytics web application built with React and Redux. This dashboard provides comprehensive weather information, forecasts, and interactive visualizations for multiple cities.

🌐 **Live Demo**: [https://tap-talent-ai-assignment.vercel.app/](https://tap-talent-ai-assignment.vercel.app/)

![Weather Dashboard](https://img.shields.io/badge/React-19.2.0-blue) ![Redux](https://img.shields.io/badge/Redux-5.0.1-purple) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38bdf8) ![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff)

## 🌟 Features

### Core Features

- **📊 Dashboard View**
  - Summary cards for multiple favorite cities
  - Real-time weather updates (auto-refresh every 5 minutes)
  - Quick access to current temperature, conditions, humidity, wind speed, and pressure
  - Responsive grid layout for optimal viewing on all devices

- **🔍 Detailed Weather View**
  - Comprehensive weather information for any city
  - 5-7 day weather forecast
  - Hour-by-hour forecast (24 hours)
  - Detailed statistics including:
    - Temperature (current, feels like, min/max)
    - Humidity percentage
    - Wind speed and direction
    - Atmospheric pressure
    - Visibility
    - Weather conditions with icons

- **💬 Search & Favorites**
  - Intelligent city search with autocomplete
  - Add cities to favorites for quick access
  - Remove cities from favorites
  - Favorites persist between sessions using localStorage
  - Search supports cities worldwide with country/state information

- **📈 Interactive Data Visualization**
  - **Temperature Trends Chart**: Hourly temperature and "feels like" temperature comparison
  - **Precipitation Forecast Chart**: Rain and snow predictions for the next 24 hours
  - **Wind Speed & Direction Chart**: Wind patterns with gust information
  - All charts are interactive with tooltips, hover effects, and responsive design
  - Built with Recharts library for smooth, professional visualizations

- **⚙️ Settings**
  - Toggle between Celsius (°C) and Fahrenheit (°F)
  - Temperature unit preference persists across sessions
  - Instant conversion across all components

- **🔄 Real-time Data**
  - Live weather data from OpenWeatherMap API
  - Automatic data refresh
  - Error handling and loading states
  - Optimized API calls to prevent rate limiting

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern UI library with hooks
- **Redux 5.0.1** - State management
- **Redux Thunk 3.1.0** - Async action handling
- **React Redux 9.2.0** - React bindings for Redux
- **React Router DOM 7.13.0** - Client-side routing

### Styling & UI
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **React Icons 5.5.0** - Icon library
- **Material-UI 7.3.7** - Additional UI components (optional)

### Data Visualization
- **Recharts 3.7.0** - Composable charting library built on React components

### Build Tools
- **Vite 7.2.4** - Next-generation frontend tooling
- **ESLint** - Code linting and quality

### API
- **OpenWeatherMap API** - Weather data provider

## 📁 Project Structure

```
TapTalent.AI/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── charts/         # Chart components
│   │   │   ├── TemperatureChart.jsx
│   │   │   ├── PrecipitationChart.jsx
│   │   │   └── WindChart.jsx
│   │   ├── CityCard.jsx    # City weather card component
│   │   ├── Dashboard.jsx   # Main dashboard page
│   │   ├── DetailedView.jsx # Detailed weather view
│   │   ├── ForecastList.jsx # 5-7 day forecast
│   │   ├── HourlyForecast.jsx # Hourly forecast
│   │   ├── SearchBar.jsx   # City search component
│   │   ├── Settings.jsx    # Settings component
│   │   └── WeatherDetails.jsx # Weather details display
│   ├── store/              # Redux store configuration
│   │   ├── actions/        # Redux actions
│   │   │   ├── favoritesActions.js
│   │   │   ├── settingsActions.js
│   │   │   └── weatherActions.js
│   │   ├── reducers/       # Redux reducers
│   │   │   ├── favoritesReducer.js
│   │   │   ├── settingsReducer.js
│   │   │   └── weatherReducer.js
│   │   └── store.js        # Store configuration
│   ├── services/           # API services
│   │   └── weatherApi.js   # OpenWeatherMap API integration
│   ├── utils/              # Utility functions
│   │   └── weatherUtils.js # Weather-related utilities
│   ├── App.jsx             # Main App component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

## 🌐 Live Demo

**Visit the deployed application**: [https://tap-talent-ai-assignment.vercel.app/](https://tap-talent-ai-assignment.vercel.app/)

The application is deployed on Vercel and ready to use. You can explore all features including:
- Search and add cities to favorites
- View detailed weather analytics
- Interactive charts and visualizations
- Temperature unit conversion
- Real-time weather updates

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn** package manager
- **OpenWeatherMap API Key** (free tier available at [openweathermap.org](https://openweathermap.org/api))

### Step 1: Clone or Navigate to Project

```bash
cd TapTalent.AI
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure API Key

The API key is already configured in `src/services/weatherApi.js`:

```javascript
const API_KEY = '9842846a97a1e28d5caa62662030b68e';
```

If you need to use your own API key, update this value in `src/services/weatherApi.js`.

### Step 4: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in terminal).

### Step 5: Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Step 6: Preview Production Build

```bash
npm run preview
```

## 📖 Usage Guide

### Getting Started

1. **Launch the Application**
   - Start the dev server with `npm run dev`
   - Open your browser to the displayed localhost URL

2. **Search for a City**
   - Use the search bar at the top of the dashboard
   - Type at least 2 characters to trigger autocomplete
   - Select a city from the dropdown results
   - Click "Add" to add it to your favorites

3. **View Weather Information**
   - Favorite cities appear as cards on the dashboard
   - Each card shows:
     - Current temperature
     - Weather condition icon
     - Feels like temperature
     - Humidity, wind speed, and pressure
   - Click any city card to view detailed analytics

4. **Explore Detailed View**
   - View comprehensive weather statistics
   - Check 5-7 day forecast
   - Examine hourly forecast (24 hours)
   - Interact with charts:
     - Hover over data points for details
     - View temperature trends
     - Check precipitation forecasts
     - Analyze wind patterns

5. **Manage Favorites**
   - Add cities: Search and click "Add"
   - Remove cities: Click the trash icon on any city card
   - Favorites are saved automatically and persist between sessions

6. **Change Temperature Unit**
   - Click the temperature unit button in the settings panel
   - Toggle between Celsius (°C) and Fahrenheit (°F)
   - All temperatures update instantly across the app

### Features in Detail

#### Dashboard
- **Real-time Updates**: Weather data refreshes automatically every 5 minutes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Empty State**: Helpful message when no favorites are added yet

#### Detailed View
- **Navigation**: Easy back button to return to dashboard
- **Current Weather**: Large display with weather icon and description
- **Charts**: Three interactive charts showing different weather metrics
- **Forecasts**: Both hourly and daily forecasts for planning ahead

#### Search Functionality
- **Autocomplete**: Smart city search with suggestions
- **Debouncing**: Optimized API calls (300ms delay)
- **Error Handling**: Graceful handling of API errors
- **Loading States**: Visual feedback during searches

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🌐 API Integration

### OpenWeatherMap API

This application uses the OpenWeatherMap API for weather data:

- **Current Weather API**: `/weather` endpoint
- **5-Day Forecast API**: `/forecast` endpoint
- **Geocoding API**: `/geo/1.0/direct` for city search

### API Endpoints Used

1. **Current Weather**
   ```
   GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
   ```

2. **5-Day Forecast**
   ```
   GET https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric
   ```

3. **City Search (Geocoding)**
   ```
   GET https://api.openweathermap.org/geo/1.0/direct?q={query}&limit=5&appid={API_KEY}
   ```

### Rate Limiting

- Free tier: 60 calls/minute
- The app implements automatic refresh every 5 minutes to stay within limits
- Error handling for rate limit exceeded scenarios

## 🎨 Styling & Design

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Responsive Design**: Mobile-first approach with breakpoints for:
  - Mobile (< 768px)
  - Tablet (768px - 1024px)
  - Desktop (> 1024px)
- **Modern UI**: Gradient backgrounds, smooth transitions, hover effects
- **Color Scheme**: Blue/indigo gradient theme with clean white cards

## 📊 State Management

### Redux Store Structure

```javascript
{
  weather: {
    currentWeather: {},      // Current weather for active city
    cityWeathers: {},        // Weather data for all favorite cities
    forecast: [],            // 5-7 day forecast
    hourlyForecast: [],      // Hourly forecast (24 hours)
    loading: false,          // Loading state
    error: null,             // Error messages
    lastUpdated: null        // Last update timestamp
  },
  favorites: {
    cities: []               // Array of favorite cities
  },
  settings: {
    unit: 'celsius'          // Temperature unit preference
  }
}
```

### LocalStorage Persistence

- **Favorites**: Stored in `weatherFavorites` key
- **Settings**: Stored in `weatherSettings` key
- Data persists across browser sessions

## 🐛 Error Handling

The application includes comprehensive error handling:

- **API Errors**: User-friendly error messages
- **Network Errors**: Graceful fallbacks and retry options
- **Loading States**: Visual indicators during data fetching
- **Empty States**: Helpful messages when no data is available

## 🔒 Best Practices

- **Code Organization**: Modular component structure
- **Performance**: Optimized re-renders with React hooks
- **Accessibility**: Semantic HTML and ARIA labels
- **Error Boundaries**: Error handling at component level
- **API Optimization**: Debounced search, cached data
- **Responsive Design**: Mobile-first approach

## 🚧 Future Enhancements

Potential features for future versions:

- [ ] Historical weather data trends
- [ ] Weather alerts and notifications
- [ ] Multiple location comparison
- [ ] Weather maps integration
- [ ] Export weather data
- [ ] Dark mode theme
- [ ] Weather widgets
- [ ] Push notifications for severe weather

## 📝 License

This project is created for educational purposes as part of a frontend assignment.

## 👨‍💻 Development

### Key Technologies

- **React Hooks**: useState, useEffect, useSelector, useDispatch
- **Redux Patterns**: Actions, Reducers, Thunks, Store
- **React Router**: Client-side routing and navigation
- **Recharts**: Data visualization and charting
- **Async Operations**: Promise-based API calls with error handling

### Code Quality

- ESLint configuration for code quality
- Consistent code formatting
- Component-based architecture
- Reusable utility functions
- Separation of concerns

## 📞 Support

For issues or questions:

1. Check the browser console for error messages
2. Verify API key is valid and has remaining calls
3. Ensure all dependencies are installed correctly
4. Check network connectivity

## 🎯 Project Requirements Met

✅ **Dashboard** - Summary cards for multiple cities  
✅ **Detailed View** - 5-7 day forecast, hourly forecast, detailed stats  
✅ **Search & Favorites** - API-based autocomplete, persistent favorites  
✅ **Data Visualization** - Temperature, precipitation, wind charts  
✅ **Settings** - Celsius/Fahrenheit toggle  
✅ **Real-time Data** - OpenWeatherMap API integration  
✅ **React with Hooks** - Functional components with hooks  
✅ **Redux/Redux Toolkit** - Centralized state management (Redux + Thunk)  
✅ **Charts** - Recharts with interactive features  
✅ **Responsive Design** - Mobile-friendly UI  

---

**Built with ❤️ using React, Redux, and Tailwind CSS**
