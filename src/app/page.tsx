import About from "@/components/About";
import Hero from "@/components/Hero";

function MainPage() {
  return (
    <>
      <div className="">
        <About />
        <Hero />
      </div>
    </>
  );
}

export default MainPage;

// pages/dashboard.js
// "use client";
// import { useState } from "react";

// export default function Dashboard() {
//   const [user] = useState({ name: "Luqman", role: "Admin" });

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-black text-white flex flex-col">
//         <h2 className="text-2xl font-bold p-4">Attendance</h2>
//         <nav className="flex flex-col p-4 space-y-3">
//           <a href="/dashboard" className="hover:bg-gray-800 p-2 rounded">Dashboard</a>
//           <a href="/attendance" className="hover:bg-gray-800 p-2 rounded">Attendance</a>
//           {user.role === "Admin" && (
//             <a href="/users" className="hover:bg-gray-800 p-2 rounded">Users</a>
//           )}
//           <a href="/login" className="mt-auto hover:bg-gray-800 p-2 rounded">Logout</a>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <h1 className="text-3xl font-semibold">Welcome, {user.name} 👋</h1>
//         <p className="text-gray-600 mb-6">Role: {user.role}</p>

//         {/* Cards */}
//         <div className="grid grid-cols-3 gap-4">
//           <div className="bg-white p-6 rounded-xl shadow">✅ Present: 25</div>
//           <div className="bg-white p-6 rounded-xl shadow">❌ Absent: 3</div>
//           <div className="bg-white p-6 rounded-xl shadow">⏰ Late: 2</div>
//         </div>

//         {/* Table Example */}
//         <div className="mt-8 bg-white rounded-xl shadow p-4">
//           <h2 className="text-xl font-semibold mb-4">Recent Attendance</h2>
//           <table className="w-full text-left border">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="p-2">Date</th>
//                 <th className="p-2">Status</th>
//                 <th className="p-2">Check-In</th>
//                 <th className="p-2">Check-Out</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="p-2 border">15 Sept 2025</td>
//                 <td className="p-2 border">Present</td>
//                 <td className="p-2 border">09:05 AM</td>
//                 <td className="p-2 border">05:30 PM</td>
//               </tr>
//               <tr>
//                 <td className="p-2 border">14 Sept 2025</td>
//                 <td className="p-2 border">Late</td>
//                 <td className="p-2 border">09:45 AM</td>
//                 <td className="p-2 border">05:20 PM</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
