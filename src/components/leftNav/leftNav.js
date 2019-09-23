import "./leftNav.scss"

import { Menu, Icon, Button } from 'antd';
import {Link} from "react-router-dom"
const { SubMenu } = Menu;

export class LeftNav extends Component {
    state = {
      collapsed: false,
    };
  
    toggleCollapsed = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    };
  
    render() {
      return (

        <div>
          {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button> */}
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
          >
            <Menu.Item key="1" className="sub">
            <Icon type="bank" /> 
            <span>首页</span>
            <Link to={"/home"} >

            </Link>
            </Menu.Item>

            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="reconciliation" /> 
                    <span>商品</span>
                </span>
              }
            >
            <Menu.Item key="5">
              <Link to={"/classify"} >
                <Icon type="setting" />
                  品类管理
              </Link>
            </Menu.Item>

              <Menu.Item key="6">
                <Link to={"./product"}>
                <Icon type="profile" />
                  商品管理
                </Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="3">
            <Icon type="user" />
            <span>用户管理</span>
              <Link to={"/user"}>
              </Link>
            </Menu.Item>

            <Menu.Item key="4">
            <Icon type="team" />
              <span>角色管理</span>
              <Link to={"/role"}>
              </Link>
            </Menu.Item>

            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="pie-chart" />
                  <span>图形图标</span>
                </span>
              }
            >
              <Menu.Item key="9" ><Icon type="sliders" />柱形图</Menu.Item>
              <Menu.Item key="10"><Icon type="line-chart" />折线图</Menu.Item>
              <Menu.Item key="11"><Icon type="pie-chart" />饼图</Menu.Item>
            </SubMenu>
          </Menu>
        </div>

      );
    }
  }