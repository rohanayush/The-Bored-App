export interface BoredActivity {
    "activity": string;
    "type": string;
    "participants": number;
    "price": number;
    "link": string;
    "key": string;
    "accessibility": number;
  }
  
  // this represents the store state data structure
  export interface AppState {
    
    // this will contain a single response , 
    // a single idea format, recently fetched 
    boredActivity: BoredActivity | null;

    // all ideas will be stored inside key: 'added'
    added:BoredActivity[] ,

    // to show success or error messages
    message: string | null; 
  }
  