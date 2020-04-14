export interface User {
  email: string;
  password: string;
  // for being expiresIn in response of server (for uninfinity using of token)
  returnSecureToken?: boolean;
}

export interface FirebaseAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface Post {
  id?: string;
  title?: string;
  text?: string;
  author?: string;
  date?: Date;
}

export interface FbCreateResponse {
  name: string;
}
