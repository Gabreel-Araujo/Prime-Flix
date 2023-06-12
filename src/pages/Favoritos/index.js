import { useEffect,useState } from "react"
import "./favoritos.css"
import { Link } from "react-router-dom"
function Favoritos(){

    const [filmes, setFilmes] = useState([])
    useEffect(()=>{

        const myList = localStorage.getItem("@primeflix")

        setFilmes(JSON.parse(myList) || [])  

    }, [])
    
    function excluirFilme(id){
        let filtroFilmes = filmes.filter((item)=>{
            return(item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix",JSON.stringify(filtroFilmes))
    }


    return(
        <div className="meus-filmes">
            <h1>Minha lista</h1>

        {filmes.length === 0 && <span>Nenhum filme salvo :( </span>}

        <ul>
            {filmes.map((item)=>{
                return(
                    <li key={item.id}>
                        <span>{item.title}</span>
                        <div>
                            <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                            <button onClick={()=>excluirFilme(item.id)}>Excluir</button>
                        </div>
                    </li>
                )
            })}
        </ul>

        </div>
    )
}

export default Favoritos