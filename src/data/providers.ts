import { AIProvider } from '../types';

// List of all US states for the dropdown
export const statesList = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

// Default AI providers configuration
export const defaultProviders: AIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Use OpenAI GPT models to search for ArcGIS URLs',
    apiKeyRequired: true,
    enabled: true
  },
  {
    id: 'azure',
    name: 'Azure AI',
    description: 'Microsoft Azure AI service for geospatial data search',
    apiKeyRequired: true,
    enabled: false
  },
  {
    id: 'local',
    name: 'Local Database',
    description: 'Search a curated database of known zoning district URLs',
    apiKeyRequired: false,
    enabled: true
  }
];