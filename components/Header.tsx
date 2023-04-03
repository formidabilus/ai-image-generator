import Image from "next/image";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="flex justify-between p-5 sticky top-0 bg-white z-50 shadow-md">
      <div className="flex space-x-2 items-center">
        <Image src="/open-ai.svg" alt="openAI logo" height={30} width={30} />
        <div>
          <h1 className="font-bold">
            <span className="text-green-700">AI</span> Image Generator
          </h1>
          <h2 className="text-xs">
            Powered by DALL·E 2, Chat GPT & Microsoft Azure
          </h2>
        </div>
      </div>

      <div className="flex text-xs md:text-base divide-x items-center text-gray-500">
        <Link
          className="px-2 font-light text-right"
          href="https://www.linkedin.com/in/razvan-chiriac-hire/"
        >
          LinkedIn
        </Link>

        <Link
          className="px-2 font-light text-right"
          href="https://github.com/formidabilus/ai-image-generator"
        >
          Github Repo
        </Link>
      </div>
    </header>
  );
};

export default Header;
