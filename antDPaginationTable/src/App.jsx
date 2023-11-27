import axios from "axios"
import { useEffect, useState } from "react"
import DataCard from "./components/DataCard"
import { Col, Row, Table, Button, Pagination, Divider, Slider, Layout, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import DeatilModal from "./components/DeatilModal";
import Swal from 'sweetalert2'


function App() {
  
  let [data,setData] = useState([])
  const [tableData,setTableData] = useState([]) 
  const [modalId,setModalId] = useState(0) 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [current, setCurrent] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchInp, setSearchInp] = useState("");
  const [total, setTotal] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [filterData, setFilterData] = useState(["",0,100]);


  function onChange(page,pageSize){
    let [searchInp,min,max] = filterData
    if(searchInp==""){
      axios(`https://api.punkapi.com/v2/beers?&abv_gt=${min}&abv_lt=${max}&page=1&per_page=80`)
      .then(res=>setTotal(res.data.length))
      axios(`https://api.punkapi.com/v2/beers?&abv_gt=${min}&abv_lt=${max}&page=${page}&per_page=${pageSize}`)
      .then(res=>{setData(res.data)})
    }else{
      axios(`https://api.punkapi.com/v2/beers?beer_name=${searchInp.replace(" ","_")}&abv_gt=${min}&abv_lt=${max}&page=1&per_page=80`)
      .then(res=>setTotal(res.data.length))
      axios(`https://api.punkapi.com/v2/beers?beer_name=${searchInp.replace(" ","_")}&abv_gt=${min}&abv_lt=${max}&page=${page}&per_page=${pageSize}`)
      .then(res=>{setData(res.data)})
    }
    setCurrent(page)
    setPerPage(pageSize);
  }

  function handleSearch(){
    if(searchInp==""){
      axios(`https://api.punkapi.com/v2/beers?&abv_gt=${min}&abv_lt=${max}&page=1&per_page=80`)
      .then(res=>setTotal(res.data.length))
      axios(`https://api.punkapi.com/v2/beers?&abv_gt=${min}&abv_lt=${max}&page=1&per_page=10`)
      .then(res=>setData(res.data))
    }else{
      axios(`https://api.punkapi.com/v2/beers?beer_name=${searchInp.replace(" ","_")}&abv_gt=${min}&abv_lt=${max}&page=1&per_page=80`)
      .then(res=>setTotal(res.data.length))
      axios(`https://api.punkapi.com/v2/beers?beer_name=${searchInp.replace(" ","_")}&abv_gt=${min}&abv_lt=${max}&page=1&per_page=10`)
      .then(res=>setData(res.data))
    }
    setFilterData([searchInp,min,max])
    setCurrent(1)
    setPerPage(10);
  }
  useEffect(()=>{
    // Swal.fire({
    //   title: 'HARAM BRO!',
    //   text: 'This site is very haram are you sure continue',
    //   icon: 'question',
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "I love haram!"
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire({
    //       title: "Allah is wathcing!",
    //       text: "Jahannam is waiting for you bro!",
    //       icon: "error"
    //     });
    //   }
    // });
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true
    });
    swalWithBootstrapButtons.fire({
      title: 'HARAM BRO!',
      text: 'This site is very haram are you sure continue',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: "I love haram!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Allah is wathcing!",
          text: "Jahannam is waiting for you bro!",
          icon: "error"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          // title: "Cancelled",
          // text: "Your imaginary file is safe :)",
          // icon: "error"
          html:'<iframe width="100%" height="315" src="https://www.youtube.com/embed/IdCpR45713o?si=2MABcrAYnHhFbuOC&amp;controls=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
        });
      }
    });
    
  },[])
  
  
  
  

  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id-b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'PH',
      dataIndex: 'ph',
      sorter: (a, b) => a.ph-b.ph,
    },
    {
      title: 'Year',
      dataIndex: 'year',
      filters:tableData.filter(
        (obj, index) =>tableData.findIndex((item) => item.year === obj.year) === index).map(item=>{return({text: item.year,value: item.year,})}),
      onFilter: (value, record) => record.year.indexOf(value) === 0,
    },
    {
      title: 'Info',
      key: 'key',
      dataIndex: 'key',
      render: (text, record) => (
       <Button type="primary" danger onClick={()=> {
        setModalId(record.id)
        showModal()
        }}>
         {"Info"}
       </Button>
      ),
    }
  ];
  
  useEffect(()=>{
    axios("https://api.punkapi.com/v2/beers?page=1&per_page=80")
    .then(res=>{
      setTotal(res.data.length)
      setTableData(res.data.map((item,index)=>{return({key:index,id:item.id,name:item.name,ph:item.ph ?? "Not Found",year:item.first_brewed.slice(-4)})}))
    })
  },[])
  useEffect(()=>{
    axios(`https://api.punkapi.com/v2/beers?page=${current}&per_page=${perPage}`)
    .then(res=>{
      setData(res.data)
    })
  },[])

  return (
    <>
      <h1 style={{textAlign:"center",fontFamily:"sans-serif",margin:"20px 0"}}>HARAM BRO!</h1>
      <Table columns={columns} dataSource={tableData} pagination={{ pageSizeOptions:[5, 10, 15, 20, 25,],defaultPageSize:5}} />
      <Divider />

      <Layout style={{width:"90%",margin:"0 auto",background:"#FFF"}}>
      <Row gutter={20}>
      <Col style={{margin:"20px 0"}} span={8} >
      <Input placeholder="Basic usage" value={searchInp} onChange={(e)=>{setSearchInp(e.target.value)}} />
      </Col>
      <Col style={{margin:"20px 0"}} span={8} >
        <Slider range value={[min, max]} onChange={(values)=>{setMin(values[0]);setMax(values[1])}} />
      </Col>
      <Col style={{margin:"20px 0"}} span={8}  >
      <Button onClick={handleSearch} type="primary" shape="circle" icon={<SearchOutlined />} />
      </Col>
      {data?.map((item,index)=><Col key={index} span={6} ><DataCard item={item} showModal={showModal} setModalId={setModalId} /></Col>)}
      </Row>
      <Pagination style={{margin:"20px 0",textAlign:"center"}} pageSizeOptions={[10, 15, 20, 25, 50, 100]} pageSize={perPage}  showSizeChanger onChange={onChange} current={current} total={total} />
      </Layout>
      <DeatilModal isModalOpen={isModalOpen} id={modalId} handleCancel={handleCancel} />
      <Divider />
      <div style={{margin:"5 0",textAlign:"center"}}>
        <img src="https://i.redd.it/wht5zjop5dc41.jpg" alt="Haram bro" />
      </div>
      <div style={{margin:"5 0",textAlign:"center"}}>
        <img src="https://i.ytimg.com/vi/1Inq58IQixQ/hq2.jpg?sqp=-oaymwEoCOADEOgC8quKqQMcGADwAQH4Ad4DgAKABYoCDAgAEAEYciBfKDwwDw==&rs=AOn4CLDX0jiI325zDSgBIxWGa8yxMyQv-g" alt="Haram bro" />
      </div>
      <div style={{margin:"5 0",textAlign:"center"}}>
        <img src="https://galeri8.uludagsozluk.com/485/evlilik-oncesi-seks-niye-gunah-sorunsali_736499.jpg" alt="Haram bro" />
      </div>
      <div style={{margin:"5 0",textAlign:"center"}}>
        <img src="https://i.pinimg.com/564x/04/f3/80/04f38054caf77d6caf420185bd48f54f.jpg" alt="Haram bro" />
      </div>
      <div style={{margin:"5 0",textAlign:"center"}}>
        <img src="https://pbs.twimg.com/media/E8hiTI8VkAMrR3k.jpg" alt="Haram bro" />
      </div>
    </>
  )
}

export default App
