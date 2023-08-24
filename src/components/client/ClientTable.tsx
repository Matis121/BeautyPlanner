import { useClientStore } from "../../stores/store";

const ClientTable = () => {
  const clients = useClientStore(state => state.clients);
  const removeClient = useClientStore(state => state.removeClient);

  const handleDeleteClient = id => {
    removeClient(id);
  };

  return (
    <div className="relative overflow-x-auto w-full px-4">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-neutral-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              LP
            </th>
            <th scope="col" className="px-6 py-3">
              Imię
            </th>
            <th scope="col" className="px-6 py-3">
              Nazwisko
            </th>
            <th scope="col" className="px-6 py-3">
              Telefon
            </th>
            <th scope="col" className="px-6 py-3">
              Wizyty
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, idx) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={idx}
            >
              <td className="px-6 py-4">{idx + 1}</td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {client.firstName}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {client.lastName}
              </td>
              <td className="px-6 py-4">{client.phoneNumber}</td>
              <td className="px-6 py-4">
                {/* KOD DO ZACIĄGANIA ILOŚCI WIZYT */}
              </td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4"
                  onClick={() => handleDeleteClient(client.id)}
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => handleDeleteClient(client.id)}
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
