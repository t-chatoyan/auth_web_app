import axiosClient from "./axiosInstance";
import { LoginParams, LoginResponse, RegisterParams, User } from '../types/userType.type';
import { AxiosResponse } from "axios";
const client = axiosClient();

const AuthService = {
  login: (loginParams: LoginParams): Promise<LoginResponse> => {
    return  client
      .post("auth/login", loginParams)
      .then((loginResponse) => {
        if (loginResponse && loginResponse.data.response.data.accessToken) {
          localStorage.setItem("ACCESS_TOKEN", loginResponse.data.response.data.accessToken);
        }
        return loginResponse.data;
      });
  },

  logout: (): void => {
    localStorage.clear();
  },

  register: (params: RegisterParams) => {
    return client.post("users/register", params);
  },

  getCurrentUser: async (): Promise<AxiosResponse<User | null>> => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    const client = axiosClient(accessToken);
    return client.get("auth/profile")
      .then((profileData) => {
        if (profileData.data.response.data) {
          return profileData.data.response.data
        }
        return null;
      });
  },
};

export default AuthService;
