import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface Student {
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

export const Attendance = () => {
 
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [standardId, setStandardId] = useState('');
   const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  // Create options array
  const gradeOptions = [
    "Nursery" , "LKG" , "UKG", "STD_1" ,"STD_2" ,"STD_3" ,"STD_4","STD_5",
    "STD_6","STD_7","STD_8","STD_9","STD_10","STD_11","STD_12"
  ];
  const sectionOptions = [
    "A","B","C","D","E","F","G"
  ];


  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedGrade && selectedSection) {
        try {
          setLoading(true);
          setError('');
          
          const response = await axios.get(`api/students/get_all_students_of_standard?grade=${selectedGrade.toString()}&section=${selectedSection.toString()}`
          );
          
          setStudents(response.data.data);
        } catch (err) {
          setError('Failed to fetch students');
          console.error('API Error:', err);
        } finally {
          setLoading(false);
        }
      }
    }

      const getStandard = async ()=>{
        if (selectedGrade && selectedSection) {
          const response = await axios.get(`api/standard/get_standard_by_grade_and_section?grade=${selectedGrade.toString()}&section=${selectedSection.toString()}`)
          if(response.status==200){
            setStandardId(response.data.data.standard_id)
          }
          
        }
      
    };

    fetchStudents();
    getStandard();
  }, [selectedGrade, selectedSection,standardId]);


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGrade(e.target.value);
  };

  const handlesectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(e.target.value);
  };

  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const toggleAttendance = async (studentId: string) => {
    try {
      setLoadingId(studentId);
      
      // Get current attendance status
      const isPresent = !attendance[studentId];
      
      // Optimistic UI update
      setAttendance(prev => ({
        ...prev,
        [studentId]: isPresent
      }));

      // API call to save attendance
      await axios.post(`api/attendance/mark_attendance?student_id=${studentId}`, {
        date_of_attendance: formatDateToCustomFormat(new Date()),
        standard_id : standardId
      });

    } catch (error) {
      console.error("Failed to update attendance:", error);
      // Rollback on error
      setAttendance(prev => ({
        ...prev,
        [studentId]: !prev[studentId]
      }));
    } finally {
      setLoadingId(null);
    }
  };

  function formatDateToCustomFormat(dateInput: Date | string): string {
    const date = new Date(dateInput);
    const day = String(date.getDate()).padStart(2, '0'); // Day of the month (01-31)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month (01-12)
    const year = String(date.getFullYear()); // Last 2 digits of the year
  
    return `${year}-${month}-${day}`;
  }
  
    return (
    <div>
      <div className="max-w-xs mt-8 flex gap-5">
        <div className="flex-col">
        <label htmlFor="grade-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Grade/Class
        </label>
        
        <select
          id="grade-select"
          value={selectedGrade}
          onChange={handleChange}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
        >
          <option value="">Select a grade/class</option>
          {gradeOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>


        {selectedGrade && (
          <p className="mt-2 text-sm text-gray-500">
            Selected: {gradeOptions.find(opt => opt === selectedGrade)}
          </p>
        )}
        </div>


        
        <div className="flex-col">
        <label htmlFor="grade-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Grade/Class
        </label>
        <select
          id="section-select"
          value={selectedSection}
          onChange={handlesectionChange}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
        >
          <option value="">Select a section</option>
          {sectionOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>


        {selectedSection && (
          <p className="mt-2 text-sm text-gray-500">
            Selected: {sectionOptions.find(opt => opt === selectedSection)}
          </p>
        )}
        </div>
      </div>
      <div>
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
          <TableHead>Attendance</TableHead>

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
              <TableCell>
              <button
              onClick={() => toggleAttendance(student.student_id)}
              disabled={loadingId === student.student_id}
              className={`px-4 py-2 rounded-md text-white transition-colors
                ${attendance[student.student_id] ? 
                  "bg-green-500 hover:bg-green-600" : 
                  "bg-red-500 hover:bg-red-600"}
                ${loadingId === student.student_id ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {attendance[student.student_id] ? "Mark Present" : "Mark Absent"}
            </button>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
      </div>
    </div>
    );
  };