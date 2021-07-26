import Link from "next/link";

interface IErrorProps {
  message: string;
  returnURL: string;
}

const Error = ({ message, returnURL }: IErrorProps) => {
  return (
    <div className="topDiv error-container">
      <h4>{message}</h4>
      <Link href={returnURL}>
        <button>Close</button>
      </Link>
    </div>
  );
};

export default Error;
