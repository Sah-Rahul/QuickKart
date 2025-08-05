import AdminLayout from "@/components/AdminLayout/AdminLayout"
import ChildrenInterfaces from "@/interfacesTypes/children.interface"
import { FC } from "react"

 
const Adminlayout: FC< ChildrenInterfaces> = ({ children }) => {
  return (
    <AdminLayout>
      { children }
    </AdminLayout>
  )
}

export default Adminlayout