export interface BoredActivity {
    "activity": string;
    "type": string;
    "participants": number;
    "price": number;
    "link": string;
    "key": string;
    "accessibility": number;
  }
  
  export interface AppState {
    boredActivity: BoredActivity | null;
    added:BoredActivity[] ,
    error: string | null; 
  }
  