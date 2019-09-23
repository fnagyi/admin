
import "./header.scss"
import { Modal, Button } from 'antd';
import {history} from "../../utils/history"
import {withRouter} from "react-router-dom"
import menuList from "../../utils/menuConfig"
class Head extends Component{
    // 退出登录 
    logout = ()=>{
        Modal.confirm({
            title: '确认退出吗?',
            onOk() {
                localStorage.removeItem("user_key")
                history.push("/login")
            },
            onCancel() {
                
            },
        });
    }


      /* 
        根据当前请求的path得到对应的title
        */
        getTitle = () => {
            console.log(menuList)
            let title = ''
            const path = this.props.location.pathname
            console.log(path)
            menuList.forEach(item => {
            if (item.key===path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
                if (cItem) {
                title = cItem.title
                }
            }
            
            })

            return title
        }

    render(){
        const user =  JSON.parse(localStorage.getItem("user_key")).username
        const title = this.getTitle()
        return(
            <div className="header">
                <div className="headerTop">
                    <p onClick={this.logout} style={{cursor:"pointer"}}>退出</p>
                    <span>欢迎{user}</span>
                </div>
                
                <div className="classify">
                    <p>{title}</p>
                    
                </div>
            </div>
        )
    }
}

export default withRouter(Head)