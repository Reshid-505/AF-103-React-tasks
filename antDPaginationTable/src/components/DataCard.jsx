import { Card, Button } from 'antd';
import PropTypes from 'prop-types'

function DataCard({item,showModal,setModalId}) {
    // console.log(item)
  return (
    <>
        <Card
            cover={<img style={{height:"100px",objectFit:"contain"}} alt="example" src={item.image_url} />}
            style={{ width: "100%",minHeight:"250px" }}
        >
            <h1>{item.name}</h1>
            <h4>{item.abv}</h4>
            <Button type="primary" danger onClick={()=> {
            setModalId(item.id)
            showModal()
            }}>Info</Button>
        </Card>
    </>
  )
}

DataCard.propTypes={
    item:PropTypes.object,
    showModal:PropTypes.func,
    setModalId:PropTypes.func
    
}
export default DataCard
