import React, { Component } from "react";
import Main from "../templates/Main";
import CONSTANTS from '../../constants/Constants'
import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc,getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUT_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
})
const db = getFirestore(firebaseApp);
const usersCollectionRef = collection(db, "users")

export default class UserCrud extends Component {
    state = { ...CONSTANTS.initialState }
    
    //  ASSIM QUE O COMPONENTE É CARREGADO É FEITA UMA CHAMADA PARA OS DADOS DO BANCO
    componentDidMount() {
        this.getBdUsers()
    }
    // FUNÇÃO BUSCA OS DADOS DO BANCO DE DADOS FIREBASE
    async getBdUsers() {
        
            const data = await getDocs(usersCollectionRef)

            const list = data.docs.map((subList) => ({
            name: subList._document.data.value.mapValue.fields.name.stringValue,
            email: subList._document.data.value.mapValue.fields.email.stringValue,
            id: subList.id,
            seconds: subList._document.version.timestamp.seconds
             })).sort(function compare(a, b) {
            if (b.seconds < a.seconds) return -1;
            if (b.seconds > a.seconds) return 1;
            return 0;
        })
        this.setState({ user: CONSTANTS.initialState.user, list })
        
           
        
       
    }

    // FUNÇÃO DO BOTÃO CANCELAR QUE LIMPA DOS CAMOS NOME E EMAIL
    clear() {
        this.setState({ user: CONSTANTS.initialState.user, option: false })
    }

    // FUNÇÃO QUE SALVA OS DADOS NO BANCO DE DADOS
    async save() {
        try {
            const name = this.state.user.name
            const email = this.state.user.email
            await addDoc(collection(db, "users"), { name, email })

            this.getBdUsers()

        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    // FUNCÇAO QUE ATUALIZA UMA DADO ESPECIFICO NO BAANCO DE DADOS
    async atualizar(id) {
        try {
            const name = this.state.user.name
            const email = this.state.user.email
            const postDocRef = doc(db, "users", id);
            await updateDoc(postDocRef, { name, email })

            this.getBdUsers()
            this.setState({ option: false })
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    // FUNÇÃO QUE CARREGA OD DADOS PARA OS CAMPOS NOME E EMAIL QUANDO CLICAR EM ATUALIZAR
    load(user) {
        this.setState({ option: true, user })
    }

    // FUNÇÃO QUE REMOVE UM DETERMINADO USUARIO DO BANCO DE DADOS 
    async remove(id) {
        const userDoc = doc(db, "users", id)
        await deleteDoc(userDoc)

        this.getBdUsers()

    }

    // FUNÇÃO QUE ATUALIZA OS CAMPOS NO MOMENTO DA DIGITAÇÃO
    updateFild(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    // FUNÇÃO QUE RENDERIZA AS LINHAS DA TABELA
    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-success" onClick={e => this.load(user)}>
                            <i className="bi bi-pencil-square" ></i>
                        </button>
                        <button className="btn btn-danger" onClick={e => this.remove(user.id)}>
                            <i className="bi bi-trash3-fill" ></i>
                        </button>
                    </td>
                </tr>
            )
        })

    }

    // FUNÇÃO QUE RENDERIZA A TABELA
    renderTable() {
        return (
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    // FUNÇÃO QUE RENDERIZA O FORMULÁRIO
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input type="text" className='form-control' name='name' value={this.state.user.name} onChange={e => this.updateFild(e)} placeholder='Digite o nome...' />

                        </div>
                    </div>
                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input type="text" className='form-control' name='email' value={this.state.user.email} onChange={e => this.updateFild(e)} placeholder='Digite o E-mail...' />

                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        {this.state.option ? <button className="btn btn-primary" value={this.state.user.id} onClick={e => this.atualizar(e.target.value)}>Atualizar</button> : <button className="btn btn-primary" onClick={e => this.save(e)}>Salvar</button>}
                        <button className='btn btn-secondary ms-2' onClick={e => this.clear(e)}>Cancelar</button>
                    </div>
                </div>
            </div>

        )

    }
    
    render() {

        return (
            <Main {...CONSTANTS.headerProps} >
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}