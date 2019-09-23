

import {Card,Icon ,List } from "antd" ; 
const Item = List.Item ; 

export class Update extends Component{
    render(){
        const title = (
            <span>
                <Icon type="arrow-left" 
                style={{color:"#1da57a" , marginRight:20}}
                onClick={()=>this.props.history.go(-1)}
                ></Icon>
                <span>商品修改</span>
            </span>
        )

        return(
            <Card title={title} className="detail">
                <List></List>
                <List></List>
                <List></List>
                <List></List>

            </Card>
        )

    }

}