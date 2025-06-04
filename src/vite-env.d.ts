/// <reference types="vite/client" />

// Declare image modules to solve TypeScript import errors
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

// Add type definition for SearchResult which is used but not defined in the provided types
interface SearchResult {
  id: string;
  url: string;
  title: string;
  description: string;
  provider: string;
  confidence: number;
  timestamp: string;
  validated: boolean;
  notes?: string;
  saved?: boolean;
}