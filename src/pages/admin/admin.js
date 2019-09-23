import "./admin.scss"
import { Route,Switch ,Redirect } from "react-router-dom" 

import { Layout } from 'antd';
import {LeftNav} from "../../components/leftNav/leftNav"
import Head from "../../components/header/header"
import {Home} from "../home/index"
import {User} from "../user/index"
import {Role} from "../role/role"
import {Classify} from "../classify/classify"
import Product from "../goods/goodsRouter"
const { Header, Footer, Sider, Content } = Layout;

export class Admin extends Component {

    render() {

        
        // 读取保存的user , 如果不存在返回登录页面 
        const user = JSON.parse(localStorage.getItem("user_key") || "{}") ; 
        if(!user._id){
            return <Redirect to="/login"/>
        }

        return (
        <Layout style={{height:"100vh" }} >
            <Sider >
                <LeftNav></LeftNav>
            </Sider>
            <Layout>
              <Head/>
              <Content className="content">
                  <div className="box">
                    <Switch>
                        <Route path="/home" component={Home}/>
                        <Route path="/user" component={User}/>
                        <Route path="/role" component={Role}/>
                        <Route path="/classify" component={Classify}/>
                        <Route path="/product" component={Product} />
                        <Route path="/" exact render={()=>( <Redirect to="/home" /> )} />
                    </Switch>
                  </div>
              </Content>

            </Layout>
        </Layout>
        )
    }
}


