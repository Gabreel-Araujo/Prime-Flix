import { useEffect, useState } from "react"
import { useParams,useNavigate } from "react-router-dom"
import api from "../../services/api"
import './filme-info.css'
function Filme (){

    const {id} = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true)



    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "b4a426a8506628285d96224338c63339",
                    language:"pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data)
                setLoading(false)
            })
            .catch(()=>{
                console.log('nao encontrado o filme')
                navigate("/",{replace:true});
                return
            })
        }

        loadFilme();

        return() =>{
            console.log('componente desmontado')
        }

    },[navigate, id]);


    function salvarFilme (){
       const mylist = localStorage.getItem("@primeflix");

       let filmesSalvos = JSON.parse(mylist) || [];
        const hasFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id)

        if(hasFilme){
            alert("filme ja está na lista")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos)) 
        alert("Filme salvo com sucesso!!!")

    }


    if(loading){
        <div className="filme-info">
        <h2>Carregando Detalhes...</h2>
    </div>
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img  src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average}/10</strong>

        <div className="area-buttons">
            <button onClick={salvarFilme}>Salvar</button>
            <button>
                <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
            </button>
        </div>
        


        </div>
    )
}

export default Filme