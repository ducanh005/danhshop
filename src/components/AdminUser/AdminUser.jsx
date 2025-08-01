import { Button, Form, Space } from "antd";
import { WrapperHeader } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import DrawComponent from "../DrawerComponent/DrawerComponent";
import Loading from "../LoadingComponent/Loading";
import { WarapperUploadFile } from "../AdminUser/style";
import ModalComponent from "../ModalComponent/ModalComponent";
import { getBase64 } from "../../utils";
import { useEffect, useRef, useState } from "react";
import * as message from '../../components/Message/Message'
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/userMutationHook";
import * as UserService from '../../service/UserService'
import {  DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "../../service/UserService";


const AdminUser = () => {
    const [fileList,setFileList] = useState([])
        const [fileListUpdate, setFileListUpdate] = useState([]);
        const [rowSelected,setRowSelected] = useState('')
        const [isOpenDrawer, setIsOpenDrawer] = useState(false)
        const [isPendingUpdate, setIsPendingUpdate] = useState(false)
        const [isModalOpenDelete,setIsModalOpenDelete] = useState(false)
        const [searchText, setSearchText] = useState('');
        const [searchedColumn, setSearchedColumn] = useState('');
        const searchInput = useRef(null);
        const user = useSelector((state)=> state?.user)
      
        const [stateUserDetails, setstateUserDetail] = useState({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
            avatar:'',
            address:''
        })
        const [form] = Form.useForm()
        const [form1] = Form.useForm()
    
        
    
        const mutationUpdate = useMutationHooks((data) => {
        const { id, ...rests } = data;
        return UserService.updateUser(id, {...rests}); // ✅ bỏ token
    });
    
        const mutationDeleted = useMutationHooks((data) => {
            const { id } = data;
            return UserService.deleteUser(id); 
        });

         const mutationDeletedMany = useMutationHooks((data) => {
                const { ...ids } = data;
                return UserService.deleteManyUsers(ids); 
            });
        
            const handleDeleteManyUsers =(ids)=>{
                mutationDeletedMany.mutate(
                    { ids: ids, token: user?.access_token },
                    {
                    onSettled: () => {
                        queryUser.refetch(); // ✅ Gọi lại danh sách sau khi xoá
                    },
                    }
                );
            }
    
    
        const fetchGetDetailsUser = async(rowSelected)=>{
            const res =await UserService.getDetailsUser(rowSelected)
            if(res?.data){
                setstateUserDetail({
                    name: res?.data?.name,
                    email: res?.data?.email,
                    phone: res?.data?.phone,
                    isAdmin: res?.data?.isAdmin,
                    address:res?.data?.address,
                    avatar:res?.data?.avatar
                })
            }
            setIsPendingUpdate(false)
        }
    
        useEffect(() => {
            if (form1 && stateUserDetails?.name) {
                form1.setFieldsValue(stateUserDetails)
            }
        }, [form1, stateUserDetails])
    
        useEffect(()=>{
            if(rowSelected&& isOpenDrawer){
                setIsPendingUpdate(true)
                fetchGetDetailsUser(rowSelected)
            }
        },[rowSelected,isOpenDrawer])
    
        const handleDetailsProduct=()=>{
         
            setIsOpenDrawer(true)
        }
        const {data:dataUpdated, isPending:isPendingUpdated, isSuccess:isSuccessUpdated, isError:isErrorUpdated} = mutationUpdate
        const {data:dataDeleted, isPending:isPendingDeleted, isSuccess:isSuccessDeleted, isError:isErrorDeleted} = mutationDeleted
        const {data:dataDeletedMany, isPending:isPendingDeletedMany, isSuccess:isSuccessDeletedMany, isError:isErrorDeletedMany} = mutationDeletedMany
        const getAllUser = async()=>{
            const res = await UserService.getAllUser()
            console.log(res)
            return res
        }
        const queryUser = useQuery({queryKey:['users'],queryFn: getAllUser})
        const {isPending: isLoadingUsers,data: users} = queryUser
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
                title: 'Email',
                dataIndex: 'email',
                sorter:(a,b) => a.email.length - b.email.length,
                ...getColumnSearchProps('email')
            },
            {
                title: 'Address',
                dataIndex: 'address',
                sorter:(a,b) => a.address.length - b.address.length,
                ...getColumnSearchProps('address')
            },
            {
                title: 'Admin',
                dataIndex: 'isAdmin',
                filters: [
                    {
                        text: 'True',
                        value: true,
                    },
                    {
                        text: 'False',
                        value: false,
                    },
                    
                    ],
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                sorter:(a,b) => a.phone - b.phone,
                ...getColumnSearchProps('phone'),
            },
            {
                title: 'Action',
                dataIndex: 'action',
                render:renderAction
            },
            ];
        const dataTable =users?.data?.length && users?.data?.map((user)=>{
            return {...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE': "FALSE"}
        })
        
        
        
    
        useEffect(()=>{
            if(isSuccessDeleted && dataDeleted?.status === 'OK'){
                message.success()
                handleCancelDelete()
            }else if(isErrorDeleted){
                message.error()
            }
        },[isSuccessDeleted])

        useEffect(()=>{
            if(isSuccessDeletedMany && dataDeletedMany?.status === 'OK'){
                message.success()
            }else if(isErrorDeletedMany){
                message.error()
            }
        },[isSuccessDeletedMany])
    
        const handleCloseDrawer = () => {
            setIsOpenDrawer(false);
            setstateUserDetail({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
           
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
    
        const handleDeleteUser = () => {
            mutationDeleted.mutate(
                { id: rowSelected, token: user?.access_token },
                {
                onSettled: () => {
                    queryUser.refetch(); // ✅ Gọi lại danh sách sau khi xoá
                },
                }
            );
        };
    
       
    
        const handleOnchangeDetails = (e) => {
            setstateUserDetail({
                ...stateUserDetails,
                [e.target.name]: e.target.value
            })
        }
        
            const handleOnchangeAvatarDetails = async({fileList}) => {
              const file = fileList[0];
              if(!file.url && !file.preview){
                file.preview = await getBase64(file.originFileObj );
              }
              setFileListUpdate(fileList)
              setstateUserDetail({
                ...stateUserDetails,
                avatar: file.preview
              })
            }
    
        const onUpdateUser = () => {
        mutationUpdate.mutate({
            id: rowSelected,
            ...stateUserDetails
        },{ 
            onSettled:()=>{
                queryUser.refetch()
        }});
    };
    

    return (
        <div>
            <WrapperHeader>Quản lý người dùng </WrapperHeader>
            
            <div style={{marginTop:'20px'}}> 
                <TableComponent handleDeleteMany={handleDeleteManyUsers} columns={columns} isPending={isLoadingUsers} data={dataTable} onRow={(record, rowIndex)=>{
                    return {
                        onClick: event=>{
                            setRowSelected(record._id)
                        }
                    }
                }}/>
            </div>
            
            <DrawComponent title="Chi tiết người dùng" isOpen={isOpenDrawer} onClose={()=>setIsOpenDrawer(false)} width="90%">
                 <Loading isPending={isPendingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateUser}
                        autoComplete="off"
                        form={form1}

                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <InputComponent value={stateUserDetails['email']} onChange={handleOnchangeDetails} name="email" />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone!' }]}
                        >
                              <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                              <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
                        </Form.Item>
                         <Form.Item
                            label="Avatar"
                            name="avatar"
                            rules={[{ required: true, message: 'Please input your avatar!' }]}
                        >
                            <WarapperUploadFile fileList={fileListUpdate} onChange={handleOnchangeAvatarDetails} maxCount={1} beforeUpload={()=>false}>
                                <Button >Select File</Button>
                                {stateUserDetails?.avatar && (
                                    <img src={stateUserDetails?.avatar} style={{
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
                title="Xóa người dùng"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpenDelete}
                onCancel={handleCancelDelete} 
                onOk={handleDeleteUser}
            >
                <Loading isPending={isPendingDeleted}>
                    <div>
                        Bạn có chắc muốn xóa tài khoản này không?
                    </div>
                </Loading>
            </ModalComponent>
        </div>
    );
}

export default AdminUser;