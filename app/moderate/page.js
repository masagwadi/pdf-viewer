import Link from 'next/link';
import students from '@/data/students.json';

const StudentsPage = () => {
  // Function to get the icon URL based on document type
  const getIconUrl = (type) => {
    switch (type) {
      case 'ML':
        return '/icons/proof-of-disability.png';
      case 'FS':
        return '/icons/fee-statement.png';
      case 'ID':
        return '/icons/ID-document.png';
      case 'POR':
        return '/icons/proof-or-registration.png';
      // Add more cases for other document types as needed
      default:
        return '/icons/default.png'; // Default icon if type is unknown
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-800">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Action</th>
              <th className="px-4 py-2">Documents</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="bg-gray-100 hover:bg-gray-200">
                <td className="border px-4 py-2">{student.id}</td>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.email}</td>
                <td className="border px-4 py-2">
                  <Link href={`/moderate/${student.id}`}>
                    <span className="text-blue-500 cursor-pointer hover:underline">View Details</span>
                  </Link>
                </td>
                <td className="border px-4 py-2">
                  {/* Display icons for each document */}
                  {student.documents.map((document, index) => (
                    <div key={index} className="inline-block text-center">
                      <img src={getIconUrl(document.type)} alt={document.type} className="h-6 w-6 mr-1" />
                      <span className="text-blue-500 cursor-pointer hover:underline">{document.type}</span>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsPage;
