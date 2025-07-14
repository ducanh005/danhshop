import {Drawer} from 'antd'

const DrawComponent =({title='Drawer', placement='right',isOpen=false,children, ...rests })=>{
    return (
        <>
            <Drawer title={title} placement={placement} open={isOpen} {...rests}>
                {children}
            </Drawer>
        </>
    )
}

export default DrawComponent