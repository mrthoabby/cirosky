export default function Page({ params }: Readonly<{ params: { id: string } }>) {
  return <h2>DEVELOPING... Post: {params.id}</h2>;
}
