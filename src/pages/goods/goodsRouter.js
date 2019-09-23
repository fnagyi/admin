import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import './goods.scss'

import {Goods} from './goods'
import {ProductDetail} from './detail'
import {Update} from "./update"
import addUpdate from "./addupdata"
/**
 * 商品管理
 */
export default class Product extends Component {
  render () {
    return (
      <Switch>
        <Route path="/product" exact component={Goods}/>
        <Route path="/product/detail" component={ProductDetail}/>
        <Route path="/product/update" component={Update}/>
        <Route path="/product/addupdate" component={addUpdate}/>
        <Redirect to="/product"/>
      </Switch>
    )
  }
}
