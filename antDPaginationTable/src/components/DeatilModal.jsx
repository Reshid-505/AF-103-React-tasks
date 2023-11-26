import PropTypes from 'prop-types'
import { Modal, Spin, List } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

function DeatilModal({id,isModalOpen,handleCancel}) {
    let [data,setData] = useState({})
    useEffect(()=>{
        setData({})
        axios("https://api.punkapi.com/v2/beers/"+id)
        .then(res=>{
            setData(res.data.find(elem=>elem.id==id))
        })
    },[id])
  return (
    <>
        <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
            {!data.name?<Spin />:(
                <>
                    <h1>{data?.name}</h1>
                    <h2>{data?.abv}</h2>
                    <h3>{data?.tagline}</h3>
                    <p>{data?.description}</p>
                    <List
                    size="small"
                    bordered
                    dataSource={data.food_pairing}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                </>
            )}

        </Modal>

      
    </>
  )
}

DeatilModal.propTypes={
    id:PropTypes.number,
    isModalOpen:PropTypes.func,
    handleCancel:PropTypes.func
}

export default DeatilModal
