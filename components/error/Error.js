export default function Error(props) {
  return (
    <div className="absolute left-0 right-0 m-auto flex justify-center items-center w-96 h-20  bg-red-600 p-2">
      <h1 className="text-2xl font-bold">{props.error}</h1>
    </div>
  );
}
