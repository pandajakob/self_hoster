export interface User {
  name: string;
  email: string;
  id: string;
  // any other fields you return…
}
export interface FileStats {
  name: string;
  dateCreated: string;
  size: number;
}

export interface AuthProps {
  onSetUserLoggedIn: (userLoggedIn: Boolean) => void;
}
