import React, { useState } from 'react'
import auth0 from '../lib/auth0'
import axios from 'axios'

const createStatus = () => {

    const [dados, setDados] = useState({
        status: 'Bem',
        coords: {
            lat: null,
            long: null
        }
    })

    const GetMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setDados(old => {
                    return {
                        ...old,
                        coords: {
                            lat: position.coords.latitude,
                            long: position.coords.longitude
                        }
                    }
                })
            })
        }
    }

    const onStatusChange = evt => {
        const value = evt.target.value
        setDados(old => {
            return {
                ...old,
                status: value
            }
        })
    }

    const save = async () => {
        await axios.post('/api/save-status', dados)
    }

    return (
        <div>
            <label><input type="radio" name='status' value='Bem' onClick={onStatusChange} />Estou bem e sem sintomas</label><br />
            <label><input type="radio" name='status' value='Gripe' onClick={onStatusChange} />Estou com sintomas de Gripe / Resfriado</label><br />
            <label><input type="radio" name='status' value='Covid' onClick={onStatusChange} />Estou com sintomas de Coronga</label><br />
            Sua posição atual: {JSON.stringify(dados)}<br />
            <button onClick={GetMyLocation}>Pegar Localização</button><br />
            <button onClick={save}>Salvar meu Status</button>
        </div>
    )
}

export default createStatus

export async function getServerSideProps({ req, res }) {
    const session = await auth0.getSession(req)
    if (session) {

        return {
            props: {
                isAuth: true,
                user: session.user
            }
        }
    }
    return {
        props: {
            isAuth: false,
            user: {}
        }
    }
}