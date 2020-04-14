import React from 'react'
import Link from 'next/link'

const NavLink = ({ href, children }) => {
    return (
        <Link href={href}>
            <a className='p-2 hover:underline hover:text-red-800 font-bold'>{children}</a>
        </Link>
    )
}

const navBar = () => {
    return (
        <div className='bg-gray-500 py-4 text-center'>
            <NavLink href='/sobre'><a>Sobre</a></NavLink>
            <NavLink href='/cadastro'><a>Cadastro</a></NavLink>
            <NavLink href='/entrar'><a>Entrar</a></NavLink>
        </div>
    )
}
export default navBar