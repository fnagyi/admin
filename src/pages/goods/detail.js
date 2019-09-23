
import {Card,Icon ,List } from "antd" ; 
import memoryUtils from "../../utils/memoryUtils"
import {Redirect} from 'react-router-dom'
const Item = List.Item ; 
export class ProductDetail extends Component{

    state = {
        // categoryName: '',
        product: memoryUtils.product
    }

    // componentDidMount(){
    //     console.log(memoryUtils.product)
    // }
    render(){
        const product = memoryUtils.product 
        if(!product._id){
            return <Redirect to="/product"/>
        }
        const title = (
            <span>
                <Icon 
                type="arrow-left" 
                style={{color:"#1da57a" , marginRight:20}}
                onClick={()=>this.props.history.go(-1)}
                ></Icon>
                <span>商品详情</span>
            </span>
        )
        
        return(
            <Card title={title} className="detail">
                <List>
                    <Item>
                        <span className="detail-left">商品名称:</span>
                        <span>{product.name}</span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品描述:</span>
                        <span>{product.desc}</span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品价格:</span>
                        <span>{product.price}元</span>
                    </Item>
                    <Item>
                        <span className="detail-left">所属分类:</span>
                        {/* <span>{categoryName}</span> */}
                    </Item>
                    <Item>
                        <span className="detail-left">商品图片:</span>
                        <span>
                            {
                                // product.imgs && product.imgs.map(img => <img className="detail-img" key={img} src={BASE_IMG + img} alt="img" />)
                            }
                        </span>
                    </Item>

                    <Item>
                        <span className="detail-left">商品详情:</span>
                        <div dangerouslySetInnerHTML={{ __html: product.detail}}>
                        </div>
                    </Item>

                </List>
            </Card>
        )

    }


}