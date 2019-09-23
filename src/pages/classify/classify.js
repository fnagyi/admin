import "./classify.scss"
import { Card , Button, Radio, Icon, Table ,Modal} from 'antd';
import AddUpdateForm from "../../components/category/add-update-form"

import {axios} from "../../utils/axios"
const columns = [
    {
      title: '分类的名称',
      dataIndex: 'name',
    },

    {
      title: '操作',   
      render:()=> <Button>修改分类</Button>
    },
  ];


export class Classify extends Component{
    state = { 
      visible: false , 
      data:[] 
    };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };
    
    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };

    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
    
    componentDidMount(){
        axios.get("/react/category/list").then(res=>{
          console.log(res)
          console.log(res.data.data)
          this.setState({
            data:res.data.data
          })
      })
    }

    render(){
        const extra = (
          <div>
          <Button type="primary" onClick={this.showModal}>
            <Icon type="plus"></Icon>
            添加
          </Button>
          <Modal
            title="修改分类"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <AddUpdateForm/>   
          </Modal>
          </div>
        )

        return(
          <Card title="一级分类" extra={extra}>
            <Table
                bordered 
                columns={columns}
                dataSource={this.state.data}
                pagination={{defaultPageSize:4 ,showQuickJumper:true }}
                rowKey="_id" 
            />
          </Card>
        )
    }
}




