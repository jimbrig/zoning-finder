import { AIProvider } from '../types';

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

export const defaultProviders: AIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Uses GPT-4 to search for ArcGIS URLs based on location information',
    apiKeyRequired: true,
    enabled: true
  },
  {
    id: 'esri',
    name: 'ESRI API',
    description: 'Uses ESRI REST API to directly query available services',
    apiKeyRequired: false,
    enabled: true
  },
  {
    id: 'googleai',
    name: 'Google AI',
    description: 'Uses Google AI models to search for zoning information',
    apiKeyRequired: true,
    enabled: false
  }
];