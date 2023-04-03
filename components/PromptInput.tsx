type Props = {};

const PromptInput = (props: Props) => {
  return (
    <div className="m-10">
      <form className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x">
        <textarea
          placeholder="Enter a prompt..."
          className="flex-1 p-4 outline-none rounded-md "
          name="prompt"
          id="prompt"
        />
        <button type="submit">Generate</button>
        <button
          className="p-4 bg-green-700 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
          type="button"
        >
          Use Suggestion
        </button>
        <button
          className="p-4 bg-white text-green-700 transition-colors duration-200 border-none rounded-b-md md:rounded-r-md md:rounded-bl-none font-bold"
          type="button"
        >
          New Suggestion
        </button>
      </form>
    </div>
  );
};

export default PromptInput;
