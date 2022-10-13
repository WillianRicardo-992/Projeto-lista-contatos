import React, { useState } from 'react'

export default function App() {

    //state
    const [contato, setContato] = useState({ nome: '', telefone: '' })
    const [listaContatos, setListaContatos] = useState([])

    //métodos
    function definirNome(event) {
        setContato({...contato, nome: event.target.value })
    }

    function definirTelefone(event){
        setContato({...contato, telefone: event.target.value})
    }

    function adicionarContato(event){
        setListaContatos({...listaContatos})
    }    

    return (
        <>
            <h1>Minha lista de contatos</h1>
            <hr />
            <div>
                <input type="text" onChange={definirNome} value={contato.nome} />
            </div>
            <div>
                <input type="text" onChange={definirTelefone} value={contato.telefone} />
            </div>
            <button onClick={adicionarContato} >Adicionar Contato</button>
            <hr />
            
            

        </>
    )
}