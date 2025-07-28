import { Button, Checkbox, Form, Input, Modal, Space } from "antd";
import { WrapperHeader } from "./style";
import {  DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from "../TableComponent/TableComponent";
import { useEffect, useRef, useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import { WarapperUploadFile } from "../../pages/Profile/style";
import { getBase64 } from "../../utils";
import { createProduct } from "../../service/ProductService";
import * as ProductService from '../../service/ProductService'
import { useMutationHooks } from "../../hooks/userMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from '../../components/Message/Message'
import { useQuery } from "@tanstack/react-query";
import DrawComponent from "../DrawerComponent/DrawerComponent";
import {useSelector} from 'react-redux'
import ModalComponent from "../ModalComponent/ModalComponent";
const AdminProduct = () => {
    const [fileList,setFileList] = useState([])
    const [fileListUpdate, setFileListUpdate] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected,setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const [isModalOpenDelete,setIsModalOpenDelete] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const user = useSelector((state)=> state?.user)
    const [stateProduct, setStateProduct] = useState({
        name: '',
        type: '',
        countInStock: '',
        price: '',
        description: '',
        rating: '',
        image:'',
    })
    const [stateProductDetails, setStateProductDetail] = useState({
        name: '',
        type: '',
        countInStock: '',
        price: '',
        description: '',
        rating: '',
        image:''
    })
    const [form] = Form.useForm()
    const [form1] = Form.useForm()

    const mutation = useMutationHooks(
          ( data) => {
            const {
                image,
                name,
                type,
                countInStock,
                price,
                rating,
                description,
            }= data
            
            const res = ProductService.createProduct({
                image,
                name,
                type,
                countInStock,
                price,
                description,
                rating
            })
            return res
            }
            
        )

    const mutationUpdate = useMutationHooks((data) => {
    const { id, ...rests } = data;
    return ProductService.updateProduct(id, {...rests}); // ✅ bỏ token
});

    const mutationDeleted = useMutationHooks((data) => {
        const { id } = data;
        return ProductService.deleteProduct(id); 
    });

    const mutationDeletedMany = useMutationHooks((data) => {
        const { ...ids } = data;
        return ProductService.deleteManyProduct(ids); 
    });

    console.log(mutationDeletedMany)


    const fetchGetDetailsProduct = async(rowSelected)=>{
        const res =await ProductService.getDetailsProduct(rowSelected)
        if(res?.data){
            setStateProductDetail({
                name: res?.data?.name,
                type: res?.data?.type,
                countInStock: res?.data?.countInStock,
                price: res?.data?.price,
                description: res?.data?.description,
                rating: res?.data?.rating,
                image:res?.data?.image 
            })
        }
        setIsPendingUpdate(false)
    }

    useEffect(() => {
        if (form1 && stateProductDetails?.name) {
            form1.setFieldsValue(stateProductDetails)
        }
    }, [form1, stateProductDetails])

    useEffect(()=>{
        if(rowSelected && isOpenDrawer){
            setIsPendingUpdate(true)
            fetchGetDetailsProduct(rowSelected)
        }
    },[rowSelected,isOpenDrawer])

    const handleDetailsProduct=()=>{
     
        setIsOpenDrawer(true)
    }

    const handleDeleteManyProducts =(ids)=>{
        mutationDeletedMany.mutate(
            { ids: ids, token: user?.access_token },
            {
            onSettled: () => {
                queryProduct.refetch(); // ✅ Gọi lại danh sách sau khi xoá
            },
            }
        );
    }
    const {data, isPending, isSuccess, isError} = mutation
    const {data:dataUpdated, isPending:isPendingUpdated, isSuccess:isSuccessUpdated, isError:isErrorUpdated} = mutationUpdate
    const {data:dataDeleted, isPending:isPendingDeleted, isSuccess:isSuccessDeleted, isError:isErrorDeleted} = mutationDeleted
    const {data:dataDeletedMany, isPending:isPendingDeletedMany, isSuccess:isSuccessDeletedMany, isError:isErrorDeletedMany} = mutationDeletedMany
    const getAllProducts = async()=>{
        const res = await ProductService.getAllProduct()
        return res
    }
    const queryProduct = useQuery({queryKey:['products'],queryFn: getAllProducts})
    const {isPending: isLoadingProduct,data: products} = queryProduct
    const renderAction =()=>{
        return (
            <div>
                <DeleteOutlined style={{color:'red', fontSize:'30px', cursor:'pointer'}} onClick={()=> setIsModalOpenDelete(true)}/>
                <EditOutlined style={{color:'orange', fontSize:'30px',cursor:'pointer'}} onClick={handleDetailsProduct}/>
            </div>
        )
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = clearFilters => {
        clearFilters();
        // setSearchText('');
    };

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
            <InputComponent
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
            >
                Search
            </Button>
            <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
            >
                Reset
            </Button>
            </Space>
        </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
        onOpenChange(open) {
            if (open) {
            setTimeout(() => {
                var _a;
                return (_a = searchInput.current) === null || _a === void 0 ? void 0 : _a.select();
            }, 100);
            }
        },
        },
        // render: text =>
        // searchedColumn === dataIndex ? (
        //     // <Highlighter
        //     // highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //     // searchWords={[searchText]}
        //     // autoEscape
        //     // textToHighlight={text ? text.toString() : ''}
        //     // />
        // ) : (
        //     text
        // ),
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter:(a,b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter:(a,b) => a.price - b.price,
            filters: [
                {
                    text: '>= 50',
                    value: '>=',
                },
                {
                    text: '<= 50',
                    value: '<=',
                },
                
                ],
                onFilter: (value, record) =>{
                    if(value === '>='){
                        return record.price >= 50

                    }return record.price <= 50
                }

        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter:(a,b) => a.rating - b.rating,
            filters: [
                {
                    text: '>= 3',
                    value: '>=',
                },
                {
                    text: '<= 3',
                    value: '<=',
                },
                
                ],
                onFilter: (value, record) =>{
                    if(value === '>='){
                        return Number(record.rating) >= 3

                    }return Number(record.rating) <= 3
                }
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

    useEffect(()=>{
        if(isSuccessDeletedMany && dataDeletedMany?.status === 'OK'){
            message.success()
            handleCancelDelete()
        }else if(isErrorDeletedMany){
            message.error()
        }
    },[isSuccessDeletedMany])

    useEffect(()=>{
        if(isSuccessDeleted && dataDeleted?.status === 'OK'){
            message.success()
            handleCancelDelete()
        }else if(isErrorDeleted){
            message.error()
        }
    },[isSuccessDeleted])

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetail({
        name: '',
        type: '',
        countInStock: '',
        price: '',
        description: '',
        rating: '',
        image:''
        })
        form1.resetFields()
    }
    useEffect(()=>{
        if(isSuccessUpdated && dataUpdated?.status === 'OK'){
            message.success()
            handleCloseDrawer()
        }else if(isErrorUpdated){
            message.error()
        }
    },[isSuccessUpdated])

    const handleCancelDelete =()=>{
        setIsModalOpenDelete(false)
    }

    const handleDeleteProduct = () => {
        mutationDeleted.mutate(
            { id: rowSelected, token: user?.access_token },
            {
            onSettled: () => {
                queryProduct.refetch(); // ✅ Gọi lại danh sách sau khi xoá
            },
            }
        );
    };

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
        mutation.mutate(stateProduct,{
            onSettled:()=>{
            queryProduct.refetch()
            }
        })
    }

    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeDetails = (e) => {
        setStateProductDetail({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleOnchangeAvatar = async({fileList}) => {
          const file = fileList[0];
          if(!file.url && !file.preview){
            file.preview = await getBase64(file.originFileObj );
          }
          setFileList(fileList)
          setStateProduct({
            ...stateProduct,
            image: file.preview
          })
        }
        const handleOnchangeAvatarDetails = async({fileList}) => {
          const file = fileList[0];
          if(!file.url && !file.preview){
            file.preview = await getBase64(file.originFileObj );
          }
          setFileListUpdate(fileList)
          setStateProductDetail({
            ...stateProductDetails,
            image: file.preview
          })
        }

    const onUpdateProduct = () => {
    mutationUpdate.mutate({
        id: rowSelected,
        ...stateProductDetails
    },{ 
        onSettled:()=>{
            queryProduct.refetch()
    }});
};

    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{marginTop:'10px'}}>
                <Button style={{height:'150px', width:'150px', borderRadius:'6px', borderStyle:'dashed'}} onClick={()=>setIsModalOpen(true)}><PlusOutlined style={{fontSize:'60px'}}/></Button>
            </div>
            <div style={{marginTop:'20px'}}> 
                <TableComponent handleDeleteMany={handleDeleteManyProducts} columns={columns} isPending={isLoadingProduct} data={dataTable} onRow={(record, rowIndex)=>{
                    return {
                        onClick: event=>{
                            setRowSelected(record._id)
                        }
                    }
                }}/>
            </div>
             <ModalComponent
                forceRender
                title="Tạo sản phẩm"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onCancel={handleCancel} 
                footer={null}
            >
                <Loading isPending={isPending}>
                    <Form
                        name="create"
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
                            label="Count inStock"
                            name="countInStock"
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
                              <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating" />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please input your image!' }]}
                        >
                            <WarapperUploadFile fileList={fileList} onChange={handleOnchangeAvatar} maxCount={1} beforeUpload={()=>false}>
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
            </ModalComponent>
            <DrawComponent title="Chi tiết sản phẩm" isOpen={isOpenDrawer} onClose={()=>setIsOpenDrawer(false)} width="90%">
                 <Loading isPending={isPendingUpdate}>
                    <Form
                        name="basic"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateProduct}
                        autoComplete="off"
                        form={form1}

                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateProductDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>
                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                            <InputComponent value={stateProductDetails['type']} onChange={handleOnchangeDetails} name="type" />
                        </Form.Item>
                        <Form.Item
                            label="Count inStock"
                            name="countInStock"
                            rules={[{ required: true, message: 'Please input your count inStock!' }]}
                        >
                              <InputComponent value={stateProductDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock" />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your price!' }]}
                        >
                              <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails} name="price" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your description!' }]}
                        >
                              <InputComponent value={stateProductDetails.description} onChange={handleOnchangeDetails} name="description" />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[{ required: true, message: 'Please input your Rating"!' }]}
                        >
                              <InputComponent value={stateProductDetails.description} onChange={handleOnchangeDetails} name="rating" />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please input your image!' }]}
                        >
                            <WarapperUploadFile fileList={fileListUpdate} onChange={handleOnchangeAvatarDetails} maxCount={1} beforeUpload={()=>false}>
                                <Button >Select File</Button>
                                {stateProductDetails?.image && (
                                    <img src={stateProductDetails?.image} style={{
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
            </DrawComponent>

             <ModalComponent
                forceRender
                title="Xóa sản phẩm"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpenDelete}
                onCancel={handleCancelDelete} 
                onOk={handleDeleteProduct}
            >
                <Loading isPending={isPendingDeleted}>
                    <div>
                        Bạn có chắc muốn xóa sản phẩm này không?
                    </div>
                </Loading>
            </ModalComponent>
        </div>
    );
}

export default AdminProduct;