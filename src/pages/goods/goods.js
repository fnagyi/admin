
import {Card , Select , Input , Button , Icon , Table ,message} from "antd" ; 
import {axios} from "../../utils/axios"
import {history} from "../../utils/history"
import memoryUtils from "../../utils/memoryUtils";
const Option = Select.Option ; 

export class Goods extends Component{
    state = {
        loading : false , 
        data : 0 , 
        products : []  ,  // 商品列表 
        searchType:"按名称搜索" ,  // 按搜索框 
        searchName:"" ,  // 搜索名字 
    } 

    initColumns =() => {
        this.columns = [
            {
                title:"商品名称",
                dataIndex:"name" 
            } , 
            {
                title:"商品描述",
                dataIndex:"desc" 
            } ,
            {
                title:"价格",
                dataIndex:"price" , 
                render:(price ) => "￥" + price
            } ,
            {
                title:"状态",
                // dataIndex:"status" , 
                render:({ _id ,status } ) => {
                    let btnText = "下架"
                    let text = "在售" 
                    if(status == 2 ){
                        btnText = "上架"
                        text = "已下架"
                    }
                    return (
                        <span>
                            <Button type="primary" onClick={() => this.changeStatus(_id ,status)}>{btnText}</Button>
                            <span>{text}</span>
                        </span>
                    )
                }
            } ,

            {
                title:"操作",
                render:(product ) => (
                    <span>
                        <Button 
                        onClick={()=>{
                            memoryUtils.product = product
                            this.props.history.push("/product/detail")}
                        }>详情</Button>
                        <Button 
                        
                        onClick={()=>{
                            memoryUtils.product = product
                            this.props.history.push("/product/addupdate")}
                        }

                        >修改</Button>
                    </span>
                )
            } ,
        ]  
    }

    changeStatus =(productId , status) =>{
        status = status==1 ? 2: 1  
        axios.get("/react/product/changeStatus" , {
            params:{
                productId ,
                status
            }
        }).then(res =>{
            console.log(res)
            console.log(res.data.status)
            if(res.data.status == 0 ){
                message.success("商品状态跟新成功")
                this.initColumns() 
            }
        })
    }


    getProducts =()=>{
        const {searchName , searchType} = this.state 
        axios.get("/react/product/search", {
            params:{
                searchName , searchType
            }
        }).then(res =>{
            console.log(res)
            this.setState({
                products:res.data.result
            })
        })
    }

    componentWillMount(){
        this.initColumns() 
    }


    componentDidMount(){
        axios.get("/react/product/list").then(res=>{
            console.log(res)
          this.setState({
            products:res.data.result 
          })
        })
    }

    render(){
        const {loading , products ,searchType ,searchName } = this.state
        const title = (
            <span>
                <Select style={{ width: 150 , marginRight:10}} value={searchType} onChange={(value)=>this.setState({searchType:value})}>
                    <Option value="productName" >按名称搜索</Option>
                    <Option value="productDec" >按描述搜索</Option>
                </Select>
                <Input  
                style={{ width: 200 ,marginRight:10 }} 
                value={searchName}
                onChange={event =>this.setState({searchName:event.target.value})}
                ></Input>
                <Button type="primary" onClick={()=>this.getProducts()}>搜索</Button>
            </span>
        )

        const extra = (
            <Button type="primary" onClick={()=>{
                memoryUtils.product = {} 
                this.props.history.push("/product/addupdate")}}>
                <Icon type="plus"/>
                添加商品
            </Button>
        )

        return( 
            <Card title={title} extra={extra}>
                <Table
                    bordered 
                    columns={this.columns}
                    loading = {loading}
                    dataSource={products}
                    pagination={{defaultPageSize:4 ,showQuickJumper:true }}
                    rowKey="_id" 
                />
            </Card>
        )
    }
}