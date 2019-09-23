import { Upload, Icon, Modal ,Message} from 'antd';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      // {
      //   uid: '-1',
      //   name: 'image.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async ({ file, fileList }) => {
    // file与fileList中最后一个file代表同个图片的不同对象
    console.log('handleChange()', file.status, file===fileList[fileList.length-1])
    // 如果上传成功
    if (file.status==='done') {
      // 将数组最后一个file保存到file变量
      file = fileList[fileList.length - 1]
      // 取出响应数据中的图片文件名和url
      const {name, url} = file.response.data
      // 保存到上传的file对象
      file.name = name
      file.url = url
    } else if (file.status==='removed') { // 删除
      const result = await reqDeleteImg(file.name)
      if (result.status===0) {
        message.success('删除图片成功')
      } else {
        message.error('删除图片失败')
      }
    }

    // 更新状态
    this.setState({ fileList })
  }


  /* 
  获取所有已上传图片文件名的数组
  */
 getImgs = () => this.state.fileList.map(file => file.name)


  

  componentWillMount () {
    // 根据传入的imgs生成fileList并更新
    const imgs = this.props.imgs
    if (imgs && imgs.length>0) {
      const fileList = imgs.map((img, index) => ({
        uid: -index, // 唯一标识
        name: img, // 文件名
        status: 'done', // 状态有：uploading done error removed
        url: 'http://localhost:1906/upload/' + img
      }))
      this.setState({ fileList })
    }
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    ); 
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload" // 上传图片的url
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
