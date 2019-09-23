
import {Card,Icon ,List , Form ,Input , Select , Button ,  message } from "antd" ; 
import {axios} from "../../utils/axios" ;
import memoryUtils from "../../utils/memoryUtils";
import PicturesWall from "./picturewall"
import RichTextEditor from "./richtexteditor"
const Option = Select.Option ; 
const Item = Form.Item ; 

class addUpdate extends Component{

    state = {
        category:[]  , 
    }

    constructor(props){
        super(props) ; 
        this.editorRef = React.createRef() ;
    }

    getCategory = ()=>{
        axios.get("/react/category/list").then(res =>{
            console.log(res.data.data)
            this.setState({
                category:res.data.data
            })
        })
    }



    /* 
    处理提交的回调
    */
    handleSubmit = (event) => {
        // 阻止事件的默认行为(提交表单)
        event.preventDefault()
    
        // 进行统一的表单验证
        this.props.form.validateFields(async (err, values) => {
        if (!err) {
            const {name, desc, price, categoryId} = values
            console.log('发送请求', name, desc, price, categoryId)
            
            // 收集上传的图片文件名的数组
            // const imgs = this.pwRef.current.getImgs()
            // console.log('imgs', imgs)
            // 输入的商品详情的标签字符串
            const detail = this.editorRef.current.getDetail()
            console.log('detail', detail)
            const imgs=[]; 
            // 封装product对象
            const product = {name, desc, price, categoryId, imgs, detail}
            if (this.isUpdate) {
            product._id = this.product._id
            }

            console.log(product) ; 
            // 发请求添加或修改
            // const result = await reqAddUpdateProduct(product)
            // if (result.status===0) {
            // message.success(`${this.isUpdate ? '修改' : '添加'}商品成功`)
            // this.props.history.replace('/product')
            // } else {
            // message.error(result.msg)
            // }
            console.log(product._id?"update":"add")
           
            axios.post("/react/product/" + (product._id?"update":"add") , product).then(res =>{
                console.log(res)
                if (res.data.status===0) {
                    message.success(`${this.isUpdate ? '修改' : '添加'}商品成功`)
                    this.props.history.replace('/product')
                } else {
                    message.error(result.msg)
                }
            })
        } 
        })
    }
 
    componentWillMount(){
        this.product = memoryUtils.product 
        this.isUpdate = !!this.product._id
    }

    componentDidMount(){
        this.getCategory()
    }

    render(){
        const { getFieldDecorator } = this.props.form
        const {product , isUpdate} = this 
        const title = (
            <span>
                <Icon type="arrow-left" 
                style={{color:"#1da57a" , marginRight:20}}
                onClick={()=>this.props.history.go(-1)}
                ></Icon>
                <span> {isUpdate?"修改商品":"商品添加"}</span>
            </span>
        )
        
        const formLayout = {
            labelCol:{span:5} , 
            wrapperCol:{ span: 12 }
        }
        return(
            <Card title={title} className="detail">
                <Form {...formLayout} onSubmit={this.handleSubmit}>
                    <Item label="商品名称">
                        {getFieldDecorator('name', {
                            initialValue:product.name ,
                            rules: [{ required: true, message: '必须输入商品名称!' }],
                        })(<Input placeholder="商品名称"/>)}
                    </Item>
                    <Item label="商品描述">
                        {getFieldDecorator('desc', {
                            initialValue:product.desc ,
                            rules: [{ required: true, message: '必须输入商品描述!' }],
                        })(<Input placeholder="商品描述"/>)}
                    </Item>
                    <Item label="商品价格">
                        {getFieldDecorator('price', {
                            initialValue:product.price ,
                            rules: [{ required: true, message: '必须输入商品价格!' }],
                        })(<Input type="number" placeholder="商品价格" addonAfter="元"/>)}
                    </Item>
                    <Item label="商品分类">
                        {getFieldDecorator('categoryId', {
                            initialValue:product.category || "", 
                            rules: [{ required: true, message: '必须输入商品分类!' }],
                        })(
                            <Select>
                                <Option value="">未选择</Option>
                                {
                                   this.state.category.map((item , i) =>{
                                       return (
                                        <Option value={item._id} key="i">{item.name}</Option>
                                       )
                                   }) 
                                }
                            </Select>
                        )}
                    </Item>


                    <Item label="商品图片">
                        <PicturesWall/>
                    </Item>
                    <Item label="商品详情">
                        <RichTextEditor ref={this.editorRef} />
                    </Item>
                    <Button type="primary"  htmlType="submit">提交</Button>

                </Form>
            </Card>
        )

    }
}

export default Form.create()(addUpdate)