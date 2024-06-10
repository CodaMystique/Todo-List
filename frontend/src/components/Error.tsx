function Error({ errorMessage }: { errorMessage?: string | null | undefined }) {
  return (
    <div className="flex justify-center items-center">
      <p className="text-white text-lg">
        {errorMessage || "Something went wrong. Try again later"}
      </p>
    </div>
  );
}

export default Error;
