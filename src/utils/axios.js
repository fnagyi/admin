


import axios from "axios";

axios.defaults.baseURL = "http://localhost:1906/";


let token = "";
axios.defaults.headers.common['token'] = token;    // token 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// import {Toast,Modal } from "antd-mobile"
// import {history} from "&/history"

// const alert = Modal.alert;
// const showAlert = () => {
//     const alertInstance = alert('登录提示', '你确定是否前往登陆', [
//       { text: '我就看看', onPress: () => console.log('游客访问'), style: 'default' },
//       { text: '马上登录', onPress: () => history.push("/login") },
//     ]);
//     setTimeout(() => {
//       // 可以调用close方法以在外部close
//       console.log('auto close');
//       alertInstance.close();
//     }, 500000);
// };

export function loadingToast(msg) {
    Toast.hide();
    Toast.loading(msg, 1, () => {
      console.log('Load complete !!!');
    });
}

export function failToast(msg) {
    Toast.hide();
    Toast.fail(msg, 1);
}

export function showToast(msg) {
    Toast.hide();
    Toast.info(msg, 1);
}

// 拦截器配置    Interceptors 
// 发送请求之前 添加拦截器  
// axios.interceptors.request.use(function (config) {
//     // 发送之前做的事情 
//     loadingToast("请求中");
//     config.headers['token'] =  sessionStorage.token;
//     console.log(config);
//     return config;
// }, function (error) {
//     // 发送失败 做的失败 
//     failToast("请求失败")
//     return Promise.reject(error);
// });

// // 响应数据 的拦截器 
// axios.interceptors.response.use(function (response) {
//     // 成功接收到数据 
//     console.log(response);
//     setTimeout(()=>{
//         showToast(response.data.msg);
//         if(response.data.code==500){
//             showAlert();
//         }
//     },500)
//     return response;
// }, function (error) {
//     failToast("响应失败");
//     // 无法接收到数据  
//     return Promise.reject(error);
// });


export  {axios};

