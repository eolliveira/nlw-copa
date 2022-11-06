import Image from "next/image";
import AppNlwCopaPreview from "../assets/app-nlw-copa-preview.png";
import LogoApp from "../assets/logo.svg";
import UsersAvatars from "../assets/users-avatar-example.png";
import IconCheck from "../assets/icon-check.svg";


export default function Home() {
  return (
    <div className="max-w-[1124px] mx-auto grid grid-cols-2 gap-28 h-screen items-center " >
      <main>
        <Image quality={100} src={LogoApp} alt="logo" />
 
        <h1 className="mt-14 text-white-100 text-5xl font-bold leading-tight">Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className="mt-10 flex items-center gap-2 text-white-100 text-xl ">
          <Image quality={100} src={UsersAvatars} alt={"imagem usuários"} />
          <p>
            <span className="text-green-500" >+12.592</span> pessoas ja estão usando
          </p>
        </div>

        <form className="mt-10 flex gap-1"> 
          <input className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm" type="text" required placeholder="Qual o nome do seu bolão?" />
          <button className="bg-yellow-500 px-6 py-4 rounded uppercase text-sm font-bold text-gray-900 hover:bg-yellow-700" type="submit">Criar um bolão</button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você recebera um código unico que podera usar
          para convidar outras pessoas
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6"> 
            <Image quality={100} src={IconCheck} alt={"icone check"}></Image>
            <span className="flex flex-col">
              <strong>+2.034</strong>
              <p>Bolões criados</p>
            </span>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image quality={100} src={IconCheck} alt={"icone check" }></Image>
            <span className="flex flex-col">
              <strong>+2.034</strong>
              <p>Palpites enviados</p>
            </span>
          </div>
        </div>
      </main>

      <Image src={AppNlwCopaPreview} alt={"Banner"} quality={100} />
    </div>
  );
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
