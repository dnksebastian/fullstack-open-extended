import { useState, useEffect } from 'react'

import Select from 'react-select'

import { EDIT_AGE, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'


const selectStyles = {
    menu: (base) => ({
        ...base,
        maxWidth: 'max-content'
    }),
    control: (base) => ({
        ...base,
        minWidth: '300px',
        maxWidth: 'max-content',
        marginBottom: '10px'
    })
}


const AuthorForm = (props) => {
    const [name, setName] = useState('');
    const [born, setBorn] = useState('')

    const authorsData = props.authors    
    const options = authorsData.map(author => { return { value: author.name, label: author.name }})

    const [ editAge, result ] = useMutation(EDIT_AGE, {
        refetchQueries: [ { query: ALL_AUTHORS } ]
    })


    const submit = async (e) => {
        e.preventDefault()
        console.log('update author');

        const ageInt = parseInt(born)
        const nameValue = name.value
        console.log(nameValue)

        editAge({ variables: {nameValue, ageInt} })

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
                <Select
                defaultValue={name}
                onChange={setName}
                options={options}
                styles={selectStyles}
                />
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