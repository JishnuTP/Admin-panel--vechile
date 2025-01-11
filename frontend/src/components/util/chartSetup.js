// chartSetup.js
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale, // Register the 'category' scale
    LinearScale,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  // Register components globally
  ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
  