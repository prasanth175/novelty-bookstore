import React from 'react'

const UserContext = React.createContext({
  activeUsername: '',
  categoryId: '',
  getCategoryId: () => {},
  cartList: [],
})

export default UserContext
