import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import axios from "axios";
import { toast } from "sonner";


export const Staffs = (()=>{
    interface Staff {
        staff_id : string,
        name: string,
        email: string,
        role: string,
        govt_id: {
        id_type: string
        id_number: string
        },
        profile_image : string
    }


        const [staffs, setStaffs] = useState<Staff[]>([]);
        useEffect(()=>{
        const getStaffs = async () => {
            try {
                const response= await axios.get('api/staff/getAllStaff', 
                    { withCredentials: true },
                );
                if(response.status==200){
                    setStaffs(response.data.data);
                    
                }
            } catch (error) {
                if(error instanceof Error){
                    toast.error(error.message)
                }
                else{
                    toast.error("Unknow Error")
                }
                
            }
        };
        getStaffs();
    },[]) 

    return (
         <div className="px-4 py-3">
               <div className="justify-between flex">
                   <div>
                       <div className="bg-gray-200  rounded-xl text-xl px-3 py-2">Students List</div>
                       <input type="dropdown"></input>
                   </div>
                   <div className="flex gap-4">
                       <button className="bg-green-200 h-10 rounded-lg px-3 py-2">
                           Add Staff 
                       </button>
                       <button className="bg-green-200 h-10 rounded-lg px-3 py-2">
                           Edit Staff
                       </button>
                       <button className="bg-red-200 h-10 rounded-lg px-3 py-2">
                           Delete Staff
                       </button>
                   </div>
               </div>
       
                   <Table className="w-full border rounded-2xl shadow-lg">
             <TableHeader>
               <TableRow className="bg-blue-100 p-2">
                 <TableHead>Name </TableHead>
                 <TableHead>Email</TableHead>
                 <TableHead>Phone No.</TableHead>
                 <TableHead>Role</TableHead>
                 <TableHead>Govt_id</TableHead>
                 <TableHead>Govt_id Type</TableHead>
                 <TableHead>Profile Image</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {staffs.map((staff) => (
                 <TableRow key={staff.staff_id} className="bg-white , hover:bg-blue-300 , color-white">
                   <TableCell>{staff.name}</TableCell>
                   <TableCell>{staff.email}</TableCell>
                   <TableCell>{staff.role}</TableCell>
                   <TableCell>{staff.govt_id.id_number}</TableCell>
                   <TableCell>{staff.govt_id.id_type}</TableCell>
                   <TableCell>{staff.profile_image}</TableCell>
                 
                 </TableRow>
               ))}
             </TableBody>
           </Table>
               </div>
    )
})