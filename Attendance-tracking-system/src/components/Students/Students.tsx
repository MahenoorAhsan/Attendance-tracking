import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { string } from "zod";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";


export const Students = (()=>{
   
    interface Student  {
        address :{
            street : string,
            city:string,
            state :string,
            country : string,
        }
        date_of_birth :string,
        gender : string,
        govt_id :{
            id_number : string,
            id_type :string,
        },
        name : string ,
        parent :{
            name : string,
            email : string ,
            parent_id :string,
            phone_no : string,
        }
        roll_number : number,
        profile_image: string,
        standard :{
            grade :string,
            section : string,
            standard_id :string,
        }
        student_id : string
    }

    const [students, setStudents] = useState<Student[]>([]);
    useEffect(()=>{
        const getStudents = async () => {
            try {
                const response= await axios.get('api/students/get_all_students', 
                    { withCredentials: true },
                );
                if(response.status==200){
                    setStudents(response.data.data);
                    
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
        getStudents();
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
                    Add Student 
                </button>
                <button className="bg-green-200 h-10 rounded-lg px-3 py-2">
                    Edit Student 
                </button>
                <button className="bg-red-200 h-10 rounded-lg px-3 py-2">
                    Delete Student 
                </button>
            </div>
        </div>

            <Table className="w-full border rounded-2xl shadow-lg">
      <TableHeader>
        <TableRow className="bg-blue-100 p-2">
          <TableHead className="p-2">Name </TableHead>
          <TableHead>Roll_no</TableHead>
          <TableHead>Date Of Birth</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Section</TableHead>
          <TableHead>Parent Name</TableHead>
          <TableHead>Parent Email</TableHead>
          <TableHead>Parent Phone No.</TableHead>
          <TableHead>Govt_id</TableHead>
          <TableHead>Govt_id Type</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Profile Image</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.student_id} className="bg-white , hover:bg-blue-300 , color-white">
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.roll_number}</TableCell>
            <TableCell>{student.date_of_birth}</TableCell>
            <TableCell>{student.gender}</TableCell>
            <TableCell>{student.standard.grade}</TableCell>
            <TableCell>{student.standard.section}</TableCell>
            <TableCell>{student.parent.name}</TableCell>
            <TableCell>{student.parent.email}</TableCell>
            <TableCell>{student.parent.phone_no}</TableCell>
            <TableCell>{student.govt_id.id_number}</TableCell>
            <TableCell>{student.govt_id.id_type}</TableCell>
            <TableCell>{student.address.street } , { student.address.city }, { student.address.state } , { student.address.country}</TableCell>
            <TableCell>{student.profile_image}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
        </div>
    )
})