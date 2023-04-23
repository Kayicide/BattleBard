export const TopBar = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="inline-flex items-end">
        <h3 className="text-3xl font-extralight text-white/75">Battle</h3>
        <h3 className="text-3xl font-extralight text-orange-600/75">Bard</h3>
        <h3 className="text-lg font-extralight text-white/50">Beta</h3>
      </div>
      <div className="inline-flex items-center space-x-2">
        <a
          className="smooth-hover rounded-md bg-gray-900 p-2 text-white/50 hover:text-white"
          href="#"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        </a>
        <a
          className="smooth-hover rounded-md bg-gray-900 p-2 text-white/50 hover:text-white"
          href="#"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};
