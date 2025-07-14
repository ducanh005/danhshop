import { Button, Checkbox, Form, Input, Modal } from "antd";
import { WrapperHeader } from "./style";
import {  DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import TableComponent from "../TableComponent/TableComponent";
import { useEffect, useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import { WarapperUploadFile } from "../../pages/Profile/style";
import { getBase64 } from "../../utils";
import { createProduct } from "../../service/ProductService";
import * as ProductService from '../../service/ProductService'
import { useMutationHooks } from "../../hooks/userMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from '../../components/Message/Message'
import { useQuery } from "@tanstack/react-query";
const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateProduct, setStateProduct] = useState({
        name: '',
        type: '',
        countInStock: '',
        price: '',
        description: '',
        rating: '',
        image:''
    })
    const [form] = Form.useForm()

    const mutation = useMutationHooks(
          ( data) => {
            const {
                name,
                type,
                countInStock,
                price,
                description,
                rating
            }= data
            return  ProductService.createProduct( 
                data)
            }
        )
    const {data, isPending, isSuccess, isError} = mutation
    const getAllProducts = async()=>{
        const res = await ProductService.getAllProduct()
        return res
    }
    const {isPending: isLoadingProduct,data: products} = useQuery({queryKey:['products'],queryFn: getAllProducts})
    const renderAction =()=>{
        return (
            <div>
                <DeleteOutlined style={{color:'red', fontSize:'30px', cursor:'pointer'}}/>
                <EditOutlined style={{color:'orange', fontSize:'30px',cursor:'pointer'}}/>
            </div>
        )
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render:renderAction
        },
        ];
    const dataTable =products?.data?.length && products?.data?.map((product)=>{
        return {...product, key: product._id}
    })
    
    
    useEffect(()=>{
        if(isSuccess && data?.status === 'OK'){
            message.success()
            handleCancel()
        }else if(isError){
            message.error()
        }
    },[isSuccess])

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
        name: '',
        type: '',
        countInStock: '',
        price: '',
        description: '',
        rating: '',
        image:''
        })
        form.resetFields()
    }

    const onFinish = () => {
        mutation.mutate(stateProduct)
    }

    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
        console.log(e.target.name, e.target.value);
    }
    const handleOnchangeAvatar = async({fileList}) => {
          const file = fileList[0];
          if(!file.url && !file.preview){
            file.preview = await getBase64(file.originFileObj );
          }
          setStateProduct({
            ...stateProduct,
            image: file.preview
          })
        }
    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{marginTop:'10px'}}>
                <Button style={{height:'150px', width:'150px', borderRadius:'6px', borderStyle:'dashed'}} onClick={()=>setIsModalOpen(true)}><PlusOutlined style={{fontSize:'60px'}}/></Button>
            </div>
            <div style={{marginTop:'20px'}}> 
                <TableComponent columns={columns} isPending={isLoadingProduct} data={dataTable}/>
            </div>
             <Modal
                title="Tạo sản phẩm"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onCancel={handleCancel} 
                footer={null}
            >
                <Loading isPending={isPending}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        autoComplete="off"
                        form={form}

                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateProduct.name} onChange={handleOnchange} name="name" />
                        </Form.Item>
                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                            <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type" />
                        </Form.Item>
                        <Form.Item
                            label="count inStock"
                            name="countinStock"
                            rules={[{ required: true, message: 'Please input your count inStock!' }]}
                        >
                              <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock" />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your price!' }]}
                        >
                              <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your description!' }]}
                        >
                              <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[{ required: true, message: 'Please input your Rating"!' }]}
                        >
                              <InputComponent value={stateProduct.description} onChange={handleOnchange} name="rating" />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please input your image!' }]}
                        >
                            <WarapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                <Button >Select File</Button>
                                {stateProduct?.image && (
                                    <img src={stateProduct?.image} style={{
                                    height:'60px',
                                    width:'60px',
                                    borderRadius:'50%',
                                    objectFit:'cover',
                                    marginLeft:'10px'
                                }} alt="avatar"/>
                                )}
                            </WarapperUploadFile>
                        </Form.Item>
                        
                        <Form.Item wrapperCol={{offset:20, span:16}} >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </Modal>
        </div>
    );
}

export default AdminProduct;