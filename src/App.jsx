import React, { useState, useRef, useEffect } from 'react'
import Contato from './componentes/Contato'
import { v4 as chave } from 'uuid'

export default function App() {

    //state
    const [contato, setContato] = useState({ id: '', nome: '', telefone: '' })
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
        setListaContatos([...listaContatos, {...contato, id: chave()}])

        //limpar o contato
        setContato({ nome: '', telefone: '' })

        //colocar focus no input nome
        inputNome.current.focus()

        //verificar se o contato ja existe
        let duplicado = listaContatos.find((ct) => ct.nome === contato.nome && ct.telefone === contato.telefone)
        if (typeof duplicado === 'undefined') {
            inputTelefone.current.focus()
            return
        }
    }
    function enterAdicionarCotato(event) {
        if (event.code === "Enter") {
            adicionarContato()
        }
    }

    //persistencia do state
    //carregar a listaContatos do localStorage
    useEffect(()=> {
        if(localStorage.getItem('meus_contatos') !== null){
            setListaContatos(JSON.parse(localStorage.getItem('meus_contatos')))
        }
    }, [])

    //atualizar a lista de contatos no localStorage
    useEffect(() => {
        localStorage.setItem('meus_contatos', JSON.stringify(listaContatos))
    }, [listaContatos])

    //limpar toda a lista
    function limparStorage(){
        setListaContatos([])
    }

    //remover um contato da ista
    function removerContato(id){
        let tmp = listaContatos.filter(ct => ct.id !== id)
        setListaContatos(tmp)
    }
    

    return (
        <>
            <h1 className='text-center'>Minha lista de contatos</h1>
            <hr />
            <div>
                <label>Nome:</label><br />
                <input type="text" ref={inputNome} onChange={definirNome} value={contato.nome} />
            </div>
            <div>
                <label>Telefone</label><br />
                <input type="text" ref={inputTelefone} onChange={definirTelefone} onKeyUp={enterAdicionarCotato} value={contato.telefone} />
            </div>
            <button onClick={adicionarContato}>Adicionar Contato</button>
            <button onClick={limparStorage}>Limpar</button>
            <hr />
            {/* apresentação da lista de contatos*/}
            {listaContatos.map(ct => {
                return <Contato key={ct.id} id={ct.id} nome={ct.nome} telefone={ct.telefone} remover={removerContato} />
            })}

        </>
    )
}
