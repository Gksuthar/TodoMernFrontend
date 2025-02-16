import React, { useContext, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { Context } from '../../App';

const SearchBox = () => {
  // const [searchContent,setSearchContent] = useState()
  const context = useContext(Context)
  
  return (
    <div className='w-full h-auto border border-[rgba(0,0,0,0.2)] bg-[#f1f1f1] relative '>
        <IoSearchOutline className='absolute top-[12px] left-[10px] z-50 pointer-events-none'/>
<input
  type="text"
  value={context.searchContent}
  onChange={(e)=>context.setSearchContent(e.target.value)}
  className="w-full pl-8 h-[40px] bg-[#f1f1f1] text-[13px] rounded-sm     focus:outline-none focus:border focus:border-[rgba(0,0,0,0.5)] px-3 placeholder:text-[#999]"
  placeholder="Enter text here"
/>    </div>
  )
}

export default SearchBox
