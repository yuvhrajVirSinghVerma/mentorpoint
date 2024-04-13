import { create } from "apisauce"
// 192.168.1.2;
// ifconfig -a 
import authStorage from '../auth/storage';

const apiClient = create({
  baseURL: "http://192.168.1.3:8000/api",
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
