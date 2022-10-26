import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faList, faTrash } from '@fortawesome/free-solid-svg-icons'
import Contato from './componentes/Contato'
import { v4 as chave } from 'uuid'
import './App.css'

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
        setListaContatos([...listaContatos, { ...contato, id: chave() }])

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
    useEffect(() => {
        if (localStorage.getItem('meus_contatos') !== null) {
            setListaContatos(JSON.parse(localStorage.getItem('meus_contatos')))
        }
    }, [])

    //atualizar a lista de contatos no localStorage
    useEffect(() => {
        localStorage.setItem('meus_contatos', JSON.stringify(listaContatos))
    }, [listaContatos])

    //limpar toda a lista
    function limparStorage() {
        setListaContatos([])
    }

    //remover um contato da ista
    function removerContato(id) {
        let tmp = listaContatos.filter(ct => ct.id !== id)
        setListaContatos(tmp)
    }


    return (
        <>

            <div className="container-fluid titulo">
                <div className="row">
                    <div className="col text-center">
                        <h4 className='text-center'><FontAwesomeIcon icon={faList} className="me-3" />LISTA DE CONTATOS </h4>
                    </div>
                </div>
            </div>

            <div className="container-fluid formulario">
                <div className="row">
                    <div className="col p-3">

                        <div className="row justify-content-center">
                            <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                                <div className='mb-3'>
                                    <label className='form-label'>Nome</label><br />
                                    <input type="text" ref={inputNome} onChange={definirNome} value={contato.nome} className="form-control" />

                                </div>

                                <div>
                                    <label className='form-label'>Telefone</label><br />
                                    <input type="text" ref={inputTelefone} onChange={definirTelefone} onKeyUp={enterAdicionarCotato} value={contato.telefone} className="form-control" />
                                </div>

                                <div className="row mt-3">
                                    <div className="col text-start">
                                        <button onClick={limparStorage} className="btn btn-outline-warning">
                                            <FontAwesomeIcon icon={faTrash} className="me-2" />Limpar</button>
                                    </div>
                                    <div className="col text-end">
                                        <button onClick={adicionarContato} className="btn btn-outline-info"><FontAwesomeIcon icon={faAdd} className="me-2"  />Adicionar Contato</button>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>



                {/* apresentação da lista de contatos*/}
                {listaContatos.map(ct => {
                    return <Contato key={ct.id} id={ct.id} nome={ct.nome} telefone={ct.telefone} remover={removerContato} />
                })}

            </div>

        </>
    )
}
