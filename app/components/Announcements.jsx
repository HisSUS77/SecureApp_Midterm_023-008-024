export default function Announcements() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-2xl shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out">
      <h2 className="font-extrabold text-2xl text-white mb-6 drop-shadow-lg">Announcements</h2>
      <ul>
        {[
          { title: "Site Maintenance", desc: "Vestibulum condimentum tellus lacus in accumsan." },
          { title: "Community Share Day", desc: "Donec hendrerit sodales congue." },
          { title: "Updated Privacy Policy", desc: "Maximus ac hendrerit sodales congue." },
        ].map((item, index) => (
          <li key={index} className="mb-4">
            <p className={`font-semibold ${index === 0 ? "text-white" : "text-gray-100"}`}>
              {item.title}
            </p>
            <p className="text-gray-200 mt-1 text-sm">{item.desc}</p>
            {index < 2 && <hr className="my-3 border-gray-300" />}
          </li>
        ))}
      </ul>
    </div>
  );
}
