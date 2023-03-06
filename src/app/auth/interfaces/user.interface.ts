
export interface ResponseToken {
    success: boolean;
    expires_at: string;
    request_token: string;
  }


  export interface SessionIdResponse {
    success: boolean;
    session_id: string;
  }  


  export interface UserDetails {
    avatar?: {
      gravatar?: {
        hash?: string;
      };
    };
    id: number;
    iso_639_1?: string;
    iso_3166_1?: string;
    name?: string;
    include_adult?: boolean;
    username?: string;
  }
  