"use client";

import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT";
import { FormEvent, useState } from "react";
import useSWR from "swr";

type Props = {};

const PromptInput = (props: Props) => {
  const [input, setInput] = useState("");

  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", fetchSuggestionFromChatGPT, {
    revalidateOnFocus: false,
  });

  const loading = isLoading || isValidating;

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;
    setInput("");

    console.log(inputPrompt);

    const promptToSend = useSuggestion ? suggestion : inputPrompt;

    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: promptToSend }),
    });

    const data = await res.json();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await submitPrompt();
  };

  return (
    <div className="m-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            (loading && "ChatGPT is thinking of a suggestion...") ||
            suggestion ||
            "Enter a prompt..."
          }
          className="flex-1 p-4 outline-none rounded-md "
          name="prompt"
          id="prompt"
        />
        <button
          type="submit"
          className={`hover:opacity-90 p-4 font-bold ${
            input
              ? "bg-green-700 text-white transition-colors duration-200"
              : "text-gray-300 cursor-not-allowed"
          }`}
          disabled={!input}
        >
          Generate
        </button>
        <button
          className="hover:opacity-90 p-4 bg-green-600 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
          type="button"
          onClick={() => submitPrompt(true)}
        >
          Use Suggestion
        </button>
        <button
          className="hover:opacity-90 p-4 bg-white text-green-700 transition-colors duration-200 border-none rounded-b-md md:rounded-r-md md:rounded-bl-none font-bold"
          type="button"
          onClick={mutate}
        >
          New Suggestion
        </button>
      </form>

      {input && (
        <p className="italic pt-2 pl-2 font-light">
          Suggestion:{" "}
          <span className="text-green-700">
            {loading ? "ChatGPT is thinking..." : suggestion}
          </span>
        </p>
      )}
    </div>
  );
};

export default PromptInput;
