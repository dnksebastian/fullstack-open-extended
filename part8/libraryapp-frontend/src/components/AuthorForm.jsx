import { useState, useEffect } from 'react'

import { EDIT_AGE, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'

const AuthorForm = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [ editAge, result ] = useMutation(EDIT_AGE, {
        refetchQueries: [ { query: ALL_AUTHORS } ]
    })


    const submit = async (e) => {
        e.preventDefault()
        console.log('update author');

        const ageInt = parseInt(born)
        editAge({ variables: {name, ageInt} })

        setName('')
        setBorn('')
    }

    useEffect(() => {
        if(result.data && result.data.editAuthor === null) {
            console.log('no author with that name found');
        }
    }, [result.data])

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    name
                    <input 
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    />
                </div>
                <div>
                    born
                    <input 
                    value={born}
                    onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}


export default AuthorForm