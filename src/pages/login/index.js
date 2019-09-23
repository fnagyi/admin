import "./index.scss"
import { Form, Icon, Input, Button, Checkbox , message } from 'antd';
import {axios} from "../../utils/axios"
// import {history} from "&/history"
import {Redirect } from "react-router-dom" 

import logo from "../../assets/logo.jpg"


class Login extends Component {

    handleSubmit = e => {
        //最值默认行为
        e.preventDefault();

        // const form = this.props.form
        // const values = form.getFieldsValue()
        // console.log(values)

        //  对表单进行统一验证 
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post("/react/user/login" , values).then(res =>{
                    console.log(res.data)
                    // 将user信息保存到local
                    const user = res.data.data
                    localStorage.setItem('user_key', JSON.stringify(user))

                    if (res.data.status===0) {
                        message.success('登陆成功!')
                        this.props.history.replace('/home')
                    } else {
                        message.error(res.data.msg)
                    }

                })
            }
          });
        
      };


    validatorPwd = (rule,value , callback)  =>{
        value = value.trim() 
        if(!value){
            callback("密码必须输入")
        }else if(value.length<4){
            callback("密码必须大于4位数")
        }else if(value.length >12){
            callback("密码必须小于12位数")
        }else if(!/^[a-zA-Z0-9_]+$/){
            callback("用户名必须是英文，数字或者下划线")
        }else{
            callback()
        }
    }

    render() {

        // 读取保存的user , 如果存在返回home页面 
        const user = JSON.parse(localStorage.getItem("user_key") || "{}") ; 
        if(user._id){
            return <Redirect to="/home"/>
        }

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="loginView">
                <div className="header">
                    <img src={logo} alt="" className="logo" />
                    <h2>React项目:后台管理系统</h2>
                </div>

                <div className="loginMain">
                    <div className="login">
                        <h2 className="user">用户登录</h2>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {
                                    getFieldDecorator("username" , {
                                        initialValue:"admin" , 
                                        rules:[
                                            {required: true ,whitespace:true , message:"用户名是必须的"} , 
                                            {min:4,message:"用户名不能小于4位"} , 
                                            {max:12,message:"用户名不能大于12位"},
                                            {pattern:/^[a-zA-Z0-9_]+$/,message:"用户名必须是英文，数字或者下划线"}
                                          ] 
                                    })(
                                        <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                        />
                                    )
                                }
                            </Form.Item>
                            
                            <Form.Item>
                                {
                                    getFieldDecorator("password" , {
                                        initialValue:"" , 
                                        rules:[
                                            {validator:this.validatorPwd}
                                        ] 
                                    })(
                                        <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                        />
                                    )
                                }
                            </Form.Item>

                            <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录 
                            </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

const WrappedForm = Form.create()(Login);
export default WrappedForm 