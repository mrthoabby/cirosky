export default function Page({ params }: Readonly<{ params: { sectionId: string; pageId: string } }>): JSX.Element {
  return (
    <p style={{ color: "black" }}>
      {params.sectionId} {params.pageId} [Developing...]
    </p>
  );
}
