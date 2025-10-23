export default function Trending() {
  return (
    <div className="bg-gradient-to-r from-teal-400 to-purple-600 p-8 rounded-2xl shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out">
      <h2 className="font-extrabold text-2xl text-white mb-6 drop-shadow-lg">Trending</h2>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <img
            src="/2.jpg"
            alt="User"
            className="w-14 h-14 rounded-full border-2 border-white shadow-lg object-cover transform transition-all duration-200 hover:scale-110"
          />
          <div>
            <p className="font-semibold text-xl text-white">{`@Salman`}</p>
            <p className="text-gray-200">World Peace Builder</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <img
            src="/3.jpg"
            alt="User"
            className="w-14 h-14 rounded-full border-2 border-white shadow-lg object-cover transform transition-all duration-200 hover:scale-110"
          />
          <div>
            <p className="font-semibold text-xl text-white">{`@Hamza`}</p>
            <p className="text-gray-200">Global Innovator</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <img
            src="/4.jpg"
            alt="User"
            className="w-14 h-14 rounded-full border-2 border-white shadow-lg object-cover transform transition-all duration-200 hover:scale-110"
          />
          <div>
            <p className="font-semibold text-xl text-white">{`@Huzaifa`}</p>
            <p className="text-gray-200">Leader </p>
          </div>
        </div>
      </div>
    </div>
  );
}
