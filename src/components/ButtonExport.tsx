import axios from 'axios';
import { saveAs } from 'file-saver';
import { Buffer } from 'buffer';
import { ButtonExportProps } from '../utils/types';



const ButtonExport: React.FC<ButtonExportProps> = ({ rout, _id, name }) => {
  const handleExport = async () => {
    try {

      const data = _id ? { _id } : {}; // הכנת גוף הבקשה
      const response = await axios.post(`https://simplicity-server-3ad4.onrender.com${rout}`, data, { withCredentials: true });
      console.log(response);

      if (response.status !== 200 || !response.data.isSuccessful) {
        throw new Error('Network response was not ok');
      }

      const fileBuffer = Buffer.from(response.data.data, 'base64');
      const blob = new Blob([fileBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${name}.xlsx`);

    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleExport}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out hover:-translate hover:scale-105"
      >
        Export
      </button>
    </div>
  );
}

export default ButtonExport;
