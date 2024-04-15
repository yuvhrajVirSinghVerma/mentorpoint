import { create } from "apisauce"
// 192.168.1.2;
// ifconfig -a 
import authStorage from '../auth/storage';
// baseurl="http://192.168.1.3:8000/api"
// https://mentorpoint.onrender.com/api
const apiClient = create({
  baseURL: "https://mentorpoint.onrender.com/api",
});
apiClient.addAsyncRequestTransform(request=>async() => {
  let token=await authStorage.getToken()
 console.log("calleddd ",token )
  // const token = getToken();
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
    console.log("request ",request)
  }
});
export default apiClient;
