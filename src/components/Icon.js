import { IoIosArrowBack,IoIosArrowForward,IoIosArrowDown ,IoIosArrowUp  } from "react-icons/io";
import { RiSearchLine } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";
const setIcon = {
  "left" : IoIosArrowBack,
  "arrowLeft": FaArrowLeft,
  "search": RiSearchLine,
}

export const Icon = ({type, fill, size, color})=>{
  const Component = setIcon[type];
  return (
    <Component fill={fill} fontSize={size} color={color}></Component>
  )
}