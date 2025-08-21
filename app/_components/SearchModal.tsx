import { useState, useEffect, useRef } from "react";

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const fetchResults = async () => {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      };
      fetchResults();
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start pt-20 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 animate-fadeIn relative"
      >
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="محصول یا برند مورد نظر خود را جستجو کنید"
          className="w-full p-4 border rounded-xl text-lg focus:ring-2 focus:ring-orange-500 outline-none"
        />

        <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            results.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className="flex items-center space-x-4 space-x-reverse p-3 rounded-lg hover:bg-gray-100 transition"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.type}</p>
                </div>
              </a>
            ))
          ) : query.length > 1 ? (
            <p className="text-gray-500">محصول یا برند مورد نظر پیدا نشد</p>
          ) : null}
        </div>

        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>
      </div>
    </div>
  );
}
