export default function UserId({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <main>
      <div>
        <h1>Current id is {id}</h1>
      </div>
    </main>
  );
}
