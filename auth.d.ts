declare module '#auth-utils' {
    interface User {
      id : number,
      firstName: String,
      lastName: String,
      email: String,
      
    }
  
    interface UserSession {
      // Add your own fields
    }
  
    interface SecureSessionData {
      // Add your own fields
    }
  }
  
  export {}