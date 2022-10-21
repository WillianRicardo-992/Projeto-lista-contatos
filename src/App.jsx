import React, { useState, useRef } from 'react'
import Contato from './componentes/Contato'
import { v4 as chave } from 'uuid'

export default function App() {

    //state
    const [contato, setContato] = useState({ nome: '', telefone: '' })
    const [listaContatos, setListaContatos] = useState([])
    
    //useRef
    const inputNome = useRef()
    const inputTelefone = useRef()

    //métodos 
    function definirNome(event) {
        setContato({ ...contato, nome: event.target.value })
    }
 
    function definirTelefone(event) {
        setContato({ ...contato, telefone: event.target.value })
    }

    function adicionarContato() {

        //validação dos campos
        if (contato.nome === "" || contato.telefone === "") return

        //adicionar novo contato à lista
        setListaContatos([...listaContatos, contato])

        //limpar o contato
        setContato({ nome: '', telefone: '' })

        //colocar focus no input nome
        inputNome.current.focus()

        //verificar se o contato ja existe
        let duplicado = listaContatos.find((ct) => ct.nome === contato.nome && ct.telefone === contato.telefone)
        if(typeof duplicado === 'undefined') {
            inputTelefone.current.focus()
            return
        }
    }

    return (
        <>
            <h1>Minha lista de contatos</h1>
            <hr />
            <div>
                <label>Nome:</label><br />
                <input type="text" ref={inputNome} onChange={definirNome} value={contato.nome} />
            </div>
            <div>
                <label>Telefone</label><br />
                <input type="text" ref={inputTelefone} onChange={definirTelefone} value={contato.telefone} />
            </div>
            <button onClick={adicionarContato}>Adicionar Contato</button>
            <hr />
            {/* apresentação da lista de contatos*/} 
            {listaContatos.map(ct => {
                return <Contato key={chave()} nome={ct.nome} telefone={ct.telefone} />
            })}

        </>
    )
}
