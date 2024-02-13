const OrderPage = () => {
  return <>Order Page</>
}

OrderPage.acl = {
  action: 'read',
  subject: 'orders'
}

export default OrderPage
