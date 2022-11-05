interface HomeProps {
  count: number
}

export default function Home(props: HomeProps) {
  return <h1 className="text-purple-700">{`Contagem: ${props.count}`}</h1>;
}

//ServerSiteRendering = renderização e construção visual no node
export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:8080/pools/count");
  const data = await response.json();

  console.log(data);

  return {
    props: {
      count: data.count,
    },
  };
};

